import React, { useState } from 'react';
import { CheckSquare, Square, Plus, ChevronDown, ChevronRight, User } from 'lucide-react';
import type { BuildRoadmapSystem } from '../../types/project';

interface BuildRoadmapBoardProps {
  roadmap: BuildRoadmapSystem;
  onToggleTask: (taskId: string) => void;
  onAddCustomTask: (task: {
    phaseId: string;
    title: string;
    rationale: string;
    priority: 'High' | 'Medium' | 'Low';
    roleOwner: string;
  }) => void;
}

export const BuildRoadmapBoard: React.FC<BuildRoadmapBoardProps> = ({
  roadmap,
  onToggleTask,
  onAddCustomTask,
}) => {
  const { phases, totalTasksCount, completedTasksCount } = roadmap;
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    phase_1: true,
    phase_2: true,
    phase_3: true,
    phase_4: false,
    phase_5: false,
    phase_6: false,
  });

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedPhaseId, setSelectedPhaseId] = useState('phase_2');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskRationale, setNewTaskRationale] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'High' | 'Medium' | 'Low'>('High');
  const [newTaskOwner, setNewTaskOwner] = useState('Full-Stack Engineer');

  const togglePhase = (id: string) => {
    setExpandedPhases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    onAddCustomTask({
      phaseId: selectedPhaseId,
      title: newTaskTitle.trim(),
      rationale: newTaskRationale.trim() || 'Custom sprint task added by founder',
      priority: newTaskPriority,
      roleOwner: newTaskOwner,
    });

    setNewTaskTitle('');
    setNewTaskRationale('');
    setIsAddingTask(false);
  };

  const progressPercent =
    totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <div id="section-roadmap" className="rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2EAF4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#14213D]">
              Section 16 — Build Implementation Roadmap (6 Phases)
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#E8F2FF] text-[#2684F7] border border-[#2684F7]/30">
              {completedTasksCount} OF {totalTasksCount} COMPLETED ({progressPercent}%)
            </span>
          </div>
          <p className="text-xs text-[#8495AE] mt-1">
            Sequential task milestones from initial repository scaffolding to post-launch optimization. Check tasks to update velocity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddingTask(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2684F7] hover:bg-[#1769D2] text-white text-xs font-mono font-medium transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Task</span>
        </button>
      </div>

      {/* Progress meter bar */}
      <div className="w-full bg-[#FFFFFF] h-2 rounded-full overflow-hidden border border-[#E2EAF4]">
        <div
          className="bg-blue-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 6 Phases Accordion List */}
      <div className="space-y-4">
        {phases.map((phase) => {
          const isExpanded = expandedPhases[phase.id] !== false;
          const completedInPhase = phase.tasks.filter((t) => t.status === 'DONE').length;

          return (
            <div
              key={phase.id}
              className="rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] overflow-hidden"
            >
              {/* Phase Header */}
              <button
                type="button"
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center justify-between p-4 bg-[#131C29] hover:bg-[#162130] transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-[#60738F]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#60738F]" />
                  )}
                  <div>
                    <span className="text-[10px] font-mono text-[#2684F7] font-bold block">
                      PHASE 0{phase.phaseNumber}
                    </span>
                    <h3 className="text-xs font-bold text-[#14213D]">{phase.name}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#60738F]">
                    {completedInPhase} / {phase.tasks.length} tasks
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      completedInPhase === phase.tasks.length && phase.tasks.length > 0
                        ? 'bg-[#E8F8F1] text-[#19A875] border border-[#19A875]/30'
                        : 'bg-[#FFFFFF] text-[#8495AE] border border-[#E2EAF4]'
                    }`}
                  >
                    {completedInPhase === phase.tasks.length && phase.tasks.length > 0
                      ? 'COMPLETE'
                      : `${Math.round((completedInPhase / (phase.tasks.length || 1)) * 100)}%`}
                  </span>
                </div>
              </button>

              {/* Tasks List */}
              {isExpanded && (
                <div className="p-3 divide-y divide-[#1C2635] space-y-1">
                  <p className="text-[11px] text-[#8495AE] px-2 py-1 mb-2 font-mono">
                    Objective: {phase.objective}
                  </p>

                  {phase.tasks.map((task) => {
                    const isDone = task.status === 'DONE';

                    return (
                      <div
                        key={task.id}
                        className={`p-3 rounded-lg flex items-start justify-between gap-3 transition-colors ${
                          isDone ? 'bg-[#FFFFFF]/60 opacity-75' : 'hover:bg-[#151E2B]'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <button
                            type="button"
                            onClick={() => onToggleTask(task.id)}
                            className="mt-0.5 text-[#2684F7] hover:text-blue-300 transition-colors flex-shrink-0"
                            title={isDone ? 'Mark task as incomplete' : 'Mark task as complete'}
                          >
                            {isDone ? (
                              <CheckSquare className="w-4 h-4 text-[#19A875]" />
                            ) : (
                              <Square className="w-4 h-4 text-[#60738F]" />
                            )}
                          </button>

                          <div>
                            <span
                              className={`text-xs font-semibold block ${
                                isDone ? 'line-through text-[#60738F]' : 'text-[#14213D]'
                              }`}
                            >
                              {task.title}
                            </span>
                            <span className="text-[10px] text-[#8495AE] block mt-0.5">
                              {task.rationale}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 text-[10px] font-mono">
                          <span className="flex items-center gap-1 text-[#60738F] bg-[#FFFFFF] px-2 py-0.5 rounded border border-[#E2EAF4]">
                            <User className="w-3 h-3 text-[#2684F7]" />
                            <span className="truncate max-w-[100px]">{task.roleOwner}</span>
                          </span>

                          <span
                            className={`px-2 py-0.5 rounded font-bold uppercase ${
                              task.priority === 'High'
                                ? 'bg-[#FFF3E7] text-amber-400 border border-amber-500/20'
                                : 'bg-[#1A2332] text-[#8495AE]'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Custom Task Modal Form */}
      {isAddingTask && (
        <form
          onSubmit={handleCreateTask}
          className="rounded-xl bg-[#FFFFFF] border border-blue-500/50 p-5 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#E2EAF4] pb-2">
            <h3 className="text-xs font-mono font-bold text-[#14213D]">
              Add Task to Implementation Roadmap
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingTask(false)}
              className="text-xs text-[#60738F] hover:text-[#14213D]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-[#60738F] mb-1">
                TARGET PHASE *
              </label>
              <select
                value={selectedPhaseId}
                onChange={(e) => setSelectedPhaseId(e.target.value)}
                className="w-full rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] px-3 py-1.5 text-xs text-[#14213D] focus:outline-none focus:border-blue-500"
              >
                {phases.map((p) => (
                  <option key={p.id} value={p.id}>
                    Phase 0{p.phaseNumber}: {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#60738F] mb-1">
                ROLE OWNER
              </label>
              <input
                type="text"
                value={newTaskOwner}
                onChange={(e) => setNewTaskOwner(e.target.value)}
                placeholder="Full-Stack Engineer, Technical Architect..."
                className="w-full rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] px-3 py-1.5 text-xs text-[#14213D] focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#60738F] mb-1">
                PRIORITY
              </label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as 'High' | 'Medium' | 'Low')}
                className="w-full rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] px-3 py-1.5 text-xs text-[#14213D] focus:outline-none focus:border-blue-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-[#60738F] mb-1">
              TASK TITLE *
            </label>
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="E.g., Configure staging environment secrets on Vercel"
              required
              className="w-full rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] px-3 py-1.5 text-xs text-[#14213D] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-[#60738F] mb-1">
              RATIONALE / BENEFIT
            </label>
            <input
              type="text"
              value={newTaskRationale}
              onChange={(e) => setNewTaskRationale(e.target.value)}
              placeholder="Why must this be completed before deployment?"
              className="w-full rounded-lg bg-[#FFFFFF] border border-[#E2EAF4] px-3 py-1.5 text-xs text-[#14213D] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingTask(false)}
              className="px-3 py-1.5 rounded-lg bg-[#151E2B] text-[#8495AE] text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#2684F7] hover:bg-[#1769D2] text-white text-xs font-mono font-medium"
            >
              Add Task to Roadmap
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
