import React from 'react';
import { HelpCircle, ArrowUpRight } from 'lucide-react';

interface FAQEntryPromptsProps {
  onSelectPrompt: (promptText: string) => void;
}

export const FAQEntryPrompts: React.FC<FAQEntryPromptsProps> = ({ onSelectPrompt }) => {
  const commonQuestions = [
    {
      q: 'Is my idea actually worth pursuing?',
      intent: 'How can I validate whether this venture has genuine viability and real customer demand before investing capital?',
      tag: 'Viability',
    },
    {
      q: 'Who should I build this for?',
      intent: 'How can I sharpen my target audience, identify ideal customer profiles, and understand who suffers most from this problem?',
      tag: 'Audience',
    },
    {
      q: 'How do I know if the market is crowded?',
      intent: 'How can I evaluate market saturation, map existing alternatives, and uncover underserved niches in this category?',
      tag: 'Competition',
    },
    {
      q: 'How do I differentiate my idea?',
      intent: 'How can I discover an unfair advantage, unique value proposition, or non-obvious angle that competitors cannot easily copy?',
      tag: 'Positioning',
    },
    {
      q: 'How do I turn an idea into a real brand?',
      intent: 'How can I transform my product hypothesis into a structured brand system with identity, voice, and launch mechanics?',
      tag: 'Brand System',
    },
  ];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-3">
        <HelpCircle className="w-4 h-4 text-[#2684F7]" />
        <span className="text-xs font-mono uppercase tracking-wider text-[#60738F] font-medium">
          Founder Dilemma Entry Points
        </span>
        <span className="text-xs text-[#8495AE] hidden sm:inline">
          (Click any prompt to seed the intelligence session)
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {commonQuestions.map((item) => (
          <button
            key={item.q}
            type="button"
            onClick={() => onSelectPrompt(item.intent)}
            className="group p-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EEF4FB] border border-[#E2EAF4] hover:border-[#2684F7]/40 text-left transition-all duration-150 flex flex-col justify-between focus:outline-none focus:ring-1 focus:ring-[#2684F7] shadow-xs"
          >
            <div className="flex items-start justify-between gap-2 mb-2.5">
              <span className="text-xs font-semibold text-[#14213D] group-hover:text-[#2684F7] transition-colors leading-snug">
                {item.q}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#60738F] group-hover:text-[#2684F7] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#8495AE] uppercase tracking-wider">
                {item.tag}
              </span>
              <span className="text-[10px] text-[#2684F7] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                Load Prompt &rarr;
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
