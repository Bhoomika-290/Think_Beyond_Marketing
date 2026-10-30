import React, { useState } from 'react';
import type { FeasibilityValidationTask, FeasibilityDimensionId } from '../../types/project';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import {
  CheckCircle2,
  Circle,
  Plus,
  Sparkles,
} from 'lucide-react';

interface ValidationPlanProps {
  tasks: FeasibilityValidationTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: { title: string; action: string; dimension: FeasibilityDimensionId }) => void;
}

export const ValidationPlan: React.FC<ValidationPlanProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAction, setNewAction] = useState('');
  const [newDimension, setNewDimension] = useState<FeasibilityDimensionId>('market');

  const totalTasks = tasks.length || 1;
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  // Circular progress calculations for SVG ring
  const circleRadius = 24;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const handleSubmitCustomTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAction.trim()) return;

    onAddTask({
      title: newTitle.trim(),
      action: newAction.trim(),
      dimension: newDimension,
    });

    setNewTitle('');
    setNewAction('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4">
      {/* Section Header & Progress Ring Banner */}
      <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* SVG Progress Ring */}
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 60 60">
              <circle
                cx="30"
                cy="30"
                r={circleRadius}
                fill="none"
                stroke="#E8E1D3"
                strokeWidth="5"
              />
              <circle
                cx="30"
                cy="30"
                r={circleRadius}
                fill="none"
                stroke="#19A875"
                strokeWidth="5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <span className="absolute text-xs font-mono font-bold text-[#14213D]">
              {progressPercent}%
            </span>
          </div>

          <div>
            <div className="text-xs font-mono uppercase text-[#60738F] tracking-wider font-semibold">
              Section 06 // Founder Validation Action Plan
            </div>
            <h3 className="text-sm font-bold text-[#14213D] mt-0.5">
              Empirical Validation Progress:{' '}
              <span className="text-[#19A875] font-mono">
                {completedCount} of {tasks.length} Completed
              </span>
            </h3>
            <p className="text-[11px] text-[#60738F]">
              Low-cost experiments to falsify or validate core assumptions before capital commitment.
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowAddForm((prev) => !prev)}
          icon={<Plus className="w-3.5 h-3.5" />}
        >
          {showAddForm ? 'Cancel Task' : 'Add Custom Task'}
        </Button>
      </div>

      {/* Add Custom Task Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmitCustomTask}
          className="p-4 rounded-lg bg-[#EEF4FB] border border-[#14213D]/40 space-y-3 animate-fade-in"
        >
          <div className="text-xs font-mono uppercase text-[#14213D] font-semibold flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Founder Experiment</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <Input
                label="Task Title / Hypothesis"
                placeholder="e.g. Conduct cold outreach test to 20 local roasters"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#60738F] mb-1.5">
                Dimension
              </label>
              <select
                value={newDimension}
                onChange={(e) => setNewDimension(e.target.value as FeasibilityDimensionId)}
                className="w-full rounded-md border border-[#E2EAF4] bg-[#EEF4FB] px-3 py-2 text-xs text-[#14213D] focus:border-[#14213D] focus:outline-none"
              >
                <option value="market">Market</option>
                <option value="customer">Customer</option>
                <option value="business-model">Business Model</option>
                <option value="operational">Operational</option>
                <option value="technical">Technical</option>
                <option value="financial">Financial</option>
                <option value="location">Location</option>
                <option value="competitive">Competitive</option>
                <option value="execution">Execution</option>
              </select>
            </div>
          </div>

          <div>
            <Input
              label="Concrete Action / Test Method"
              placeholder="Describe step-by-step what empirical data you will gather to validate or disprove this"
              value={newAction}
              onChange={(e) => setNewAction(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button
              size="sm"
              variant="ghost"
              type="button"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </Button>
            <Button size="sm" variant="primary" type="submit">
              Save Validation Task
            </Button>
          </div>
        </form>
      )}

      {/* Validation Tasks List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onToggleTask(task.id)}
            className={`p-3.5 rounded-lg border transition-all duration-150 cursor-pointer flex items-start gap-3 select-none ${
              task.completed
                ? 'bg-[#EEF4FB]/70 border-[#E2EAF4] opacity-80'
                : 'bg-[#FFFFFF] hover:bg-[#EEF4FB] border-[#E2EAF4] hover:border-[#E2EAF4]'
            }`}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleTask(task.id);
              }}
              className="mt-0.5 text-[#60738F] hover:text-[#14213D] transition-colors shrink-0"
              aria-label="Toggle task status"
            >
              {task.completed ? (
                <CheckCircle2 className="w-4 h-4 text-[#19A875]" />
              ) : (
                <Circle className="w-4 h-4 text-[#60738F]" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span
                  className={`text-xs font-bold leading-snug truncate ${
                    task.completed ? 'line-through text-[#60738F]' : 'text-[#14213D]'
                  }`}
                >
                  {task.title}
                </span>

                <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#EEF4FB] border border-[#E2EAF4] text-[#60738F] shrink-0">
                  {task.dimension}
                </span>
              </div>

              <p
                className={`text-[11px] leading-relaxed mb-2 ${
                  task.completed ? 'text-[#60738F]' : 'text-[#60738F]'
                }`}
              >
                {task.action}
              </p>

              <div className="text-[10px] font-mono text-[#60738F] flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#14213D]" />
                <span>Signal: </span>
                <span className="text-[#60738F] truncate">{task.expectedOutput}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
