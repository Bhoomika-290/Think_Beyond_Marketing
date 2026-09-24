import React from 'react';
import type { BrandVoiceSystem } from '../../types/project';

interface BrandVoiceProps {
  brandVoice: BrandVoiceSystem;
  ventureName: string;
  onToggleAttribute: (id: string) => void;
  onUpdateTransformation?: (newMessage: string) => void;
}

export const BrandVoice: React.FC<BrandVoiceProps> = ({
  brandVoice,
  ventureName,
  onToggleAttribute,
  onUpdateTransformation: _onUpdateTransformation,
}) => {
  const selectedCount = brandVoice.attributes.filter((a) => a.selected).length;

  // Voice spectrum dimensions
  const voiceSpectrums = [
    { id: 'spec_1', left: 'Formal & Academic', right: 'Direct & Conversational', value: 75 },
    { id: 'spec_2', left: 'Technical & Dense', right: 'Plainspoken & Accessible', value: 80 },
    { id: 'spec_3', left: 'Corporate & Guarded', right: 'Radically Transparent & Human', value: 85 },
  ];

  // 3 Concise Dynamic Transformations
  const copyTransformations = [
    {
      context: 'Product Headline / Hero Pitch',
      generic: `The all-in-one solution for your business management needs.`,
      brandVoice: brandVoice.transformation.brandVoiceMessage || `Surgical precision attribution for bootstrapped teams who refuse to waste ad budget.`,
    },
    {
      context: 'System Notification / Microcopy',
      generic: `Your report has been processed successfully. Please review the results.`,
      brandVoice: `Attribution computed across 42,000 events. 3 anomalies flagged for immediate review.`,
    },
    {
      context: 'Error / Friction State',
      generic: `An unexpected error occurred. Please contact customer support.`,
      brandVoice: `Webhook timed out after 3 retries. We automatically queued your payload for resend.`,
    },
  ];

  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2636] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400">
              VERBAL IDENTITY &amp; MODULATION
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Brand Voice &amp; Tonal Spectrum
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Calibrated spectrums and dynamic copy transformations preventing corporate fluff in UI and marketing copy.
          </p>
        </div>

        <div className="text-xs font-mono text-[#64748B] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          {selectedCount} Attributes Active
        </div>
      </div>

      {/* Voice Spectrums Visualizer */}
      <div className="p-5 rounded-xl bg-[#111823] border border-[#263244] space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block font-bold">
          TONAL SPECTRUM CALIBRATION
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {voiceSpectrums.map((spec) => (
            <div key={spec.id} className="p-3.5 rounded-xl bg-[#080B10] border border-[#1C2636] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#64748B]">{spec.left}</span>
                <span className="text-cyan-400 font-bold">{spec.value}%</span>
                <span className="text-[#F3F4F6] font-semibold">{spec.right}</span>
              </div>
              <div className="relative w-full h-2 bg-[#111823] rounded-full overflow-hidden border border-[#263244]">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  style={{ width: `${spec.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Selectable Attribute Chips & Guidelines (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] mb-2.5 block font-bold">
              VOICE CHARACTERISTICS (CLICK TO TOGGLE)
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {brandVoice.attributes.map((attr) => (
                <button
                  key={attr.id}
                  type="button"
                  onClick={() => onToggleAttribute(attr.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    attr.selected
                      ? 'bg-blue-600/10 border-[#4D8DFF] text-[#F3F4F6] shadow-sm ring-1 ring-[#4D8DFF]'
                      : 'bg-[#111823] border-[#263244] text-[#AAB4C3] hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold font-mono uppercase">{attr.name}</span>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[9px] ${
                        attr.selected
                          ? 'bg-[#4D8DFF] border-[#4D8DFF] text-white'
                          : 'border-[#475569]'
                      }`}
                    >
                      {attr.selected && '✓'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#738095] line-clamp-2 leading-relaxed">
                    {attr.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* DO / DON'T Guidelines */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-1.5">
                DO THIS:
              </span>
              <ul className="text-[11px] text-[#AAB4C3] space-y-1 list-disc list-inside">
                {brandVoice.doGuidelines.slice(0, 3).map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30">
              <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block mb-1.5">
                AVOID THIS:
              </span>
              <ul className="text-[11px] text-[#AAB4C3] space-y-1 list-disc list-inside">
                {brandVoice.dontGuidelines.slice(0, 3).map((g, i) => (
                  <li key={i}>{g}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: 3 Concise Dynamic Transformations (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block font-bold">
            DYNAMIC COPY TRANSFORMATIONS (GENERIC VS. BRAND VOICE)
          </span>

          {copyTransformations.map((trans, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#111823] border border-[#263244] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#738095] block font-semibold">
                {trans.context}
              </span>

              {/* Generic Before */}
              <div className="p-2.5 rounded-lg bg-[#080B10] border border-rose-500/20 text-xs">
                <span className="text-[9px] font-mono text-rose-400 uppercase font-bold block mb-0.5">
                  GENERIC FLUFF:
                </span>
                <p className="text-[#94A3B8] italic">{trans.generic}</p>
              </div>

              {/* Brand Voice After */}
              <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs">
                <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold block mb-0.5">
                  {ventureName} BRAND VOICE:
                </span>
                <p className="text-[#F3F4F6] font-medium">{trans.brandVoice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
