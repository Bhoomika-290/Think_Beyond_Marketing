import React, { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { TechStackSystem } from '../../types/project';

interface TechStackBuilderProps {
  techStack: TechStackSystem;
  onUpdateTech: (itemId: string, selectedTech: string) => void;
}

const TECH_CATEGORIES: { id: string; label: string; icon: string }[] = [
  { id: 'all', label: 'ALL INFRASTRUCTURE', icon: '◆' },
  { id: 'frontend', label: 'Frontend', icon: '◆' },
  { id: 'backend', label: 'Backend', icon: '◆' },
  { id: 'database', label: 'Database', icon: '◆' },
  { id: 'auth', label: 'Authentication', icon: '◆' },
  { id: 'payments', label: 'Payments', icon: '◆' },
  { id: 'hosting', label: 'Hosting & Infra', icon: '◆' },
  { id: 'analytics', label: 'Analytics', icon: '◆' },
  { id: 'ai', label: 'AI / Intelligence', icon: '◆' },
  { id: 'security', label: 'Security', icon: '◆' },
  { id: 'storage', label: 'Storage', icon: '◆' },
  { id: 'search', label: 'Search', icon: '◆' },
];

export const TechStackBuilder: React.FC<TechStackBuilderProps> = ({
  techStack,
  onUpdateTech,
}) => {
  const { items, estimatedMonthlyCloudCost } = techStack;
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return items;
    return items.filter((item) => item.category === activeFilter);
  }, [items, activeFilter]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [items]);

  return (
    <div className="rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2EAF4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#14213D]">
              Section 06 — Technology Stack Builder
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#E8F2FF] text-[#2684F7] border border-[#2684F7]/30">
              {items.length} MODULES
            </span>
          </div>
          <p className="text-xs text-[#8495AE] mt-1">
            Grounded technology selections based on venture constraints. Switch choices to inspect cost and complexity trade-offs.
          </p>
        </div>

        <div className="rounded-xl bg-[#FFFFFF] border border-cyan-500/30 p-2.5 px-4 text-right">
          <span className="text-[10px] font-mono text-[#60738F] block">STACK ARCHITECTURE</span>
          <span className="text-sm font-bold font-mono text-cyan-300">
            {estimatedMonthlyCloudCost}
          </span>
        </div>
       </div>

      {/* Category Filter Bar */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="inline-flex items-center gap-1.5 px-1 py-1">
          {TECH_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.id] ?? (cat.id === 'all' ? items.length : 0);
            if (cat.id !== 'all' && count === 0) return null;
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#2684F7] text-white font-bold shadow-xs'
                    : 'bg-[#EEF4FB] text-[#60738F] hover:text-[#14213D] hover:bg-[#E8F2FF] border border-[#E2EAF4]'
                }`}
                title={cat.label}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
                <span className="ml-1 opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tech Stack Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] p-4 flex flex-col justify-between hover:border-[#2684F7]/60 transition-all shadow-md group"
          >
            <div className="space-y-3">
              {/* Category & Status Bar */}
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-mono uppercase text-[#2684F7] font-bold tracking-wider truncate">
                  {item.categoryLabel}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-[#2684F7] bg-[#E8F2FF] border border-blue-500/20">
                    {item.complexity} Complexity
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono text-[#19A875] bg-[#E8F8F1] border border-emerald-500/20">
                    {item.validationStatus || 'DERIVED'}
                  </span>
                </div>
              </div>

              {/* Interactive Technology Selector */}
              <div>
                <label className="text-[10px] font-mono text-[#60738F] uppercase tracking-wider block mb-1">
                  Selected Component:
                </label>
                <div className="relative">
                  <select
                    value={item.currentTech}
                    onChange={(e) => onUpdateTech(item.id, e.target.value)}
                    className="w-full appearance-none rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] hover:border-blue-500/50 px-3 py-2 pr-8 text-xs font-semibold text-[#14213D] focus:outline-none focus:border-blue-500 cursor-pointer transition-colors"
                  >
                    {item.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#60738F] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Decision System Breakdown */}
              <div className="space-y-2 text-xs">
                {item.whyExists && (
                  <div className="bg-[#EEF4FB] p-2.5 rounded-lg border border-[#E2EAF4]">
                    <span className="text-[9px] font-mono uppercase font-bold text-[#8495AE] block mb-0.5">
                      WHY THIS EXISTS
                    </span>
                    <p className="text-[11px] text-[#14213D] leading-relaxed">
                      {item.whyExists}
                    </p>
                  </div>
                )}

                {item.whatItDoes && (
                  <div className="bg-[#EEF4FB] p-2.5 rounded-lg border border-[#E2EAF4]">
                    <span className="text-[9px] font-mono uppercase font-bold text-[#8495AE] block mb-0.5">
                      WHAT IT DOES
                    </span>
                    <p className="text-[11px] text-[#14213D] leading-relaxed">
                      {item.whatItDoes}
                    </p>
                  </div>
                )}

                <div className="bg-[#EEF4FB] p-2.5 rounded-lg border border-[#E2EAF4]">
                  <span className="text-[9px] font-mono uppercase font-bold text-[#2684F7] block mb-0.5">
                    WHY IT FITS THIS VENTURE
                  </span>
                  <p className="text-[11px] text-[#14213D] leading-relaxed">
                    {item.whyFitsVenture || item.fitRationale}
                  </p>
                </div>

                {item.dependencies && item.dependencies.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[9px] font-mono uppercase text-[#60738F]">Dependencies:</span>
                    {item.dependencies.map((dep, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#EEF4FB] text-[#8495AE] border border-[#E2EAF4]"
                      >
                        {dep}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Specifications */}
            <div className="pt-3 mt-3 border-t border-[#E2EAF4] space-y-1.5 text-[10px] font-mono">
              <div className="flex items-center justify-between text-[#60738F]">
                <span>Cost / Pricing:</span>
                <span className="text-[#14213D] truncate max-w-[150px] font-medium">{item.costTier}</span>
              </div>
              <div className="flex items-center justify-between text-[#60738F]">
                <span>Pricing Source:</span>
                <span className="text-[#8495AE] truncate max-w-[150px]">{item.costSource || 'Vendor Public API Tier'}</span>
              </div>
              <div className="flex items-center justify-between text-[#60738F]">
                <span>Lock-in Risk:</span>
                <span
                  className={
                    item.lockInRisk === 'Low'
                      ? 'text-[#19A875]'
                      : item.lockInRisk === 'Medium'
                      ? 'text-amber-400'
                      : 'text-rose-400'
                  }
                >
                  {item.lockInRisk} Risk
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && activeFilter !== 'all' && (
        <div className="text-center py-10 text-xs text-[#8495AE]">
          No infrastructure components in this category for the current venture.
        </div>
      )}
    </div>
  );
};
