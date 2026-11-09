import React from 'react';

export interface ScoreGaugeProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  subtitle?: string;
  className?: string;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  label,
  size = 'md',
  showLabel = true,
  subtitle,
  className = '',
}) => {
  const safeScore = Math.max(0, Math.min(100, Math.round(score)));

  const getColor = (val: number) => {
    if (val >= 90) return { stroke: '#10b981', text: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500/10' };
    if (val >= 70) return { stroke: '#6366f1', text: 'text-primary-500 dark:text-primary-400', bg: 'bg-primary-500/10' };
    if (val >= 50) return { stroke: '#f59e0b', text: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-500/10' };
    return { stroke: '#ef4444', text: 'text-red-500 dark:text-red-400', bg: 'bg-red-500/10' };
  };

  const color = getColor(safeScore);

  const dimensions = {
    sm: { size: 64, stroke: 5, fontSize: 'text-base font-bold' },
    md: { size: 96, stroke: 7, fontSize: 'text-2xl font-extrabold' },
    lg: { size: 128, stroke: 9, fontSize: 'text-3xl font-extrabold' },
    xl: { size: 160, stroke: 11, fontSize: 'text-4xl font-black' },
  };

  const dim = dimensions[size];
  const radius = (dim.size - dim.stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={dim.size}
          height={dim.size}
          className="transform -rotate-90"
        >
          {/* Background track */}
          <circle
            cx={dim.size / 2}
            cy={dim.size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={dim.stroke}
            className="text-surface-200 dark:text-surface-800"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={dim.size / 2}
            cy={dim.size / 2}
            r={radius}
            stroke={color.stroke}
            strokeWidth={dim.stroke}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${dim.fontSize} ${color.text} tracking-tight`}>
            {safeScore}
          </span>
        </div>
      </div>
      {showLabel && label && (
        <span className="mt-2 text-xs sm:text-sm font-semibold text-surface-900 dark:text-surface-100">
          {label}
        </span>
      )}
      {subtitle && (
        <span className="text-[11px] text-surface-500 dark:text-surface-400">
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default ScoreGauge;
