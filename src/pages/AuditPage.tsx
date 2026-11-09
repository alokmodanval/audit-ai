import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ScoreGauge from '@/components/ui/ScoreGauge';
import AuditProgress from '@/components/audit/AuditProgress';
import AiDoctorModal from '@/components/audit/AiDoctorModal';
import ShareModal from '@/components/audit/ShareModal';
import { runWebsiteAudit, normalizeUrl } from '@/services/auditEngine';
import { historyStorage } from '@/services/historyStorage';
import { FullAuditReport, AuditMetric } from '@/types/audit';
import WebsiteIntelligenceCard from '@/components/audit/WebsiteIntelligenceCard';

const AuditPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [inputUrl, setInputUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepText, setStepText] = useState('Initializing scan...');
  const [report, setReport] = useState<FullAuditReport | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'about' | 'performance' | 'seo' | 'security' | 'accessibility' | 'trust' | 'tech' | 'aiDoctor'>('overview');
  
  // Modals state
  const [selectedMetric, setSelectedMetric] = useState<AuditMetric | null>(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'warning' | 'failed' | 'passed'>('all');

  // Trigger audit from URL query param
  useEffect(() => {
    const urlFromQuery = searchParams.get('url');
    if (urlFromQuery) {
      setInputUrl(urlFromQuery);
      performAudit(urlFromQuery);
    }
  }, [searchParams]);

  const performAudit = async (urlToAudit: string) => {
    if (!urlToAudit.trim()) return;
    setLoading(true);
    setCurrentStep(1);
    setStepText('Resolving domain and network connectivity...');

    try {
      const res = await runWebsiteAudit(urlToAudit, (step, text) => {
        setCurrentStep(step);
        setStepText(text);
      });
      setReport(res);
      historyStorage.saveReport(res);
    } catch (err) {
      console.error('Audit execution error', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    setSearchParams({ url: inputUrl.trim() });
    performAudit(inputUrl.trim());
  };

  const openAiDoctor = (metric: AuditMetric) => {
    setSelectedMetric(metric);
    setAiModalOpen(true);
  };

  const printReport = () => {
    window.print();
  };

  const exportJson = () => {
    if (!report) return;
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_${report.domain}_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getMetricBadge = (status: string) => {
    if (status === 'passed') return <Badge variant="success" size="sm">Passed</Badge>;
    if (status === 'warning') return <Badge variant="warning" size="sm">Opportunity</Badge>;
    return <Badge variant="danger" size="sm">Critical</Badge>;
  };

  return (
    <div className="py-8 space-y-8 pb-20">
      <Container>
        {/* Top Input Bar */}
        <Card variant="glass" className="p-4 sm:p-6 mb-8 print:hidden">
          <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 flex items-center">
              <span className="absolute left-4 text-surface-400">🌐</span>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter URL to analyze (e.g. https://wikipedia.org)"
                className="w-full pl-11 pr-4 py-3 text-sm sm:text-base rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="rounded-xl px-8 font-semibold shrink-0"
            >
              Scan Website
            </Button>
          </form>
        </Card>

        {/* Loading Progress State */}
        {loading && (
          <AuditProgress
            currentStep={currentStep}
            stepText={stepText}
            targetUrl={inputUrl}
          />
        )}

        {/* Audit Results View */}
        {!loading && report && (
          <div className="space-y-8">
            {/* Header / Summary Card */}
            <Card variant="bordered" className="p-6 sm:p-8 bg-gradient-to-r from-surface-50 via-white to-surface-50 dark:from-surface-900 dark:via-surface-900 dark:to-surface-800/80">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-surface-200 dark:border-surface-800">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xl sm:text-2xl font-black text-surface-900 dark:text-white">
                      {report.domain}
                    </span>
                    <Badge variant={report.grade === 'A+' || report.grade === 'A' ? 'success' : report.grade === 'B' ? 'primary' : 'warning'} size="lg">
                      Grade {report.grade}
                    </Badge>
                    <Badge variant={report.trust.status === 'Safe' ? 'success' : report.trust.status === 'Suspicious' ? 'warning' : 'danger'}>
                      🛡️ {report.trust.status}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-surface-500 font-mono break-all">
                    Target: {report.url} • Scanned {new Date(report.timestamp).toLocaleTimeString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 print:hidden">
                  <Button variant="outline" size="sm" onClick={() => setShareModalOpen(true)}>
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={exportJson}>
                    Export JSON
                  </Button>
                  <Button variant="outline" size="sm" onClick={printReport}>
                    Print / PDF
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate(`/compare?url1=${encodeURIComponent(report.url)}`)}
                  >
                    Compare Competitor
                  </Button>
                </div>
              </div>

              {/* Score Rings Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 pt-6">
                <ScoreGauge score={report.overallScore} label="Overall Score" size="md" subtitle={`Grade ${report.grade}`} />
                <ScoreGauge score={report.performance.score} label="Performance" size="md" subtitle={`${report.performance.loadTimeSec}s Load`} />
                <ScoreGauge score={report.seo.score} label="SEO Health" size="md" subtitle="Indexability" />
                <ScoreGauge score={report.security.score} label="Security" size="md" subtitle={report.security.isHttps ? 'HTTPS / TLS 1.3' : 'Insecure'} />
                <ScoreGauge score={report.accessibility.score} label="Accessibility" size="md" subtitle={`WCAG ${report.accessibility.wcagLevel}`} />
                <ScoreGauge score={report.trust.trustScore} label="Trust Shield" size="md" subtitle={report.trust.status} />
              </div>
            </Card>

            {/* Navigation Tabs */}
            <div className="border-b border-surface-200 dark:border-surface-800 flex overflow-x-auto gap-2 pb-px print:hidden">
              {[
                { id: 'overview', label: 'Overview & Health', icon: '📊' },
                { id: 'about', label: 'About Site (AI)', icon: '🌐' },
                { id: 'performance', label: 'Performance', icon: '⚡' },
                { id: 'seo', label: 'SEO & Social', icon: '🔍' },
                { id: 'security', label: 'Security & Headers', icon: '🔒' },
                { id: 'accessibility', label: 'Accessibility', icon: '♿' },
                { id: 'trust', label: 'Trust & Scam Shield', icon: '🛡️' },
                { id: 'tech', label: 'Tech Stack', icon: '💻' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-surface-900 border-t-2 border-primary-500 text-primary-600 dark:text-primary-400 shadow-xs'
                      : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}

            {/* 1. OVERVIEW & AI DOCTOR TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Website Purpose & Business Intelligence */}
                {report.websiteIntelligence && (
                  <WebsiteIntelligenceCard 
                    intelligence={report.websiteIntelligence} 
                    domain={report.domain} 
                  />
                )}

                {/* AI Executive Diagnosis */}
                <Card variant="bordered" className="p-6 bg-gradient-to-br from-primary-500/10 via-surface-50 to-transparent dark:from-primary-950/40 dark:via-surface-900 dark:to-transparent border-primary-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="p-1.5 rounded-lg bg-primary-600 text-white text-xs">AI</span>
                    <h3 className="text-base font-bold text-surface-900 dark:text-white">
                      AI Doctor Executive Diagnosis
                    </h3>
                  </div>
                  <p className="text-sm text-surface-700 dark:text-surface-300 leading-relaxed mb-4">
                    {report.aiDoctor.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 font-medium text-surface-700 dark:text-surface-300">
                      Status: <strong>{report.aiDoctor.overallHealth}</strong>
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 font-medium text-surface-700 dark:text-surface-300">
                      Eco Footprint: <strong>{report.carbon.co2Grams}g CO2/view ({report.carbon.cleanerThanPercent}% cleaner)</strong>
                    </span>
                  </div>
                </Card>

                {/* Priority Issues & Code Fixes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Critical Action Items */}
                  <Card variant="bordered" className="p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-surface-900 dark:text-white mb-4 flex items-center justify-between">
                      <span>Priority Improvements ({report.aiDoctor.criticalIssues.length})</span>
                      <Badge variant="danger" size="sm">Action Required</Badge>
                    </h3>
                    <div className="space-y-3">
                      {report.aiDoctor.criticalIssues.map((issue, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-surface-50 dark:bg-surface-800/60 border border-surface-200 dark:border-surface-700/60 flex flex-col justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-xs font-bold text-surface-900 dark:text-white">
                                {issue.title}
                              </span>
                              <Badge variant={issue.priority === 'high' ? 'danger' : 'warning'} size="sm">
                                {issue.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-surface-600 dark:text-surface-400">
                              {issue.description}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-surface-200/60 dark:border-surface-700/40 flex items-center justify-between text-xs">
                            <span className="text-primary-600 dark:text-primary-400 font-medium">
                              Fix: {issue.fix}
                            </span>
                            {issue.codeSnippet && (
                              <button
                                onClick={() => {
                                  setSelectedMetric({
                                    id: `issue_${idx}`,
                                    category: issue.category.toLowerCase() as any,
                                    title: issue.title,
                                    status: 'warning',
                                    score: 60,
                                    value: 'Detected Issue',
                                    description: issue.description,
                                    recommendation: issue.fix,
                                    fixSnippet: issue.codeSnippet,
                                    fixLanguage: 'html'
                                  });
                                  setAiModalOpen(true);
                                }}
                                className="font-semibold text-primary-600 dark:text-primary-400 hover:underline cursor-pointer"
                              >
                                View Code Fix →
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Strengths & Quick Wins */}
                  <div className="space-y-6">
                    <Card variant="bordered" className="p-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-surface-900 dark:text-white mb-4 flex items-center justify-between">
                        <span>Verified Strengths</span>
                        <Badge variant="success" size="sm">Passed</Badge>
                      </h3>
                      <ul className="space-y-2 text-xs text-surface-700 dark:text-surface-300">
                        {report.aiDoctor.strengths.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>

                    <Card variant="bordered" className="p-6">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-surface-900 dark:text-white mb-4">
                        💡 Quick Wins For 95+ Score
                      </h3>
                      <ul className="space-y-2 text-xs text-surface-700 dark:text-surface-300">
                        {report.aiDoctor.quickWins.map((q, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">•</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* ABOUT SITE (AI INTELLIGENCE) TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                {report.websiteIntelligence && (
                  <WebsiteIntelligenceCard 
                    intelligence={report.websiteIntelligence} 
                    domain={report.domain} 
                  />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Business & Functional Profile */}
                  <Card variant="bordered" className="p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-surface-900 dark:text-white mb-4 flex items-center justify-between">
                      <span>Business & Functional Profile</span>
                      <Badge variant="primary" size="sm">{report.websiteIntelligence?.category || 'Website'}</Badge>
                    </h3>
                    <dl className="space-y-3 text-xs">
                      <div className="flex justify-between py-1.5 border-b border-surface-100 dark:border-surface-800">
                        <dt className="text-surface-500 dark:text-surface-400">Website Name</dt>
                        <dd className="font-semibold text-surface-900 dark:text-white">{report.websiteIntelligence?.name || report.domain}</dd>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-surface-100 dark:border-surface-800">
                        <dt className="text-surface-500 dark:text-surface-400">Industry / Niche</dt>
                        <dd className="font-semibold text-surface-900 dark:text-white">{report.websiteIntelligence?.primaryNiche || 'Web'}</dd>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-surface-100 dark:border-surface-800">
                        <dt className="text-surface-500 dark:text-surface-400">Business Model</dt>
                        <dd className="font-semibold text-surface-900 dark:text-white">{report.websiteIntelligence?.businessModel || 'Digital Service'}</dd>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-surface-100 dark:border-surface-800">
                        <dt className="text-surface-500 dark:text-surface-400">Commercial Operation</dt>
                        <dd className="font-semibold text-surface-900 dark:text-white">{report.websiteIntelligence?.isCommercial ? 'Yes (For-Profit Business)' : 'No (Open / Non-profit)'}</dd>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <dt className="text-surface-500 dark:text-surface-400">Primary Audience</dt>
                        <dd className="font-semibold text-surface-900 dark:text-white text-right max-w-xs">{report.websiteIntelligence?.targetAudience}</dd>
                      </div>
                    </dl>
                  </Card>

                  {/* Positioning & Detected Topics */}
                  <Card variant="bordered" className="p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-surface-900 dark:text-white mb-4">
                      Brand Positioning & Core Topics
                    </h3>
                    <div className="space-y-4 text-xs">
                      <div>
                        <div className="text-[11px] font-bold text-surface-500 uppercase tracking-wider mb-1">
                          Official Tagline
                        </div>
                        <p className="p-2.5 rounded-lg bg-surface-50 dark:bg-surface-800/60 font-mono text-surface-700 dark:text-surface-300 italic">
                          "{report.websiteIntelligence?.tagline || report.seo.title}"
                        </p>
                      </div>

                      {report.websiteIntelligence?.keyKeywords && report.websiteIntelligence.keyKeywords.length > 0 && (
                        <div>
                          <div className="text-[11px] font-bold text-surface-500 uppercase tracking-wider mb-2">
                            Extracted Primary Headings & Topics
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {report.websiteIntelligence.keyKeywords.map((kw, i) => (
                              <span key={i} className="px-2.5 py-1 rounded-md bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 text-xs border border-surface-200 dark:border-surface-700">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-2 flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-xs"
                          onClick={() => setActiveTab('tech')}
                        >
                          View Tech Stack Details →
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-xs"
                          onClick={() => navigate(`/compare?url1=${encodeURIComponent(report.url)}`)}
                        >
                          Compare with Competitor →
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* 2. PERFORMANCE TAB */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Card variant="bordered" className="p-4 text-center">
                    <div className="text-xs text-surface-400">Total Load Time</div>
                    <div className="text-2xl font-bold text-surface-900 dark:text-white mt-1">
                      {report.performance.loadTimeSec}s
                    </div>
                  </Card>
                  <Card variant="bordered" className="p-4 text-center">
                    <div className="text-xs text-surface-400">Time to First Byte (TTFB)</div>
                    <div className="text-2xl font-bold text-surface-900 dark:text-white mt-1">
                      {report.performance.ttfbMs}ms
                    </div>
                  </Card>
                  <Card variant="bordered" className="p-4 text-center">
                    <div className="text-xs text-surface-400">Total Page Weight</div>
                    <div className="text-2xl font-bold text-surface-900 dark:text-white mt-1">
                      {report.performance.pageSizeKb} KB
                    </div>
                  </Card>
                  <Card variant="bordered" className="p-4 text-center">
                    <div className="text-xs text-surface-400">Compression</div>
                    <div className="text-2xl font-bold text-surface-900 dark:text-white mt-1 uppercase">
                      {report.performance.compression}
                    </div>
                  </Card>
                </div>

                {/* Performance Checks Table */}
                <Card variant="bordered" className="overflow-hidden">
                  <div className="p-4 border-b border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-800/40">
                    <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                      Core Web Vitals & Speed Audit Details
                    </h3>
                  </div>
                  <div className="divide-y divide-surface-200 dark:divide-surface-800">
                    {report.performance.metrics.map((m) => (
                      <div key={m.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 max-w-xl">
                          <div className="flex items-center gap-2">
                            {getMetricBadge(m.status)}
                            <h4 className="text-sm font-bold text-surface-900 dark:text-white">
                              {m.title}
                            </h4>
                          </div>
                          <p className="text-xs text-surface-600 dark:text-surface-400">
                            {m.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-mono font-semibold text-surface-700 dark:text-surface-300">
                            {m.value}
                          </span>
                          <Button size="sm" variant="ghost" onClick={() => openAiDoctor(m)}>
                            AI Fix →
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* 3. SEO TAB */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                {/* Search Engine & Social Preview Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Google Snippet Preview */}
                  <Card variant="bordered" className="p-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-4 flex items-center gap-2">
                      <span>🔍</span> Google Search Snippet Preview
                    </h3>
                    <div className="p-4 rounded-xl bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 space-y-1">
                      <div className="text-xs text-surface-500 truncate flex items-center gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-surface-200 dark:bg-surface-700 inline-block" />
                        <span>https://{report.domain}</span>
                      </div>
                      <div className="text-base text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer">
                        {report.seo.title}
                      </div>
                      <div className="text-xs text-surface-600 dark:text-surface-400 line-clamp-2">
                        {report.seo.metaDescription}
                      </div>
                    </div>
                  </Card>

                  {/* Social Share Preview */}
                  <Card variant="bordered" className="p-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-4 flex items-center gap-2">
                      <span>📱</span> Open Graph & Social Card Preview
                    </h3>
                    <div className="rounded-xl overflow-hidden border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-800">
                      <div className="h-28 bg-gradient-to-r from-primary-600 to-indigo-700 flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">
                        {report.domain} Social Banner
                      </div>
                      <div className="p-3 bg-white dark:bg-surface-900">
                        <div className="text-[10px] text-surface-400 uppercase font-mono">{report.domain}</div>
                        <div className="text-xs font-bold text-surface-900 dark:text-white truncate">{report.seo.openGraph.title}</div>
                        <div className="text-[11px] text-surface-500 truncate">{report.seo.openGraph.description}</div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* SEO Metrics List */}
                <Card variant="bordered" className="overflow-hidden">
                  <div className="p-4 border-b border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-800/40">
                    <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                      SEO Elements & Search Readiness
                    </h3>
                  </div>
                  <div className="divide-y divide-surface-200 dark:divide-surface-800">
                    {report.seo.metrics.map((m) => (
                      <div key={m.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 max-w-xl">
                          <div className="flex items-center gap-2">
                            {getMetricBadge(m.status)}
                            <h4 className="text-sm font-bold text-surface-900 dark:text-white">
                              {m.title}
                            </h4>
                          </div>
                          <p className="text-xs text-surface-600 dark:text-surface-400">
                            {m.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-mono font-semibold text-surface-700 dark:text-surface-300">
                            {m.value}
                          </span>
                          <Button size="sm" variant="ghost" onClick={() => openAiDoctor(m)}>
                            AI Fix →
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* 4. SECURITY & HEADERS TAB */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Card variant="bordered" className="p-4 text-center">
                    <div className="text-xs text-surface-400">HTTPS Transport</div>
                    <div className="text-lg font-bold text-emerald-500 mt-1">
                      {report.security.isHttps ? 'Enforced' : 'Missing'}
                    </div>
                  </Card>
                  <Card variant="bordered" className="p-4 text-center">
                    <div className="text-xs text-surface-400">TLS Encryption</div>
                    <div className="text-lg font-bold text-surface-900 dark:text-white mt-1">
                      {report.security.tlsVersion}
                    </div>
                  </Card>
                  <Card variant="bordered" className="p-4 text-center">
                    <div className="text-xs text-surface-400">HSTS Preload</div>
                    <div className="text-lg font-bold text-surface-900 dark:text-white mt-1">
                      {report.security.headers.hsts ? 'Active' : 'Missing'}
                    </div>
                  </Card>
                  <Card variant="bordered" className="p-4 text-center">
                    <div className="text-xs text-surface-400">Clickjacking Protection</div>
                    <div className="text-lg font-bold text-surface-900 dark:text-white mt-1">
                      {report.security.headers.xFrameOptions ? 'Protected' : 'Risk'}
                    </div>
                  </Card>
                </div>

                <Card variant="bordered" className="overflow-hidden">
                  <div className="p-4 border-b border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-800/40">
                    <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                      HTTP Security Response Headers
                    </h3>
                  </div>
                  <div className="divide-y divide-surface-200 dark:divide-surface-800">
                    {report.security.metrics.map((m) => (
                      <div key={m.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 max-w-xl">
                          <div className="flex items-center gap-2">
                            {getMetricBadge(m.status)}
                            <h4 className="text-sm font-bold text-surface-900 dark:text-white">
                              {m.title}
                            </h4>
                          </div>
                          <p className="text-xs text-surface-600 dark:text-surface-400">
                            {m.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-mono font-semibold text-surface-700 dark:text-surface-300">
                            {m.value}
                          </span>
                          <Button size="sm" variant="ghost" onClick={() => openAiDoctor(m)}>
                            AI Fix →
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* 5. ACCESSIBILITY TAB */}
            {activeTab === 'accessibility' && (
              <div className="space-y-6">
                <Card variant="bordered" className="overflow-hidden">
                  <div className="p-4 border-b border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-800/40">
                    <h3 className="text-sm font-bold text-surface-900 dark:text-white">
                      WCAG 2.1 Accessibility Checks
                    </h3>
                  </div>
                  <div className="divide-y divide-surface-200 dark:divide-surface-800">
                    {report.accessibility.metrics.map((m) => (
                      <div key={m.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 max-w-xl">
                          <div className="flex items-center gap-2">
                            {getMetricBadge(m.status)}
                            <h4 className="text-sm font-bold text-surface-900 dark:text-white">
                              {m.title}
                            </h4>
                          </div>
                          <p className="text-xs text-surface-600 dark:text-surface-400">
                            {m.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-mono font-semibold text-surface-700 dark:text-surface-300">
                            {m.value}
                          </span>
                          <Button size="sm" variant="ghost" onClick={() => openAiDoctor(m)}>
                            AI Fix →
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* 6. TRUST & SCAM SHIELD TAB */}
            {activeTab === 'trust' && (
              <div className="space-y-6">
                <Card variant="bordered" className="p-6 sm:p-8 bg-gradient-to-r from-accent-50/30 to-surface-50 dark:from-accent-950/20 dark:to-surface-900">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-surface-200 dark:border-surface-800">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🛡️</span>
                        <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                          Website Trust & Phishing Verdict
                        </h3>
                      </div>
                      <p className="text-sm text-surface-600 dark:text-surface-400">
                        {report.trust.verdict}
                      </p>
                    </div>
                    <div className="text-center sm:text-right shrink-0">
                      <div className="text-xs text-surface-400 uppercase font-mono">Trust Score</div>
                      <div className={`text-3xl font-black ${report.trust.trustScore >= 80 ? 'text-emerald-500' : report.trust.trustScore >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                        {report.trust.trustScore} / 100
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-surface-500">
                      Diagnostic Signals
                    </h4>
                    <div className="space-y-2">
                      {report.trust.reasons.map((r, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-surface-700 dark:text-surface-300">
                          <span className="text-primary-500 font-bold">•</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* 7. TECH STACK TAB */}
            {activeTab === 'tech' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card variant="bordered" className="p-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-3">
                      Frameworks & Runtime
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {report.techStack.frameworks.map((f) => (
                        <Badge key={f} variant="primary" size="md">{f}</Badge>
                      ))}
                    </div>
                  </Card>

                  <Card variant="bordered" className="p-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-3">
                      Content Management System (CMS)
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {report.techStack.cms.length > 0 ? (
                        report.techStack.cms.map((c) => (
                          <Badge key={c} variant="accent" size="md">{c}</Badge>
                        ))
                      ) : (
                        <span className="text-xs text-surface-500">Custom Built / Jamstack</span>
                      )}
                    </div>
                  </Card>

                  <Card variant="bordered" className="p-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-3">
                      Hosting & CDN
                    </h3>
                    <p className="text-sm font-semibold text-surface-900 dark:text-white">
                      {report.techStack.cdn}
                    </p>
                    <p className="text-xs text-surface-500 mt-1">
                      Server: {report.techStack.server}
                    </p>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}
      </Container>

      {/* Interactive AI Doctor Modal */}
      <AiDoctorModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        metric={selectedMetric}
      />

      {/* Share Report Modal */}
      {report && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          reportUrl={window.location.href}
          domain={report.domain}
        />
      )}
    </div>
  );
};

export default AuditPage;
