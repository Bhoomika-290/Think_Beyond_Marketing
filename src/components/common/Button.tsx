import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
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
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#080B10] focus:ring-[#4D8DFF] select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none rounded-md';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  const variantClasses = {
    primary:
      'bg-blue-600 hover:bg-blue-500 text-[#F3F4F6] shadow-sm shadow-blue-500/20 active:scale-[0.98]',
    accent:
      'bg-[#4D8DFF] hover:bg-[#6EA8FF] text-[#080B10] font-semibold active:scale-[0.98]',
    secondary:
      'bg-[#151E2B] hover:bg-[#1A2536] text-[#F3F4F6] border border-[#263244] hover:border-[#34445A]',
    outline:
      'bg-transparent hover:bg-[#151E2B] text-[#AAB4C3] hover:text-[#F3F4F6] border border-[#263244] hover:border-[#34445A]',
    ghost:
      'bg-transparent hover:bg-[#151E2B] text-[#AAB4C3] hover:text-[#F3F4F6]',
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
