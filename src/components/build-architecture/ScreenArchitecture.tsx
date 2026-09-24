import React, { useState } from 'react';
import type { ScreenArchitectureSystem, ScreenItem } from '../../types/project';

interface ScreenArchitectureProps {
  screenArchitecture: ScreenArchitectureSystem;
}

export const ScreenArchitecture: React.FC<ScreenArchitectureProps> = ({ screenArchitecture }) => {
  const { screens, sitemapSummary } = screenArchitecture;
  const [selectedScreen, setSelectedScreen] = useState<ScreenItem | null>(screens[0] || null);

  return (
    <div className="rounded-2xl bg-[#0D141F] border border-[#263244] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2635] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#F3F4F6]">
              Section 09 — Screen &amp; Page Architecture (Sitemap)
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/30">
              SITEMAP
            </span>
          </div>
          <p className="text-xs text-[#AAB4C3] mt-1">{sitemapSummary}</p>
        </div>

        <span className="text-xs font-mono text-[#738095]">
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
                    ? 'bg-[#151E2B] border-blue-500 ring-1 ring-blue-500 shadow-md'
                    : 'bg-[#111823] border-[#263244] hover:border-[#34445A]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono text-blue-300 bg-blue-500/10 border border-blue-500/20 truncate">
                    {screen.routePath}
                  </span>
                  {screen.isMVP ? (
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      MVP
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono text-[#738095] bg-[#1A2332]">
                      PHASE 2
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-[#F3F4F6] mb-1">{screen.name}</h3>
                <p className="text-[11px] text-[#AAB4C3] line-clamp-2 leading-relaxed mb-3">
                  {screen.purpose}
                </p>

                <div className="pt-2 border-t border-[#1C2635] flex items-center justify-between text-[10px] font-mono text-[#738095]">
                  <span>{screen.requiredComponents.length} Components</span>
                  <span className="text-blue-400">{screen.targetUser}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Screen Detail Inspector (1 Col) */}
        {selectedScreen && (
          <div className="rounded-xl bg-[#111823] border border-[#263244] p-5 h-fit sticky top-4 space-y-4">
            <div className="border-b border-[#1C2635] pb-3">
              <span className="text-[10px] font-mono text-[#738095] uppercase block">
                ROUTE SPECIFICATION
              </span>
              <h3 className="text-sm sm:text-base font-bold text-[#F3F4F6]">
                {selectedScreen.name}
              </h3>
              <p className="text-xs font-mono text-blue-400 mt-0.5">{selectedScreen.routePath}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-[#738095] uppercase block mb-1">
                  PURPOSE &amp; GOAL
                </span>
                <p className="text-[#AAB4C3] leading-relaxed">{selectedScreen.purpose}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#738095] uppercase block mb-1 font-semibold">
                  REQUIRED UI COMPONENTS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedScreen.requiredComponents.map((comp, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0D141F] text-[#F3F4F6] border border-[#263244]"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#738095] uppercase block mb-1 font-semibold">
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
                    <span className="text-[11px] font-mono text-[#738095]">
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
