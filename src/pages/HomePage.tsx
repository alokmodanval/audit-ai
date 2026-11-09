import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ScoreGauge from '@/components/ui/ScoreGauge';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [urlInput, setUrlInput] = useState('');
  const navigate = useNavigate();

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    navigate(`/audit?url=${encodeURIComponent(urlInput.trim())}`);
  };

  const handleSampleClick = (sample: string) => {
    navigate(`/audit?url=${encodeURIComponent(sample)}`);
  };

  const sampleSites = [
    { name: 'Wikipedia', url: 'https://wikipedia.org', badge: 'Fast CDN' },
    { name: 'GitHub', url: 'https://github.com', badge: 'Enterprise' },
    { name: 'Stripe', url: 'https://stripe.com', badge: 'Fintech' },
    { name: 'Cloudflare', url: 'https://cloudflare.com', badge: 'Edge Shield' },
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Core Web Vitals & Speed',
      description: 'Analyze First Contentful Paint (FCP), Largest Contentful Paint (LCP), TTFB, asset weights, and compression ratios.',
      tag: 'Performance'
    },
    {
      icon: '🔍',
      title: 'Complete SEO & Indexability',
      description: 'Audit title lengths, meta descriptions, robots.txt, sitemaps, OpenGraph cards, Twitter cards, and semantic H1-H6 tags.',
      tag: 'SEO Health'
    },
    {
      icon: '🔒',
      title: 'Security & TLS Verification',
      description: 'Inspect Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), X-Frame-Options, X-Content-Type-Options, and TLS 1.3.',
      tag: 'Security Shield'
    },
    {
      icon: '♿',
      title: 'WCAG 2.1 Accessibility',
      description: 'Verify color contrast standards, image alt descriptions, ARIA landmarks, keyboard navigation, and form labels.',
      tag: 'Accessibility'
    },
    {
      icon: '🛡️',
      title: 'Scam & Phishing Detector',
      description: 'Heuristic domain analysis detecting typosquatting, raw IP hosting, abnormal hyphen chains, and credential-harvesting triggers.',
      tag: 'Trust Shield'
    },
    {
      icon: '💻',
      title: 'Tech Stack & CMS Detector',
      description: 'Identify web servers, CDNs, modern frameworks (React, Next.js, Vue, Tailwind), and analytics tags automatically.',
      tag: 'Stack Intel'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-primary-50/60 via-white to-surface-50 dark:from-surface-900 dark:via-surface-950 dark:to-surface-950">
        <div className="absolute inset-0 bg-grid-slate-100/[0.04] dark:bg-grid-slate-900/[0.04] bg-[bottom_1px_center] pointer-events-none" />
        
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-950/70 dark:text-primary-300 border border-primary-200 dark:border-primary-800/60 text-xs font-semibold mb-6 animate-pulse">
            <span>⚡</span>
            <span>{t('hero.badge', 'AI-Powered Website Intelligence Suite')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-surface-900 dark:text-white max-w-4xl mx-auto leading-[1.1] mb-6">
            {t('hero.titlePrefix', 'Audit, Optimize & Secure Any')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500">
              {t('hero.titleGradient', 'Website in Seconds')}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-surface-600 dark:text-surface-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero.subtitle', 'Comprehensive edge-speed analysis for Performance, SEO, Security Headers, WCAG Accessibility, and Phishing/Trust verification with actionable AI fixes.')}
          </p>

          {/* Audit URL Input Box */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleAuditSubmit} className="relative group">
              <div className="flex flex-col sm:flex-row gap-2.5 p-2 bg-white dark:bg-surface-900 rounded-2xl shadow-xl border border-surface-200 dark:border-surface-700/80 focus-within:ring-2 focus-within:ring-primary-500/30 transition-all">
                <div className="relative flex-1 flex items-center pl-4">
                  <svg className="w-5 h-5 text-surface-400 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder={t('hero.inputPlaceholder', 'Enter website URL (e.g. stripe.com or https://github.com)')}
                    className="w-full py-2.5 pr-4 text-sm sm:text-base bg-transparent text-surface-900 dark:text-white placeholder-surface-400 outline-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  variant="primary"
                  className="rounded-xl px-7 font-semibold shrink-0"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <span>{t('hero.auditButton', 'Start Deep Audit')}</span>
                </Button>
              </div>
            </form>

            {/* Quick samples */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-surface-500">
              <span className="font-medium mr-1">{t('hero.quickAudits', 'Try popular websites:')}</span>
              {sampleSites.map((s) => (
                <button
                  key={s.name}
                  onClick={() => handleSampleClick(s.url)}
                  className="px-2.5 py-1 rounded-full bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:text-primary-600 dark:hover:text-primary-400 border border-surface-200 dark:border-surface-700 shadow-2xs hover:border-primary-400 transition-all cursor-pointer"
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-surface-200/60 dark:border-surface-800/60">
            <div>
              <div className="text-2xl font-black text-surface-900 dark:text-white">40+</div>
              <div className="text-xs text-surface-500">Health Checks</div>
            </div>
            <div>
              <div className="text-2xl font-black text-primary-600 dark:text-primary-400">100%</div>
              <div className="text-xs text-surface-500">Edge Serverless</div>
            </div>
            <div>
              <div className="text-2xl font-black text-accent-600 dark:text-accent-400">&lt; 3s</div>
              <div className="text-xs text-surface-500">Audit Completion</div>
            </div>
            <div>
              <div className="text-2xl font-black text-surface-900 dark:text-white">AI Doctor</div>
              <div className="text-xs text-surface-500">Instant Code Fixes</div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. LIVE AUDIT PREVIEW CARD */}
      <Container>
        <Card variant="glass" className="p-6 sm:p-8 relative overflow-hidden border-primary-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-surface-200 dark:border-surface-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="success">Sample Live Report</Badge>
                <span className="text-xs font-mono text-surface-400">stripe.com</span>
              </div>
              <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                Executive Health Scorecard
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Button href="/audit?url=https://stripe.com" size="sm" variant="outline">
                Open Full Interactive Report →
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-6">
            <ScoreGauge score={94} label="Overall Grade A" size="md" subtitle="Production Ready" />
            <ScoreGauge score={96} label="Performance" size="md" subtitle="0.38s Load Time" />
            <ScoreGauge score={92} label="SEO Health" size="md" subtitle="Rich Meta & OG" />
            <ScoreGauge score={98} label="Security" size="md" subtitle="HSTS & TLS 1.3" />
            <ScoreGauge score={95} label="Trust Shield" size="md" subtitle="Verified Brand" />
          </div>
        </Card>
      </Container>

      {/* 3. CAPABILITIES GRID */}
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-extrabold text-surface-900 dark:text-white mb-4">
            Everything You Need To Elevate Your Website
          </h2>
          <p className="text-surface-600 dark:text-surface-400 text-sm sm:text-base">
            No bloated dashboards. Just immediate, actionable insights, edge security diagnostics, and AI-generated code fixes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <Card key={feat.title} variant="elevated" className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl p-2.5 rounded-xl bg-surface-100 dark:bg-surface-800 inline-block">
                    {feat.icon}
                  </span>
                  <Badge variant="outline">{feat.tag}</Badge>
                </div>
                <h3 className="text-base font-bold text-surface-900 dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>

      {/* 4. COMPARE & TRUST CALLOUT */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="bordered" className="p-8 bg-gradient-to-br from-primary-500/5 to-transparent">
            <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center font-bold mb-4">
              ⚔️
            </div>
            <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
              Side-by-Side Competitor Compare
            </h3>
            <p className="text-sm text-surface-600 dark:text-surface-400 mb-6 leading-relaxed">
              Compare your website against top competitors side-by-side. Discover where you lead in speed, SEO meta, or security compliance.
            </p>
            <Button href="/compare" variant="outline" size="sm">
              Launch Comparison Tool →
            </Button>
          </Card>

          <Card variant="bordered" className="p-8 bg-gradient-to-br from-accent-500/5 to-transparent">
            <div className="w-10 h-10 rounded-xl bg-accent-500 text-white flex items-center justify-center font-bold mb-4">
              🛡️
            </div>
            <h3 className="text-xl font-bold text-surface-900 dark:text-white mb-2">
              Phishing & Fake Website Shield
            </h3>
            <p className="text-sm text-surface-600 dark:text-surface-400 mb-6 leading-relaxed">
              Verify if an unknown or shopping website is genuine or a fraudulent phishing clone before entering credentials or credit cards.
            </p>
            <Button href="/trust-shield" variant="outline" size="sm">
              Check Website Trust →
            </Button>
          </Card>
        </div>
      </Container>

      {/* 5. BOTTOM CTA BANNER */}
      <Container>
        <div className="rounded-3xl bg-gradient-to-r from-primary-600 via-primary-700 to-indigo-800 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Audit Your Website?
            </h2>
            <p className="text-primary-100 text-sm sm:text-base leading-relaxed">
              Run a complete analysis in less than 5 seconds. Export client-ready PDF reports or copy AI-generated fixes on the fly.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/audit" size="lg" className="bg-white text-primary-700 hover:bg-primary-50 font-bold px-8 shadow-md">
                Launch Audit Scanner
              </Button>
              <Button href="/about" size="lg" variant="ghost" className="text-white hover:bg-white/10 border border-white/20">
                Learn How It Works
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
