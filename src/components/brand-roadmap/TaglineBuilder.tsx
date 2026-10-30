import React, { useState } from 'react';
import type { TaglineWorkspace } from '../../types/project';

interface TaglineBuilderProps {
  workspace: TaglineWorkspace;
  onSelectTagline: (id: string, customText?: string) => void;
  onRegenerateTaglines?: () => void;
}

export const TaglineBuilder: React.FC<TaglineBuilderProps> = ({
  workspace,
  onSelectTagline,
  onRegenerateTaglines,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');

  const handleStartEdit = (id: string, currentText: string) => {
    setEditingId(id);
    setEditedText(currentText);
  };

  const handleSaveEdit = (id: string) => {
    if (editedText.trim()) {
      onSelectTagline(id, editedText.trim());
    }
    setEditingId(null);
  };

  return (
    <section className="rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#14213D] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#14213D]">
              MESSAGE WORKSPACE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#14213D] tracking-tight">
            Tagline & Message Directions
          </h2>
          <p className="text-xs sm:text-sm text-[#60738F]">
            Deterministic copy directions synthesized from brand purpose, differentiator, and customer problem.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onRegenerateTaglines && (
            <button
              type="button"
              onClick={onRegenerateTaglines}
              className="px-3 py-1.5 rounded-lg bg-[#EEF4FB] hover:bg-[#EEF4FB] text-[#60738F] hover:text-[#14213D] border border-[#E2EAF4] text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Regenerate Angles</span>
            </button>
          )}
          <div className="text-xs font-mono text-[#60738F] bg-[#EEF4FB] px-3 py-1.5 rounded-lg border border-[#E2EAF4]">
            Active: &ldquo;{workspace.activeTagline}&rdquo;
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workspace.directions.map((dir) => {
          const isSelected = dir.tagline === workspace.activeTagline || dir.isSelected;
          const isEditing = editingId === dir.id;

          return (
            <div
              key={dir.id}
              className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#EEF4FB] border-[#14213D] shadow-sm ring-1 ring-[#14213D]'
                  : 'bg-[#EEF4FB] border-[#E2EAF4] hover:border-[#2684F7]/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#14213D] bg-[#14213D]/10 px-2 py-0.5 rounded border border-[#14213D]/20 font-bold">
                    {dir.angle}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-mono text-[#19A875] bg-[#E8F8F1] px-2 py-0.5 rounded border border-[#19A875]/30 font-semibold">
                      ★ Active
                    </span>
                  )}
                </div>

                {isEditing ? (
                  <div className="my-2 space-y-2">
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#EEF4FB] border border-[#14213D] text-sm font-bold text-[#14213D] focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(dir.id)}
                        className="px-2.5 py-1 rounded bg-[#14213D] text-white text-[11px] font-mono font-semibold"
                      >
                        Save & Select
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-2.5 py-1 rounded bg-[#E8E1D3] text-[#60738F] text-[11px] font-mono"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <h3 className="text-base font-bold text-[#14213D] my-2 tracking-tight leading-snug">
                    &ldquo;{dir.tagline}&rdquo;
                  </h3>
                )}

                <p className="text-xs text-[#60738F] leading-relaxed mb-3">
                  {dir.rationale}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E1D3] flex items-center justify-between text-xs font-mono">
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => handleStartEdit(dir.id, dir.tagline)}
                    className="text-[#60738F] hover:text-[#14213D] transition-colors"
                  >
                    Edit Copy
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onSelectTagline(dir.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-[#14213D] text-white cursor-default shadow-sm'
                      : 'bg-[#E8E1D3] hover:bg-[#14213D] text-[#60738F] hover:text-[#EEF4FB] border border-[#E2EAF4]'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Adopt Tagline'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
