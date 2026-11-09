import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from './Container';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-surface-200 dark:bg-surface-950 dark:border-surface-800 pt-16 pb-8 transition-colors">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-primary-500 rounded-md">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center text-white">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-surface-900 dark:text-white">
                Audit<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">AI</span>
              </span>
            </Link>
            <p className="text-sm text-surface-500 dark:text-surface-400 max-w-xs leading-relaxed">
              {t('footer.description', 'Edge-powered AI website auditing platform. Analyze speed, SEO health, WCAG accessibility, SSL security headers, fake site detection, and get instant code fixes.')}
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-medium text-surface-500 dark:text-surface-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Edge Global Network Active
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-surface-900 dark:text-surface-100 uppercase tracking-wider mb-4">
              Audit Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/audit" className="text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors">Core Web Vitals & Speed</Link></li>
              <li><Link to="/audit" className="text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors">Search Engine Optimization (SEO)</Link></li>
              <li><Link to="/audit" className="text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors">Security Headers & SSL Verification</Link></li>
              <li><Link to="/audit" className="text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors">WCAG 2.1 Accessibility</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-surface-900 dark:text-surface-100 uppercase tracking-wider mb-4">
              Intelligence Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/trust-shield" className="text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors">Phishing & Fake Site Detector</Link></li>
              <li><Link to="/compare" className="text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors">Competitor Benchmark Compare</Link></li>
              <li><Link to="/tech-stack" className="text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors">CMS & Tech Stack Detector</Link></li>
              <li><Link to="/history" className="text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors">Audit History & Saved Reports</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-surface-900 dark:text-surface-100 uppercase tracking-wider mb-4">
              Resources & About
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors">Methodology & Algorithms</Link></li>
              <li><a href="https://tools4genz.com" target="_blank" rel="noopener noreferrer" className="text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors flex items-center gap-1">Tools4Genz Suite ↗</a></li>
              <li><a href="https://developers.cloudflare.com/pages/" target="_blank" rel="noopener noreferrer" className="text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors flex items-center gap-1">Cloudflare Edge Architecture ↗</a></li>
              <li><a href="https://github.com/alokmodanval/audit-ai" target="_blank" rel="noopener noreferrer" className="text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors flex items-center gap-1">Open Source on GitHub ↗</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-surface-200 dark:border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-surface-500 dark:text-surface-400">
          <p>© {new Date().getFullYear()} Audit AI. Created with Tools4Genz Design System. Deployed on Cloudflare.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span>⚡</span> Fast Edge Runtime
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <span>🔒</span> Zero Data Retention Option
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
