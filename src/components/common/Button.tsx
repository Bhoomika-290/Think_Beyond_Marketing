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
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#FFFFFF] focus:ring-[#2684F7] select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-md';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-[#2684F7] hover:bg-[#1769D2] text-[#FFFFFF] shadow-xs active:scale-[0.98]',
    accent:
      'bg-[#2684F7] hover:bg-[#1769D2] text-[#FFFFFF] font-semibold active:scale-[0.98]',
    secondary:
      'bg-[#FFFFFF] hover:bg-[#EEF4FB] text-[#14213D] border border-[#E2EAF4] hover:border-[#C8D7E8]',
    outline:
      'bg-transparent hover:bg-[#EEF4FB] text-[#60738F] hover:text-[#14213D] border border-[#E2EAF4] hover:border-[#C8D7E8]',
    ghost:
      'bg-transparent hover:bg-[#EEF4FB] text-[#60738F] hover:text-[#14213D]',
    'header-outline':
      'bg-transparent hover:bg-[#EEF4FB] text-[#60738F] hover:text-[#14213D] border border-[#E2EAF4] hover:border-[#C8D7E8]',
    danger:
      'bg-[#E46D68] hover:bg-[#D45B56] text-[#FFFFFF] shadow-xs active:scale-[0.98]',
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
