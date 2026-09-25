import React, { useState } from 'react';
import { 
  Palette, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Sliders, 
  RotateCcw,
  Sun,
  Moon,
  Shield,
  Layers
} from 'lucide-react';
import type { 
  SimulationAppearance, 
  SimulationTheme, 
  SimulationStyle, 
  SimulationAccent, 
  SimulationSurface 
} from '../../types/simulation';

interface SimulationAppearanceControlsProps {
  appearance: SimulationAppearance;
  onChange: (updated: SimulationAppearance) => void;
  onReset: () => void;
}

export const SimulationAppearanceControls: React.FC<SimulationAppearanceControlsProps> = ({
  appearance,
  onChange,
  onReset,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const themes: { id: SimulationTheme; label: string; icon: React.ReactNode }[] = [
    { id: 'light', label: 'Light Studio (Default)', icon: <Sun className="w-3 h-3 text-[#F59E0B]" /> },
    { id: 'dark', label: 'Dark Studio', icon: <Moon className="w-3 h-3 text-[#38BDF8]" /> },
    { id: 'neutral', label: 'Neutral Slate', icon: <Shield className="w-3 h-3 text-[#94A3B8]" /> },
    { id: 'brand', label: 'Auto / Brand', icon: <Sparkles className="w-3 h-3 text-[#10B981]" /> },
  ];

  const styles: { id: SimulationStyle; label: string }[] = [
    { id: 'minimal', label: 'Minimal' },
    { id: 'editorial', label: 'Editorial' },
    { id: 'technical', label: 'Technical' },
    { id: 'premium', label: 'Premium' },
    { id: 'industrial', label: 'Industrial' },
    { id: 'playful', label: 'Playful' },
  ];

  const accents: { id: SimulationAccent; label: string; color: string }[] = [
    { id: 'blue', label: 'Cobalt', color: '#4D8DFF' },
    { id: 'green', label: 'Emerald', color: '#10B981' },
    { id: 'orange', label: 'Amber', color: '#F59E0B' },
    { id: 'purple', label: 'Violet', color: '#8B5CF6' },
  ];

  const surfaces: { id: SimulationSurface; label: string }[] = [
    { id: 'flat', label: 'Flat' },
    { id: 'soft', label: 'Soft' },
    { id: 'glass', label: 'Glass' },
    { id: 'material', label: 'Material' },
  ];

  return (
    <div className="bg-[#111823] border border-[#263244] rounded-xl overflow-hidden shadow-sm">
      <div className="px-4 py-2.5 flex items-center justify-between gap-3 bg-[#0D121B] border-b border-[#263244]">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#4D8DFF]" />
          <span className="text-xs font-mono font-bold text-[#F3F4F6] uppercase">
            Simulation Appearance & Lighting
          </span>
          <span className="text-[10px] font-mono text-[#738095] hidden sm:inline">
            (Applies only to simulation canvas)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Active Summary Pills */}
          <div className="hidden md:flex items-center gap-1.5 text-[10px] font-mono">
            <span className="px-2 py-0.5 rounded bg-[#1A2536] text-[#F3F4F6] border border-[#263244] capitalize">
              {appearance.theme}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1A2536] text-[#F3F4F6] border border-[#263244] capitalize">
              {appearance.style}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1A2536] text-[#F3F4F6] border border-[#263244] capitalize">
              {appearance.surface}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2.5 py-1 rounded text-xs font-mono text-[#AAB4C3] hover:text-white hover:bg-[#1A2536] border border-[#263244] transition-colors flex items-center gap-1"
          >
            <Sliders className="w-3 h-3 text-[#738095]" />
            <span>{isExpanded ? 'Collapse' : 'Customize Style'}</span>
            {isExpanded ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-[#111823] text-xs font-mono animate-fadeIn">
          {/* 1. Theme Selector */}
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase text-[#738095] font-bold flex items-center gap-1">
              <Sun className="w-3 h-3" />
              <span>Canvas Atmosphere</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onChange({ ...appearance, theme: t.id })}
                  className={`px-2 py-1.5 rounded-lg border text-left flex items-center gap-1.5 transition-colors ${
                    appearance.theme === t.id
                      ? 'bg-[#4D8DFF] text-[#080B10] font-bold border-[#4D8DFF]'
                      : 'bg-[#0D121B] text-[#AAB4C3] hover:text-white border-[#263244]'
                  }`}
                >
                  {t.icon}
                  <span className="truncate">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Visual Style */}
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase text-[#738095] font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Aesthetic Style</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {styles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onChange({ ...appearance, style: s.id })}
                  className={`px-2 py-1.5 rounded-lg border text-center transition-colors ${
                    appearance.style === s.id
                      ? 'bg-[#4D8DFF] text-[#080B10] font-bold border-[#4D8DFF]'
                      : 'bg-[#0D121B] text-[#AAB4C3] hover:text-white border-[#263244]'
                  }`}
                >
                  <span className="truncate">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Accent Color */}
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase text-[#738095] font-bold flex items-center gap-1">
              <Palette className="w-3 h-3" />
              <span>Accent Glow</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {accents.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => onChange({ ...appearance, accent: a.id })}
                  className={`px-2 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                    appearance.accent === a.id
                      ? 'bg-[#1A2536] text-white font-bold border-[#4D8DFF]'
                      : 'bg-[#0D121B] text-[#AAB4C3] hover:text-white border-[#263244]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: a.color }} />
                  <span className="truncate">{a.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Surface Treatment */}
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase text-[#738095] font-bold flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Layers className="w-3 h-3" />
                <span>Surface Feel</span>
              </div>
              <button
                type="button"
                onClick={onReset}
                className="text-[10px] text-[#738095] hover:text-[#AAB4C3] flex items-center gap-1"
                title="Reset simulation appearance to defaults"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {surfaces.map((sf) => (
                <button
                  key={sf.id}
                  type="button"
                  onClick={() => onChange({ ...appearance, surface: sf.id })}
                  className={`px-2 py-1.5 rounded-lg border text-center transition-colors ${
                    appearance.surface === sf.id
                      ? 'bg-[#4D8DFF] text-[#080B10] font-bold border-[#4D8DFF]'
                      : 'bg-[#0D121B] text-[#AAB4C3] hover:text-white border-[#263244]'
                  }`}
                >
                  <span className="truncate">{sf.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
