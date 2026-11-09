import React, { useState } from 'react';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { runWebsiteAudit } from '@/services/auditEngine';
import { TechStackData } from '@/types/audit';

const TechStackPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [domain, setDomain] = useState('');
  const [stack, setStack] = useState<TechStackData | null>(null);

  const detectStack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    try {
      const report = await runWebsiteAudit(url.trim());
      setDomain(report.domain);
      setStack(report.techStack);
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
          <Badge variant="primary" className="mb-2">Stack Intelligence</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white">
            Website Technology & CMS Detector
          </h1>
          <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400 mt-2">
            Uncover the frameworks, servers, CDNs, and libraries powering any website.
          </p>
        </div>

        <Card variant="bordered" className="max-w-2xl mx-auto p-4 sm:p-6 mb-8">
          <form onSubmit={detectStack} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter domain (e.g. https://vercel.com or shopify.com)"
              className="flex-1 px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 outline-none focus:border-primary-500 text-sm"
            />
            <Button type="submit" variant="primary" size="lg" isLoading={loading} className="px-8">
              Detect Stack
            </Button>
          </form>
        </Card>

        {stack && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
                Detected Technologies for <span className="text-primary-600 dark:text-primary-400">{domain}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="bordered" className="p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-4 flex items-center gap-2">
                  <span>⚛️</span> Frontend Frameworks & Libraries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stack.frameworks.map((f) => (
                    <Badge key={f} variant="primary" size="lg">{f}</Badge>
                  ))}
                  {stack.uiLibraries.map((u) => (
                    <Badge key={u} variant="secondary" size="lg">{u}</Badge>
                  ))}
                </div>
              </Card>

              <Card variant="bordered" className="p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-4 flex items-center gap-2">
                  <span>🌐</span> CDN & Edge Hosting
                </h3>
                <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-xl space-y-1">
                  <div className="text-sm font-semibold text-surface-900 dark:text-white">
                    {stack.cdn}
                  </div>
                  <div className="text-xs text-surface-500">
                    Server: {stack.server}
                  </div>
                </div>
              </Card>

              <Card variant="bordered" className="p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-4 flex items-center gap-2">
                  <span>📊</span> Analytics & Tracking
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stack.analytics.length > 0 ? (
                    stack.analytics.map((a) => (
                      <Badge key={a} variant="outline" size="md">{a}</Badge>
                    ))
                  ) : (
                    <span className="text-xs text-surface-500">No public analytics tags exposed</span>
                  )}
                </div>
              </Card>

              <Card variant="bordered" className="p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-4 flex items-center gap-2">
                  <span>📦</span> Content Management (CMS)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stack.cms.length > 0 ? (
                    stack.cms.map((c) => (
                      <Badge key={c} variant="accent" size="lg">{c}</Badge>
                    ))
                  ) : (
                    <span className="text-xs text-surface-500">Custom Jamstack Architecture</span>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default TechStackPage;
