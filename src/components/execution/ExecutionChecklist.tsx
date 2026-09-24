import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Plus, 
  Clock, 
  Tag 
} from 'lucide-react';

import type { ExecutionReport } from '../../types/project';

interface ExecutionChecklistProps {
  report: ExecutionReport;
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: { title: string; assignedCategory: string; dueDateLabel: string }) => void;
}

export const ExecutionChecklist: React.FC<ExecutionChecklistProps> = ({
  report,
  onToggleTask,
  onAddTask,
}) => {
  const { synthesis } = report;
  const tasks = synthesis.checklist;

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Procurement');
  const [newDueDate, setNewDueDate] = useState('Day 14');

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const totalCount = tasks.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Group tasks by phaseNumber
  const phases = [1, 2, 3, 4];

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      title: newTitle.trim(),
      assignedCategory: newCategory,
      dueDateLabel: newDueDate,
    });

    setNewTitle('');
    setIsAdding(false);
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E5DFD5] rounded-xl p-5 shadow-xs space-y-5">
      {/* Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]"></span>
            <h2 className="text-base font-bold text-[#1E293B] tracking-tight">
              60-Day Tactical Execution Roadmap
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]">
              {completedCount} / {totalCount} Completed
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Grounded operational milestones required to bring this venture from drawing board to first customer delivery.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1E40AF] hover:bg-[#1D4ED8] text-white transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Action Item</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-lg p-3">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-mono text-[11px] text-[#475569] font-medium">
            Execution Readiness Progress
          </span>
          <span className="font-mono font-bold text-[#1E40AF]">{progressPct}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#E5DFD5] overflow-hidden">
          <div
            className="h-full bg-[#1E40AF] rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Add Task Form (collapsible) */}
      {isAdding && (
        <form
          onSubmit={handleCreateTask}
          className="p-4 rounded-xl bg-[#FAF8F5] border border-[#BFDBFE] space-y-3 animate-fade-in text-xs"
        >
          <div className="font-bold text-[#1E293B]">Add Custom Founder Action</div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono uppercase text-[#64748B] mb-1">
                Action Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Schedule factory visit in Sitapura Industrial Area"
                className="w-full px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E5DFD5] text-[#1E293B] focus:outline-hidden focus:border-[#1E40AF]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#64748B] mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E5DFD5] text-[#1E293B] focus:outline-hidden focus:border-[#1E40AF]"
              >
                <option value="Procurement">Procurement</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Packaging & QA">Packaging & QA</option>
                <option value="Logistics">Logistics</option>
                <option value="Distribution">Distribution</option>
                <option value="Marketing">Marketing</option>
                <option value="Compliance">Compliance</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-[#64748B] mb-1">
                Target Due Date
              </label>
              <input
                type="text"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                placeholder="e.g. Day 10"
                className="w-full px-3 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#E5DFD5] text-[#1E293B] focus:outline-hidden focus:border-[#1E40AF]"
              />
            </div>
          </div>


          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#64748B] hover:text-[#1E293B] hover:bg-[#EAE4D9] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="px-3 py-1.5 rounded-lg bg-[#1E40AF] text-white text-xs font-medium hover:bg-[#1D4ED8] disabled:opacity-40 transition-colors shadow-xs"
            >
              Save Milestone
            </button>
          </div>
        </form>
      )}

      {/* Phased Checklist Accordion / List */}
      <div className="space-y-4">
        {phases.map((phaseNum) => {
          const phaseTasks = tasks.filter((t) => t.phaseNumber === phaseNum);
          if (phaseTasks.length === 0) return null;

          const phaseLabels: Record<number, string> = {
            1: 'Phase 1: Days 1–15 // Supply Chain Foundation & Legal Primitives',
            2: 'Phase 2: Days 16–30 // Sample Run & Specification Clearance',
            3: 'Phase 3: Days 31–45 // Packaging, Compliance & QA Sign-off',
            4: 'Phase 4: Days 46–60 // Warehousing, Logistics & Launch Stocking',
          };

          return (
            <div key={phaseNum} className="border border-[#E5DFD5] rounded-xl overflow-hidden bg-[#FAF8F5]">
              <div className="px-4 py-2.5 bg-[#F4EFE6] border-b border-[#E8E2D8] flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-[#334155] uppercase tracking-wide">
                  {phaseLabels[phaseNum] || `Phase ${phaseNum}`}
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">
                  {phaseTasks.filter((t) => t.isCompleted).length} / {phaseTasks.length} done
                </span>
              </div>

              <div className="divide-y divide-[#E8E2D8] bg-[#FFFFFF]">
                {phaseTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => onToggleTask(task.id)}
                    className="p-3 flex items-start gap-3 hover:bg-[#FAF8F5] cursor-pointer transition-colors group"
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-[#1E40AF] shrink-0"
                      aria-label={task.isCompleted ? 'Mark task as incomplete' : 'Mark task as complete'}
                    >
                      {task.isCompleted ? (
                        <CheckSquare className="w-4 h-4 text-[#065F46]" />
                      ) : (
                        <Square className="w-4 h-4 text-[#94A3B8] group-hover:text-[#1E40AF]" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs font-semibold ${
                            task.isCompleted
                              ? 'line-through text-[#94A3B8]'
                              : 'text-[#1E293B]'
                          }`}
                        >
                          {task.title}
                        </span>
                        {task.isCustom && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]">
                            CUSTOM
                          </span>
                        )}
                      </div>

                      <p
                        className={`text-[11px] mt-0.5 leading-snug ${
                          task.isCompleted ? 'line-through text-[#94A3B8]' : 'text-[#64748B]'
                        }`}
                      >
                        {task.description}
                      </p>

                      <div className="mt-1.5 flex items-center gap-2 text-[10px] font-mono text-[#64748B]">
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3 text-[#94A3B8]" />
                          {task.assignedCategory}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-[#1E40AF] font-medium">
                          <Clock className="w-3 h-3" />
                          {task.dueDateLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
