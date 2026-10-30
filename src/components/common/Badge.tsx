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
    default: 'bg-[#EEF4FB] text-[#60738F] border border-[#E2EAF4]',
    active: 'bg-[#E8F2FF] text-[#2684F7] border border-[#2684F7]/30 font-semibold',
    success: 'bg-[#E8F8F1] text-[#19A875] border border-[#19A875]/30',
    warning: 'bg-[#FFF3E7] text-[#F29A42] border border-[#F29A42]/30',
    danger: 'bg-[#FFF0EF] text-[#E46D68] border border-[#E46D68]/30',
    locked: 'bg-[#EEF4FB] text-[#8495AE] border border-[#E2EAF4]',
    info: 'bg-[#E8F2FF] text-[#2684F7] border border-[#2684F7]/30',
    outline: 'bg-transparent text-[#60738F] border border-[#E2EAF4]',
    ai: 'bg-[#F2EDFF] text-[#9272DB] border border-[#9272DB]/30',
    teal: 'bg-[#E8F8F1] text-[#19A875] border border-[#19A875]/30',
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
