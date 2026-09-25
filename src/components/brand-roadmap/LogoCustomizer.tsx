import React from 'react';
import type { LogoConcept } from '../../types/project';

interface LogoCustomizerProps {
  selectedConcept: LogoConcept;
  onCustomize: (customization: Partial<LogoConcept['customization']>) => void;
}

export const LogoCustomizer: React.FC<LogoCustomizerProps> = ({
  selectedConcept,
  onCustomize,
}) => {
  const { customization } = selectedConcept;

  return (
    <div className="rounded-2xl bg-white border border-[#DDD5C5] p-5 lg:p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E1D3]">
        <div>
          <span className="text-[10px] font-mono uppercase text-[#2B3D4F] font-bold">
            PARAMETRIC VECTOR CUSTOMIZER
          </span>
          <h3 className="text-base font-bold text-[#2B3D4F]">
            Refine & Customize Selected Brand Mark
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#4A7C59] bg-[#4A7C59]/10 px-2 py-0.5 rounded border border-[#4A7C59]/20">
            Live Parametric Render
          </span>
          <span className="text-xs font-mono text-[#6B7D90]">
            Editing: {selectedConcept.name}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* 1. Layout Lockup */}
        <div className="p-3.5 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
          <label className="block text-[10px] font-mono uppercase text-[#6B7D90] mb-2 font-bold">
            Lockup Layout
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'combination', label: 'Combo' },
              { id: 'stacked', label: 'Stacked' },
              { id: 'mark_only', label: 'Mark Only' },
              { id: 'wordmark_only', label: 'Wordmark' },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => onCustomize({ layout: mode.id as LogoConcept['customization']['layout'] })}
                className={`py-1.5 px-2 rounded-lg border text-center font-mono text-[11px] transition-all ${
                  customization.layout === mode.id
                    ? 'bg-[#2B3D4F]/20 border-[#2B3D4F] text-[#2B3D4F] font-bold'
                    : 'bg-[#ECE6DA] border-[#DDD5C5] text-[#4A5E73] hover:border-[#7A8CA0]'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Color Direction (Primary & Secondary overrides) */}
        <div className="p-3.5 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
          <label className="block text-[10px] font-mono uppercase text-[#6B7D90] mb-2 font-bold">
            Mark Color Treatment
          </label>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#4A5E73]">Primary Color:</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customization.primaryColor || '#2B3D4F'}
                  onChange={(e) => onCustomize({ primaryColor: e.target.value })}
                  className="w-6 h-6 rounded cursor-pointer border border-[#DDD5C5] bg-transparent"
                />
                <span className="text-[10px] font-mono text-[#2B3D4F]">{customization.primaryColor || '#2B3D4F'}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#4A5E73]">Secondary Accent:</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customization.secondaryColor || '#5A7A96'}
                  onChange={(e) => onCustomize({ secondaryColor: e.target.value })}
                  className="w-6 h-6 rounded cursor-pointer border border-[#DDD5C5] bg-transparent"
                />
                <span className="text-[10px] font-mono text-[#2B3D4F]">{customization.secondaryColor || '#5A7A96'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Symbol Scale Slider */}
        <div className="p-3.5 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] font-mono uppercase text-[#6B7D90] font-bold">
              Symbol Scale
            </label>
            <span className="text-[10px] font-mono text-[#2B3D4F] font-bold">
              {customization.symbolScale || 100}%
            </span>
          </div>
          <input
            type="range"
            min="60"
            max="140"
            step="5"
            value={customization.symbolScale || 100}
            onChange={(e) => onCustomize({ symbolScale: parseInt(e.target.value, 10) })}
            className="w-full h-2 bg-[#ECE6DA] rounded-lg appearance-none cursor-pointer accent-[#2B3D4F]"
          />
          <div className="flex justify-between text-[9px] font-mono text-[#6B7D90] mt-2">
            <span>Compact (60%)</span>
            <span>Prominent (140%)</span>
          </div>
        </div>

        {/* 4. Font Treatment */}
        <div className="p-3.5 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
          <label className="block text-[10px] font-mono uppercase text-[#6B7D90] mb-2 font-bold">
            Wordmark Typography
          </label>
          <select
            value={customization.fontTreatment || 'Monospace Geometric'}
            onChange={(e) => onCustomize({ fontTreatment: e.target.value })}
            className="w-full p-2 bg-[#ECE6DA] border border-[#DDD5C5] rounded-lg text-xs font-mono text-[#2B3D4F] focus:outline-none focus:border-[#2B3D4F]"
          >
            <option value="Monospace Geometric">Monospace Geometric</option>
            <option value="Modern Tech Sans">Modern Tech Sans</option>
            <option value="Classic Serif">Classic Editorial Serif</option>
            <option value="Grotesque Bold">Grotesque Bold</option>
          </select>
          <div className="text-[9px] font-mono text-[#6B7D90] mt-2">
            Renders dynamically across all lockups.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-[#E8E1D3]">
        {/* Symbol Complexity */}
        <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#6B7D90] block">Symbol Complexity</span>
            <span className="text-xs font-bold text-[#2B3D4F]">Level {customization.complexity} of 5</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={customization.complexity}
            onChange={(e) => onCustomize({ complexity: parseInt(e.target.value, 10) })}
            className="w-36 h-2 bg-[#ECE6DA] rounded-lg appearance-none cursor-pointer accent-[#2B3D4F]"
          />
        </div>

        {/* Geometry Corner Softness */}
        <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#6B7D90] block">Geometry Corner Radius</span>
            <span className="text-xs font-bold text-[#2B3D4F]">{customization.geometryRadius}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="32"
            step="2"
            value={customization.geometryRadius}
            onChange={(e) => onCustomize({ geometryRadius: parseInt(e.target.value, 10) })}
            className="w-36 h-2 bg-[#ECE6DA] rounded-lg appearance-none cursor-pointer accent-[#2B3D4F]"
          />
        </div>
      </div>
    </div>
  );
};
