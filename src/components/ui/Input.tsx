import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-surface-700 dark:text-surface-300">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={`w-full px-4 py-2.5 rounded-lg text-sm bg-white dark:bg-surface-900 border text-surface-900 dark:text-surface-100 placeholder-surface-400 dark:placeholder-surface-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-surface-300 dark:border-surface-700 hover:border-surface-400 dark:hover:border-surface-600'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
      {!error && helperText && <p className="text-xs text-surface-500 dark:text-surface-400">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
