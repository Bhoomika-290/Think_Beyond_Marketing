import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';
import type { BuildSpecialistMessage } from '../../types/project';

interface BuildSpecialistChatProps {
  messages: BuildSpecialistMessage[];
  onSendMessage: (query: string) => void;
  ventureName: string;
}

export const BuildSpecialistChat: React.FC<BuildSpecialistChatProps> = ({
  messages,
  onSendMessage,
  ventureName,
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Review Architecture Fit',
    'Challenge MVP Scope',
    'Database Schema Review',
    'API & Vendor Lock-in',
    'Estimate Build Complexity',
    'Validate Tech Stack Choices',
    'Identify Critical Blockers',
    'Prepare Execution Handoff',
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2EAF4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#14213D]">
              Section 12 — Build &amp; Architecture Specialist Chat
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#E8F2FF] text-[#2684F7] border border-[#2684F7]/30">
              CONTEXTUAL ADVISOR
            </span>
          </div>
          <p className="text-xs text-[#8495AE] mt-1">
            Grounded technical specialist possessing complete awareness of {ventureName}’s problem, customer, unit economics, and brand identity.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-[#19A875]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Context Loaded: Stages 01–05</span>
        </div>
      </div>

      {/* Quick Action Prompt Chips */}
      <div>
        <span className="text-[10px] font-mono text-[#60738F] uppercase block mb-2 font-semibold">
          ONE-CLICK ARCHITECTURAL AUDITS:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSendMessage(prompt)}
              className="px-2.5 py-1 rounded-lg bg-[#FFFFFF] hover:bg-[#151E2B] text-[#8495AE] hover:text-[#14213D] border border-[#E2EAF4] hover:border-blue-500/40 text-xs font-mono transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] p-4 h-80 overflow-y-auto space-y-3.5 scrollbar-thin">
        {messages.map((msg) => {
          const isSpecialist = msg.sender === 'specialist';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                isSpecialist ? 'justify-start' : 'justify-end'
              }`}
            >
              {isSpecialist && (
                <div className="w-7 h-7 rounded-lg bg-[#E8F2FF] text-[#2684F7] border border-[#2684F7]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-xl max-w-2xl text-xs leading-relaxed whitespace-pre-line ${
                  isSpecialist
                    ? 'bg-[#FFFFFF] border border-[#E2EAF4] text-[#8495AE]'
                    : 'bg-[#2684F7] text-white font-medium ml-12'
                }`}
              >
                {msg.text}
              </div>

              {!isSpecialist && (
                <div className="w-7 h-7 rounded-lg bg-[#151E2B] text-[#8495AE] border border-[#E2EAF4] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask the Build Specialist about ${ventureName}'s architecture, database, or MVP scope...`}
          className="flex-1 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] px-4 py-2.5 text-xs text-[#14213D] focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-[#2684F7] hover:bg-[#1769D2] text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};
