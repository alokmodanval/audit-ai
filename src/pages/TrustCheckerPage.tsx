import React, { useState } from 'react';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ScoreGauge from '@/components/ui/ScoreGauge';
import { runWebsiteAudit } from '@/services/auditEngine';
import { TrustData } from '@/types/audit';

const TrustCheckerPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [trustResult, setTrustResult] = useState<TrustData | null>(null);

  const checkTrust = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    try {
      const report = await runWebsiteAudit(url.trim());
      setTrustResult(report.trust);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 space-y-8 pb-20">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Badge variant="accent" className="mb-2">Security & Scam Shield</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white">
            Website Trust & Phishing Detector
          </h1>
          <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400 mt-2">
            Verify whether a website, online store, or login portal is genuine or a fraudulent phishing clone.
          </p>
        </div>

        {/* Input Form */}
        <Card variant="bordered" className="max-w-2xl mx-auto p-4 sm:p-6 mb-8">
          <form onSubmit={checkTrust} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL to verify (e.g. https://bank-secure-login.xyz)"
              className="flex-1 px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 outline-none focus:border-accent-500 text-sm"
            />
            <Button type="submit" variant="secondary" size="lg" isLoading={loading} className="px-8">
              Analyze Trust
            </Button>
          </form>
        </Card>

        {/* Trust Output View */}
        {trustResult && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
            <Card variant="bordered" className="p-6 sm:p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <ScoreGauge score={trustResult.trustScore} size="xl" label="Trust Safety Score" />
                <div className="mt-4">
                  <Badge 
                    variant={trustResult.status === 'Safe' ? 'success' : trustResult.status === 'Suspicious' ? 'warning' : 'danger'}
                    size="lg"
                  >
                    {trustResult.status === 'Safe' ? '✓ Verified Safe Website' : trustResult.status === 'Suspicious' ? '⚠️ Caution: Suspicious Indicators' : '🚨 High Risk: Phishing / Scam Alert'}
                  </Badge>
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400 mt-4 max-w-md">
                  {trustResult.verdict}
                </p>
              </div>
            </Card>

            <Card variant="bordered" className="p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-surface-500 mb-4">
                Telemetry & Risk Signal Breakdown
              </h3>
              <div className="space-y-3">
                {trustResult.reasons.map((reason, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700/60 flex items-center gap-3 text-xs sm:text-sm">
                    <span className="text-primary-500 font-bold">🔍</span>
                    <span className="text-surface-800 dark:text-surface-200">{reason}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
};

export default TrustCheckerPage;
