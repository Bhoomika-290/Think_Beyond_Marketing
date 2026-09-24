import React, { useState, useRef, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Send, Mic, Bot, User, CheckCircle2 } from 'lucide-react';

interface InterviewerChatProps {
  onRawIdeaSubmitted?: (rawText: string) => void;
  externalPrompt?: string;
  onClearExternalPrompt?: () => void;
}

export const InterviewerChat: React.FC<InterviewerChatProps> = ({
  onRawIdeaSubmitted,
  externalPrompt,
  onClearExternalPrompt,
}) => {
  const { state, updateIdea, messages, addMessage } = useProject();
  const [inputText, setInputText] = useState('');
  const [isListeningPlaceholder, setIsListeningPlaceholder] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // Scroll conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanText = inputText.trim();
    if (!cleanText) return;

    // 1. Add user message
    addMessage(cleanText, 'user');

    // 2. Capture raw input into project state
    updateIdea({ rawInput: cleanText });

    // 3. System responds with business interviewer acknowledgment
    setTimeout(() => {
      addMessage(
        `Understood. I have recorded your raw idea:\n\n"${cleanText}"\n\nTo build a defensible brand and viable business model from this, let's step through the structured discovery vectors below (Product Type, Audience, Problem, Location, and Open Questions).`,
        'ai'
      );
    }, 400);

    setInputText('');
    if (onRawIdeaSubmitted) {
      onRawIdeaSubmitted(cleanText);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleMicClick = () => {
    setIsListeningPlaceholder(true);
    setVoiceNotice('Voice Input Interface Ready: Web Speech API connector placeholder active.');
    setTimeout(() => {
      setIsListeningPlaceholder(false);
    }, 2500);
  };

  const sampleIdeas = [
    'I want to start a winter clothing business in Rajasthan.',
    'A SaaS platform for independent coffee roasters to manage wholesale subscriptions.',
    'A peer-to-peer marketplace for renting specialty camera gear in Mumbai.',
  ];

  return (
    <div className="bg-[#111823] border border-[#263244] rounded-xl overflow-hidden shadow-intel-card flex flex-col h-[540px] transition-colors duration-200">
      {/* Interviewer Header */}
      <div className="px-5 py-3.5 bg-[#151E2B] border-b border-[#263244] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[rgba(77,141,255,0.12)] border border-[rgba(77,141,255,0.35)] flex items-center justify-center">
            <Bot className="w-4 h-4 text-[#4D8DFF]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#F3F4F6]">
                Business Intelligence Interviewer
              </span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#10B981]" />
            </div>
            <p className="text-[11px] text-[#738095]">
              Staged Discovery Agent • Structured Capture Mode
            </p>
          </div>
        </div>

        <Badge variant={state.idea.rawInput ? 'success' : 'outline'} size="sm">
          {state.idea.rawInput ? 'Raw Idea Captured' : 'Awaiting Input'}
        </Badge>
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-2xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-md shrink-0 flex items-center justify-center text-xs ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-[#F3F4F6]'
                  : 'bg-[#151E2B] border border-[#263244] text-[#4D8DFF]'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`rounded-xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-[#F3F4F6] rounded-tr-none'
                  : 'bg-[#151E2B] border border-[#263244] text-[#F3F4F6] rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <div
                className={`mt-1.5 text-[10px] font-mono ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-[#738095]'
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {state.idea.rawInput && (
          <div className="p-3 rounded-lg bg-[rgba(77,141,255,0.12)] border border-[rgba(77,141,255,0.35)] text-xs text-[#4D8DFF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
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
        <div className="px-4 py-2 bg-[#0B1017] border-t border-[#263244] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-[#738095] shrink-0 uppercase">Try:</span>
          {sampleIdeas.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setInputText(example)}
              className="text-[11px] text-[#AAB4C3] hover:text-[#F3F4F6] bg-[#151E2B] hover:bg-[#1A2536] px-2.5 py-1 rounded border border-[#263244] shrink-0 transition-colors truncate max-w-xs"
            >
              {example}
            </button>
          ))}
        </div>
      )}

      {/* Voice Notification Banner */}
      {voiceNotice && (
        <div className="px-4 py-1.5 bg-[rgba(77,141,255,0.12)] border-t border-[rgba(77,141,255,0.35)] text-[11px] font-mono text-[#4D8DFF] flex items-center justify-between">
          <span>{voiceNotice}</span>
          <button
            onClick={() => setVoiceNotice(null)}
            className="text-xs text-[#738095] hover:text-[#F3F4F6]"
          >
            ✕
          </button>
        </div>
      )}

      {/* Input Box Area */}
      <form
        onSubmit={handleSubmit}
        className="p-3.5 bg-[#151E2B] border-t border-[#263244] flex items-end gap-2.5"
      >
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            rows={2}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tell me what is in your head. It doesn't need to be polished..."
            className="w-full bg-[#0B1017] text-[#F3F4F6] border border-[#263244] focus:border-[#4D8DFF] focus:ring-1 focus:ring-[#4D8DFF] rounded-lg px-3.5 py-2.5 text-sm placeholder:text-[#738095] resize-none outline-none leading-relaxed transition-colors"
          />
        </div>

        <button
          type="button"
          onClick={handleMicClick}
          title="Voice input (speech-to-text connector placeholder)"
          className={`p-2.5 rounded-lg border transition-all ${
            isListeningPlaceholder
              ? 'bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse'
              : 'bg-[#0B1017] hover:bg-[#151E2B] border-[#263244] text-[#AAB4C3] hover:text-[#F3F4F6]'
          }`}
        >
          <Mic className="w-4 h-4" />
        </button>

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={!inputText.trim()}
          icon={<Send className="w-4 h-4" />}
          iconPosition="right"
        >
          Submit Idea
        </Button>
      </form>
    </div>
  );
};
