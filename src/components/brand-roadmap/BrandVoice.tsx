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

  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#4D8DFF]">
              VERBAL IDENTITY & VOICE ARCHITECTURE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Brand Voice & Message Modulation
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Toggle tonal attributes, audit DOs and DON&rsquo;Ts, and compare before/after copy transformations.
          </p>
        </div>

        <div className="text-xs font-mono text-[#64748B] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          {selectedCount} Attributes Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Voice Attribute Chips & DO/DON'T Guidelines (Left 7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Selectable Voice Attributes */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] mb-2.5">
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
                      ? 'bg-blue-600/15 border-[#4D8DFF] text-[#F3F4F6] shadow-sm shadow-blue-500/10'
                      : 'bg-[#111823] border-[#263244] text-[#64748B] hover:text-[#AAB4C3] hover:border-[#38BDF8]/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold font-mono uppercase tracking-wide">
                      {attr.name}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${attr.selected ? 'bg-emerald-400' : 'bg-[#263244]'}`} />
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
            <div className="p-4 rounded-xl bg-[#111823] border border-emerald-500/30">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                DO (Brand Voice Rules)
              </span>
              <ul className="space-y-1.5 text-xs text-[#AAB4C3]">
                {brandVoice.doGuidelines.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'T */}
            <div className="p-4 rounded-xl bg-[#111823] border border-rose-500/30">
              <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                DON&rsquo;T (What to Avoid)
              </span>
              <ul className="space-y-1.5 text-xs text-[#AAB4C3]">
                {brandVoice.dontGuidelines.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-400 mt-0.5">✗</span>
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
          <div className="bg-gradient-to-br from-[#111823] via-[#151E2B] to-[#0B1017] border border-blue-500/40 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C2636] mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#4D8DFF] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Live Verbal Preview
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">Synthesized Pitch</span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[9px] font-mono uppercase text-[#64748B] block mb-0.5">Hero Headline</span>
                <p className="text-base font-bold text-[#F3F4F6] tracking-tight leading-snug">
                  &ldquo;{brandVoice.preview.headline}&rdquo;
                </p>
              </div>

              <div>
                <span className="text-[9px] font-mono uppercase text-[#64748B] block mb-0.5">Elevator Proposition</span>
                <p className="text-xs text-[#AAB4C3] leading-relaxed">
                  {brandVoice.preview.valueProposition}
                </p>
              </div>

              <div>
                <span className="text-[9px] font-mono uppercase text-[#64748B] block mb-0.5">Support Signoff</span>
                <p className="text-xs font-mono text-emerald-400 italic">
                  &ldquo;{brandVoice.preview.supportSignoff}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Sample Transformation: Generic -> Brand Voice */}
          <div className="p-5 rounded-2xl bg-[#111823] border border-[#263244] shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-[#1C2636] mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#4D8DFF] font-bold">
                Sample Copy Transformation
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">Before / After</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#080B10] border border-[#263244]">
                <span className="text-[9px] font-mono uppercase text-rose-400 font-bold block mb-1">
                  Generic Competitor Copy
                </span>
                <p className="text-[#64748B] line-through italic">
                  &ldquo;{brandVoice.transformation.genericMessage}&rdquo;
                </p>
              </div>

              <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/40">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono uppercase text-emerald-400 font-bold">
                    {ventureName} Brand Voice Version
                  </span>
                  {!isEditingTransform && onUpdateTransformation && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditedTransformText(brandVoice.transformation.brandVoiceMessage);
                        setIsEditingTransform(true);
                      }}
                      className="text-[10px] font-mono text-[#4D8DFF] hover:underline"
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
                      className="w-full p-2 bg-[#080B10] border border-[#4D8DFF] rounded-lg text-xs font-medium text-white focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleSaveTransform}
                        className="px-2.5 py-1 rounded bg-blue-600 text-white text-[11px] font-mono font-semibold"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingTransform(false)}
                        className="px-2.5 py-1 rounded bg-[#1C2636] text-[#AAB4C3] text-[11px] font-mono"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#F3F4F6] font-medium leading-relaxed">
                    &ldquo;{brandVoice.transformation.brandVoiceMessage}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
