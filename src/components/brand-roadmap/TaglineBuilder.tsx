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
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#4D8DFF]">
              MESSAGE WORKSPACE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Tagline & Message Directions
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Deterministic copy directions synthesized from brand purpose, differentiator, and customer problem.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onRegenerateTaglines && (
            <button
              type="button"
              onClick={onRegenerateTaglines}
              className="px-3 py-1.5 rounded-lg bg-[#111823] hover:bg-[#151E2B] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244] text-xs font-mono transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Regenerate Angles</span>
            </button>
          )}
          <div className="text-xs font-mono text-[#64748B] bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
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
                  ? 'bg-[#151E2B] border-[#4D8DFF] shadow-lg shadow-blue-500/10 ring-1 ring-[#4D8DFF]'
                  : 'bg-[#111823] border-[#263244] hover:border-[#38BDF8]/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#4D8DFF] bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 font-bold">
                    {dir.angle}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-semibold">
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
                      className="w-full px-3 py-1.5 rounded-lg bg-[#080B10] border border-[#4D8DFF] text-sm font-bold text-[#F3F4F6] focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(dir.id)}
                        className="px-2.5 py-1 rounded bg-blue-600 text-white text-[11px] font-mono font-semibold"
                      >
                        Save & Select
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-2.5 py-1 rounded bg-[#1C2636] text-[#AAB4C3] text-[11px] font-mono"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <h3 className="text-base font-bold text-[#F3F4F6] my-2 tracking-tight leading-snug">
                    &ldquo;{dir.tagline}&rdquo;
                  </h3>
                )}

                <p className="text-xs text-[#AAB4C3] leading-relaxed mb-3">
                  {dir.rationale}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1C2636] flex items-center justify-between text-xs font-mono">
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => handleStartEdit(dir.id, dir.tagline)}
                    className="text-[#64748B] hover:text-[#4D8DFF] transition-colors"
                  >
                    Edit Copy
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onSelectTagline(dir.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white cursor-default shadow-md shadow-blue-500/20'
                      : 'bg-[#1C2636] hover:bg-blue-600/30 text-[#AAB4C3] hover:text-white border border-[#263244]'
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
