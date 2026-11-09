import React from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { WebsiteIntelligence } from '@/types/audit';

interface WebsiteIntelligenceCardProps {
  intelligence: WebsiteIntelligence;
  domain: string;
  className?: string;
}

export const WebsiteIntelligenceCard: React.FC<WebsiteIntelligenceCardProps> = ({
  intelligence,
  domain,
  className = '',
}) => {
  return (
    <Card 
      variant="bordered" 
      className={`p-6 sm:p-7 bg-gradient-to-br from-primary-500/[0.04] via-surface-50 dark:via-surface-900/40 to-accent-500/[0.04] border-primary-500/20 shadow-sm ${className}`}
    >
      {/* Header Badge & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-surface-200/70 dark:border-surface-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center text-white shadow-md shadow-primary-500/20 flex-shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-bold text-surface-900 dark:text-white">
                {intelligence.name || domain}
              </h2>
              <Badge variant="primary" size="sm">
                {intelligence.category}
              </Badge>
              {intelligence.isCommercial ? (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  Commercial Business
                </span>
              ) : (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  Open Platform / Non-Profit
                </span>
              )}
            </div>
            {intelligence.tagline && (
              <p className="text-xs text-surface-500 dark:text-surface-400 mt-0.5 line-clamp-1 italic">
                "{intelligence.tagline}"
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 text-xs font-mono font-medium border border-surface-200 dark:border-surface-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            AI Analyzed
          </span>
        </div>
      </div>

      {/* Main "What It Does" Explanation */}
      <div className="mt-5 space-y-4">
        <div className="p-4 rounded-xl bg-white dark:bg-surface-900/80 border border-surface-200/80 dark:border-surface-800 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 mb-1.5 flex items-center gap-1.5">
            <span>🌐</span>
            <span>What This Website Does & Core Purpose (यह वेबसाइट क्या करती है)</span>
          </div>
          <p className="text-sm text-surface-800 dark:text-surface-200 leading-relaxed font-normal">
            {intelligence.whatItDoes}
          </p>
        </div>

        {/* 3-Column Key Attributes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Target Audience */}
          <div className="p-3.5 rounded-xl bg-surface-100/60 dark:bg-surface-800/40 border border-surface-200/60 dark:border-surface-700/50">
            <div className="text-[11px] font-bold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <span>👥</span>
              <span>Target Audience</span>
            </div>
            <p className="text-xs font-medium text-surface-900 dark:text-surface-100 leading-snug">
              {intelligence.targetAudience}
            </p>
          </div>

          {/* Business Model */}
          <div className="p-3.5 rounded-xl bg-surface-100/60 dark:bg-surface-800/40 border border-surface-200/60 dark:border-surface-700/50">
            <div className="text-[11px] font-bold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <span>💼</span>
              <span>Business Model</span>
            </div>
            <p className="text-xs font-medium text-surface-900 dark:text-surface-100 leading-snug">
              {intelligence.businessModel}
            </p>
          </div>

          {/* Primary Niche / Industry */}
          <div className="p-3.5 rounded-xl bg-surface-100/60 dark:bg-surface-800/40 border border-surface-200/60 dark:border-surface-700/50">
            <div className="text-[11px] font-bold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-1 flex items-center gap-1">
              <span>🎯</span>
              <span>Industry & Niche</span>
            </div>
            <p className="text-xs font-medium text-surface-900 dark:text-surface-100 leading-snug">
              {intelligence.primaryNiche}
            </p>
          </div>
        </div>

        {/* Detected Core Offerings & Features */}
        {intelligence.coreOfferings && intelligence.coreOfferings.length > 0 && (
          <div className="pt-2">
            <div className="text-xs font-semibold text-surface-700 dark:text-surface-300 mb-2 flex items-center gap-1.5">
              <span>✨</span>
              <span>Key Offerings & Detected Features:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {intelligence.coreOfferings.map((offering, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-200 border border-surface-200 dark:border-surface-700 shadow-2xs font-medium"
                >
                  <span className="text-primary-500 font-bold">•</span>
                  {offering}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WebsiteIntelligenceCard;
