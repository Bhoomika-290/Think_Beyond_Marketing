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
          className="block text-xs font-medium text-[#AAB4C3] mb-1.5 uppercase tracking-wider font-mono"
        >
          {label}
        </label>
      )}
      <textarea
        id={generatedId}
        rows={rows}
        disabled={disabled}
        className={`w-full bg-[#0B1017] text-[#F3F4F6] border rounded-lg px-3.5 py-2.5 text-sm placeholder:text-[#738095] transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-[#4D8DFF] focus:border-[#4D8DFF] disabled:opacity-50 disabled:cursor-not-allowed resize-y ${
          error
            ? 'border-[#EF4444] focus:ring-[#EF4444] focus:border-[#EF4444]'
            : 'border-[#263244] hover:border-[#34445A]'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-[#EF4444]">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-[#738095]">{helperText}</p>}
    </div>
  );
};
