import React, { useState } from 'react';
import { CheckCircle2, Clock, HelpCircle, AlertTriangle, Plus } from 'lucide-react';
import type { BuildDecisionBoardSystem, BuildDecisionQuadrant } from '../../types/project';

interface BuildDecisionBoardProps {
  decisionBoard: BuildDecisionBoardSystem;
  onMoveDecision: (decisionId: string, targetQuadrant: BuildDecisionQuadrant) => void;
  onAddDecision: (decision: {
    title: string;
    quadrant: BuildDecisionQuadrant;
    connectedFeature: string;
    assumption: string;
  }) => void;
}

export const BuildDecisionBoard: React.FC<BuildDecisionBoardProps> = ({
  decisionBoard,
  onMoveDecision,
  onAddDecision,
}) => {
  const { decisions } = decisionBoard;
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newFeature, setNewFeature] = useState('Core Experience');
  const [newAssumption, setNewAssumption] = useState('');
  const [newQuadrant, setNewQuadrant] = useState<BuildDecisionQuadrant>('OPEN_QUESTION');

  const quadrants: {
    id: BuildDecisionQuadrant;
    label: string;
    icon: React.ReactNode;
    colorClass: string;
    headerBg: string;
  }[] = [
    {
      id: 'DECIDED',
      label: 'Decided & Locked',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
      colorClass: 'text-emerald-400 border-emerald-500/30',
      headerBg: 'bg-emerald-500/10',
    },
    {
      id: 'NEEDS_REVIEW',
      label: 'Needs Review',
      icon: <Clock className="w-3.5 h-3.5 text-blue-400" />,
      colorClass: 'text-blue-400 border-blue-500/30',
      headerBg: 'bg-blue-500/10',
    },
    {
      id: 'OPEN_QUESTION',
      label: 'Open Question',
      icon: <HelpCircle className="w-3.5 h-3.5 text-amber-400" />,
      colorClass: 'text-amber-400 border-amber-500/30',
      headerBg: 'bg-amber-500/10',
    },
    {
      id: 'VALIDATION_REQUIRED',
      label: 'Validation Required',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-purple-400" />,
      colorClass: 'text-purple-400 border-purple-500/30',
      headerBg: 'bg-purple-500/10',
    },
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddDecision({
      title: newTitle.trim(),
      quadrant: newQuadrant,
      connectedFeature: newFeature.trim() || 'General Architecture',
      assumption: newAssumption.trim() || 'Assumed based on current operational understanding',
    });

    setNewTitle('');
    setNewAssumption('');
    setIsAdding(false);
  };

  return (
    <div className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 18 — Build Decision Board
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
              CERTAINTY MATRIX
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Makes uncertainty visible instead of pretending everything is settled. Click buttons to move decisions between quadrants.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Log Decision</span>
        </button>
      </div>

      {/* 4 Quadrants Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quadrants.map((quad) => {
          const items = decisions.filter((d) => d.quadrant === quad.id);

          return (
            <div
              key={quad.id}
              className="rounded-xl bg-[#111823] border border-[#263244] flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div
                  className={`p-3 border-b border-[#1C2635] flex items-center justify-between ${quad.headerBg}`}
                >
                  <div className="flex items-center gap-2">
                    {quad.icon}
                    <span className="text-xs font-mono font-bold text-[#F3F4F6] uppercase">
                      {quad.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#738095]">
                    {items.length}
                  </span>
                </div>

                <div className="p-3 space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg bg-[#0D141F] border border-[#263244] space-y-2 hover:border-[#34445A] transition-colors"
                    >
                      <div className="flex items-center justify-between text-[9px] font-mono text-[#738095]">
                        <span className="text-blue-400 truncate max-w-[120px]">
                          {item.connectedFeature}
                        </span>
                        <span>{item.provenance}</span>
                      </div>

                      <h4 className="text-xs font-semibold text-[#F3F4F6] leading-snug">
                        {item.title}
                      </h4>

                      <p className="text-[10px] text-[#AAB4C3] leading-relaxed">
                        <span className="text-[#738095]">Basis:</span> {item.assumption}
                      </p>

                      {item.resolvedAction && (
                        <p className="text-[10px] text-emerald-400 leading-relaxed font-mono">
                          Action: {item.resolvedAction}
                        </p>
                      )}

                      {/* Move Buttons */}
                      <div className="pt-2 border-t border-[#1C2635] flex items-center justify-between gap-1 text-[9px] font-mono">
                        <span className="text-[#738095]">Move:</span>
                        <div className="flex items-center gap-1">
                          {quad.id !== 'DECIDED' && (
                            <button
                              type="button"
                              onClick={() => onMoveDecision(item.id, 'DECIDED')}
                              className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                              title="Move to Decided"
                            >
                              Lock
                            </button>
                          )}
                          {quad.id !== 'NEEDS_REVIEW' && (
                            <button
                              type="button"
                              onClick={() => onMoveDecision(item.id, 'NEEDS_REVIEW')}
                              className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                              title="Move to Needs Review"
                            >
                              Review
                            </button>
                          )}
                          {quad.id !== 'VALIDATION_REQUIRED' && (
                            <button
                              type="button"
                              onClick={() => onMoveDecision(item.id, 'VALIDATION_REQUIRED')}
                              className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
                              title="Move to Validation Required"
                            >
                              Validate
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {items.length === 0 && (
                    <div className="text-center py-8 text-[#738095] text-xs font-mono">
                      No decisions in this quadrant
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Decision Modal */}
      {isAdding && (
        <form
          onSubmit={handleAddSubmit}
          className="rounded-xl bg-[#111823] border border-blue-500/50 p-5 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#1C2635] pb-2">
            <h3 className="text-xs font-mono font-bold text-[#F3F4F6]">
              Log Architectural or Scope Decision
            </h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-[#738095] hover:text-[#F3F4F6]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-[#738095] mb-1">
                DECISION SUMMARY *
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="E.g., Require 2FA on all administrative user accounts"
                required
                className="w-full rounded-lg bg-[#080B10] border border-[#263244] px-3 py-1.5 text-xs text-[#F3F4F6] focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#738095] mb-1">
                CONNECTED FEATURE / MODULE
              </label>
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Authentication, Checkout, Database..."
                className="w-full rounded-lg bg-[#080B10] border border-[#263244] px-3 py-1.5 text-xs text-[#F3F4F6] focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-[#738095] mb-1">
                UNDERLYING ASSUMPTION / REASONING
              </label>
              <input
                type="text"
                value={newAssumption}
                onChange={(e) => setNewAssumption(e.target.value)}
                placeholder="Why is this decision being proposed?"
                className="w-full rounded-lg bg-[#080B10] border border-[#263244] px-3 py-1.5 text-xs text-[#F3F4F6] focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#738095] mb-1">
                INITIAL QUADRANT
              </label>
              <select
                value={newQuadrant}
                onChange={(e) => setNewQuadrant(e.target.value as BuildDecisionQuadrant)}
                className="w-full rounded-lg bg-[#080B10] border border-[#263244] px-3 py-1.5 text-xs text-[#F3F4F6] focus:outline-none focus:border-blue-500"
              >
                <option value="DECIDED">Decided &amp; Locked</option>
                <option value="NEEDS_REVIEW">Needs Review</option>
                <option value="OPEN_QUESTION">Open Question</option>
                <option value="VALIDATION_REQUIRED">Validation Required</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-lg bg-[#151E2B] text-[#AAB4C3] text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium"
            >
              Log Decision
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
