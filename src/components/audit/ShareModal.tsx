import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportUrl: string;
  domain: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, reportUrl, domain }) => {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(reportUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Audit Report" maxWidth="md">
      <div className="space-y-5">
        <p className="text-sm text-surface-600 dark:text-surface-400">
          Share this public audit report for <strong className="text-surface-900 dark:text-white">{domain}</strong> with your team, clients, or developers.
        </p>

        <div className="flex gap-2">
          <Input 
            readOnly 
            value={reportUrl} 
            className="font-mono text-xs" 
          />
          <Button variant="primary" onClick={copyUrl} className="shrink-0">
            {copied ? '✓ Copied' : 'Copy Link'}
          </Button>
        </div>

        <div className="flex justify-center py-4 bg-surface-50 dark:bg-surface-800/40 rounded-xl border border-surface-200 dark:border-surface-700">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-2 bg-white p-2 rounded-lg shadow-sm border flex items-center justify-center">
              {/* Clean decorative QR placeholder */}
              <div className="grid grid-cols-5 gap-1 w-full h-full p-1 bg-surface-900 rounded">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xs ${
                      (i % 2 === 0 || i % 7 === 0) ? 'bg-white' : 'bg-surface-900'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-[11px] text-surface-500">Scan to view report on mobile</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
