import React, { useState } from 'react';
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
  onUpdateTransformation,
}) => {
  const [isEditingTransform, setIsEditingTransform] = useState(false);
  const [editedTransformText, setEditedTransformText] = useState(
    brandVoice.transformation.brandVoiceMessage
  );

  const selectedCount = brandVoice.attributes.filter((a) => a.selected).length;

  const handleSaveTransform = () => {
    if (editedTransformText.trim() && onUpdateTransformation) {
      onUpdateTransformation(editedTransformText.trim());
    }
    setIsEditingTransform(false);
  };

  // Voice spectrum dimensions
  const voiceSpectrums = [
    { id: 'spec_1', left: 'Formal & Academic', right: 'Direct & Conversational', value: 75 },
    { id: 'spec_2', left: 'Technical & Dense', right: 'Plainspoken & Accessible', value: 80 },
    { id: 'spec_3', left: 'Corporate & Guarded', right: 'Radically Transparent & Human', value: 85 },
  ];

  // Extra static copy transformations (the hero-pitch transformation lives in
  // the editable Sample Copy Transformation panel below, so only the two
  // additional contexts are rendered here to avoid duplication).
  const extraTransformations = [
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
    <section className="rounded-2xl bg-[#FDFCF8] border border-[#DDD5C5] p-6 lg:p-8 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1D3] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#2B3D4F] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#2B3D4F]">
              VERBAL IDENTITY &amp; VOICE ARCHITECTURE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#2B3D4F] tracking-tight">
            Brand Voice &amp; Tonal Spectrum
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5E73]">
            Calibrated tonal spectrums, toggleable voice attributes, full DOs and DON&rsquo;Ts, and live before/after copy transformations.
          </p>
        </div>

        <div className="text-xs font-mono text-[#6B7D90] bg-[#F5F1EB] px-3 py-1.5 rounded-lg border border-[#DDD5C5]">
          {selectedCount} Attributes Active
        </div>
      </div>

      {/* Voice Spectrums Visualizer */}
      <div className="p-5 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5] space-y-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7D90] block font-bold">
          TONAL SPECTRUM CALIBRATION
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {voiceSpectrums.map((spec) => (
            <div key={spec.id} className="p-3.5 rounded-xl bg-white border border-[#DDD5C5] space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#6B7D90]">{spec.left}</span>
                <span className="text-[#2B3D4F] font-bold">{spec.value}%</span>
                <span className="text-[#2B3D4F] font-semibold">{spec.right}</span>
              </div>
              <div className="relative w-full h-2 bg-[#ECE6DA] rounded-full overflow-hidden border border-[#DDD5C5]">
                <div
                  className="h-full bg-gradient-to-r from-[#2B3D4F] to-[#5A7A96] rounded-full"
                  style={{ width: `${spec.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Voice Attribute Chips & DO/DON'T Guidelines (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Selectable Voice Attributes */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B7D90] mb-2.5 font-bold">
              Voice Characteristics (Click to Toggle)
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {brandVoice.attributes.map((attr) => (
                <button
                  key={attr.id}
                  type="button"
                  onClick={() => onToggleAttribute(attr.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between group ${
                    attr.selected
                      ? 'bg-[#2B3D4F]/15 border-[#2B3D4F] text-[#2B3D4F] shadow-sm'
                      : 'bg-[#F5F1EB] border-[#DDD5C5] text-[#6B7D90] hover:text-[#4A5E73] hover:border-[#5A7A96]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-mono uppercase tracking-wide">
                      {attr.name}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${attr.selected ? 'bg-[#4A7C59]' : 'bg-[#DDD5C5]'}`} />
                  </div>
                  <p className="text-[10px] line-clamp-2 leading-tight opacity-80">
                    {attr.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* DO and DON'T Guidelines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* DO */}
            <div className="p-4 rounded-xl bg-[#F5F1EB] border border-[#4A7C59]/30">
              <span className="text-[10px] font-mono uppercase text-[#4A7C59] font-bold block mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A7C59]" />
                DO (Brand Voice Rules)
              </span>
              <ul className="space-y-1.5 text-xs text-[#4A5E73]">
                {brandVoice.doGuidelines.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#4A7C59] mt-0.5">&#10003;</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'T */}
            <div className="p-4 rounded-xl bg-[#F5F1EB] border border-[#9E4A4A]/30">
              <span className="text-[10px] font-mono uppercase text-[#9E4A4A] font-bold block mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E4A4A]" />
                DON&rsquo;T (What to Avoid)
              </span>
              <ul className="space-y-1.5 text-xs text-[#4A5E73]">
                {brandVoice.dontGuidelines.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#9E4A4A] mt-0.5">&#10007;</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Live Audio / Verbal Tone Preview & Before/After Transformation (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Live Preview Box */}
          <div className="bg-[#F5F1EB] border border-[#2B3D4F]/40 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D3] mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#2B3D4F] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4A7C59]" />
                Live Verbal Preview
              </span>
              <span className="text-[10px] font-mono text-[#6B7D90]">Synthesized Pitch</span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[9px] font-mono uppercase text-[#6B7D90] block mb-0.5">Hero Headline</span>
                <p className="text-base font-bold text-[#2B3D4F] tracking-tight leading-snug">
                  &ldquo;{brandVoice.preview.headline}&rdquo;
                </p>
              </div>

              <div>
                <span className="text-[9px] font-mono uppercase text-[#6B7D90] block mb-0.5">Elevator Proposition</span>
                <p className="text-xs text-[#4A5E73] leading-relaxed">
                  {brandVoice.preview.valueProposition}
                </p>
              </div>

              <div>
                <span className="text-[9px] font-mono uppercase text-[#6B7D90] block mb-0.5">Support Signoff</span>
                <p className="text-xs font-mono text-[#4A7C59] italic">
                  &ldquo;{brandVoice.preview.supportSignoff}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Sample Transformation: Generic -> Brand Voice (editable) */}
          <div className="p-5 rounded-2xl bg-[#F5F1EB] border border-[#DDD5C5] shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E1D3] mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#2B3D4F] font-bold">
                Sample Copy Transformation
              </span>
              <span className="text-[10px] font-mono text-[#6B7D90]">Before / After</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-[#DDD5C5]">
                <span className="text-[9px] font-mono uppercase text-[#9E4A4A] font-bold block mb-1">
                  Generic Competitor Copy
                </span>
                <p className="text-[#6B7D90] line-through italic">
                  &ldquo;{brandVoice.transformation.genericMessage}&rdquo;
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#2B3D4F]/30 border border-[#2B3D4F]/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono uppercase text-[#4A7C59] font-bold">
                    {ventureName} Brand Voice Version
                  </span>
                  {!isEditingTransform && onUpdateTransformation && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditedTransformText(brandVoice.transformation.brandVoiceMessage);
                        setIsEditingTransform(true);
                      }}
                      className="text-[10px] font-mono text-[#2B3D4F] hover:underline"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {isEditingTransform ? (
                  <div className="space-y-2 mt-1">
                    <textarea
                      rows={3}
                      value={editedTransformText}
                      onChange={(e) => setEditedTransformText(e.target.value)}
                      className="w-full p-2 bg-[#F5F1EB] border border-[#2B3D4F] rounded-lg text-xs font-medium text-[#2B3D4F] focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleSaveTransform}
                        className="px-2.5 py-1 rounded bg-[#2B3D4F] text-white text-[11px] font-mono font-semibold"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingTransform(false)}
                        className="px-2.5 py-1 rounded bg-[#E8E1D3] text-[#4A5E73] text-[11px] font-mono"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#2B3D4F] font-medium leading-relaxed">
                    &ldquo;{brandVoice.transformation.brandVoiceMessage}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Extra static copy transformations */}
          {extraTransformations.map((trans, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5] space-y-2 shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#6B7D90] block font-semibold">
                {trans.context}
              </span>

              {/* Generic Before */}
              <div className="p-2.5 rounded-lg bg-white border border-[#9E4A4A]/30 text-xs">
                <span className="text-[9px] font-mono text-[#9E4A4A] uppercase font-bold block mb-0.5">
                  GENERIC FLUFF:
                </span>
                <p className="text-[#6B7D90] italic">{trans.generic}</p>
              </div>

              {/* Brand Voice After */}
              <div className="p-2.5 rounded-lg bg-[#4A7C59]/10 border border-[#4A7C59]/30 text-xs">
                <span className="text-[9px] font-mono text-[#4A7C59] uppercase font-bold block mb-0.5">
                  {ventureName} BRAND VOICE:
                </span>
                <p className="text-[#2B3D4F] font-medium">{trans.brandVoice}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
