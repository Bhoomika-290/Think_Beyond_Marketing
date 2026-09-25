import React from 'react';
import { ArrowDown, Sparkles, Copy, Check } from 'lucide-react';
import type { PositioningStatement } from '../../types/project';

interface PositioningStatementBuilderProps {
  positioning: PositioningStatement;
  onChangeField: (field: keyof PositioningStatement, value: string) => void;
}

export const PositioningStatementBuilder: React.FC<PositioningStatementBuilderProps> = ({
  positioning,
  onChangeField,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [highlightedField, setHighlightedField] = React.useState<string | null>(null);

  const getPreviewHighlight = (fieldKey: string) => {
    if (!highlightedField) return '';
    if (highlightedField === fieldKey) return ' ring-1 ring-cyan-300 bg-cyan-400/20 rounded px-0.5';
    return ' opacity-40';
  };

  const fullPitch =
    positioning.fullStatement ||
    `For ${positioning.forTarget || '[target]'} who ${positioning.whoProblem || '[problem]'}, our venture is a ${positioning.category || '[category]'} that ${positioning.valuePromise || '[promise]'}, unlike ${positioning.unlikeAlternative || '[alternatives]'}, because ${positioning.becauseDifferentiator || '[reason]'}.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      key: 'forTarget' as const,
      label: 'FOR',
      subtitle: 'Target Audience / Customer Segment',
      value: positioning.forTarget,
      stage: 'Stage 01 Idea Lab',
      color: 'border-blue-500/30 text-blue-400',
    },
    {
      key: 'whoProblem' as const,
      label: 'WHO',
      subtitle: 'Have This Acute Problem / Dilemma',
      value: positioning.whoProblem,
      stage: 'Stage 01 / Stage 02 Friction',
      color: 'border-rose-500/30 text-rose-400',
    },
    {
      key: 'category' as const,
      label: 'OUR VENTURE IS A',
      subtitle: 'Market Category Reference Point',
      value: positioning.category,
      stage: 'Stage 03 Positioning',
      color: 'border-purple-500/30 text-purple-400',
    },
    {
      key: 'valuePromise' as const,
      label: 'THAT DELIVERS',
      subtitle: 'Primary Benefit & Value Promise',
      value: positioning.valuePromise,
      stage: 'Stage 04 Brand Promise',
      color: 'border-cyan-500/30 text-cyan-400',
    },
    {
      key: 'unlikeAlternative' as const,
      label: 'UNLIKE',
      subtitle: 'Incumbent Flawed Alternatives',
      value: positioning.unlikeAlternative,
      stage: 'Stage 03 Competitors',
      color: 'border-amber-500/30 text-amber-400',
    },
    {
      key: 'becauseDifferentiator' as const,
      label: 'BECAUSE (OUR PROOF)',
      subtitle: 'Defensible Technical / Brand Moat',
      value: positioning.becauseDifferentiator,
      stage: 'Stage 04 Differentiator',
      color: 'border-emerald-500/30 text-emerald-400',
    },
  ];

  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2636] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400">
              STRATEGIC POSITIONING ENGINE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Visual Positioning Architecture (Moore Formula)
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Step-by-step causal chain transforming validated customer dilemma into an unmistakable market pitch.
          </p>
        </div>

        <div className="text-xs font-mono text-[#64748B] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          Live Cross-Stage Reactive
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 6-Step Visual Step Chain (7 cols) */}
        <div className="lg:col-span-7 space-y-2">
          {steps.map((step, idx) => (
            <React.Fragment key={step.key}>
              <div
                onMouseEnter={() => setHighlightedField(step.key)}
                onMouseLeave={() => setHighlightedField(null)}
                className="p-3.5 rounded-xl bg-[#111823] border border-[#263244] focus-within:border-cyan-500 transition-all hover:border-[#38BDF8]/40 shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-[#0B1017] border border-[#263244] text-[#F3F4F6]">
                      {step.label}
                    </span>
                    <span className="text-[11px] text-[#738095] font-mono hidden sm:inline">
                      {step.subtitle}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-[#64748B] uppercase">
                    {step.stage}
                  </span>
                </div>

                <input
                  type="text"
                  value={step.value}
                  onChange={(e) => onChangeField(step.key, e.target.value)}
                  onFocus={() => setHighlightedField(step.key)}
                  onBlur={() => setHighlightedField(null)}
                  placeholder={`Define ${step.subtitle}...`}
                  className="w-full bg-[#080B10] px-3 py-2 rounded-lg border border-[#263244] text-xs font-medium text-[#F3F4F6] focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              {idx < steps.length - 1 && (
                <div className="flex justify-center -my-1 text-[#334155]">
                  <ArrowDown className="w-3.5 h-3.5 text-[#3E4C5F]" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Right: Compiled Statement & Reasoning Chain (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/40 via-[#111823] to-[#0D141F] border border-blue-500/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F3F4F6]">
                  COMPILED POSITIONING STATEMENT
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-cyan-300 border border-blue-500/30 text-[10px] font-mono flex items-center gap-1 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Color-coded live preview (ported from light port, recolored dark-readable) */}
            <p className="text-xs sm:text-sm font-medium leading-relaxed italic bg-[#080B10]/80 p-4 rounded-xl border border-[#263244] text-[#F3F4F6]">
              &ldquo;For <span className={`text-blue-300 font-semibold not-italic underline decoration-blue-300/40 transition-all${getPreviewHighlight('forTarget')}`}>{positioning.forTarget || '[target]'}</span>, who{' '}
              <span className={`text-rose-300 font-semibold not-italic underline decoration-rose-300/40 transition-all${getPreviewHighlight('whoProblem')}`}>{positioning.whoProblem || '[problem]'}</span>, our venture is a{' '}
              <span className={`text-purple-300 font-semibold not-italic underline decoration-purple-300/40 transition-all${getPreviewHighlight('category')}`}>{positioning.category || '[category]'}</span> that{' '}
              <span className={`text-cyan-300 font-semibold not-italic underline decoration-cyan-300/40 transition-all${getPreviewHighlight('valuePromise')}`}>{positioning.valuePromise || '[promise]'}</span>, unlike{' '}
              <span className={`text-amber-300 font-semibold not-italic underline decoration-amber-300/40 transition-all${getPreviewHighlight('unlikeAlternative')}`}>{positioning.unlikeAlternative || '[alternatives]'}</span>, because{' '}
              <span className={`text-emerald-300 font-bold not-italic underline decoration-emerald-300 transition-all${getPreviewHighlight('becauseDifferentiator')}`}>{positioning.becauseDifferentiator || '[reason]'}</span>.&rdquo;
            </p>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B]">
              <span>Persists into Brand Architecture</span>
              <span className="text-emerald-400 font-medium">✓ Active in Project State</span>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#1C2636]">
              <span className="text-[10px] font-mono uppercase text-[#738095] block font-semibold">
                WHY THIS FORMULA WINS
              </span>
              <ul className="text-[11px] text-[#AAB4C3] space-y-1.5 list-disc list-inside leading-snug">
                <li><strong className="text-[#F3F4F6]">Anchors into existing category:</strong> Lowers buyer cognitive load.</li>
                <li><strong className="text-[#F3F4F6]">Highlights the wedge:</strong> Contrasts against flawed legacy status-quo.</li>
                <li><strong className="text-[#F3F4F6]">Grounds in proof:</strong> Backed by your Stage 04 verified differentiator.</li>
              </ul>
            </div>

            {/* Positioning validation checklist (ported from light port, re-themed dark) */}
            <div className="space-y-2 pt-3 border-t border-[#1C2636]">
              <span className="text-[10px] font-mono uppercase text-[#738095] block font-semibold">
                POSITIONING VALIDATION CHECKLIST
              </span>
              <ul className="space-y-1.5 text-[11px] text-[#AAB4C3]">
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
      </div>
    </section>
  );
};
