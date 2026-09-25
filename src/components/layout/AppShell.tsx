import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  // Reset scroll on route change — deterministic top reset for both window
  // (teammate: ensures no stale scroll) and independent main container (local:
  // shell owns viewport, main is the only scroll region).
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
      mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location.pathname]);

  return (
    <div className="h-screen h-dvh flex flex-col overflow-hidden bg-theme-background text-theme-primary">
      {/* Top Application Header — fixed layer, never scrolls away */}
      <div className="shrink-0 z-30">
        <AppHeader onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      </div>

      {/* Workspace body: fixed sidebar + independent main scroll */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left Sidebar — anchored beneath header, full remaining viewport height */}
        <AppSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Primary Page Content — the ONLY vertical scroll region on desktop */}
        <main
          ref={mainRef}
          className="flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden bg-grid-pattern relative scroll-smooth"
        >
          {children}
        </main>
      </div>
    </div>
  );
};
