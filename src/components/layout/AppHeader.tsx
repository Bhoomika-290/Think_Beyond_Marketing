import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  Compass,
  Menu,
  RotateCcw,
  Layers,
  AlertCircle,
} from 'lucide-react';

interface AppHeaderProps {
  onToggleSidebar: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ onToggleSidebar }) => {
  const { state, resetProject, hasMinimumDiscovery } = useProject();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleConfirmReset = () => {
    resetProject();
    setShowResetConfirm(false);
  };

  return (
    <>
      <header className="h-16 bg-[#FFFFFF] border-b border-[#E2EAF4] shrink-0 z-30">
        <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Left section: Hamburger (Mobile/Tablet) + Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-[#60738F] hover:text-[#14213D] hover:bg-[#EEF4FB] transition-colors"
              aria-label="Toggle navigation drawer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/idea-lab" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#E8F2FF] border border-[#2684F7]/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4 text-[#2684F7] stroke-[2.5]" />
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm tracking-wider uppercase text-[#14213D] block leading-none">
                  Think Beyond Marketing
                </span>
                <span className="text-[10px] text-[#60738F] font-mono tracking-tight hidden sm:block mt-0.5">
                  Business & Brand Intelligence Workspace
                </span>
              </div>
            </Link>
          </div>

          {/* Center section: Project Context & Status */}
          <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#EEF4FB] border border-[#E2EAF4]">
            <Layers className="w-3.5 h-3.5 text-[#2684F7]" />
            <div className="text-xs">
              <span className="text-[#60738F] font-mono mr-1.5 uppercase text-[10px]">Project:</span>
              <span className="font-medium text-[#14213D] max-w-[160px] truncate inline-block align-bottom">
                {state.project.name || 'Untitled Venture'}
              </span>
            </div>
            <span className="text-[#8495AE] text-xs">•</span>
            <div className="text-xs">
              <span className="text-[#60738F] font-mono mr-1.5 uppercase text-[10px]">Status:</span>
              <Badge variant={hasMinimumDiscovery ? 'success' : 'default'} size="sm">
                {hasMinimumDiscovery ? 'Discovery Ready' : 'In Discovery'}
              </Badge>
            </div>
          </div>

          {/* Right section: Reset Canvas Action */}
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={() => setShowResetConfirm(true)}
              title="Reset current project canvas"
            >
              <span className="hidden sm:inline">Reset Canvas</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Confirmation Modal for Reset Canvas */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#14213D]/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] border border-[#E2EAF4] rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-[#F29A42]">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <h3 className="text-base font-semibold text-[#14213D]">
                Reset Project State?
              </h3>
            </div>
            <p className="text-sm text-[#60738F] leading-relaxed">
              This will clear the current raw idea, product classification, and discovery responses stored in your browser session. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleConfirmReset}
              >
                Confirm Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
