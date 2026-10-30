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
    <div className="bg-[#FFFFFF] border border-[#E2EAF4] rounded-xl overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-3 flex items-center justify-between gap-3 text-left hover:bg-[#151E2B] transition-colors"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#19A875]" />
          <span className="text-xs font-mono font-bold text-[#14213D] uppercase">
            Simulation Data Integrity & Grounded Assumptions ({assumptions.length})
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#EEF4FB] text-[#8495AE]">
            Zero Fabricated Claims
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#60738F]">
          <span>{isExpanded ? 'Hide' : 'Inspect'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-4 pt-2 border-t border-[#E2EAF4] bg-[#FFFFFF] space-y-2 text-xs text-[#8495AE]">
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] text-[11px] font-mono text-[#2684F7]">
            <Info className="w-4 h-4 text-[#2684F7] shrink-0 mt-0.5" />
            <span>
              All product touchpoints and software prototype workflows are dynamically synthesized from your Stage 01–06 inputs. No hardcoded demonstration ventures or fake real-world statistics are used.
            </span>
          </div>

          <ul className="space-y-1.5 pl-2">
            {assumptions.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 font-mono text-[11px]">
                <span className="text-[#2684F7] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
