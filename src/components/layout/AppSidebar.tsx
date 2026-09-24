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
        dot: 'bg-[#4D8DFF] animate-pulse',
        text: 'text-[#4D8DFF] font-semibold',
      };
    }
    if (state.workflow.completedStages.includes(stage.id)) {
      return {
        label: 'Done',
        dot: 'bg-[#10B981]',
        text: 'text-[#10B981] font-medium',
      };
    }
    if (isUnlocked) {
      return {
        label: 'Ready',
        dot: 'bg-[#4D8DFF]/70',
        text: 'text-[#AAB4C3]',
      };
    }
    return {
      label: 'Locked',
      dot: 'bg-[#263244]',
      text: 'text-[#738095]',
    };
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#0B1017] border-r border-[#263244]">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-[#263244] flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#738095]">
            Venture Journey
          </div>
          <div className="text-xs font-semibold text-[#F3F4F6] mt-0.5 flex items-center gap-1.5">
            <span>8-Stage Intelligence Matrix</span>
          </div>
        </div>
        {/* Mobile close button */}
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-md text-[#738095] hover:text-[#F3F4F6] hover:bg-[#151E2B] transition-colors"
          aria-label="Close navigation sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Stages List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="Stages Navigation">
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
                  ? 'bg-[#151E2B] border border-[#4D8DFF]/40 shadow-sm'
                  : 'hover:bg-[#111823] border border-transparent'
              }`}
            >
              {/* Stage number */}
              <div
                className={`font-mono text-xs font-bold pt-0.5 shrink-0 ${
                  isCurrent ? 'text-[#4D8DFF]' : 'text-[#738095] group-hover:text-[#AAB4C3]'
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
                        ? 'text-[#F3F4F6] font-semibold'
                        : isUnlocked
                        ? 'text-[#AAB4C3] group-hover:text-[#F3F4F6] font-medium'
                        : 'text-[#AAB4C3] group-hover:text-[#F3F4F6] font-medium'
                    }`}
                  >
                    {stage.fullName}
                  </span>

                  {/* Stage Lock icon if locked */}
                  {!isUnlocked && (
                    <Lock className="w-3.5 h-3.5 text-[#738095] shrink-0" />
                  )}
                  {state.workflow.completedStages.includes(stage.id) && !isCurrent && (
                    <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                  )}
                </div>

                {/* Subtitle / Status indicator */}
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${status.dot}`} />
                  <span className={`text-[10px] font-mono tracking-wider uppercase ${status.text}`}>
                    {status.label}
                  </span>
                  {!isUnlocked && (
                    <span className="text-[10px] text-[#738095] font-mono truncate">
                      • Req: {stage.requiredStageId === 'idea-lab' ? '01 Idea Lab' : 'Prior stage'}
                    </span>
                  )}
                </div>
              </div>

              {/* Active right bar indicator */}
              {isCurrent && (
                <div className="absolute right-0 top-2 bottom-2 w-1 bg-[#4D8DFF] rounded-l" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-3.5 border-t border-[#263244] bg-[#0B1017]">
        <div className="rounded-lg p-2.5 bg-[#111823] border border-[#263244] text-left">
          <div className="text-[10px] font-mono uppercase text-[#738095] mb-1 flex items-center justify-between">
            <span>Protocol Integrity</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          </div>
          <p className="text-[11px] text-[#AAB4C3] leading-snug">
            Staged reasoning workspace. Zero fabricated data.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (hidden on tablet/mobile) */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0 h-[calc(100vh-4rem)] sticky top-16 z-20">
        {navContent}
      </aside>

      {/* Tablet & Mobile Slide-Out Drawer with Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
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
