import React from 'react';
import type { LogoGeneratorSystem, LogoConcept } from '../../types/project';
import { LogoConceptCard } from './LogoConceptCard';
import { LogoCustomizer } from './LogoCustomizer';

interface LogoGeneratorProps {
  logoSystem: LogoGeneratorSystem;
  ventureName: string;
  onSelectConcept: (conceptId: string) => void;
  onCustomize: (customization: Partial<LogoConcept['customization']>) => void;
}

const WORKFLOW_STEPS = [
  '01 BRAND STRATEGY',
  '02 LOGO DIRECTION',
  '03 GENERATE CONCEPTS',
  '04 COMPARE & TEST',
  '05 PARAMETRIC REFINE',
  '06 PERSIST TO BRAND SYSTEM',
];

export const LogoGenerator: React.FC<LogoGeneratorProps> = ({
  logoSystem,
  ventureName,
  onSelectConcept,
  onCustomize,
}) => {
  const selectedConcept =
    logoSystem.concepts.find((c) => c.id === logoSystem.selectedConceptId) ||
    logoSystem.concepts[0];

  return (
    <section className="rounded-2xl bg-[#0B1017] border border-[#263244] p-6 lg:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#4D8DFF]">
              CORE IDENTITY ENGINE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F3F4F6] tracking-tight">
            Logo Generator & Mark Architecture
          </h2>
          <p className="text-xs sm:text-sm text-[#AAB4C3]">
            Procedural vector mark synthesis grounded in {ventureName}&rsquo;s positioning, category archetype, and personality matrix.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-[#111823] px-3 py-1.5 rounded-lg border border-[#263244]">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Active Mark Selected</span>
        </div>
      </div>

      {/* Visual Workflow Progression Bar */}
      <div className="mb-6 p-3 rounded-xl bg-[#111823] border border-[#263244] overflow-x-auto scrollbar-thin">
        <div className="flex items-center min-w-max gap-2 text-[10px] font-mono">
          {WORKFLOW_STEPS.map((step, idx) => (
            <React.Fragment key={idx}>
              <span className={`px-2 py-1 rounded font-semibold ${idx <= 3 ? 'bg-blue-600/20 text-[#4D8DFF]' : 'text-[#64748B]'}`}>
                {step}
              </span>
              {idx < WORKFLOW_STEPS.length - 1 && (
                <span className="text-[#334155]">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Concepts Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {logoSystem.concepts.map((concept) => {
          const isSelected = concept.id === logoSystem.selectedConceptId;
          return (
            <LogoConceptCard
              key={concept.id}
              concept={concept}
              isSelected={isSelected}
              onSelect={() => onSelectConcept(concept.id)}
            />
          );
        })}
      </div>

      {/* Parametric Customizer for Selected Mark */}
      {selectedConcept && (
        <LogoCustomizer
          selectedConcept={selectedConcept}
          onCustomize={onCustomize}
        />
      )}
    </section>
  );
};
