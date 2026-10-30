import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { STAGES, type StageDefinition } from '../../types/project';
import { useProject } from '../../context/ProjectContext';
import { Lock, X, Check } from 'lucide-react';

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen, onClose }) => {
  const { isStageUnlocked, state } = useProject();
  const location = useLocation();

  const getStageStatus = (stage: StageDefinition, isCurrent: boolean, isUnlocked: boolean) => {
    if (isCurrent) {
      return {
        label: 'Active',
        dot: 'bg-[#2684F7]',
        text: 'text-[#2684F7] font-semibold',
      };
    }
    if (state.workflow.completedStages.includes(stage.id)) {
      return {
        label: 'Done',
        dot: 'bg-[#19A875]',
        text: 'text-[#19A875] font-medium',
      };
    }
    if (isUnlocked) {
      return {
        label: 'Ready',
        dot: 'bg-[#8495AE]',
        text: 'text-[#60738F]',
      };
    }
    return {
      label: 'Locked',
      dot: 'bg-[#E2EAF4]',
      text: 'text-[#8495AE]',
    };
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#FFFFFF] text-[#14213D]">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-[#E2EAF4] flex items-center justify-between shrink-0">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#8495AE]">
            Venture Journey
          </div>
          <div className="text-xs font-semibold text-[#14213D] mt-0.5 flex items-center gap-1.5">
            <span>8-Stage Intelligence Matrix</span>
          </div>
        </div>
        {/* Mobile close button */}
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-md text-[#60738F] hover:text-[#14213D] hover:bg-[#EEF4FB] transition-colors"
          aria-label="Close navigation sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Stages List — its own internal scroll only if stages exceed height */}
      <nav className="flex-1 min-h-0 overflow-y-auto p-3 space-y-1" aria-label="Stages Navigation">
        {STAGES.map((stage) => {
          const isCurrent = location.pathname === stage.path;
          const isUnlocked = isStageUnlocked(stage.id);
          const status = getStageStatus(stage, isCurrent, isUnlocked);

          return (
            <NavLink
              key={stage.id}
              to={stage.path}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onClose();
                }
              }}
              className={`group flex items-start gap-3 p-2.5 rounded-lg transition-all duration-150 relative ${
                isCurrent
                  ? 'bg-[#E8F2FF] border border-[#2684F7]/30 text-[#14213D]'
                  : 'hover:bg-[#EEF4FB] border border-transparent text-[#60738F]'
              }`}
            >
              {/* Stage number */}
              <div
                className={`font-mono text-xs font-bold pt-0.5 shrink-0 ${
                  isCurrent ? 'text-[#2684F7]' : 'text-[#8495AE] group-hover:text-[#60738F]'
                }`}
              >
                {stage.number}
              </div>

              {/* Stage info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`text-xs tracking-tight truncate ${
                      isCurrent
                        ? 'text-[#14213D] font-semibold'
                        : isUnlocked
                        ? 'text-[#14213D] group-hover:text-[#2684F7] font-medium'
                        : 'text-[#60738F] group-hover:text-[#14213D] font-medium'
                    }`}
                  >
                    {stage.fullName}
                  </span>

                  {/* Stage Lock icon if locked */}
                  {!isUnlocked && (
                    <Lock className="w-3.5 h-3.5 text-[#8495AE] shrink-0" />
                  )}
                  {state.workflow.completedStages.includes(stage.id) && !isCurrent && (
                    <Check className="w-3.5 h-3.5 text-[#19A875] shrink-0" />
                  )}
                </div>

                {/* Subtitle / Status indicator */}
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${status.dot}`} />
                  <span className={`text-[10px] font-mono tracking-wider uppercase ${status.text}`}>
                    {status.label}
                  </span>
                  {!isUnlocked && (
                    <span className="text-[10px] text-[#8495AE] font-mono truncate">
                      • Req: {stage.requiredStageId === 'idea-lab' ? '01 Idea Lab' : 'Prior stage'}
                    </span>
                  )}
                </div>
              </div>

              {/* Active right bar indicator */}
              {isCurrent && (
                <div className="absolute right-0 top-2 bottom-2 w-1 bg-[#2684F7] rounded-l" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-3.5 border-t border-[#E2EAF4] shrink-0">
        <div className="rounded-lg p-2.5 bg-[#EEF4FB] border border-[#E2EAF4] text-left">
          <div className="text-[10px] font-mono uppercase text-[#60738F] mb-1 flex items-center justify-between">
            <span>Protocol Integrity</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#19A875]" />
          </div>
          <p className="text-[11px] text-[#60738F] leading-snug">
            Staged reasoning workspace. Zero fabricated data.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop persistent sidebar — anchored, full body height, no page scroll participation */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0 min-h-0 h-full border-r border-[#E2EAF4] z-20">
        {navContent}
      </aside>

      {/* Tablet & Mobile Slide-Out Drawer with Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#14213D]/40 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer content (max w-80, does not consume entire mobile viewport) */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-slide-right">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
