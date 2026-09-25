import React, { useState, useRef, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';
import { Badge } from '../common/Badge';
import { Send, Mic, Bot, User, CheckCircle2, Plus, X, FileText, Sparkles, ShieldCheck, Brain } from 'lucide-react';
import {
  buildInterviewReply,
  attachmentNotice,
  type VentureSnapshot,
} from '../../services/ideaLabInterviewEngine';

interface InterviewerChatProps {
  onRawIdeaSubmitted?: (rawText: string) => void;
  externalPrompt?: string;
  onClearExternalPrompt?: () => void;
}

interface AttachedFile {
  name: string;
  size: number;
}

interface ParsedBotSection {
  type: 'captured' | 'confidence' | 'impact' | 'probe' | 'status' | 'inference' | 'verified' | 'text';
  content: string;
  label?: string;
  icon?: React.ReactNode;
  borderColor: string;
  bgColor: string;
  textColor: string;
  headerColor: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function parseBotMessage(text: string): ParsedBotSection[] {
  const sections = text.split('\n\n');
  return sections.map((section) => {
    const trimmed = section.trim();
    if (trimmed.startsWith('Captured:')) {
      return {
        type: 'verified',
        content: trimmed.replace(/^Captured:\s*/, ''),
        label: 'VERIFIED — Founder Input',
        icon: <ShieldCheck className="w-3 h-3" />,
        borderColor: 'border-[#10B981]',
        bgColor: 'bg-[#ECFDF5]',
        textColor: 'text-[#1F2937]',
        headerColor: 'text-[#059669]',
      };
    }
    if (trimmed.startsWith('Confidence:')) {
      return {
        type: 'confidence',
        content: trimmed.replace(/^Confidence:\s*/, ''),
        label: 'GROUNDING & CONFIDENCE',
        icon: <Brain className="w-3 h-3" />,
        borderColor: 'border-[#38BDF8]',
        bgColor: 'bg-[#F0F9FF]',
        textColor: 'text-[#1F2937]',
        headerColor: 'text-[#0284C7]',
      };
    }
    if (trimmed.startsWith('What this changes:')) {
      return {
        type: 'impact',
        content: trimmed.replace(/^What this changes:\s*/, ''),
        label: 'DOWNSTREAM MODEL IMPACT',
        icon: <Sparkles className="w-3 h-3" />,
        borderColor: 'border-[#A855F7]',
        bgColor: 'bg-[#FAF5FF]',
        textColor: 'text-[#1F2937]',
        headerColor: 'text-[#9333EA]',
      };
    }
    if (trimmed.startsWith('Next question')) {
      return {
        type: 'probe',
        content: trimmed,
        label: 'DISCOVERY PROBE',
        icon: null,
        borderColor: 'border-[#F59E0B]',
        bgColor: 'bg-[#FFFBEB]',
        textColor: 'text-[#1F2937]',
        headerColor: 'text-[#D97706]',
      };
    }
    if (trimmed.startsWith('STATUS:')) {
      return {
        type: 'status',
        content: trimmed,
        label: undefined,
        icon: null,
        borderColor: 'border-transparent',
        bgColor: 'bg-transparent',
        textColor: 'text-[#4B5563]',
        headerColor: 'text-[#4B5563]',
      };
    }
    // Check for inference markers
    if (/^(?:MODEL INFERENCE|AI INFERENCE|INFERRED:)/i.test(trimmed)) {
      return {
        type: 'inference',
        content: trimmed.replace(/^(?:MODEL INFERENCE|AI INFERENCE|INFERRED:)\s*/i, ''),
        label: 'MODEL INFERENCE',
        icon: <Brain className="w-3 h-3" />,
        borderColor: 'border-[#6C5E8F]',
        bgColor: 'bg-[#F5F3FF]',
        textColor: 'text-[#1F2937]',
        headerColor: 'text-[#7C3AED]',
      };
    }
    // Check for verified markers
    if (/^(?:VERIFIED|SOURCE-BACKED|EVIDENCE:)/i.test(trimmed)) {
      return {
        type: 'verified',
        content: trimmed.replace(/^(?:VERIFIED|SOURCE-BACKED|EVIDENCE:)\s*/i, ''),
        label: 'VERIFIED — Source-Backed',
        icon: <ShieldCheck className="w-3 h-3" />,
        borderColor: 'border-[#10B981]',
        bgColor: 'bg-[#ECFDF5]',
        textColor: 'text-[#1F2937]',
        headerColor: 'text-[#059669]',
      };
    }
    return {
      type: 'text',
      content: trimmed,
      label: undefined,
      icon: null,
      borderColor: 'border-transparent',
      bgColor: 'bg-transparent',
      textColor: 'text-[#1F2937]',
      headerColor: 'text-[#1F2937]',
    };
  });
}

function renderBotMessageContent(text: string) {
  const parsed = parseBotMessage(text);
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      {parsed.map((section, idx) => {
        if (section.type === 'status') {
          return (
            <div key={idx} className="text-[11px] font-mono text-[#4B5563] border-t border-[#D1D5DB] pt-2 italic">
              {section.content}
            </div>
          );
        }
        if (section.type === 'text') {
          return <div key={idx} className="whitespace-pre-wrap text-sm text-[#1F2937]">{section.content}</div>;
        }
        return (
          <div
            key={idx}
            className={`${section.borderColor} ${section.bgColor} p-3 rounded-r-lg space-y-1.5 border-l-2`}
          >
            <div className="flex items-center gap-2">
              {section.icon && <span className={section.headerColor}>{section.icon}</span>}
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: section.headerColor }}>
                {section.label}
              </div>
            </div>
            <div className="whitespace-pre-wrap leading-relaxed" style={{ color: section.textColor }}>
              {section.content}
            </div>
          </div>
        );
      })}
    </div>
  );
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
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  // True while a submit pipeline (user msg → AI reply timeout) is in flight.
  const submitLockRef = useRef(false);
  const pendingReplyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Stick-to-bottom: auto-scroll the viewport only while the user is already
  // near the bottom, so reading history is never yanked away.
  const stickToBottomRef = useRef(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<{ stop: () => void } | null>(null);

  // Sync external prompt from FAQ click if provided
  useEffect(() => {
    if (externalPrompt) {
      // oxlint-disable-next-line react/set-state-in-effect
      setInputText(externalPrompt);
      if (textareaRef.current) {
        textareaRef.current.focus({ preventScroll: true });
      }
      if (onClearExternalPrompt) {
        onClearExternalPrompt();
      }
    }
  }, [externalPrompt, onClearExternalPrompt]);

  // Scroll ONLY the internal conversation viewport — never the page.
  // Direct scrollTo on viewportRef keeps the browser window and parent containers exactly where they are.
  useEffect(() => {
    const el = viewportRef.current;
    if (el && stickToBottomRef.current) {
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  useEffect(() => {
    return () => {
      if (pendingReplyTimeout.current) {
        clearTimeout(pendingReplyTimeout.current);
      }
    };
  }, []);

  const handleAttachMenuAction = (actionId: string) => {
    setShowAttachMenu(false);
    switch (actionId) {
      case 'upload':
        fileInputRef.current?.click();
        break;
      case 'note':
        setInputText((prev) => (prev.trim() ? `${prev.trim()}\nNotes: ` : 'Notes: '));
        textareaRef.current?.focus({ preventScroll: true });
        break;
      case 'competitor':
        setInputText((prev) => (prev.trim() ? `${prev.trim()} ` : '') + 'Competitor to watch: ');
        textareaRef.current?.focus({ preventScroll: true });
        break;
      case 'pricing':
        setInputText((prev) => (prev.trim() ? `${prev.trim()} ` : '') + 'Pricing: ');
        textareaRef.current?.focus({ preventScroll: true });
        break;
      case 'research':
        setInputText((prev) => (prev.trim() ? `${prev.trim()} ` : '') + 'Reference: ');
        textareaRef.current?.focus({ preventScroll: true });
        break;
      case 'url':
        setInputText((prev) => (prev.trim() ? `${prev.trim()} ` : '') + 'Reference URL: ');
        textareaRef.current?.focus({ preventScroll: true });
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

  const handleViewportScroll = () => {
    const el = viewportRef.current;
    if (!el) return;
    stickToBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 90;
  };

  const handleSubmit = (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    if (submitLockRef.current || isThinking) return;
    const cleanText = (overrideText ?? inputText).trim();
    if (!cleanText && attachedFiles.length === 0) return;
    submitLockRef.current = true;
    setIsThinking(true);
    stickToBottomRef.current = true;

    const submittedText = cleanText || '(shared reference material — see attachments)';
    const fileNames = attachedFiles.map((f) => f.name);
    const activeProbe = pendingProbeId ? { id: pendingProbeId } : null;
    // Chips/probe are one-shot: a new submission consumes them.
    setPendingChips([]);
    setPendingProbeId(null);

    // 1. Add user message (representing exactly what the user sent)
    addMessage(
      fileNames.length > 0 ? `${submittedText}\n\n[Attachments: ${fileNames.join(', ')}]` : submittedText,
      'user',
    );

    // 2. Detect if this message introduces a brand new venture (e.g. switching from sample SaaS/coffee to winter wear)
    const isNewVentureStatement =
      /^(?:i\s+(?:want|plan|would\s+like)\s+to\s+(?:start|build|create|launch|make|open)|my\s+idea\s+is|i'?m\s+(?:starting|building|creating|launching)|(?:starting|launching)\s+a)\b/i.test(submittedText) ||
      state.project.id.startsWith('proj_sample_') ||
      (Boolean(state.idea.rawInput) && !state.idea.rawInput.toLowerCase().includes(submittedText.toLowerCase().slice(0, 15)) && /(?:winter\s+clothing|garment|apparel|handloom|fashion|coffee|saas|marketplace)/i.test(submittedText));

    const isQuestion = /^(?:how|what|why|who|where|when|can|is|are|should|could|would)\b/i.test(submittedText) || submittedText.trim().endsWith('?');
    const previousRaw = isNewVentureStatement ? '' : (state.idea.rawInput?.trim() ?? '');
    let nextRaw = previousRaw;
    if (!isQuestion && (!previousRaw || previousRaw.length < 2000 || isNewVentureStatement)) {
      const attachmentSuffix =
        fileNames.length > 0 ? `\n[Reference files: ${fileNames.join(', ')}]` : '';
      nextRaw = (
        previousRaw.length === 0
          ? `${submittedText}${attachmentSuffix}`
          : `${previousRaw}\n\n${submittedText}${attachmentSuffix}`
      ).slice(0, 4000);
      updateIdea({ rawInput: nextRaw, isNewVenture: isNewVentureStatement });
    }

    // 3. Business-intelligence reasoning over the message + conversation history.
    // Guarded: the engine is deterministic local code, but a failure must
    // degrade to an honest conversational fallback — never a crash, never
    // fake intelligence. Teammate's central council engine is preserved as
    // degraded fallback path (intent routing for idea-lab).
    const snapshot: VentureSnapshot = {
      rawInput: nextRaw,
      productType: state.businessModel.productType,
      targetAudience: state.idea.targetAudience,
      problem: state.idea.problem,
      differentiation: state.idea.differentiation,
      constraints: state.idea.constraints,
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
      // Degraded path: try central council engine before static fallback,
      // preserving teammate's intent routing (NEW_IDEA) when local engine fails.
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
            'filling the structured fields on the right manually. (LOCAL FALLBACK — no analysis was run.)',
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

    // 4. Apply proposed structured updates through the existing architecture
    //    (idea fields batched in one call; classification setters only when set)
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

    // 5. Respond as the Business Intelligence Interviewer (with honest
    //    attachment handling — never claims to have analyzed file contents)
    const notice = attachmentNotice(fileNames);
    const reply = notice ? `${result.replyText}\n\n${notice}` : result.replyText;
    setInputText('');
    setAttachedFiles([]);
    pendingReplyTimeout.current = setTimeout(() => {
      addMessage(reply, 'ai');
      setIsThinking(false);
      submitLockRef.current = false;
      setPendingChips(result.chips);
      setPendingProbeId(result.probeId);
    }, 650);

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
          textareaRef.current?.focus({ preventScroll: true });
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
    // Intelligence-interview identity: restrained warm gray + off-white + graphite palette,
    // visually distinct from other cards in the workspace.
    <div
      ref={chatContainerRef}
      className="bg-[#1C2026] border border-[#2E3540] rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px] transition-colors duration-200"
    >
      {/* Interviewer Header */}
      <div className="px-5 py-3.5 bg-[#141A23] border-b border-[#232F40] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#38BDF8]">
            <Bot className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#F1F5F9] font-semibold">
                Business Intelligence Interviewer
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#064E3B]/80 text-[#34D399] border border-[#059669]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Active Session
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8]">
              Stage 01 • Staged Discovery Mode • Grounded Strategy
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
            Stage 01 of 08
          </span>
          <Badge variant={state.idea.rawInput ? 'success' : 'outline'} size="sm" className="shrink-0 whitespace-nowrap">
            {state.idea.rawInput ? 'Venture Grounded' : 'Awaiting Input'}
          </Badge>
        </div>
      </div>

      {/* Message History — dedicated internal scroll viewport. ONLY this scrolls.
          overscroll-contain ensures the parent page never moves when scrolling messages. */}
      <div
        ref={viewportRef}
        onScroll={handleViewportScroll}
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-4 bg-[#11151C]"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`msg-in flex gap-3 max-w-2xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs ${
                msg.sender === 'user'
                  ? 'bg-[#243042] border border-[#3A4A62] text-[#93C5FD]'
                  : 'bg-[#162232] border border-[#23354C] text-[#38BDF8]'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-[#FAF8F5] border border-[#E2D9CC] text-[#1F2937] rounded-tr-none'
                  : 'bg-[#FAF8F5] border border-[#E2D9CC] text-[#1F2937] rounded-tl-none'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-2 border-b border-[#E2D9CC] pb-1">
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                    msg.sender === 'user' ? 'text-[#0284C7]' : 'text-[#059669]'
                  }`}
                >
                  {msg.sender === 'user' ? 'FOUNDER INPUT' : 'BUSINESS INTELLIGENCE INTERVIEWER'}
                </span>
                <span className="text-[10px] font-mono text-[#6B7280]">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {msg.isInitial ? (
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#059669] font-bold border-b border-[#E2D9CC] pb-1">
                    STAGE 01 • VENTURE DISCOVERY SESSION
                  </div>
                  <div className="text-sm font-semibold text-[#111827]">
                    Hello. Let's turn your idea into a structured, validated venture.
                  </div>
                  <div className="text-xs text-[#4B5563] leading-relaxed">
                    Tell me what is in your head: product type, target audience, or geographic region.<br />
                    It doesn't need to be polished — we'll systematically structure the business model.
                  </div>
                </div>
              ) : msg.sender === 'ai' ? (
                renderBotMessageContent(msg.text)
              ) : (
                <div className="whitespace-pre-wrap text-[#1F2937]">{msg.text}</div>
              )}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="msg-in flex gap-3 max-w-2xl mr-auto" aria-live="polite">
            <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-xs bg-[#162232] border border-[#23354C] text-[#38BDF8]">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-[#FAF8F5] border border-[#E2D9CC] shadow-md flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse [animation-delay:300ms]" />
              <span className="text-[11px] font-mono text-[#4B5563] ml-1">Analyzing venture signals & model constraints…</span>
            </div>
          </div>
        )}

        {state.idea.rawInput && (
          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E2D9CC] text-xs text-[#1F2937] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
              <span>
                Active raw idea stored in project state. Downstream stages dynamically adapt to this context.
              </span>
            </div>
          </div>
        )}

      </div>

      {/* Suggested Idea Starters */}
      {!state.idea.rawInput && (
        <div className="px-4 py-2 bg-[#181B21] border-t border-[#282F3A] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-[#8590A2] shrink-0 uppercase tracking-wider">Try:</span>
          {sampleIdeas.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setInputText(example)}
              className="text-[11px] text-[#CBD5E1] hover:text-[#F8FAFC] bg-[#222731] hover:bg-[#2D3442] px-2.5 py-1 rounded-lg border border-[#333C4A] shrink-0 transition-colors truncate max-w-xs"
            >
              {example}
            </button>
          ))}
        </div>
      )}

      {/* Voice Notification Banner */}
      {voiceNotice && (
        <div className="px-4 py-1.5 bg-[#181B21] border-t border-[#282F3A] text-[11px] font-mono text-[#E2E8F0] flex items-center justify-between">
          <span>{voiceNotice}</span>
          <button
            onClick={() => setVoiceNotice(null)}
            className="text-xs text-[#8590A2] hover:text-[#F8FAFC]"
          >
            ✕
          </button>
        </div>
      )}

      {/* Selected attachments preview */}
      {attachedFiles.length > 0 && (
        <div className="px-4 py-2 bg-[#181B21] border-t border-[#282F3A] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {attachedFiles.map((f) => (
            <span
              key={f.name}
              className="inline-flex items-center gap-1.5 text-[11px] text-[#E2E8F0] bg-[#222731] border border-[#333C4A] rounded-lg px-2.5 py-1 shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-[#8590A2]" />
              <span className="font-medium truncate max-w-[140px]">{f.name}</span>
              <span className="text-[#8590A2] font-mono">{formatBytes(f.size)}</span>
              <button
                type="button"
                onClick={() => setAttachedFiles((prev) => prev.filter((p) => p.name !== f.name))}
                className="text-[#8590A2] hover:text-[#EF4444] transition-colors"
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
        <div className="px-4 py-2 bg-[#181B21] border-t border-[#282F3A] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-[#8590A2] shrink-0 uppercase tracking-wider">Pick:</span>
          {pendingChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleSubmit(undefined, chip)}
              className="text-[11px] font-medium text-[#E2E8F0] bg-[#222731] hover:bg-[#3B4554] hover:text-[#F8FAFC] px-2.5 py-1 rounded-full border border-[#333C4A] shrink-0 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input Box Area — integrated footer strip, seamless with graphite shell */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 bg-[#171A20] border-t border-[#282F3A] flex items-end gap-2"
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
            className="p-2 rounded-lg transition-colors text-[#8590A2] hover:text-[#F8FAFC] hover:bg-[#232933]"
          >
            <Plus className="w-4 h-4" />
          </button>
          {showAttachMenu && (
            <div className="absolute bottom-12 left-0 z-20 w-60 rounded-xl bg-[#20252E] border border-[#333C4A] shadow-2xl p-1.5 space-y-0.5">
              {ATTACH_MENU_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleAttachMenuAction(item.id)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#2A313D] transition-colors"
                >
                  <span className="block text-xs font-semibold text-[#E2E8F0]">{item.label}</span>
                  <span className="block text-[10px] text-[#8590A2] mt-0.5">{item.hint}</span>
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
            className="w-full bg-[#101317] border border-[#2B323E] focus:border-[#4B5565] text-[#F1F5F9] rounded-xl px-3 py-2 text-sm placeholder:text-[#64748B] resize-none outline-none leading-relaxed transition-colors"
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
          className={`p-2 rounded-lg transition-colors ${
            isListeningPlaceholder || isListeningLive
              ? 'bg-[#EF4444]/20 text-[#EF4444] animate-pulse'
              : 'text-[#8590A2] hover:text-[#F8FAFC] hover:bg-[#232933]'
          }`}
        >
          <Mic className="w-4 h-4" />
        </button>

        <button
          type="submit"
          disabled={(!inputText.trim() && attachedFiles.length === 0) || isThinking}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-[#1E293B] disabled:text-[#64748B] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold transition-all shadow-sm active:scale-95"
        >
          {isThinking ? 'Processing…' : 'Submit'}
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};

