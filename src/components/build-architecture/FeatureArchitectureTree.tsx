import React, { useState } from 'react';
import { GitBranch, Layers, ChevronDown, ChevronRight, Database, Globe } from 'lucide-react';
import type { FeatureArchitectureTree as FeatureArchitectureTreeType, FeatureNode } from '../../types/project';

interface FeatureArchitectureTreeProps {
  featureTree: FeatureArchitectureTreeType;
}

export const FeatureArchitectureTree: React.FC<FeatureArchitectureTreeProps> = ({ featureTree }) => {
  const { categories, totalFeatureCount } = featureTree;
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    cat_core: true,
    cat_monetization: true,
    cat_ops_intel: true,
  });
  const [selectedFeature, setSelectedFeature] = useState<FeatureNode | null>(null);

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 04 — Product Feature Architecture Tree
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
              {totalFeatureCount} NODES
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Hierarchical decomposition of technical modules, endpoints, and schema dependencies.
          </p>
        </div>

        <span className="text-xs font-mono text-[#738095]">
          Click feature node to inspect full engineering specification
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tree Categories Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {categories.map((category) => {
            const isExpanded = expandedCategories[category.id] !== false;

            return (
              <div
                key={category.id}
                className="rounded-xl bg-[#111823] border border-[#263244] overflow-hidden"
              >
                {/* Category Header */}
                <button
                  type="button"
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-4 bg-[#131C29] hover:bg-[#162130] transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-[#738095]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#738095]" />
                    )}
                    <div>
                      <h3 className="text-xs font-bold text-[#F3F4F6] uppercase tracking-wide">
                        {category.name}
                      </h3>
                      <p className="text-[11px] text-[#AAB4C3] mt-0.5">{category.description}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono text-[#738095] bg-[#0D141F] border border-[#263244]">
                    {category.features.length} features
                  </span>
                </button>

                {/* Features List */}
                {isExpanded && (
                  <div className="divide-y divide-[#1C2635] p-2 space-y-1">
                    {category.features.map((feature) => {
                      const isSelected = selectedFeature?.id === feature.id;

                      return (
                        <div
                          key={feature.id}
                          onClick={() => setSelectedFeature(feature)}
                          className={`p-3 rounded-lg flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-blue-600/10 border border-blue-500/50'
                              : 'hover:bg-[#151E2B] border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <GitBranch className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                            <div className="truncate">
                              <span className="text-xs font-semibold text-[#F3F4F6] block truncate">
                                {feature.name}
                              </span>
                              <span className="text-[10px] text-[#738095] block truncate">
                                {feature.purpose}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0">
                            {feature.mvpStatus && (
                              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                MVP
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#1A2332] text-[#AAB4C3] border border-[#263244]">
                              {feature.technicalComplexity}
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

        {/* Selected Feature Specification Drawer (1 Col) */}
        <div className="rounded-xl bg-[#111823] border border-[#263244] p-5 h-fit sticky top-4">
          <div className="flex items-center justify-between border-b border-[#1C2635] pb-3 mb-4">
            <span className="text-xs font-mono font-bold text-[#F3F4F6]">
              FEATURE SPECIFICATION
            </span>
            {selectedFeature && (
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  selectedFeature.mvpStatus
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-[#1A2332] text-[#AAB4C3]'
                }`}
              >
                {selectedFeature.priority.replace('_', ' ')}
              </span>
            )}
          </div>

          {selectedFeature ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#F3F4F6]">{selectedFeature.name}</h3>
                <p className="text-xs text-[#AAB4C3] mt-1 leading-relaxed">
                  {selectedFeature.purpose}
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-[#1C2635] text-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#738095] block">TARGET PERSONA</span>
                  <span className="text-[#F3F4F6] font-medium">{selectedFeature.targetUser}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[#738095] block">PREREQUISITE DEPENDENCIES</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedFeature.dependencies.map((dep, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0D141F] text-[#AAB4C3] border border-[#263244]"
                      >
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-[#738095] mb-1">
                    <Database className="w-3 h-3 text-blue-400" />
                    <span>DATA SCHEMAS REQUIRED</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedFeature.dataRequired.map((data, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20"
                      >
                        {data}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-[#738095] mb-1">
                    <Globe className="w-3 h-3 text-purple-400" />
                    <span>API ENDPOINTS</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedFeature.apiRequired.map((api, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0D141F] text-purple-300 border border-purple-500/20"
                      >
                        {api}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-[#738095]">
              <Layers className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs font-mono">Select a feature on the left to inspect technical details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
