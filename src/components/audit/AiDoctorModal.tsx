import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { AuditMetric } from '@/types/audit';

interface AiDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  metric: AuditMetric | null;
}

const AiDoctorModal: React.FC<AiDoctorModalProps> = ({ isOpen, onClose, metric }) => {
  const [copied, setCopied] = useState(false);

  if (!metric) return null;

  const copySnippet = () => {
    if (!metric.fixSnippet) return;
    navigator.clipboard.writeText(metric.fixSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    if (status === 'passed') return <Badge variant="success">Passed</Badge>;
    if (status === 'warning') return <Badge variant="warning">Warning / Opportunity</Badge>;
    return <Badge variant="danger">Critical Issue</Badge>;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Doctor Diagnosis & Solution" maxWidth="2xl">
      <div className="space-y-6">
        {/* Metric Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-surface-200 dark:border-surface-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-mono tracking-wider text-primary-600 dark:text-primary-400">
                {metric.category} Audit
              </span>
              {getStatusBadge(metric.status)}
            </div>
            <h4 className="text-lg font-bold text-surface-900 dark:text-white">
              {metric.title}
            </h4>
          </div>
          <div className="text-right">
            <span className="text-xs text-surface-400 block">Current Metric</span>
            <span className="text-sm font-mono font-semibold text-surface-900 dark:text-surface-100">
              {metric.value}
            </span>
          </div>
        </div>

        {/* AI Explanation */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-2 flex items-center gap-1.5">
            <span>🤖</span> What This Means & Why It Matters
          </h5>
          <p className="text-sm text-surface-700 dark:text-surface-300 leading-relaxed bg-surface-50 dark:bg-surface-800/50 p-4 rounded-xl border border-surface-200 dark:border-surface-700/60">
            {metric.description}
          </p>
        </div>

        {/* Actionable Recommendation */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-2 flex items-center gap-1.5">
            <span>💡</span> Recommended Fix
          </h5>
          <p className="text-sm font-medium text-surface-800 dark:text-surface-200">
            {metric.recommendation}
          </p>
        </div>

        {/* Code Snippet Fix if available */}
        {metric.fixSnippet && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-surface-500 flex items-center gap-1.5">
                <span>⚡</span> Drop-in Solution Code ({metric.fixLanguage || 'code'})
              </h5>
              <button
                onClick={copySnippet}
                className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
              >
                {copied ? '✓ Copied to clipboard!' : '📋 Copy Snippet'}
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-surface-900 text-surface-100 font-mono text-xs overflow-x-auto border border-surface-800 selection:bg-primary-600">
              <code>{metric.fixSnippet}</code>
            </pre>
          </div>
        )}

        {/* Modal footer */}
        <div className="pt-4 border-t border-surface-200 dark:border-surface-800 flex justify-end gap-3">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          {metric.fixSnippet && (
            <Button variant="primary" size="sm" onClick={copySnippet}>
              {copied ? 'Copied!' : 'Copy Code Fix'}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AiDoctorModal;
