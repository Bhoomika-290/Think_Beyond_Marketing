import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  helperText,
  error,
  id,
  className = '',
  rows = 3,
  disabled,
  ...props
}) => {
  const generatedId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

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
      <textarea
        id={generatedId}
        rows={rows}
        disabled={disabled}
        className={`w-full bg-theme-elevated text-theme-primary border rounded-lg px-3.5 py-2.5 text-sm placeholder:text-theme-muted transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-theme-accent focus:border-theme-accent disabled:opacity-50 disabled:cursor-not-allowed resize-y ${
          error
            ? 'border-theme-danger focus:ring-theme-danger focus:border-theme-danger'
            : 'border-theme-border hover:border-theme-border-strong'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-theme-danger">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-theme-muted">{helperText}</p>}
    </div>
  );
};
