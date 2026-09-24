import React, { useState } from 'react';
import { AppHeader } from './AppHeader';
import { AppSidebar } from './AppSidebar';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#080B10] text-[#F3F4F6]">
      {/* Top Application Header */}
      <AppHeader onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

      {/* Main Workspace Body: Sidebar + Page Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Desktop persistent, Mobile/Tablet drawer) */}
        <AppSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Primary Page Content Area */}
        <main className="flex-1 overflow-y-auto bg-grid-pattern relative min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};
