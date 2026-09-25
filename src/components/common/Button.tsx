import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'header-outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#F5F1EB] focus:ring-[#2B3D4F] select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-md';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-theme-deep-blue hover:bg-theme-deep-blue-hover text-theme-inverse shadow-sm active:scale-[0.98]',
    accent:
      'bg-theme-deep-blue hover:bg-theme-deep-blue-hover text-theme-inverse font-semibold active:scale-[0.98]',
    secondary:
      'bg-theme-surface hover:bg-theme-hover text-theme-primary border border-theme-border hover:border-theme-border-strong',
    outline:
      'bg-transparent hover:bg-theme-hover text-theme-secondary hover:text-theme-primary border border-theme-border hover:border-theme-border-strong',
    ghost:
      'bg-transparent hover:bg-theme-hover text-theme-secondary hover:text-theme-primary',
    'header-outline':
      'bg-transparent hover:bg-white/10 text-[#F5F1EB]/85 hover:text-[#F5F1EB] border border-white/20 hover:border-white/35',
    danger:
      'bg-theme-danger hover:opacity-90 text-[#FDFCF8] shadow-sm active:scale-[0.98]',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
