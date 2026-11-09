import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ScoreGauge from '@/components/ui/ScoreGauge';
import { runWebsiteAudit } from '@/services/auditEngine';
import { FullAuditReport } from '@/types/audit';

const ComparePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [urlA, setUrlA] = useState(searchParams.get('url1') || 'https://stripe.com');
  const [urlB, setUrlB] = useState('https://paypal.com');
  const [loading, setLoading] = useState(false);
  const [reportA, setReportA] = useState<FullAuditReport | null>(null);
  const [reportB, setReportB] = useState<FullAuditReport | null>(null);

  const runComparison = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!urlA.trim() || !urlB.trim()) return;
    setLoading(true);
    try {
      const [resA, resB] = await Promise.all([
        runWebsiteAudit(urlA.trim()),
        runWebsiteAudit(urlB.trim()),
      ]);
      setReportA(resA);
      setReportB(resB);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 space-y-8 pb-20">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Badge variant="primary" className="mb-2">Benchmark Engine</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white">
            Side-by-Side Website Comparison
          </h1>
          <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400 mt-2">
            Compare two websites simultaneously to identify who leads in Speed, SEO, Security, and Trust.
          </p>
        </div>

        {/* Input Bar */}
        <Card variant="bordered" className="p-6 mb-8">
          <form onSubmit={runComparison} className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-surface-500 uppercase block mb-1">
                Website A (Your Site)
              </label>
              <input
                type="text"
                value={urlA}
                onChange={(e) => setUrlA(e.target.value)}
                placeholder="https://yoursite.com"
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 outline-none focus:border-primary-500"
              />
            </div>
            <div className="text-center font-bold text-surface-400 text-sm">
              VS
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-surface-500 uppercase block mb-1">
                Website B (Competitor)
              </label>
              <input
                type="text"
                value={urlB}
                onChange={(e) => setUrlB(e.target.value)}
                placeholder="https://competitor.com"
                className="w-full px-4 py-2.5 text-sm rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 outline-none focus:border-primary-500"
              />
            </div>
            <div className="md:col-span-5 flex justify-center mt-2">
              <Button type="submit" variant="primary" size="lg" isLoading={loading} className="px-8">
                Run Comparison Analysis
              </Button>
            </div>
          </form>
        </Card>

        {/* Comparison Results */}
        {reportA && reportB && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Score Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="bordered" className="p-6 text-center border-t-4 border-t-primary-500">
                <Badge variant="primary" className="mb-2">Site A</Badge>
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-4">
                  {reportA.domain}
                </h3>
                <ScoreGauge score={reportA.overallScore} size="lg" label="Overall Score" subtitle={`Grade ${reportA.grade}`} />
              </Card>

              <Card variant="bordered" className="p-6 text-center border-t-4 border-t-accent-500">
                <Badge variant="accent" className="mb-2">Site B</Badge>
                <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-4">
                  {reportB.domain}
                </h3>
                <ScoreGauge score={reportB.overallScore} size="lg" label="Overall Score" subtitle={`Grade ${reportB.grade}`} />
              </Card>
            </div>

            {/* Metrics Comparison Table */}
            <Card variant="bordered" className="overflow-hidden">
              <div className="p-4 border-b border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-800/40">
                <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                  Head-to-Head Pillar Breakdown
                </h3>
              </div>
              <div className="divide-y divide-surface-200 dark:divide-surface-800 text-sm">
                {[
                  { label: 'Performance Score', valA: reportA.performance.score, valB: reportB.performance.score },
                  { label: 'Page Load Time', valA: `${reportA.performance.loadTimeSec}s`, valB: `${reportB.performance.loadTimeSec}s` },
                  { label: 'TTFB Latency', valA: `${reportA.performance.ttfbMs}ms`, valB: `${reportB.performance.ttfbMs}ms` },
                  { label: 'Page Weight', valA: `${reportA.performance.pageSizeKb} KB`, valB: `${reportB.performance.pageSizeKb} KB` },
                  { label: 'SEO Health Score', valA: reportA.seo.score, valB: reportB.seo.score },
                  { label: 'Security Score', valA: reportA.security.score, valB: reportB.security.score },
                  { label: 'Accessibility Score', valA: reportA.accessibility.score, valB: reportB.accessibility.score },
                  { label: 'Trust & Safety Score', valA: reportA.trust.trustScore, valB: reportB.trust.trustScore },
                ].map((row, idx) => (
                  <div key={idx} className="p-4 grid grid-cols-3 items-center text-center">
                    <span className="font-semibold text-primary-600 dark:text-primary-400">
                      {row.valA}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-surface-500">
                      {row.label}
                    </span>
                    <span className="font-semibold text-accent-600 dark:text-accent-400">
                      {row.valB}
                    </span>
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

export default ComparePage;
