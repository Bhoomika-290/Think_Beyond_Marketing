import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, ArrowRight, Lock } from 'lucide-react';
import type { Stage06HandoffDossier } from '../../types/project';

interface BuildHandoffProps {
  handoff: Stage06HandoffDossier;
  onMarkStageCompleted: () => void;
}

export const BuildHandoff: React.FC<BuildHandoffProps> = ({
  handoff,
  onMarkStageCompleted,
}) => {
  const navigate = useNavigate();
  const { readinessScore, isReady, checklist, summary, blockingItems } = handoff;

  const handleProceed = () => {
    onMarkStageCompleted();
    navigate('/execution');
    window.scrollTo(0, 0);
  };

  return (
    <div id="section-handoff" className="rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2EAF4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#14213D]">
              Section 20 — Stage 06 (Execution Intelligence) Handoff Dossier
            </h2>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                isReady
                  ? 'bg-[#E8F8F1] text-[#19A875] border-[#19A875]/30'
                  : 'bg-[#FFF3E7] text-amber-400 border-[#F29A42]/30'
              }`}
            >
              {isReady ? 'AUDIT VERIFIED (READY)' : 'PREREQUISITES PENDING'}
            </span>
          </div>
          <p className="text-xs text-[#8495AE] mt-1">{summary}</p>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono text-[#60738F] block">READINESS AUDIT</span>
          <span
            className={`text-xl font-bold font-mono ${
              readinessScore >= 75 ? 'text-[#19A875]' : 'text-amber-400'
            }`}
          >
            {readinessScore}%
          </span>
        </div>
      </div>

      {/* 12-point Checklist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {checklist.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 rounded-xl border flex items-start gap-2.5 transition-colors ${
              item.passed
                ? 'bg-[#FFFFFF] border-[#19A875]/30'
                : 'bg-[#FFFFFF]/60 border-[#F29A42]/30'
            }`}
          >
            {item.passed ? (
              <CheckCircle2 className="w-4 h-4 text-[#19A875] flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            )}

            <div className="min-w-0">
              <span className="text-[10px] font-mono text-[#60738F] uppercase block">
                {item.category}
              </span>
              <h4 className="text-xs font-semibold text-[#14213D] truncate">{item.label}</h4>
              <p className="text-[10px] text-[#8495AE] truncate mt-0.5">{item.details}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Blocking items if not ready */}
      {!isReady && blockingItems.length > 0 && (
        <div className="p-4 rounded-xl bg-[#FFF3E7] border border-[#F29A42]/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#F29A42]">
            <Lock className="w-4 h-4" />
            <span>PREREQUISITE BLOCKERS TO RESOLVE BEFORE STAGE 06:</span>
          </div>
          <ul className="list-disc list-inside text-xs text-amber-200/90 space-y-1">
            {blockingItems.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Transition Action Bar */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#E2EAF4]">
        <div className="text-xs text-[#60738F]">
          <span>Destination: </span>
          <span className="text-[#14213D] font-mono font-medium">
            Stage 06 — Execution Intelligence (/execution)
          </span>
        </div>

        <button
          type="button"
          disabled={!isReady}
          onClick={handleProceed}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold transition-all ${
            isReady
              ? 'bg-[#2684F7] hover:bg-[#1769D2] text-white shadow-lg shadow-blue-500/20 cursor-pointer'
              : 'bg-[#EEF4FB] text-[#60738F] border border-[#E2EAF4] cursor-not-allowed'
          }`}
        >
          <span>PROCEED TO STAGE 06: EXECUTION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
