import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import type { BuildDependencyGraphSystem } from '../../types/project';

interface BuildDependencyGraphProps {
  dependencyGraph: BuildDependencyGraphSystem;
}

export const BuildDependencyGraph: React.FC<BuildDependencyGraphProps> = ({ dependencyGraph }) => {
  const { nodes, criticalPath, totalEstimatedBuildDays } = dependencyGraph;

  return (
    <div className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 15 — Build Dependency Graph (DAG)
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
              PREREQUISITE FLOW
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">
            Visualizes prerequisite blockers and the critical path determining your estimated {totalEstimatedBuildDays}-day launch window.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111823] border border-blue-500/30 text-xs font-mono text-blue-300">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span>Critical Path: {totalEstimatedBuildDays} Days (~{Math.round(totalEstimatedBuildDays / 5)} Weeks)</span>
        </div>
      </div>

      {/* Critical Path Sequence Strip */}
      <div className="p-4 rounded-xl bg-[#111823] border border-blue-500/30 space-y-2">
        <span className="text-[10px] font-mono text-blue-400 uppercase font-semibold block">
          CRITICAL PATH EXECUTION SEQUENCE:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-mono text-[#F3F4F6]">
          {criticalPath.map((nodeId, idx) => {
            const node = nodes.find((n) => n.id === nodeId);
            return (
              <React.Fragment key={nodeId}>
                <span className="px-2.5 py-1 rounded bg-[#0D141F] border border-[#263244] whitespace-nowrap text-blue-300">
                  {node?.name || nodeId}
                </span>
                {idx < criticalPath.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500/60 flex-shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Dependency Nodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {nodes.map((node) => {
          const isCritical = criticalPath.includes(node.id);

          return (
            <div
              key={node.id}
              className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                isCritical
                  ? 'bg-[#151E2B] border-blue-500/60 shadow-sm'
                  : 'bg-[#111823] border-[#263244]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-mono uppercase text-[#738095]">
                    {node.layer}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isCritical && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        CRITICAL
                      </span>
                    )}
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#0D141F] text-[#AAB4C3]">
                      {node.estimatedDays}d
                    </span>
                  </div>
                </div>

                <h3 className="text-xs font-bold text-[#F3F4F6] mb-1.5">{node.name}</h3>

                <div className="text-[10px] font-mono text-[#738095]">
                  {node.dependencies.length > 0 ? (
                    <span>
                      Blocked by:{' '}
                      <span className="text-blue-300">
                        {node.dependencies
                          .map((d) => nodes.find((n) => n.id === d)?.name || d)
                          .join(', ')}
                      </span>
                    </span>
                  ) : (
                    <span className="text-emerald-400">Zero blockers (Ready Day 1)</span>
                  )}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#1C2635] flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#738095]">Status:</span>
                <span
                  className={
                    node.status === 'ready'
                      ? 'text-emerald-400 font-bold'
                      : node.status === 'in_progress'
                      ? 'text-blue-400 font-bold'
                      : 'text-amber-400 font-bold'
                  }
                >
                  {node.status.toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
