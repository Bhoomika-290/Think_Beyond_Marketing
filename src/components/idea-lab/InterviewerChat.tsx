import React, { useState, useRef, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Send, Mic, Bot, User, CheckCircle2, Plus, X, FileText } from 'lucide-react';
import {
  buildInterviewReply,
  attachmentNotice,
  detectCasual,
  isGenericCategoryOnly,
  isSubstantiveIdea,
  type VentureSnapshot,
} from '../../services/ideaLabInterviewEngine';
import { classifyMessageIntent } from '../../services/businessCouncilEngine';

interface InterviewerChatProps {
  onRawIdeaSubmitted?: (rawText: string) => void;
  externalPrompt?: string;
  onClearExternalPrompt?: () => void;
}

interface AttachedFile {
  name: string;
  size: number;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const InterviewerChat: React.FC<InterviewerChatProps> = ({
  onRawIdeaSubmitted,
  externalPrompt,
  onClearExternalPrompt,
}) => {
  const {
    state,
    updateIdea,
    setProductType,
    setLocation,
    setDeliveryModel,
    setCustomerType,
    addOpenQuestion,
    messages,
    addMessage,
    queryCouncil,
  } = useProject();
  const [inputText, setInputText] = useState('');
  const [isListeningPlaceholder, setIsListeningPlaceholder] = useState(false);
  const [isListeningLive, setIsListeningLive] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  // Ephemeral interviewer affordances: quick-reply chips for the latest AI
  // question + the active one-shot probe id. Never persisted; the message
  // text always carries the same options as fallback.
  const [pendingChips, setPendingChips] = useState<string[]>([]);
  const [pendingProbeId, setPendingProbeId] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  // Sync external prompt from FAQ click if provided
  useEffect(() => {
    if (externalPrompt) {
      // oxlint-disable-next-line react/set-state-in-effect
      setInputText(externalPrompt);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
      if (onClearExternalPrompt) {
        onClearExternalPrompt();
      }
    }
  }, [externalPrompt, onClearExternalPrompt]);

  // Scroll conversation (including to the typing indicator)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleAttachMenuAction = (actionId: string) => {
    setShowAttachMenu(false);
    switch (actionId) {
      case 'upload':
        fileInputRef.current?.click();
        break;
      case 'note':
        setInputText((prev) => (prev.trim() ? `${prev.trim()}\nNotes: ` : 'Notes: '));
        textareaRef.current?.focus();
        break;
      case 'competitor':
        setInputText((prev) => (prev.trim() ? `${prev.trim()} ` : '') + 'Competitor to watch: ');
        textareaRef.current?.focus();
        break;
      case 'pricing':
        setInputText((prev) => (prev.trim() ? `${prev.trim()} ` : '') + 'Pricing: ');
        textareaRef.current?.focus();
        break;
      case 'research':
        setInputText((prev) => (prev.trim() ? `${prev.trim()} ` : '') + 'Reference: ');
        textareaRef.current?.focus();
        break;
      case 'url':
        setInputText((prev) => (prev.trim() ? `${prev.trim()} ` : '') + 'Reference URL: ');
        textareaRef.current?.focus();
        break;
      default:
        break;
    }
  };

