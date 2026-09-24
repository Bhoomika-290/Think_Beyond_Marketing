import React, { useState } from 'react';
import { X, Sparkles, Send, MapPin } from 'lucide-react';

import type { ExecutionResourceItem, ExecutionSpecialistMessage } from '../../types/project';

interface ContextualIntelligenceModalProps {
  resource: ExecutionResourceItem | null;
  isOpen: boolean;
  onClose: () => void;
  messages: ExecutionSpecialistMessage[];
  onSendQuery: (query: string, resourceId?: string) => void;
}

export const ContextualIntelligenceModal: React.FC<ContextualIntelligenceModalProps> = ({
  resource,
  isOpen,
  onClose,
  messages,
  onSendQuery,
}) => {
  const [customInput, setCustomInput] = useState('');

  if (!isOpen || !resource) return null;

  // Filter messages relevant to this resource or general
  const filteredMessages = messages.filter(
    (m) => !m.resourceId || m.resourceId === resource.id
  );

  const quickPrompts = [
    'Why do I need this resource?',
    'Find alternatives',
    'Why this supplier?',
    'What happens if this resource is unavailable?',
    'Show cheaper/local alternatives',
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    onSendQuery(text.trim(), resource.id);
    setCustomInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8E2D8] bg-[#FAF8F5] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold text-[#1E40AF] bg-[#DBEAFE] px-1.5 py-0.5 rounded">
                  Intelligence Specialist
                </span>
                <span className="text-[11px] font-mono text-[#64748B]">
                  Contextual Audit
                </span>
              </div>
              <h3 className="text-base font-bold text-[#1E293B] mt-0.5">
                {resource.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#1E293B] hover:bg-[#EAE4D9] transition-colors"
            aria-label="Close intelligence audit"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resource Snapshot Card */}
        <div className="p-4 bg-[#FDFBF7] border-b border-[#E8E2D8] text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#64748B] block">Category</span>
              <span className="font-semibold text-[#1E293B]">{resource.categoryLabel}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#64748B] block">Location</span>
              <span className="font-semibold text-[#1E293B] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#1E40AF]" />
                {resource.location}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#64748B] block">Status</span>
              <span className={`inline-block font-mono font-medium ${
                resource.verificationStatus === 'VERIFIED_OFFICIAL' 
                  ? 'text-[#065F46]' 
                  : 'text-[#92400E]'
              }`}>
                {resource.verificationStatus.replace(/_/g, ' ')}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#64748B] block">Est. Lead Time</span>
              <span className="font-semibold text-[#1E293B]">{resource.leadTimeWeeks} weeks</span>
            </div>
          </div>
          <div className="mt-2 text-[11px] text-[#475569] bg-[#FFFFFF] p-2 rounded border border-[#E8E2D8]">
            <span className="font-semibold text-[#334155]">Spec:</span> {resource.specification}
          </div>
        </div>

        {/* Quick Action Prompt Chips */}
        <div className="p-3 bg-[#FAF8F5] border-b border-[#E8E2D8] flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          <span className="text-[10px] font-mono uppercase text-[#64748B] shrink-0 font-semibold">
            Ask:
          </span>
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleSend(prompt)}
              className="shrink-0 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#FFFFFF] hover:bg-[#EFF6FF] text-[#334155] hover:text-[#1E40AF] border border-[#E5DFD5] hover:border-[#BFDBFE] transition-colors shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat / Responses Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5] text-xs">
          {filteredMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-[#1E40AF] text-white'
                      : 'bg-[#FFFFFF] text-[#1E293B] border border-[#E5DFD5]'
                  }`}
                >
                  <div className="text-[10px] font-mono font-medium mb-1 opacity-75">
                    {isUser ? 'Founder Query' : 'Resource Intelligence Engine'}
                  </div>
                  <div className="whitespace-pre-wrap space-y-1">
                    {msg.text}
                  </div>
                </div>
                <span className="text-[9px] font-mono text-[#94A3B8] mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })}
        </div>

        {/* Custom Input Footer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(customInput);
          }}
          className="p-3 bg-[#FFFFFF] border-t border-[#E8E2D8] flex items-center gap-2"
        >
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder={`Ask about ${resource.name}...`}
            className="flex-1 px-3 py-2 rounded-lg text-xs bg-[#FAF8F5] border border-[#E5DFD5] text-[#1E293B] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#1E40AF] focus:ring-1 focus:ring-[#1E40AF]"
          />
          <button
            type="submit"
            disabled={!customInput.trim()}
            className="px-3 py-2 rounded-lg bg-[#1E40AF] hover:bg-[#1D4ED8] disabled:opacity-40 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
