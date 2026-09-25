import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useProject } from '../context/ProjectContext';
import { generateSimulationReport } from '../services/simulationEngine';
import { SimulationHeader } from '../components/simulation/SimulationHeader';
import { PhysicalSimulationViewport } from '../components/simulation/PhysicalSimulationViewport';
import { SoftwareInteractivePrototypeView } from '../components/simulation/SoftwareInteractivePrototypeView';
import { SimulationAppearanceControls } from '../components/simulation/SimulationAppearanceControls';
import { SimulationAssumptionsCard } from '../components/simulation/SimulationAssumptionsCard';
import type { SimulationAppearance } from '../types/simulation';

const DEFAULT_APPEARANCE: SimulationAppearance = {
  theme: 'light',
  style: 'minimal',
  accent: 'blue',
  surface: 'soft',
};

export const SimulationPage: React.FC = () => {
  const {
    state,
    simulationReport: contextReport,
    refreshSimulation,
    markStageCompleted,
  } = useProject();

  const pageTopRef = useRef<HTMLDivElement>(null);

  // Default pathway based on venture modality
  const defaultPathway: 'physical' | 'software' =
    (contextReport?.modality === 'software' ||
     state.businessModel?.productType === 'saas' ||
     state.businessModel?.productType === 'marketplace')
      ? 'software'
      : 'physical';

  const [userSelectedPathway, setUserSelectedPathway] = useState<{ defaultOrigin: 'physical' | 'software'; selected: 'physical' | 'software' }>({
    defaultOrigin: defaultPathway,
    selected: defaultPathway,
  });

  const activePathway = userSelectedPathway.defaultOrigin === defaultPathway
    ? userSelectedPathway.selected
    : defaultPathway;

  const setActivePathway = (pathway: 'physical' | 'software') => {
    setUserSelectedPathway({ defaultOrigin: defaultPathway, selected: pathway });
    setActiveStageIndex(0);
  };

  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [appearance, setAppearance] = useState<SimulationAppearance>(() => {
    try {
      // Purge any legacy appearance key that might have saved a dark default
      localStorage.removeItem('tbm_simulation_appearance');
      const saved = localStorage.getItem('tbm_simulation_appearance_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.theme === 'string') return parsed;
      }
      return DEFAULT_APPEARANCE;
    } catch {
      return DEFAULT_APPEARANCE;
    }
  });

  const handleAppearanceChange = (updated: SimulationAppearance) => {
    setAppearance(updated);
    try {
      localStorage.setItem('tbm_simulation_appearance_v3', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleResetAppearance = () => {
    setAppearance(DEFAULT_APPEARANCE);
    try {
      localStorage.removeItem('tbm_simulation_appearance_v3');
      localStorage.removeItem('tbm_simulation_appearance');
    } catch {
      // ignore
    }
  };

  // Guarantee normal scroll position on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    markStageCompleted('simulation');
  }, [markStageCompleted]);

  // Compute active report dynamically based on chosen pathway and project state
  const activeReport = useMemo(() => {
    if (contextReport && contextReport.modality === activePathway) {
      return contextReport;
    }
    return generateSimulationReport(state, activePathway);
  }, [state, contextReport, activePathway]);

  const totalStages = activePathway === 'physical' 
    ? activeReport.physicalStoryboard.stages.length 
    : 5;

  // Auto-play timer loop (lightweight, isolated)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStageIndex((prev) => (prev + 1) % totalStages);
      }, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalStages]);

  const handlePrevStage = () => {
    setActiveStageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextStage = () => {
    setActiveStageIndex((prev) => Math.min(totalStages - 1, prev + 1));
  };

  const handlePathwayChange = (pathway: 'physical' | 'software') => {
    setActivePathway(pathway);
    setActiveStageIndex(0);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setActiveStageIndex(0);
    setIsPlaying(false);
    handleResetAppearance();
  };

  return (
    <div ref={pageTopRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* 1. Header & Pathway Controls */}
      <SimulationHeader
        report={activeReport}
        activePathway={activePathway}
        onPathwayChange={handlePathwayChange}
        onRefresh={refreshSimulation}
        activeStage={activeStageIndex}
        totalStages={totalStages}
        onPrevStage={handlePrevStage}
        onNextStage={handleNextStage}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onReset={handleReset}
      />

      {/* 2. Simulation Appearance Controls Panel (Canvas-scoped customization) */}
      <SimulationAppearanceControls
        appearance={appearance}
        onChange={handleAppearanceChange}
        onReset={handleResetAppearance}
      />

      {/* 3. Main Visual Simulation Viewport (Physical 3D Lab vs Software Prototype) */}
      {activePathway === 'physical' ? (
        <PhysicalSimulationViewport
          storyboard={activeReport.physicalStoryboard}
          appearance={appearance}
          activeStageIndex={activeStageIndex}
          onSelectStage={(idx) => {
            setActiveStageIndex(idx);
            setIsPlaying(false);
          }}
        />
      ) : (
        <SoftwareInteractivePrototypeView
          walkthrough={activeReport.softwareWalkthrough}
          appearance={appearance}
          activeStageIndex={activeStageIndex}
          onSelectStage={(idx) => {
            setActiveStageIndex(idx);
            setIsPlaying(false);
          }}
        />
      )}

      {/* 4. Grounded Simulation Assumptions (Collapsible, Zero-Fabrication) */}
      <SimulationAssumptionsCard
        assumptions={activeReport.simulationAssumptions}
      />

      {/* 5. Bottom Stage Navigation Handoff */}
      <div className="p-5 rounded-xl bg-[#111823] border border-[#263244] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <Link
          to="/execution"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#AAB4C3] hover:text-[#F3F4F6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Stage 06 // Execution Intelligence</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-[#F3F4F6]">
              Stage 07 Experience Simulation Complete
            </div>
            <div className="text-[11px] font-mono text-[#738095]">
              Ready for Stage 08 Launch & Growth
            </div>
          </div>

          <Link
            to="/launch-growth"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4D8DFF] hover:bg-[#3B7BE8] text-[#080B10] text-xs font-bold font-mono transition-colors shadow-sm"
          >
            <span>Stage 08 // Launch & Growth</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
