import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  badge,
  action,
  footer,
  interactive = false,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[#111823] border border-[#263244] rounded-xl overflow-hidden shadow-intel-card transition-colors duration-200 ${
        interactive ? 'intel-card-interactive cursor-pointer' : ''
      } ${className}`}
    >
      {(title || subtitle || badge || action) && (
        <div className="px-5 py-4 border-b border-[#263244] flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              {typeof title === 'string' ? (
                <h3 className="text-sm font-semibold text-[#F3F4F6] tracking-tight truncate">{title}</h3>
              ) : (
                title
              )}
              {badge}
            </div>
            {subtitle && <p className="text-xs text-[#738095] mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div className="px-5 py-3.5 bg-[#0B1017] border-t border-[#263244] text-xs text-[#738095]">
          {footer}
        </div>
      )}
    </div>
  );
};
