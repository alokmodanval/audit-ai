import React from 'react';
import Card from '@/components/ui/Card';

interface AuditProgressProps {
  currentStep: number;
  stepText: string;
  targetUrl: string;
}

const steps = [
  { id: 1, name: 'DNS & Latency' },
  { id: 2, name: 'SSL & Security' },
  { id: 3, name: 'DOM & Accessibility' },
  { id: 4, name: 'SEO & Meta Tags' },
  { id: 5, name: 'AI Synthesis' },
];

const AuditProgress: React.FC<AuditProgressProps> = ({ currentStep, stepText, targetUrl }) => {
  return (
    <div className="py-12 sm:py-20 flex flex-col items-center justify-center max-w-xl mx-auto text-center px-4">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-4 border-primary-500/20 border-t-primary-500 animate-spin flex items-center justify-center">
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
            <svg className="w-8 h-8 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
        Analyzing Website
      </h3>
      <p className="text-sm font-mono text-primary-600 dark:text-primary-400 mb-6 truncate max-w-md">
        {targetUrl}
      </p>

      {/* Progress step indicators */}
      <Card variant="bordered" className="w-full p-4 mb-6 text-left">
        <div className="flex items-center justify-between text-xs font-semibold text-surface-500 mb-2">
          <span>Current Task</span>
          <span>Step {currentStep} of {steps.length}</span>
        </div>
        <div className="text-sm font-medium text-surface-900 dark:text-surface-100 flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-accent-500 animate-ping" />
          {stepText}
        </div>

        {/* Step bars */}
        <div className="grid grid-cols-5 gap-1.5">
          {steps.map((s) => {
            const isDone = s.id < currentStep;
            const isCurrent = s.id === currentStep;
            return (
              <div key={s.id} className="flex flex-col gap-1">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isDone
                      ? 'bg-accent-500'
                      : isCurrent
                      ? 'bg-primary-500 animate-pulse'
                      : 'bg-surface-200 dark:bg-surface-800'
                  }`}
                />
                <span className="text-[10px] text-surface-400 truncate hidden sm:block">
                  {s.name}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      <p className="text-xs text-surface-400 max-w-sm">
        Running 40+ automated audits across Core Web Vitals, WCAG standards, and Edge TLS inspection...
      </p>
    </div>
  );
};

export default AuditProgress;
