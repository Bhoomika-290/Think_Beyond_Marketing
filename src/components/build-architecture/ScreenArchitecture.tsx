import React, { useState } from 'react';
import type { ScreenArchitectureSystem, ScreenItem } from '../../types/project';

interface ScreenArchitectureProps {
  screenArchitecture: ScreenArchitectureSystem;
}

export const ScreenArchitecture: React.FC<ScreenArchitectureProps> = ({ screenArchitecture }) => {
  const { screens, sitemapSummary } = screenArchitecture;
  const [selectedScreen, setSelectedScreen] = useState<ScreenItem | null>(screens[0] || null);

  return (
    <div className="rounded-2xl bg-[#FFFFFF] border border-[#E2EAF4] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2EAF4] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#14213D]">
              Section 09 — Screen &amp; Page Architecture (Sitemap)
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#E8F2FF] text-[#2684F7] border border-[#2684F7]/30">
              SITEMAP
            </span>
          </div>
          <p className="text-xs text-[#8495AE] mt-1">{sitemapSummary}</p>
        </div>

        <span className="text-xs font-mono text-[#60738F]">
          Click any screen route to inspect component hierarchy
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Screens List (2 Cols) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {screens.map((screen) => {
            const isSelected = selectedScreen?.id === screen.id;

            return (
              <div
                key={screen.id}
                onClick={() => setSelectedScreen(screen)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FFFFFF] border-[#2684F7] ring-1 ring-blue-500 shadow-md'
                    : 'bg-[#FFFFFF] border-[#E2EAF4] hover:border-[#34445A]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono text-blue-300 bg-[#E8F2FF] border border-blue-500/20 truncate">
                    {screen.routePath}
                  </span>
                  {screen.isMVP ? (
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#E8F8F1] text-[#19A875] border border-[#19A875]/30">
                      MVP
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono text-[#60738F] bg-[#EEF4FB] border border-[#E2EAF4]">
                      PHASE 2
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-[#14213D] mb-1">{screen.name}</h3>
                <p className="text-[11px] text-[#8495AE] line-clamp-2 leading-relaxed mb-3">
                  {screen.purpose}
                </p>

                <div className="pt-2 border-t border-[#E2EAF4] flex items-center justify-between text-[10px] font-mono text-[#60738F]">
                  <span>{screen.requiredComponents.length} Components</span>
                  <span className="text-[#2684F7]">{screen.targetUser}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Screen Detail Inspector (1 Col) */}
        {selectedScreen && (
          <div className="rounded-xl bg-[#FFFFFF] border border-[#E2EAF4] p-5 h-fit sticky top-4 space-y-4">
            <div className="border-b border-[#E2EAF4] pb-3">
              <span className="text-[10px] font-mono text-[#60738F] uppercase block">
                ROUTE SPECIFICATION
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#14213D]">
                {selectedScreen.name}
              </h3>
              <p className="text-xs font-mono text-[#2684F7] mt-0.5">{selectedScreen.routePath}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-[#60738F] uppercase block mb-1">
                  PURPOSE &amp; GOAL
                </span>
                <p className="text-[#8495AE] leading-relaxed">{selectedScreen.purpose}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#60738F] uppercase block mb-1 font-semibold">
                  REQUIRED UI COMPONENTS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedScreen.requiredComponents.map((comp, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FFFFFF] text-[#14213D] border border-[#E2EAF4]"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#60738F] uppercase block mb-1 font-semibold">
                  API DEPENDENCIES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedScreen.apiEndpoints.length > 0 ? (
                    selectedScreen.apiEndpoints.map((api, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      >
                        {api}
                      </span>
                    ))
                  ) : (
                    <span className="text-[11px] font-mono text-[#60738F]">
                      Static Edge Cached / No API
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
