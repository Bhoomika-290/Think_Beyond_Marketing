import React, { useState } from 'react';
import { PieChart, AlertCircle, Edit3, Save } from 'lucide-react';
import type { MarketSizeFramework } from '../../types/project';

interface MarketSizeFrameworkViewProps {
  marketSize: MarketSizeFramework;
  onSaveValues?: (tam: string, sam: string, som: string) => void;
}

export const MarketSizeFrameworkView: React.FC<MarketSizeFrameworkViewProps> = ({
  marketSize,
  onSaveValues,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tamVal, setTamVal] = useState(marketSize.tamValue || '');
  const [samVal, setSamVal] = useState(marketSize.samValue || '');
  const [somVal, setSomVal] = useState(marketSize.somValue || '');
  const [hasSavedCustom, setHasSavedCustom] = useState(Boolean(marketSize.tamValue));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSavedCustom(Boolean(tamVal || samVal || somVal));
    setIsEditing(false);
    if (onSaveValues) {
      onSaveValues(tamVal, samVal, somVal);
    }
  };

  return (
    <div className="bg-[#0B1017] border border-[#263244] rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#263244]">
        <div>
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-[#4D8DFF]" />
            <h3 className="text-base font-semibold text-[#F3F4F6]">
              Market Sizing Framework (TAM · SAM · SOM)
            </h3>
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded border ${
                hasSavedCustom
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-700/30 text-[#AAB4C3] border-slate-600/40'
              }`}
            >
              {hasSavedCustom ? 'USER_PROVIDED' : 'NEEDS_VALIDATION'}
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Zero fabricated sizing numbers. Verified calculation requires concrete ICP account counts, ACV, and geographic reach.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#151E2B] text-xs font-mono text-[#F3F4F6] border border-[#263244] hover:bg-[#1E293B] hover:border-[#4D8DFF]/40 transition-colors self-start sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5 text-[#4D8DFF]" />
          {isEditing ? 'Cancel Edit' : hasSavedCustom ? 'Update Sizing' : 'Provide Sizing Inputs'}
        </button>
      </div>

      {/* Editing Drawer Form */}
      {isEditing && (
        <form
          onSubmit={handleSave}
          className="p-4 rounded-lg bg-[#111823] border border-[#4D8DFF]/40 space-y-3 animate-fade-in"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-[#4D8DFF]">
            <Edit3 className="w-3.5 h-3.5" />
            <span>Enter Verified / Researched Market Bounds</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-mono text-[#AAB4C3] block mb-1">
                TAM (Total Addressable Market)
              </label>
              <input
                type="text"
                placeholder="e.g. $1.2B or 450K potential accounts"
                value={tamVal}
                onChange={(e) => setTamVal(e.target.value)}
                className="w-full bg-[#151E2B] border border-[#263244] rounded px-3 py-2 text-xs text-[#F3F4F6] focus:outline-none focus:border-[#4D8DFF]"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-[#AAB4C3] block mb-1">
                SAM (Serviceable Addressable Market)
              </label>
              <input
                type="text"
                placeholder="e.g. $180M or 65K target geography"
                value={samVal}
                onChange={(e) => setSamVal(e.target.value)}
                className="w-full bg-[#151E2B] border border-[#263244] rounded px-3 py-2 text-xs text-[#F3F4F6] focus:outline-none focus:border-[#4D8DFF]"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-[#AAB4C3] block mb-1">
                SOM (Serviceable Obtainable Beachhead)
              </label>
              <input
                type="text"
                placeholder="e.g. $2.4M or 1,200 Year-1 customers"
                value={somVal}
                onChange={(e) => setSomVal(e.target.value)}
                className="w-full bg-[#151E2B] border border-[#263244] rounded px-3 py-2 text-xs text-[#F3F4F6] focus:outline-none focus:border-[#4D8DFF]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-[#4D8DFF] text-white text-xs font-medium hover:bg-[#6EA8FF]"
            >
              <Save className="w-3.5 h-3.5" />
              Save Verified Bounds
            </button>
          </div>
        </form>
      )}

      {/* Concentric / Layered Visual Bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* TAM */}
        <div className="p-4 rounded-lg bg-[#111823] border border-[#263244] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#64748B]">TOTAL ADDRESSABLE (TAM)</span>
              <span className="text-[#AAB4C3] text-[10px]">Macro Category</span>
            </div>
            <div className="text-lg font-bold text-[#F3F4F6] mt-2">
              {tamVal || 'Pending Grounding'}
            </div>
            <p className="text-xs text-[#AAB4C3] mt-1 leading-relaxed">
              {marketSize.tamDescription}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[#263244] text-[10px] font-mono text-[#64748B]">
            Status: {tamVal ? 'User Provided' : 'Requires validation'}
          </div>
        </div>

        {/* SAM */}
        <div className="p-4 rounded-lg bg-[#111823] border border-[#263244] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#4D8DFF]">SERVICEABLE ADDRESSABLE (SAM)</span>
              <span className="text-[#AAB4C3] text-[10px]">ICP / Operating Geo</span>
            </div>
            <div className="text-lg font-bold text-[#4D8DFF] mt-2">
              {samVal || 'Pending Grounding'}
            </div>
            <p className="text-xs text-[#AAB4C3] mt-1 leading-relaxed">
              {marketSize.samDescription}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[#263244] text-[10px] font-mono text-[#64748B]">
            Status: {samVal ? 'User Provided' : 'Requires validation'}
          </div>
        </div>

        {/* SOM */}
        <div className="p-4 rounded-lg bg-[#111823] border border-[#263244] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400">OBTAINABLE BEACHHEAD (SOM)</span>
              <span className="text-emerald-400/80 text-[10px]">Year 1–2 Target</span>
            </div>
            <div className="text-lg font-bold text-emerald-400 mt-2">
              {somVal || 'Pending Grounding'}
            </div>
            <p className="text-xs text-[#AAB4C3] mt-1 leading-relaxed">
              {marketSize.somDescription}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-[#263244] text-[10px] font-mono text-[#64748B]">
            Status: {somVal ? 'User Provided' : 'Requires validation'}
          </div>
        </div>
      </div>

      {/* Validation Inputs Checklist */}
      <div className="p-3.5 rounded-lg bg-[#111823] border border-amber-500/20 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Inputs Required to Lock Down Mathematically Defensible Sizing:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-[#AAB4C3]">
          {marketSize.validationInputsRequired.map((inputReq, idx) => (
            <div key={idx} className="flex items-start gap-1.5 p-2 rounded bg-[#151E2B] border border-[#263244]">
              <span className="text-[#4D8DFF] font-mono font-bold">{idx + 1}.</span>
              <span className="text-[11px] leading-tight">{inputReq}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
