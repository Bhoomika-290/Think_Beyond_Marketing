import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Stage05HandoffDossier } from '../../types/project';

interface BrandHandoffProps {
  handoff: Stage05HandoffDossier;
  onMarkStageComplete: () => void;
}

export const BrandHandoff: React.FC<BrandHandoffProps> = ({
  handoff,
  onMarkStageComplete,
}) => {
  const navigate = useNavigate();

  const handleProceed = () => {
    onMarkStageComplete();
    navigate('/build');
  };

  return (
    <section className="rounded-3xl bg-gradient-to-br from-[#111823] via-[#0F172A] to-[#0B1017] border-2 border-[#263244] p-6 lg:p-10 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#263244]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#4D8DFF] bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
              STAGE 04 → STAGE 05 TRANSITION
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F3F4F6] tracking-tight">
            Build & Architecture Handoff Dossier
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3] mt-1">
            Package strategic brand assets and design tokens for technical scoping, information architecture, and UI engineering in Stage 05.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 ${
            handoff.isReady
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
          }`}>
            <span className={`w-2 h-2 rounded-full ${handoff.isReady ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span>{handoff.statusLabel}</span>
          </div>

          <button
            type="button"
            onClick={handleProceed}
            disabled={!handoff.isReady}
            className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
              handoff.isReady
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/30'
                : 'bg-[#1C2636] text-[#64748B] border border-[#263244] cursor-not-allowed'
            }`}
          >
            <span>Proceed to Stage 05</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Decisions Delivered to Stage 05 */}
      <div className="mt-6">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] block mb-3">
          Synthesized Assets Transferred to Build Stage:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-[#080B10] border border-[#263244]">
            <span className="text-[9px] text-[#64748B] uppercase block">Positioning</span>
            <span className="text-xs text-[#F3F4F6] font-semibold mt-0.5 block truncate" title={handoff.decisionsTransferred.positioning}>
              {handoff.decisionsTransferred.positioning}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#080B10] border border-[#263244]">
            <span className="text-[9px] text-[#64748B] uppercase block">Differentiator</span>
            <span className="text-xs text-[#F3F4F6] font-semibold mt-0.5 block truncate" title={handoff.decisionsTransferred.differentiator}>
              {handoff.decisionsTransferred.differentiator}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#080B10] border border-[#263244]">
            <span className="text-[9px] text-[#64748B] uppercase block">Selected Mark</span>
            <span className="text-xs text-blue-300 font-semibold mt-0.5 block truncate">
              {handoff.decisionsTransferred.logoDirection}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#080B10] border border-[#263244]">
            <span className="text-[9px] text-[#64748B] uppercase block">Color Swatches</span>
            <span className="text-xs text-emerald-300 font-semibold mt-0.5 block">
              {handoff.decisionsTransferred.colors}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#080B10] border border-[#263244]">
            <span className="text-[9px] text-[#64748B] uppercase block">Typography</span>
            <span className="text-xs text-[#F3F4F6] font-semibold mt-0.5 block truncate">
              {handoff.decisionsTransferred.typography}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#080B10] border border-[#263244]">
            <span className="text-[9px] text-[#64748B] uppercase block">Brand Personality</span>
            <span className="text-xs text-[#F3F4F6] font-semibold mt-0.5 block truncate">
              {handoff.decisionsTransferred.brandPersonality}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#080B10] border border-[#263244]">
            <span className="text-[9px] text-[#64748B] uppercase block">Voice Attributes</span>
            <span className="text-xs text-[#F3F4F6] font-semibold mt-0.5 block truncate">
              {handoff.decisionsTransferred.voice}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#080B10] border border-[#263244]">
            <span className="text-[9px] text-[#64748B] uppercase block">Tagline</span>
            <span className="text-xs text-cyan-300 font-semibold mt-0.5 block truncate">
              &ldquo;Crafted Without Compromise.&rdquo;
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#080B10] border border-[#263244]">
            <span className="text-[9px] text-[#64748B] uppercase block">Customer Experience</span>
            <span className="text-xs text-[#F3F4F6] font-semibold mt-0.5 block truncate">
              {handoff.decisionsTransferred.customerExperienceDirection}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#080B10] border border-[#263244]">
            <span className="text-[9px] text-amber-400 uppercase block font-semibold">Open Decisions</span>
            <span className="text-xs text-amber-200 mt-0.5 block truncate" title={handoff.decisionsTransferred.openDecisions}>
              {handoff.decisionsTransferred.openDecisions || 'None pending'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
