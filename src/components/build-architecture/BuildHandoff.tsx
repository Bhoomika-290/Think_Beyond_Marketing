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
    <div id="section-handoff" className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 20 — Stage 06 (Execution Intelligence) Handoff Dossier
            </h2>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                isReady
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              {isReady ? 'AUDIT VERIFIED (READY)' : 'PREREQUISITES PENDING'}
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">{summary}</p>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono text-[#738095] block">READINESS AUDIT</span>
          <span
            className={`text-xl font-bold font-mono ${
              readinessScore >= 75 ? 'text-emerald-400' : 'text-amber-400'
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
                ? 'bg-[#111823] border-emerald-500/30'
                : 'bg-[#111823]/60 border-amber-500/30'
            }`}
          >
            {item.passed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            )}

            <div className="min-w-0">
              <span className="text-[10px] font-mono text-[#738095] uppercase block">
                {item.category}
              </span>
              <h4 className="text-xs font-semibold text-[#F3F4F6] truncate">{item.label}</h4>
              <p className="text-[10px] text-[#AAB4C3] truncate mt-0.5">{item.details}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Blocking items if not ready */}
      {!isReady && blockingItems.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-300">
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
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#1C2635]">
        <div className="text-xs text-[#738095]">
          <span>Destination: </span>
          <span className="text-[#F3F4F6] font-mono font-medium">
            Stage 06 — Execution Intelligence (/execution)
          </span>
        </div>

        <button
          type="button"
          disabled={!isReady}
          onClick={handleProceed}
          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold transition-all ${
            isReady
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 cursor-pointer'
              : 'bg-[#151E2B] text-[#738095] border border-[#263244] cursor-not-allowed'
          }`}
        >
          <span>PROCEED TO STAGE 06: EXECUTION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
