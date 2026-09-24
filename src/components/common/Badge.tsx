import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'active' | 'success' | 'warning' | 'locked' | 'info' | 'outline';
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
    default: 'bg-[#151E2B] text-[#AAB4C3] border border-[#263244]',
    active: 'bg-[rgba(77,141,255,0.15)] text-[#4D8DFF] border border-[rgba(77,141,255,0.4)] font-semibold',
    success: 'bg-[rgba(16,185,129,0.14)] text-[#10B981] border border-[rgba(16,185,129,0.35)]',
    warning: 'bg-[rgba(245,158,11,0.14)] text-[#F59E0B] border border-[rgba(245,158,11,0.35)]',
    locked: 'bg-[#151E2B] text-[#738095] border border-[#263244]',
    info: 'bg-[rgba(77,141,255,0.15)] text-[#4D8DFF] border border-[rgba(77,141,255,0.4)]',
    outline: 'bg-transparent text-[#AAB4C3] border border-[#34445A]',
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
