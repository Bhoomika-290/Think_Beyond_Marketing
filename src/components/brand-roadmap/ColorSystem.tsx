import React, { useState } from 'react';
import type { ColorPaletteSystem } from '../../types/project';

interface ColorSystemProps {
  colorSystem: ColorPaletteSystem;
  onUpdateSwatch: (swatchId: string, hex: string) => void;
}

export const ColorSystem: React.FC<ColorSystemProps> = ({
  colorSystem,
  onUpdateSwatch,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <section className="rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#14213D] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#14213D]">
              CHROMATIC IDENTITY
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#14213D] tracking-tight">
            Color System & Semantic Swatches
          </h2>
          <p className="text-xs sm:text-sm text-[#60738F]">
            {colorSystem.paletteRationale} Click a color swatch to copy HEX or adjust the tone.
          </p>
        </div>

        <div className="text-xs font-mono text-[#60738F] bg-[#EEF4FB] px-3 py-1.5 rounded-lg border border-[#E2EAF4]">
          Contrast Compliant (WCAG AA)
        </div>
      </div>

      {/* Horizontal Continuous Color Strip Preview */}
      <div className="mb-6 rounded-2xl overflow-hidden h-14 flex shadow-xl border border-[#E2EAF4]">
        {colorSystem.swatches.map((swatch) => (
          <div
            key={swatch.id}
            className="flex-1 h-full relative group transition-all cursor-pointer flex items-center justify-center"
            style={{ backgroundColor: swatch.hex }}
            onClick={() => handleCopy(swatch.hex)}
            title={`${swatch.role}: ${swatch.hex}`}
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
              {swatch.hex}
            </span>
          </div>
        ))}
      </div>

      {/* Individual Swatch Detail Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {colorSystem.swatches.map((swatch) => {
          return (
            <div
              key={swatch.id}
              className="rounded-xl bg-[#EEF4FB] border border-[#E2EAF4] p-4 flex flex-col justify-between hover:border-[#2684F7]/40 transition-all group"
            >
              <div>
                {/* Visual Swatch Block with Color Picker */}
                <div
                  className="w-full aspect-[4/3] rounded-lg mb-3 shadow-inner relative flex items-end p-2 border border-white/10 overflow-hidden cursor-pointer"
                  style={{ backgroundColor: swatch.hex }}
                >
                  <input
                    type="color"
                    value={swatch.hex}
                    onChange={(e) => onUpdateSwatch(swatch.id, e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    title="Click to customize color"
                  />
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/70 text-white backdrop-blur-sm pointer-events-none">
                    Edit
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#14213D] font-bold">
                    {swatch.role}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(swatch.hex)}
                    className="text-[10px] font-mono text-[#60738F] hover:text-[#14213D] transition-colors"
                  >
                    {copiedHex === swatch.hex ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <h3 className="text-xs font-bold text-[#14213D]">
                  {swatch.name}
                </h3>
              </div>

              <div className="mt-3 pt-3 border-t border-[#E8E1D3] space-y-1 text-[10px] font-mono text-[#60738F]">
                <div className="flex justify-between">
                  <span>HEX:</span>
                  <span className="text-[#14213D] font-bold">{swatch.hex}</span>
                </div>
                <div className="flex justify-between">
                  <span>RGB:</span>
                  <span className="text-[#60738F]">{swatch.rgb}</span>
                </div>
                {swatch.contrastScore && (
                  <div className="flex justify-between text-[#19A875] font-semibold">
                    <span>Contrast:</span>
                    <span>{swatch.contrastScore}</span>
                  </div>
                )}
                <div className="text-[9px] text-[#60738F] italic truncate pt-1" title={swatch.psychology}>
                  {swatch.psychology}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
