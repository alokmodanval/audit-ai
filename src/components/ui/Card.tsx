import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  variant = 'bordered',
  padding = 'md',
  className = '',
  children,
  onClick,
  ...props
}) => {
  const baseStyles = 'rounded-xl overflow-hidden transition-all duration-200 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100';
  
  const variants = {
    default: 'shadow-sm',
    bordered: 'border border-surface-200 dark:border-surface-800 shadow-sm',
    elevated: 'border border-surface-200 dark:border-surface-800 shadow-md hover:shadow-lg dark:shadow-surface-950/60 hover:-translate-y-0.5',
    glass: 'bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border border-surface-200/80 dark:border-surface-800/80 shadow-sm',
  };

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const classes = `${baseStyles} ${variants[variant]} ${paddings[padding]} ${onClick ? 'cursor-pointer' : ''} ${className}`;

  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;
