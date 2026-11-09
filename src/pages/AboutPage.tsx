import React from 'react';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="py-8 space-y-12 pb-20">
      <Container className="max-w-4xl">
        <div className="text-center mb-10">
          <Badge variant="primary" className="mb-2">Documentation & Methodology</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-surface-900 dark:text-white">
            About Audit AI
          </h1>
          <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400 mt-2 max-w-xl mx-auto">
            How we calculate scores, audit web standards, and generate AI-driven performance fixes.
          </p>
        </div>

        <div className="space-y-8">
          <Card variant="bordered" className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-surface-900 dark:text-white mb-3">
              🎯 Platform Mission
            </h2>
            <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
              Audit AI provides developers, agencies, startups, and everyday users with immediate, unthrottled visibility into website health, edge performance, cybersecurity compliance, search engine visibility, and fraudulent phishing indicators.
            </p>
          </Card>

          <Card variant="bordered" className="p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-surface-900 dark:text-white">
              📐 Scoring Methodology & Weights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-surface-900 dark:text-white">⚡ Performance</span>
                  <Badge variant="primary">25% Weight</Badge>
                </div>
                <p className="text-xs text-surface-500">
                  Evaluated using Core Web Vitals: First Contentful Paint (FCP), Largest Contentful Paint (LCP), Time to First Byte (TTFB), asset weight, and Brotli/Gzip compression.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-surface-900 dark:text-white">🔍 SEO Health</span>
                  <Badge variant="primary">25% Weight</Badge>
                </div>
                <p className="text-xs text-surface-500">
                  Audits semantic heading structure (H1-H6), document title character limits, meta descriptions, canonical URLs, robots.txt, sitemaps, and OpenGraph/Twitter social cards.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-surface-900 dark:text-white">🔒 Security Shield</span>
                  <Badge variant="primary">25% Weight</Badge>
                </div>
                <p className="text-xs text-surface-500">
                  Inspects HTTPS transport, TLS 1.3 protocol, Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), X-Frame-Options clickjacking defense, and X-Content-Type-Options.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-surface-900 dark:text-white">♿ WCAG Accessibility</span>
                  <Badge variant="secondary">15% Weight</Badge>
                </div>
                <p className="text-xs text-surface-500">
                  Compliance with WCAG 2.1 AA standards: image alt tags, color contrast ratios, HTML language declaration, ARIA attributes, and accessible form labels.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700/60 sm:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-surface-900 dark:text-white">🛡️ Trust & Scam Detection</span>
                  <Badge variant="accent">10% Weight</Badge>
                </div>
                <p className="text-xs text-surface-500">
                  Heuristic analysis detecting typosquatting, raw IP hosting, suspicious keyword triggers (login, wallet, bank, verify), and anomalous domain structures.
                </p>
              </div>
            </div>
          </Card>

          <Card variant="bordered" className="p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-surface-900 dark:text-white">
              ☁️ Cloudflare Global Edge Deployment
            </h2>
            <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
              Audit AI is compiled as an ultra-lean single-page application and deployed onto Cloudflare's global edge network. Audits execute with minimal latency directly close to the user without backend bottlenecks.
            </p>
            <div className="pt-2">
              <Button href="/audit" variant="primary">
                Test Audit AI Now →
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default AboutPage;
