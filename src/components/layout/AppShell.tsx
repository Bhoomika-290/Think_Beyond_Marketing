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

  // Deterministically reset scroll position to top whenever route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
      mainRef.current.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#080B10] text-[#F3F4F6]">
      {/* Top Application Header */}
      <AppHeader onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

      {/* Main Workspace Body: Sidebar + Page Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar (Desktop persistent, Mobile/Tablet drawer) */}
        <AppSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Primary Page Content Area */}
        <main
          ref={mainRef}
          className="flex-1 bg-grid-pattern relative min-h-[calc(100vh-4rem)]"
        >
          {children}
        </main>
      </div>
    </div>
  );
};
