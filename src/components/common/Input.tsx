import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  icon,
  id,
  className = '',
  disabled,
  ...props
}) => {
  const generatedId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={generatedId}
          className="block text-xs font-medium text-theme-secondary mb-1.5 uppercase tracking-wider font-mono"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-muted">
            {icon}
          </div>
        )}
        <input
          id={generatedId}
          disabled={disabled}
          className={`w-full bg-theme-elevated text-theme-primary border rounded-lg px-3.5 py-2.5 text-sm placeholder:text-theme-muted transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-theme-accent focus:border-theme-accent disabled:opacity-50 disabled:cursor-not-allowed ${
            icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-theme-danger focus:ring-theme-danger focus:border-theme-danger'
              : 'border-theme-border hover:border-theme-border-strong'
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-theme-danger">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-theme-muted">{helperText}</p>}
    </div>
  );
};
