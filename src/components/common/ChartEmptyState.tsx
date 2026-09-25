import React from 'react';
import { Inbox } from 'lucide-react';

interface ChartEmptyStateProps {
  title?: string;
  message?: string;
  hint?: string;
  action?: React.ReactNode;
  className?: string;
}

// Reusable graceful empty state for intelligence visualizations.
// Used whenever a dataset has zero (or unusable) entries: never blank,
// never a broken chart, never fabricated data.
export const ChartEmptyState: React.FC<ChartEmptyStateProps> = ({
  title = 'Awaiting evidence',
  message = 'No data points to visualize yet.',
  hint,
  action,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-10 px-6 rounded-xl bg-[#F5F1EB] border border-dashed border-[#C4B8A0] ${className}`}
      role="status"
    >
      <div className="w-9 h-9 rounded-full bg-[#ECE6DA] border border-[#DDD5C5] flex items-center justify-center mb-3">
        <Inbox className="w-4 h-4 text-[#6B7D90]" />
      </div>
      <p className="text-sm font-semibold text-[#2B3D4F]">{title}</p>
      <p className="text-xs text-[#4A5E73] mt-1 max-w-xs leading-relaxed">{message}</p>
      {hint && <p className="text-[11px] font-mono text-[#6B7D90] mt-2">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
