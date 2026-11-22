import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { triggerSmartLink } from '@/config/monetization';

interface MonetizationBannerProps {
  score?: number;
  className?: string;
  onDownloadReport?: () => void;
}

export const MonetizationBanner: React.FC<MonetizationBannerProps> = ({
  score = 75,
  className = '',
  onDownloadReport,
}) => {
  const handleOptimizeClick = () => {
    triggerSmartLink();
  };

  const handleDownloadClick = () => {
    // Trigger SmartLink in new tab and also proceed with local download action
    triggerSmartLink();
    if (onDownloadReport) {
      onDownloadReport();
    }
  };

  return (
    <Card
      variant="bordered"
      className={`p-5 sm:p-6 bg-gradient-to-r from-indigo-900/10 via-primary-500/10 to-purple-900/10 dark:from-indigo-950/40 dark:via-primary-950/30 dark:to-purple-950/40 border-primary-500/30 shadow-md relative overflow-hidden ${className}`}
    >
      {/* Background decorative glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-primary-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Badge variant="primary" size="sm">
              AI Optimization Partner
            </Badge>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {score < 80 ? 'Fixes Available for This Site' : 'High Performance Enhancements'}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-surface-900 dark:text-white flex items-center gap-2">
            <span>⚡</span>
            <span>Boost Website Speed & Fix SEO Vulnerabilities</span>
          </h3>

          <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
            Eliminate render-blocking scripts, improve Core Web Vitals (LCP/CLS), and secure your domain with automated CDN caching and optimization tools.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
          <Button
            variant="primary"
            size="md"
            onClick={handleOptimizeClick}
            className="shadow-md shadow-primary-500/25 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white font-semibold cursor-pointer"
          >
            <span>Auto-Fix Issues</span>
            <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>

          {onDownloadReport && (
            <Button
              variant="outline"
              size="md"
              onClick={handleDownloadClick}
              className="border-surface-300 dark:border-surface-700 hover:bg-surface-100 dark:hover:bg-surface-800 text-xs sm:text-sm"
            >
              <svg className="w-4 h-4 mr-1.5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Pro PDF</span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MonetizationBanner;
