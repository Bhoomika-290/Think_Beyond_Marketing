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
    <section className="rounded-3xl bg-[#FDFCF8] border border-[#2B3D4F]/25 p-6 lg:p-10 shadow-sm relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#DDD5C5]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2B3D4F] bg-[#2B3D4F]/10 px-2.5 py-0.5 rounded border border-[#2B3D4F]/20">
              STAGE 04 → STAGE 05 TRANSITION
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2B3D4F] tracking-tight">
            Build & Architecture Handoff Dossier
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5E73] mt-1">
            Package strategic brand assets and design tokens for technical scoping, information architecture, and UI engineering in Stage 05.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 ${
            handoff.isReady
              ? 'bg-[#4A7C59]/10 border-[#4A7C59]/40 text-[#4A7C59]'
              : 'bg-[#8A6D2B]/10 border-[#8A6D2B]/40 text-[#8A6D2B]'
          }`}>
            <span className={`w-2 h-2 rounded-full ${handoff.isReady ? 'bg-[#4A7C59]' : 'bg-[#8A6D2B]'}`} />
            <span>{handoff.statusLabel}</span>
          </div>

          <button
            type="button"
            onClick={handleProceed}
            disabled={!handoff.isReady}
            className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              handoff.isReady
                ? 'bg-[#2B3D4F] hover:bg-[#2B3D4F] text-white shadow-sm'
                : 'bg-[#E8E1D3] text-[#6B7D90] border border-[#DDD5C5] cursor-not-allowed'
            }`}
          >
            <span>Proceed to Stage 05</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Decisions Delivered to Stage 05 */}
      <div className="mt-6">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B7D90] block mb-3">
          Synthesized Assets Transferred to Build Stage:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
            <span className="text-[9px] text-[#6B7D90] uppercase block">Positioning</span>
            <span className="text-xs text-[#2B3D4F] font-semibold mt-0.5 block truncate" title={handoff.decisionsTransferred.positioning}>
              {handoff.decisionsTransferred.positioning}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
            <span className="text-[9px] text-[#6B7D90] uppercase block">Differentiator</span>
            <span className="text-xs text-[#2B3D4F] font-semibold mt-0.5 block truncate" title={handoff.decisionsTransferred.differentiator}>
              {handoff.decisionsTransferred.differentiator}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
            <span className="text-[9px] text-[#6B7D90] uppercase block">Selected Mark</span>
            <span className="text-xs text-[#2B3D4F] font-semibold mt-0.5 block truncate">
              {handoff.decisionsTransferred.logoDirection}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
            <span className="text-[9px] text-[#6B7D90] uppercase block">Color Swatches</span>
            <span className="text-xs text-[#4A7C59] font-semibold mt-0.5 block">
              {handoff.decisionsTransferred.colors}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
            <span className="text-[9px] text-[#6B7D90] uppercase block">Typography</span>
            <span className="text-xs text-[#2B3D4F] font-semibold mt-0.5 block truncate">
              {handoff.decisionsTransferred.typography}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
            <span className="text-[9px] text-[#6B7D90] uppercase block">Brand Personality</span>
            <span className="text-xs text-[#2B3D4F] font-semibold mt-0.5 block truncate">
              {handoff.decisionsTransferred.brandPersonality}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
            <span className="text-[9px] text-[#6B7D90] uppercase block">Voice Attributes</span>
            <span className="text-xs text-[#2B3D4F] font-semibold mt-0.5 block truncate">
              {handoff.decisionsTransferred.voice}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
            <span className="text-[9px] text-[#6B7D90] uppercase block">Tagline</span>
            <span className="text-xs text-[#5A7A96] font-semibold mt-0.5 block truncate">
              &ldquo;Crafted Without Compromise.&rdquo;
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
            <span className="text-[9px] text-[#6B7D90] uppercase block">Customer Experience</span>
            <span className="text-xs text-[#2B3D4F] font-semibold mt-0.5 block truncate">
              {handoff.decisionsTransferred.customerExperienceDirection}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F1EB] border border-[#DDD5C5]">
            <span className="text-[9px] text-[#8A6D2B] uppercase block font-semibold">Open Decisions</span>
            <span className="text-xs text-[#8A6D2B] mt-0.5 block truncate" title={handoff.decisionsTransferred.openDecisions}>
              {handoff.decisionsTransferred.openDecisions || 'None pending'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
