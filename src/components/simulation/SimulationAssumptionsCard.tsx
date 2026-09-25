import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface SimulationAssumptionsCardProps {
  assumptions: string[];
}

export const SimulationAssumptionsCard: React.FC<SimulationAssumptionsCardProps> = ({
  assumptions,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="bg-[#111823] border border-[#263244] rounded-xl overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-3 flex items-center justify-between gap-3 text-left hover:bg-[#151E2B] transition-colors"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span className="text-xs font-mono font-bold text-[#F3F4F6] uppercase">
            Simulation Data Integrity & Grounded Assumptions ({assumptions.length})
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1E293B] text-[#AAB4C3]">
            Zero Fabricated Claims
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#738095]">
          <span>{isExpanded ? 'Hide' : 'Inspect'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-4 pt-2 border-t border-[#263244] bg-[#0D121B] space-y-2 text-xs text-[#AAB4C3]">
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#111823] border border-[#263244] text-[11px] font-mono text-[#93C5FD]">
            <Info className="w-4 h-4 text-[#4D8DFF] shrink-0 mt-0.5" />
            <span>
              All product touchpoints and software prototype workflows are dynamically synthesized from your Stage 01–06 inputs. No hardcoded demonstration ventures or fake real-world statistics are used.
            </span>
          </div>

          <ul className="space-y-1.5 pl-2">
            {assumptions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 font-mono text-[11px]">
                <span className="text-[#4D8DFF] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
