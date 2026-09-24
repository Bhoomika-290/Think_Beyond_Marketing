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
          className="block text-xs font-medium text-[#AAB4C3] mb-1.5 uppercase tracking-wider font-mono"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#738095]">
            {icon}
          </div>
        )}
        <input
          id={generatedId}
          disabled={disabled}
          className={`w-full bg-[#0B1017] text-[#F3F4F6] border rounded-lg px-3.5 py-2.5 text-sm placeholder:text-[#738095] transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-[#4D8DFF] focus:border-[#4D8DFF] disabled:opacity-50 disabled:cursor-not-allowed ${
            icon ? 'pl-10' : ''
          } ${
            error
              ? 'border-[#EF4444] focus:ring-[#EF4444] focus:border-[#EF4444]'
              : 'border-[#263244] hover:border-[#34445A]'
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-[#EF4444]">{error}</p>}
      {helperText && !error && <p className="mt-1 text-xs text-[#738095]">{helperText}</p>}
    </div>
  );
};
