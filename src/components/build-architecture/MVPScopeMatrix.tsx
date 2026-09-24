import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { MVPScopeSystem, MVPFeatureItem, MVPFeaturePriority } from '../../types/project';

interface MVPScopeMatrixProps {
  mvpScope: MVPScopeSystem;
  onUpdatePriority: (featureId: string, priority: MVPFeaturePriority) => void;
  onUpdateFeature?: (featureId: string, patch: Partial<MVPFeatureItem>) => void;
  onAddCustomFeature: (feature: Omit<MVPFeatureItem, 'id' | 'provenance'>) => void;
}

export const MVPScopeMatrix: React.FC<MVPScopeMatrixProps> = ({
  mvpScope,
  onUpdatePriority,
  onUpdateFeature: _onUpdateFeature,
  onAddCustomFeature,
}) => {
  const { features, matrixSummary } = mvpScope;
  const [selectedFeature, setSelectedFeature] = useState<MVPFeatureItem | null>(null);
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [activeTierFilter, setActiveTierFilter] = useState<'all' | MVPFeaturePriority>('all');

  // New feature form state
  const [newTitle, setNewTitle] = useState('');
  const [newProblem, setNewProblem] = useState('');
  const [newCategory, setNewCategory] = useState('Core Experience');
  const [newValue, setNewValue] = useState(8);
  const [newComplexity, setNewComplexity] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [newPriority, setNewPriority] = useState<MVPFeaturePriority>('must');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddCustomFeature({
      name: newTitle.trim(),
      category: newCategory,
      userProblem: newProblem.trim() || 'Custom user dilemma defined by founder',
      customerValue: newValue,
      technicalComplexity: newComplexity,
      complexityScore: newComplexity === 'Low' ? 3 : newComplexity === 'Medium' ? 6 : 8,
      priority: newPriority,
      reason: 'Founder customized feature added to scope',
      dependencies: ['Application Foundation'],
      originatingStage: '05 Build Architecture (Custom)',
      validationStatus: 'USER_PROVIDED',
    });

    setNewTitle('');
    setNewProblem('');
    setIsAddingFeature(false);
  };

  const filteredFeatures =
    activeTierFilter === 'all'
      ? features
      : features.filter((f) => f.priority === activeTierFilter);

  const getPriorityBadgeClass = (priority: MVPFeaturePriority) => {
    switch (priority) {
      case 'must':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'should':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'could':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'not_now':
        return 'bg-[#263244] text-[#AAB4C3] border-[#34445A]';
    }
  };

  return (
    <div className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 03 — MVP Scope Prioritization Matrix (MoSCoW)
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              INTERACTIVE SCOPE
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Prioritize essential Day-1 capabilities versus later enhancements. Moving features updates your execution roadmap.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddingFeature(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Feature</span>
        </button>
      </div>

      {/* 2D Prioritization Matrix Canvas: Value vs Complexity */}
      <div className="rounded-xl bg-[#111823] border border-[#263244] p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-[#F3F4F6]">
              2D VALUE VS. COMPLEXITY MATRIX
            </span>
            <span className="text-[11px] font-mono text-[#738095]">
              (High Value + Low-Med Complexity = MVP Sweetspot)
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            {matrixSummary.mustCount} Must-Have Features (~{matrixSummary.mvpEffortWeeks} wks)
          </span>
        </div>

        {/* Matrix Visualization Grid */}
        <div className="relative border border-[#263244] rounded-xl bg-[#080B10] p-4 h-72 sm:h-80 flex flex-col justify-between overflow-hidden">
          {/* Background quadrant guidelines */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
            <div className="border-r border-b border-[#1C2635] p-2">
              <span className="text-[9px] font-mono text-emerald-400/50 uppercase tracking-widest">
                QUADRANT I: SWEET SPOT (MUST BUILD)
              </span>
            </div>
            <div className="border-b border-[#1C2635] p-2 text-right">
              <span className="text-[9px] font-mono text-blue-400/50 uppercase tracking-widest">
                QUADRANT II: STRATEGIC INVESTMENTS
              </span>
            </div>
            <div className="border-r border-[#1C2635] p-2 flex items-end">
              <span className="text-[9px] font-mono text-purple-400/50 uppercase tracking-widest">
                QUADRANT III: LOW-HANGING FRUIT
              </span>
            </div>
            <div className="p-2 flex items-end justify-end text-right">
              <span className="text-[9px] font-mono text-[#738095]/40 uppercase tracking-widest">
                QUADRANT IV: DE-PRIORITIZE (LATER)
              </span>
            </div>
          </div>

          {/* Scatter Points for each feature */}
          <div className="relative w-full h-full">
            {features.map((feature) => {
              // X: Complexity (0-10 mapped to 5%-92%)
              const leftPct = Math.min(92, Math.max(8, feature.complexityScore * 9.5));
              // Y: Value (0-10 mapped from bottom to top, 8%-90%)
              const bottomPct = Math.min(90, Math.max(8, feature.customerValue * 9.2));

              const isSelected = selectedFeature?.id === feature.id;

              return (
                <div
                  key={feature.id}
                  style={{ left: `${leftPct}%`, bottom: `${bottomPct}%` }}
                  onClick={() => setSelectedFeature(feature)}
                  className="absolute -translate-x-1/2 translate-y-1/2 cursor-pointer group"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border transition-all duration-200 ${
                      feature.priority === 'must'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-500/20'
                        : feature.priority === 'should'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500'
                        : feature.priority === 'could'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500'
                        : 'bg-[#151E2B] text-[#AAB4C3] border-[#34445A]'
                    } ${isSelected ? 'scale-125 ring-2 ring-white z-20' : 'hover:scale-115'}`}
                  >
                    {feature.priority === 'must'
                      ? 'M'
                      : feature.priority === 'should'
                      ? 'S'
                      : feature.priority === 'could'
                      ? 'C'
                      : 'N'}
                  </div>

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:block z-30 w-48 p-2 rounded-lg bg-[#0D141F] border border-[#263244] shadow-xl text-left pointer-events-none">
                    <p className="text-[10px] font-bold text-[#F3F4F6] truncate">{feature.name}</p>
                    <p className="text-[9px] text-[#AAB4C3] mt-0.5">
                      Val: {feature.customerValue}/10 • Cplx: {feature.technicalComplexity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Axes labels */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#738095] pt-2 border-t border-[#1C2635] z-10">
            <span>← LOW COMPLEXITY</span>
            <span>TECHNICAL EFFORT &amp; COMPLEXITY</span>
            <span>HIGH COMPLEXITY →</span>
          </div>
        </div>
      </div>

      {/* MoSCoW Tier Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTierFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
              activeTierFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-[#111823] text-[#AAB4C3] border border-[#263244]'
            }`}
          >
            All Features ({features.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTierFilter('must')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
              activeTierFilter === 'must'
                ? 'bg-emerald-600 text-white'
                : 'bg-[#111823] text-emerald-400 border border-emerald-500/30'
            }`}
          >
            Must Have ({matrixSummary.mustCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTierFilter('should')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
              activeTierFilter === 'should'
                ? 'bg-blue-600 text-white'
                : 'bg-[#111823] text-blue-400 border border-blue-500/30'
            }`}
          >
            Should Have ({matrixSummary.shouldCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTierFilter('could')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
              activeTierFilter === 'could'
                ? 'bg-purple-600 text-white'
                : 'bg-[#111823] text-purple-400 border border-purple-500/30'
            }`}
          >
            Could Have ({matrixSummary.couldCount})
          </button>
          <button
            type="button"
            onClick={() => setActiveTierFilter('not_now')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
              activeTierFilter === 'not_now'
                ? 'bg-slate-600 text-white'
                : 'bg-[#111823] text-[#AAB4C3] border border-[#263244]'
            }`}
          >
            Not Now ({matrixSummary.notNowCount})
          </button>
        </div>

        <span className="text-[11px] font-mono text-[#738095]">
          Select feature below to reassign MoSCoW priority
        </span>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredFeatures.map((feature) => {
          const isSelected = selectedFeature?.id === feature.id;

          return (
            <div
              key={feature.id}
              className={`rounded-xl border p-4 transition-all duration-200 ${
                isSelected
                  ? 'bg-[#151E2B] border-blue-500 ring-1 ring-blue-500'
                  : 'bg-[#111823] border-[#263244] hover:border-[#34445A]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#F3F4F6] leading-snug">
                  {feature.name}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase border ${getPriorityBadgeClass(
                    feature.priority
                  )}`}
                >
                  {feature.priority.replace('_', ' ')}
                </span>
              </div>

              <p className="text-xs text-[#AAB4C3] leading-relaxed mb-3">
                {feature.userProblem}
              </p>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-[#1C2635] text-[10px] font-mono text-[#738095] mb-3">
                <div>
                  <span className="block text-[#738095]">VALUE</span>
                  <span className="text-[#F3F4F6] font-bold">{feature.customerValue}/10</span>
                </div>
                <div>
                  <span className="block text-[#738095]">COMPLEXITY</span>
                  <span className="text-[#F3F4F6] font-bold">{feature.technicalComplexity}</span>
                </div>
                <div>
                  <span className="block text-[#738095]">CATEGORY</span>
                  <span className="text-blue-400 truncate block">{feature.category}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-[#738095] truncate">
                  Dep: {feature.dependencies.join(', ')}
                </span>

                {/* Priority Selector Pill Dropdown */}
                <div className="flex items-center gap-1">
                  {(['must', 'should', 'could', 'not_now'] as MVPFeaturePriority[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => onUpdatePriority(feature.id, p)}
                      title={`Move to ${p.replace('_', ' ')}`}
                      className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase transition-colors ${
                        feature.priority === p
                          ? 'bg-blue-600 text-white'
                          : 'bg-[#151E2B] text-[#738095] hover:text-[#F3F4F6] border border-[#263244]'
                      }`}
                    >
                      {p === 'must' ? 'M' : p === 'should' ? 'S' : p === 'could' ? 'C' : 'N'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Feature Modal Form */}
      {isAddingFeature && (
        <form
          onSubmit={handleAddSubmit}
          className="rounded-xl bg-[#111823] border border-blue-500/50 p-5 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#1C2635] pb-2">
            <h3 className="text-xs font-mono font-bold text-[#F3F4F6]">
              Add Custom Venture Feature
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingFeature(false)}
              className="text-xs text-[#738095] hover:text-[#F3F4F6]"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-[#738095] mb-1">
                FEATURE TITLE *
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="E.g., Automated Return Portal"
                required
                className="w-full rounded-lg bg-[#080B10] border border-[#263244] px-3 py-1.5 text-xs text-[#F3F4F6] focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#738095] mb-1">
                CATEGORY
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Core Experience, Retention, Ops..."
                className="w-full rounded-lg bg-[#080B10] border border-[#263244] px-3 py-1.5 text-xs text-[#F3F4F6] focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-[#738095] mb-1">
              USER PROBLEM SOLVED
            </label>
            <input
              type="text"
              value={newProblem}
              onChange={(e) => setNewProblem(e.target.value)}
              placeholder="What friction or obstacle does this remove for the customer?"
              className="w-full rounded-lg bg-[#080B10] border border-[#263244] px-3 py-1.5 text-xs text-[#F3F4F6] focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-[#738095] mb-1">
                CUSTOMER VALUE (1-10)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={newValue}
                onChange={(e) => setNewValue(Number(e.target.value))}
                className="w-full rounded-lg bg-[#080B10] border border-[#263244] px-3 py-1.5 text-xs text-[#F3F4F6] focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#738095] mb-1">
                COMPLEXITY
              </label>
              <select
                value={newComplexity}
                onChange={(e) => setNewComplexity(e.target.value as 'Low' | 'Medium' | 'High')}
                className="w-full rounded-lg bg-[#080B10] border border-[#263244] px-3 py-1.5 text-xs text-[#F3F4F6] focus:outline-none focus:border-blue-500"
              >
                <option value="Low">Low (1-2 days)</option>
                <option value="Medium">Medium (3-5 days)</option>
                <option value="High">High (1-2 weeks)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#738095] mb-1">
                PRIORITY TIER
              </label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as MVPFeaturePriority)}
                className="w-full rounded-lg bg-[#080B10] border border-[#263244] px-3 py-1.5 text-xs text-[#F3F4F6] focus:outline-none focus:border-blue-500"
              >
                <option value="must">Must Have (MVP)</option>
                <option value="should">Should Have</option>
                <option value="could">Could Have</option>
                <option value="not_now">Not Now (Post-Launch)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingFeature(false)}
              className="px-3 py-1.5 rounded-lg bg-[#151E2B] text-[#AAB4C3] text-xs font-mono"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium"
            >
              Save Feature to Scope
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
