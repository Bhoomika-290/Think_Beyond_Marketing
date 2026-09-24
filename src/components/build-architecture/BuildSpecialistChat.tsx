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
    <div className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 12 — Build &amp; Architecture Specialist Chat
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
              CONTEXTUAL ADVISOR
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Grounded technical specialist possessing complete awareness of {ventureName}’s problem, customer, unit economics, and brand identity.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Context Loaded: Stages 01–05</span>
        </div>
      </div>

      {/* Quick Action Prompt Chips */}
      <div>
        <span className="text-[10px] font-mono text-[#738095] uppercase block mb-2 font-semibold">
          ONE-CLICK ARCHITECTURAL AUDITS:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onSendMessage(prompt)}
              className="px-2.5 py-1 rounded-lg bg-[#111823] hover:bg-[#151E2B] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244] hover:border-blue-500/40 text-xs font-mono transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="rounded-xl bg-[#080B10] border border-[#263244] p-4 h-80 overflow-y-auto space-y-3.5 scrollbar-thin">
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
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-xl max-w-2xl text-xs leading-relaxed whitespace-pre-line ${
                  isSpecialist
                    ? 'bg-[#111823] border border-[#263244] text-[#AAB4C3]'
                    : 'bg-blue-600 text-white font-medium ml-12'
                }`}
              >
                {msg.text}
              </div>

              {!isSpecialist && (
                <div className="w-7 h-7 rounded-lg bg-[#151E2B] text-[#AAB4C3] border border-[#263244] flex items-center justify-center flex-shrink-0 mt-0.5">
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
          className="flex-1 rounded-xl bg-[#080B10] border border-[#263244] px-4 py-2.5 text-xs text-[#F3F4F6] focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};
