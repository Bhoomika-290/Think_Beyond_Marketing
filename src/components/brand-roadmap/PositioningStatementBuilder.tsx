import React from 'react';
import type { PositioningStatement } from '../../types/project';

interface PositioningStatementBuilderProps {
  positioning: PositioningStatement;
  onChangeField: (field: keyof PositioningStatement, value: string) => void;
}

export const PositioningStatementBuilder: React.FC<PositioningStatementBuilderProps> = ({
  positioning,
  onChangeField,
}) => {
  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#4D8DFF]">
              STRATEGIC FORMULATION
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Positioning Statement Builder
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Geoffrey Moore's classic positioning framework, dynamically synthesized from your discovery and market inputs.
          </p>
        </div>

        <div className="text-xs font-mono text-[#64748B] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          Live Reactive Formulation
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Formula Blocks (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          {/* FOR */}
          <div className="p-3.5 rounded-xl bg-[#111823] border border-[#263244] focus-within:border-[#4D8DFF] transition-colors">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-mono font-bold uppercase text-[#4D8DFF]">
                FOR (Target Audience)
              </label>
              <span className="text-[9px] font-mono text-[#64748B]">STAGE 01</span>
            </div>
            <input
              type="text"
              value={positioning.forTarget}
              onChange={(e) => onChangeField('forTarget', e.target.value)}
              className="w-full bg-[#151E2B] px-3 py-1.5 rounded-lg border border-[#263244] text-xs font-medium text-[#F3F4F6] focus:outline-none focus:border-[#4D8DFF]"
            />
          </div>

          {/* WHO */}
          <div className="p-3.5 rounded-xl bg-[#111823] border border-[#263244] focus-within:border-[#4D8DFF] transition-colors">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-mono font-bold uppercase text-[#4D8DFF]">
                WHO (Core Problem / Job to be Done)
              </label>
              <span className="text-[9px] font-mono text-[#64748B]">STAGE 01</span>
            </div>
            <input
              type="text"
              value={positioning.whoProblem}
              onChange={(e) => onChangeField('whoProblem', e.target.value)}
              className="w-full bg-[#151E2B] px-3 py-1.5 rounded-lg border border-[#263244] text-xs font-medium text-[#F3F4F6] focus:outline-none focus:border-[#4D8DFF]"
            />
          </div>

          {/* OUR BRAND IS A */}
          <div className="p-3.5 rounded-xl bg-[#111823] border border-[#263244] focus-within:border-[#4D8DFF] transition-colors">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-mono font-bold uppercase text-[#4D8DFF]">
                OUR BRAND IS A (Category Classification)
              </label>
              <span className="text-[9px] font-mono text-[#64748B]">STAGE 02</span>
            </div>
            <input
              type="text"
              value={positioning.category}
              onChange={(e) => onChangeField('category', e.target.value)}
              className="w-full bg-[#151E2B] px-3 py-1.5 rounded-lg border border-[#263244] text-xs font-medium text-[#F3F4F6] focus:outline-none focus:border-[#4D8DFF]"
            />
          </div>

          {/* THAT */}
          <div className="p-3.5 rounded-xl bg-[#111823] border border-[#263244] focus-within:border-[#4D8DFF] transition-colors">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-mono font-bold uppercase text-[#4D8DFF]">
                THAT (Core Value Proposition & Promise)
              </label>
              <span className="text-[9px] font-mono text-[#64748B]">STAGE 02</span>
            </div>
            <input
              type="text"
              value={positioning.valuePromise}
              onChange={(e) => onChangeField('valuePromise', e.target.value)}
              className="w-full bg-[#151E2B] px-3 py-1.5 rounded-lg border border-[#263244] text-xs font-medium text-[#F3F4F6] focus:outline-none focus:border-[#4D8DFF]"
            />
          </div>

          {/* UNLIKE */}
          <div className="p-3.5 rounded-xl bg-[#111823] border border-[#263244] focus-within:border-[#4D8DFF] transition-colors">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-mono font-bold uppercase text-[#4D8DFF]">
                UNLIKE (Primary Competitive Alternative)
              </label>
              <span className="text-[9px] font-mono text-[#64748B]">STAGE 03</span>
            </div>
            <input
              type="text"
              value={positioning.unlikeAlternative}
              onChange={(e) => onChangeField('unlikeAlternative', e.target.value)}
              className="w-full bg-[#151E2B] px-3 py-1.5 rounded-lg border border-[#263244] text-xs font-medium text-[#F3F4F6] focus:outline-none focus:border-[#4D8DFF]"
            />
          </div>

          {/* BECAUSE */}
          <div className="p-3.5 rounded-xl bg-[#111823] border border-[#263244] focus-within:border-[#4D8DFF] transition-colors">
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] font-mono font-bold uppercase text-[#4D8DFF]">
                BECAUSE (Key Differentiator / Moat)
              </label>
              <span className="text-[9px] font-mono text-[#64748B]">STAGE 04</span>
            </div>
            <input
              type="text"
              value={positioning.becauseDifferentiator}
              onChange={(e) => onChangeField('becauseDifferentiator', e.target.value)}
              className="w-full bg-[#151E2B] px-3 py-1.5 rounded-lg border border-[#263244] text-xs font-medium text-[#F3F4F6] focus:outline-none focus:border-[#4D8DFF]"
            />
          </div>
        </div>

        {/* Live Synthesized Statement Preview (Right 5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#111823] via-[#151E2B] to-[#0B1017] border border-blue-500/40 shadow-xl relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#4D8DFF] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Compiled Positioning Statement
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">Canonical Pitch</span>
            </div>

            <p className="text-sm md:text-base font-serif text-[#F3F4F6] leading-relaxed italic">
              &ldquo;For <span className="text-blue-300 font-sans font-semibold not-italic underline decoration-blue-500/40">{positioning.forTarget}</span>, who{' '}
              <span className="text-cyan-300 font-sans font-semibold not-italic underline decoration-cyan-500/40">{positioning.whoProblem}</span>, our brand is a{' '}
              <span className="text-purple-300 font-sans font-semibold not-italic underline decoration-purple-500/40">{positioning.category}</span> that{' '}
              <span className="text-emerald-300 font-sans font-semibold not-italic underline decoration-emerald-500/40">{positioning.valuePromise}</span>, unlike{' '}
              <span className="text-amber-300 font-sans font-semibold not-italic underline decoration-amber-500/40">{positioning.unlikeAlternative}</span>, because{' '}
              <span className="text-[#4D8DFF] font-sans font-bold not-italic underline decoration-blue-500">{positioning.becauseDifferentiator}</span>.&rdquo;
            </p>

            <div className="mt-5 pt-4 border-t border-[#1C2636] flex items-center justify-between text-[11px] font-mono text-[#64748B]">
              <span>Persists into Brand Architecture</span>
              <span className="text-emerald-400 font-medium">✓ Active in Project State</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#111823] border border-[#263244] text-xs text-[#AAB4C3] space-y-2">
            <h4 className="font-mono text-[10px] uppercase text-[#64748B]">Positioning Validation Criteria</h4>
            <ul className="space-y-1 text-[11px]">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Focuses on a defined segment rather than generic mass appeal.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Names a specific alternative so buyers have immediate contrast.</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Anchors on an operational truth that can be proven on Day 1.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