  const ATTACH_MENU_ITEMS = [
    { id: 'note', label: 'Add note / context', hint: 'Prefill the composer with a notes starter' },
    { id: 'upload', label: 'Upload document / image', hint: 'PDF, doc, image, spreadsheet / CSV — filename stored in session' },
    { id: 'competitor', label: 'Add competitor note', hint: 'Prefill the composer for a rival to watch' },
    { id: 'pricing', label: 'Add pricing info', hint: 'Prefill the composer with a price / revenue line' },
    { id: 'research', label: 'Add research reference', hint: 'Prefill the composer with a reference line' },
    { id: 'url', label: 'Add website / URL', hint: 'Prefill the composer with a link to cite' },
  ];
  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).map((f) => ({
      name: f.name,
      size: f.size,
    }));
    if (files.length > 0) {
      setAttachedFiles((prev) => [...prev, ...files].slice(0, 5));
    }
    // Reset so the same file can be picked again after removal.
    e.target.value = '';
  };

  const handleSubmit = (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    const cleanText = (overrideText ?? inputText).trim();
    if (!cleanText && attachedFiles.length === 0) return;

    const submittedText = cleanText || '(shared reference material — see attachments)';
    const fileNames = attachedFiles.map((f) => f.name);
    const activeProbe = pendingProbeId ? { id: pendingProbeId } : null;
    // Chips/probe are one-shot: a new submission consumes them.
    setPendingChips([]);
    setPendingProbeId(null);

    // 1. Add user message to conversation history
    addMessage(
      fileNames.length > 0 ? `${submittedText}\n\n[Attachments: ${fileNames.join(', ')}]` : submittedText,
      'user',
    );

    const casual = detectCasual(submittedText);

    // 2. Casual / Greeting intent: Never mutate venture state or project name
    if (casual === 'greeting' || casual === 'thanks' || casual === 'bye' || casual === 'joke' || casual === 'scary' || casual === 'capabilities') {
      const history = messages.map((m) => ({ sender: m.sender, text: m.text }));
      const snapshot: VentureSnapshot = {
        rawInput: state.idea.rawInput || '',
        productType: state.businessModel.productType,
        targetAudience: state.idea.targetAudience,
        problem: state.idea.problem,
        differentiation: state.idea.differentiation || '',
        constraints: state.idea.constraints || '',
        goals: state.idea.goals,
        context: state.idea.context,
        openQuestions: state.idea.openQuestions,
        country: state.businessModel.location.country,
        cityRegion: state.businessModel.location.cityRegion,
        deliveryModel: state.businessModel.deliveryModel,
        customerType: state.businessModel.customerType,
      };
      const result = buildInterviewReply(submittedText, history, snapshot, activeProbe);
      setIsThinking(true);
      setTimeout(() => {
        addMessage(result.replyText, 'ai');
        setIsThinking(false);
      }, 500);

      setInputText('');
      setAttachedFiles([]);
      return;
    }

    // 3. Authoritative Raw Idea Management:
    // Check if user submitted only a generic category without a product concept
    const genericCat = isGenericCategoryOnly(submittedText);
    const existingRaw = state.idea.rawInput?.trim() || '';
    const hasExistingRaw = Boolean(existingRaw.length > 3 && !detectCasual(existingRaw) && !isGenericCategoryOnly(existingRaw));

    if (genericCat && !hasExistingRaw) {
      setProductType(genericCat);
      const snapshot: VentureSnapshot = {
        rawInput: '',
        productType: genericCat,
        targetAudience: '',
        problem: '',
        differentiation: '',
        constraints: '',
        goals: '',
        context: '',
        openQuestions: [],
        country: '',
        cityRegion: '',
        deliveryModel: null,
        customerType: null,
      };
      const history = messages.map((m) => ({ sender: m.sender, text: m.text }));
      const result = buildInterviewReply(submittedText, history, snapshot, activeProbe);
      setIsThinking(true);
      setTimeout(() => {
        addMessage(result.replyText, 'ai');
        setIsThinking(false);
        setPendingChips(result.chips);
      }, 500);

      setInputText('');
      setAttachedFiles([]);
      return;
    }

    // Determine if this is an initial idea submission or an explicit replacement of the venture
    const intentResult = classifyMessageIntent(submittedText, hasExistingRaw);
    const isNewIdeaStatement =
      intentResult.intent === 'NEW_IDEA' ||
      /^(?:i\s+want\s+to\s+build|i\s+am\s+building|i'm\s+building|let'?s\s+build|new\s+idea[:\s]|we\s+are\s+building|building\s+a)\b/i.test(submittedText);

    const isSubstantive = isSubstantiveIdea(submittedText);
    let authoritativeRaw = existingRaw;

    if (!hasExistingRaw) {
      if (isSubstantive && !genericCat) {
        // First substantive raw idea submission
        authoritativeRaw = submittedText.trim();
        updateIdea({ rawInput: authoritativeRaw });
      } else {
        authoritativeRaw = '';
      }
    } else if (isNewIdeaStatement && isSubstantive && !genericCat) {
      // Intentional venture replacement / pivot with a substantive idea
      authoritativeRaw = submittedText.trim();
      updateIdea({
        rawInput: authoritativeRaw,
        name: '',
        targetAudience: '',
        problem: '',
        differentiation: '',
        constraints: '',
        goals: '',
        context: '',
        outcome: '',
        openQuestions: [],
      });
    }
    // If hasExistingRaw is true and it's NOT a new substantive idea statement (e.g. follow-up answer, chip click, structured fact),
    // authoritativeRaw remains unchanged and is NEVER concatenated with follow-ups.

    // 4. Intelligence reasoning over the message + clean snapshot
    const snapshot: VentureSnapshot = {
      rawInput: authoritativeRaw,
      productType: state.businessModel.productType,
      targetAudience: state.idea.targetAudience,
      problem: state.idea.problem,
      differentiation: state.idea.differentiation || '',
      constraints: state.idea.constraints || '',
      goals: state.idea.goals,
      context: state.idea.context,
      openQuestions: state.idea.openQuestions,
      country: state.businessModel.location.country,
      cityRegion: state.businessModel.location.cityRegion,
      deliveryModel: state.businessModel.deliveryModel,
      customerType: state.businessModel.customerType,
    };
    const history = messages.map((m) => ({ sender: m.sender, text: m.text }));
    let result: ReturnType<typeof buildInterviewReply>;
    try {
      result = buildInterviewReply(submittedText, history, snapshot, activeProbe);
    } catch {
      // Degraded path: try central council engine before static fallback
      try {
        const councilResponse = queryCouncil(submittedText, 'idea-lab');
        result = {
          replyText: councilResponse.replyText,
          updates: {
            productType: null,
            targetAudience: null,
            problem: null,
            differentiation: null,
            constraints: null,
            goals: null,
            context: null,
            country: null,
            cityRegion: null,
            customerType: null,
            deliveryModel: null,
            openQuestions: [],
          },
          savedSummary: [],
          chips: [],
          probeId: null,
        };
      } catch {
        result = {
          replyText:
            'Intelligence service hiccup — I could not reason over that message just now. ' +
            'Your words are safely stored in the project state above. Try sending again, or continue ' +
            'filling the structured fields on the right manually.',
          updates: {
            productType: null,
            targetAudience: null,
            problem: null,
            differentiation: null,
            constraints: null,
            goals: null,
            context: null,
            country: null,
            cityRegion: null,
            customerType: null,
            deliveryModel: null,
            openQuestions: [],
          },
          savedSummary: [],
          chips: [],
          probeId: null,
        };
      }
    }

    // 5. Apply proposed structured updates through dedicated setters
    const ideaPatch: Record<string, string> = {};
    if (result.updates.targetAudience) ideaPatch.targetAudience = result.updates.targetAudience;
    if (result.updates.problem) ideaPatch.problem = result.updates.problem;
    if (result.updates.differentiation) ideaPatch.differentiation = result.updates.differentiation;
    if (result.updates.constraints) ideaPatch.constraints = result.updates.constraints;
    if (result.updates.goals) ideaPatch.goals = result.updates.goals;
    if (result.updates.context) ideaPatch.context = result.updates.context;
    if (Object.keys(ideaPatch).length > 0) updateIdea(ideaPatch);

    if (result.updates.productType) setProductType(result.updates.productType);
    if (result.updates.country || result.updates.cityRegion) {
      setLocation({
        ...(result.updates.country ? { country: result.updates.country } : {}),
        ...(result.updates.cityRegion ? { cityRegion: result.updates.cityRegion } : {}),
      });
    }
    if (result.updates.customerType) setCustomerType(result.updates.customerType);
    if (result.updates.deliveryModel) setDeliveryModel(result.updates.deliveryModel);
    for (const q of result.updates.openQuestions) addOpenQuestion(q);

    // 6. Respond as the Business Intelligence Interviewer
    const notice = attachmentNotice(fileNames);
    const reply = notice ? `${result.replyText}\n\n${notice}` : result.replyText;
    setIsThinking(true);
    setTimeout(() => {
      addMessage(reply, 'ai');
      setIsThinking(false);
      setPendingChips(result.chips);
      setPendingProbeId(result.probeId);
    }, 650);

    setInputText('');
    setAttachedFiles([]);
    if (onRawIdeaSubmitted) {
      onRawIdeaSubmitted(submittedText);
    }
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleMicClick = () => {
    // Prefer the real browser Web Speech API; fall back to an honest notice.
    const w = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionLike;
      webkitSpeechRecognition?: new () => SpeechRecognitionLike;
    };
    const Recognition = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!Recognition) {
      setIsListeningPlaceholder(true);
      setVoiceNotice('Voice input is not available in this browser. Type your idea instead — nothing breaks.');
      setTimeout(() => {
        setIsListeningPlaceholder(false);
      }, 2500);
      return;
    }
    try {
      recognitionRef.current?.stop();
      const recognition = new Recognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      setIsListeningLive(true);
      setVoiceNotice('Listening… speak your idea, then pause. Click mic again to stop.');
      recognition.onresult = (event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => {
        const transcript = event.results[0]?.[0]?.transcript ?? '';
        if (transcript.trim()) {
          setInputText((prev) => (prev.trim() ? `${prev.trim()} ${transcript.trim()}` : transcript.trim()));
          textareaRef.current?.focus();
        }
        setIsListeningLive(false);
        setVoiceNotice(null);
      };
      recognition.onerror = () => {
        setIsListeningLive(false);
        setVoiceNotice('Voice capture hit an error — your typed input still works fine.');
      };
      recognition.onend = () => {
        setIsListeningLive(false);
      };
      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListeningLive(false);
      setVoiceNotice('Voice input could not start here. Type your idea instead — nothing breaks.');
    }
  };

interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

  const sampleIdeas = [
    'I want to start a winter clothing business in Rajasthan.',
    'A SaaS platform for independent coffee roasters to manage wholesale subscriptions.',
    'A peer-to-peer marketplace for renting specialty camera gear in Mumbai.',
  ];

  return (
    <div className="bg-[#FDFCF8] border border-[#DDD5C5] rounded-xl overflow-hidden shadow-intel-card flex flex-col h-[540px] transition-colors duration-200">
      {/* Interviewer Header */}
      <div className="px-5 py-3.5 bg-[#ECE6DA] border-b border-[#DDD5C5] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[rgba(43,61,79,0.12)] border border-[rgba(43,61,79,0.35)] flex items-center justify-center">
            <Bot className="w-4 h-4 text-[#2B3D4F]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#2B3D4F]">
                Business Intelligence Interviewer
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#4A7C59]" />
            </div>
            <p className="text-[11px] text-[#6B7D90]">
              Staged Discovery Agent • Structured Capture Mode
            </p>
          </div>
        </div>

        <Badge variant={state.idea.rawInput ? 'success' : 'outline'} size="sm" className="shrink-0 whitespace-nowrap">
          {state.idea.rawInput ? 'Raw Idea Captured' : 'Awaiting Input'}
        </Badge>
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`msg-in flex gap-3 max-w-2xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-md shrink-0 flex items-center justify-center text-xs ${
                msg.sender === 'user'
                  ? 'bg-[#2B3D4F] text-[#F5F1EB]'
                  : 'bg-[#ECE6DA] border border-[#DDD5C5] text-[#2B3D4F]'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`rounded-xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-[#2B3D4F] text-[#F5F1EB] rounded-tr-none'
                  : 'bg-[#ECE6DA] border border-[#DDD5C5] text-[#2B3D4F] rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <div
                className={`mt-1.5 text-[10px] font-mono ${
                  msg.sender === 'user' ? 'text-[#F5F1EB]/70' : 'text-[#6B7D90]'
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="msg-in flex gap-3 max-w-2xl mr-auto" aria-live="polite">
            <div className="w-7 h-7 rounded-md shrink-0 flex items-center justify-center text-xs bg-[#ECE6DA] border border-[#DDD5C5] text-[#2B3D4F]">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="rounded-xl rounded-tl-none px-4 py-3.5 bg-[#ECE6DA] border border-[#DDD5C5] shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A5E73] animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A5E73] animate-pulse [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A5E73] animate-pulse [animation-delay:300ms]" />
              <span className="text-[11px] font-mono text-[#6B7D90] ml-1">Reasoning…</span>
            </div>
          </div>
        )}

        {state.idea.rawInput && (
          <div className="p-3 rounded-lg bg-[rgba(43,61,79,0.12)] border border-[rgba(43,61,79,0.35)] text-xs text-[#2B3D4F] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4A7C59] shrink-0" />
              <span>
                Active raw idea stored in project state. You can refine or expand details below.
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Idea Starters */}
      {!state.idea.rawInput && (
        <div className="px-4 py-2 bg-[#F5F1EB] border-t border-[#DDD5C5] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-[#6B7D90] shrink-0 uppercase">Try:</span>
          {sampleIdeas.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setInputText(example)}
              className="text-[11px] text-[#4A5E73] hover:text-[#2B3D4F] bg-[#ECE6DA] hover:bg-[#EAE3D3] px-2.5 py-1 rounded border border-[#DDD5C5] shrink-0 transition-colors truncate max-w-xs"
            >
              {example}
            </button>
          ))}
        </div>
      )}

      {/* Voice Notification Banner */}
      {voiceNotice && (
        <div className="px-4 py-1.5 bg-[rgba(43,61,79,0.12)] border-t border-[rgba(43,61,79,0.35)] text-[11px] font-mono text-[#2B3D4F] flex items-center justify-between">
          <span>{voiceNotice}</span>
          <button
            onClick={() => setVoiceNotice(null)}
            className="text-xs text-[#6B7D90] hover:text-[#2B3D4F]"
          >
            ✕
          </button>
        </div>
      )}

      {/* Selected attachments preview */}
      {attachedFiles.length > 0 && (
        <div className="px-4 py-2 bg-[#F5F1EB] border-t border-[#DDD5C5] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {attachedFiles.map((f) => (
            <span
              key={f.name}
              className="inline-flex items-center gap-1.5 text-[11px] text-[#2B3D4F] bg-[#ECE6DA] border border-[#DDD5C5] rounded-lg px-2.5 py-1 shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-[#4A5E73]" />
              <span className="font-medium truncate max-w-[140px]">{f.name}</span>
              <span className="text-[#6B7D90] font-mono">{formatBytes(f.size)}</span>
              <button
                type="button"
                onClick={() => setAttachedFiles((prev) => prev.filter((p) => p.name !== f.name))}
                className="text-[#6B7D90] hover:text-[#9E4A4A] transition-colors"
                title="Remove file"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Quick-reply chips for the latest interviewer question (ephemeral) */}
      {pendingChips.length > 0 && !isThinking && (
        <div className="px-4 py-2 bg-[#F5F1EB] border-t border-[#DDD5C5] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-[#6B7D90] shrink-0 uppercase">Pick:</span>
          {pendingChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleSubmit(undefined, chip)}
              className="text-[11px] font-medium text-[#2B3D4F] bg-[#FDFCF8] hover:bg-[#2B3D4F] hover:text-[#F5F1EB] px-2.5 py-1 rounded-full border border-[#2B3D4F]/30 hover:border-[#2B3D4F] shrink-0 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input Box Area */}
      <form
        onSubmit={handleSubmit}
        className="p-3.5 bg-[#ECE6DA] border-t border-[#DDD5C5] flex items-end gap-2.5"
      >
        {/* Plus control: attachment / context action menu */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt,.md,.csv"
          onChange={handleFilesSelected}
          className="hidden"
          aria-label="Attach reference files"
        />
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setShowAttachMenu((prev) => !prev)}
            title="Add context: notes, documents, images, competitor or research references"
            aria-label="Add venture context or attachments"
            aria-expanded={showAttachMenu}
            className="p-2.5 rounded-lg border transition-all bg-[#F5F1EB] hover:bg-[#ECE6DA] border-[#DDD5C5] text-[#4A5E73] hover:text-[#2B3D4F]"
          >
            <Plus className="w-4 h-4" />
          </button>
          {showAttachMenu && (
            <div className="absolute bottom-12 left-0 z-20 w-60 rounded-xl bg-[#FDFCF8] border border-[#DDD5C5] shadow-intel-card p-1.5 space-y-0.5">
              {ATTACH_MENU_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleAttachMenuAction(item.id)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#ECE6DA] transition-colors"
                >
                  <span className="block text-xs font-semibold text-[#2B3D4F]">{item.label}</span>
                  <span className="block text-[10px] text-[#6B7D90] mt-0.5">{item.hint}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            rows={2}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tell me what is in your head. It doesn't need to be polished..."
            className="w-full bg-[#F5F1EB] text-[#2B3D4F] border border-[#DDD5C5] focus:border-[#2B3D4F] focus:ring-1 focus:ring-[#2B3D4F] rounded-lg px-3.5 py-2.5 text-sm placeholder:text-[#6B7D90] resize-none outline-none leading-relaxed transition-colors"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            if (isListeningLive) {
              recognitionRef.current?.stop();
              setIsListeningLive(false);
              setVoiceNotice(null);
            } else {
              handleMicClick();
            }
          }}
          title={isListeningLive ? 'Stop listening' : 'Voice input via browser speech recognition (falls back gracefully)'}
          aria-label={isListeningLive ? 'Stop voice input' : 'Start voice input'}
          className={`p-2.5 rounded-lg border transition-all ${
            isListeningPlaceholder || isListeningLive
              ? 'bg-[#4A7C59]/15 border-[#4A7C59] text-[#4A7C59] animate-pulse'
              : 'bg-[#F5F1EB] hover:bg-[#ECE6DA] border-[#DDD5C5] text-[#4A5E73] hover:text-[#2B3D4F]'
          }`}
        >
          <Mic className="w-4 h-4" />
        </button>

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={(!inputText.trim() && attachedFiles.length === 0) || isThinking}
          icon={<Send className="w-4 h-4" />}
          iconPosition="right"
        >
          Submit Idea
        </Button>
      </form>
    </div>
  );
};
