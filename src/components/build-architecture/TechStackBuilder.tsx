import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { TechStackSystem } from '../../types/project';

interface TechStackBuilderProps {
  techStack: TechStackSystem;
  onUpdateTech: (itemId: string, selectedTech: string) => void;
}

export const TechStackBuilder: React.FC<TechStackBuilderProps> = ({
  techStack,
  onUpdateTech,
}) => {
  const { items, estimatedMonthlyCloudCost } = techStack;

  return (
    <div className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 06 — Technology Stack Builder
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
              {items.length} MODULES
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Grounded technology selections based on venture constraints. Switch choices to inspect cost and complexity trade-offs.
          </p>
        </div>

        <div className="rounded-xl bg-[#111823] border border-cyan-500/30 p-2.5 px-4 text-right">
          <span className="text-[10px] font-mono text-[#738095] block">STACK ARCHITECTURE</span>
          <span className="text-sm font-bold font-mono text-cyan-300">
            {estimatedMonthlyCloudCost}
          </span>
        </div>
      </div>

      {/* Tech Stack Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-[#111823] border border-[#263244] p-4 flex flex-col justify-between hover:border-[#34445A] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] font-mono uppercase text-[#738095] font-semibold truncate">
                  {item.categoryLabel}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20">
                  {item.complexity}
                </span>
              </div>

              {/* Interactive Technology Selector */}
              <div className="relative mb-2.5">
                <select
                  value={item.currentTech}
                  onChange={(e) => onUpdateTech(item.id, e.target.value)}
                  className="w-full appearance-none rounded-lg bg-[#080B10] border border-[#263244] hover:border-blue-500/50 px-3 py-2 pr-8 text-xs font-semibold text-[#F3F4F6] focus:outline-none focus:border-blue-500 cursor-pointer transition-colors"
                >
                  {item.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#738095] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <p className="text-[11px] text-[#AAB4C3] line-clamp-2 leading-relaxed mb-3">
                {item.fitRationale}
              </p>
            </div>

            <div className="pt-2.5 border-t border-[#1C2635] space-y-1 text-[10px] font-mono">
              <div className="flex items-center justify-between text-[#738095]">
                <span>Architecture Tier:</span>
                <span className="text-[#F3F4F6] truncate max-w-[120px]">{item.costTier}</span>
              </div>
              <div className="flex items-center justify-between text-[#738095]">
                <span>Lock-in Risk:</span>
                <span
                  className={
                    item.lockInRisk === 'Low'
                      ? 'text-emerald-400'
                      : item.lockInRisk === 'Medium'
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }
                >
                  {item.lockInRisk}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
