import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'active' | 'success' | 'warning' | 'locked' | 'info' | 'outline' | 'danger' | 'ai' | 'teal';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  icon,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-wider',
  };

  const variantClasses = {
    default: 'bg-theme-background-secondary text-theme-secondary border border-theme-border',
    active: 'bg-[rgba(43,61,79,0.08)] text-theme-deep-blue border border-[rgba(43,61,79,0.25)] font-semibold',
    success: 'bg-theme-success-bg text-theme-success border border-theme-success-border',
    warning: 'bg-theme-warning-bg text-theme-warning border border-theme-warning-border',
    danger: 'bg-theme-danger-bg text-theme-danger border border-theme-danger-border',
    locked: 'bg-theme-background-secondary text-theme-muted border border-theme-border',
    info: 'bg-[rgba(43,61,79,0.08)] text-theme-deep-blue border border-[rgba(43,61,79,0.25)]',
    outline: 'bg-transparent text-theme-secondary border border-theme-border-strong',
    ai: 'bg-theme-ai-bg text-theme-ai border border-theme-ai-border',
    teal: 'bg-theme-teal-bg text-theme-teal border border-theme-teal-border',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono font-medium rounded uppercase transition-colors duration-150 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
