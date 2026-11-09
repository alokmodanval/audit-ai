import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'warning' | 'success' | 'outline' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors';
  
  const variants = {
    default: 'bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-200',
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300',
    secondary: 'bg-accent-100 text-accent-800 dark:bg-accent-900/50 dark:text-accent-300',
    accent: 'bg-accent-100 text-accent-800 dark:bg-accent-900/50 dark:text-accent-300',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border border-red-200 dark:border-red-800/40',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40',
    outline: 'border border-surface-300 text-surface-700 dark:border-surface-600 dark:text-surface-300',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs sm:text-sm',
    lg: 'px-3 py-1.5 text-sm font-semibold',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;
