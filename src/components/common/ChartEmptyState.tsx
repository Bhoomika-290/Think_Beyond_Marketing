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
      className={`flex flex-col items-center justify-center text-center py-10 px-6 rounded-xl bg-[#EEF4FB] border border-dashed border-[#E2EAF4] ${className}`}
      role="status"
    >
      <div className="w-9 h-9 rounded-full bg-[#EEF4FB] border border-[#E2EAF4] flex items-center justify-center mb-3">
        <Inbox className="w-4 h-4 text-[#60738F]" />
      </div>
      <p className="text-sm font-semibold text-[#14213D]">{title}</p>
      <p className="text-xs text-[#60738F] mt-1 max-w-xs leading-relaxed">{message}</p>
      {hint && <p className="text-[11px] font-mono text-[#60738F] mt-2">{hint}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
