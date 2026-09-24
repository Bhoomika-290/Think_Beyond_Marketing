import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';
import type { MarketSpecialistMessage } from '../../types/project';

interface MarketSpecialistChatProps {
  messages: MarketSpecialistMessage[];
  onSendMessage: (queryOrAction: string) => void;
  ventureName: string;
}

export const MarketSpecialistChat: React.FC<MarketSpecialistChatProps> = ({
  messages,
  onSendMessage,
  ventureName,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { label: 'Analyze Market', icon: '📊' },
    { label: 'Compare Competitors', icon: '⚔️' },
    { label: 'Find Market Gaps', icon: '🎯' },
    { label: 'Analyze Customer Segments', icon: '👥' },
    { label: 'Challenge My Positioning', icon: '🛡️' },
    { label: 'Explain Market Risk', icon: '⚠️' },
    { label: 'Identify Missing Evidence', icon: '🔍' },
    { label: 'Prepare Brand Inputs', icon: '🚀' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  return (
    <div className="bg-[#0B1017] border border-[#263244] rounded-xl flex flex-col h-[600px] overflow-hidden shadow-lg">
      {/* Chat Header */}
      <div className="p-4 border-b border-[#263244] flex items-center justify-between bg-[#080B10]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#4D8DFF]/20 border border-[#4D8DFF]/40 flex items-center justify-center text-[#4D8DFF]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-[#F3F4F6]">
                Market Intelligence Business Specialist
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Grounded: {ventureName}
              </span>
            </div>
            <p className="text-[11px] text-[#AAB4C3]">
              Specialist AI engine advising on market wedges, competitor weaknesses, and brand implications.
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-[#64748B]">Context: Stages 01–03 Active</span>
      </div>

      {/* Quick Action Chips Bar */}
      <div className="px-4 py-2 bg-[#111823] border-b border-[#263244] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <span className="text-[10px] font-mono text-[#64748B] shrink-0 mr-1">Actions:</span>
        {quickActions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => onSendMessage(action.label)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#151E2B] text-[11px] font-mono text-[#AAB4C3] hover:text-[#F3F4F6] hover:bg-[#1E293B] border border-[#263244] hover:border-[#4D8DFF]/50 transition-colors shrink-0"
          >
            <span>{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#080B10]/60">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                msg.sender === 'user'
                  ? 'bg-[#151E2B] border border-[#263244] text-[#AAB4C3]'
                  : 'bg-[#4D8DFF]/20 border border-[#4D8DFF]/40 text-[#4D8DFF]'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[82%] p-3.5 rounded-xl text-xs space-y-1 ${
                msg.sender === 'user'
                  ? 'bg-[#151E2B] text-[#F3F4F6] border border-[#263244] rounded-tr-none'
                  : 'bg-[#111823] text-[#F3F4F6] border border-[#263244] rounded-tl-none leading-relaxed'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] pb-1 border-b border-[#263244]/60 mb-1.5">
                  <span className="text-[#4D8DFF] font-semibold">{msg.specialistName || 'Specialist'}</span>
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              )}

              <div className="whitespace-pre-line text-xs">{msg.text}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Custom Question Input Form */}
      <form onSubmit={handleSubmit} className="p-3 bg-[#080B10] border-t border-[#263244] flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask a strategic question about your competitors, audience, or positioning..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 bg-[#151E2B] border border-[#263244] rounded-lg px-3.5 py-2 text-xs text-[#F3F4F6] placeholder-[#64748B] focus:outline-none focus:border-[#4D8DFF]"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="px-3.5 py-2 rounded-lg bg-[#4D8DFF] text-white hover:bg-[#6EA8FF] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 text-xs font-medium"
        >
          <span>Send</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};
