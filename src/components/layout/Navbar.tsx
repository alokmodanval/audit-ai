import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Container from './Container';
import MobileMenu from './MobileMenu';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickUrl, setQuickUrl] = useState('');
  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const { language, changeLanguage } = useLanguage();
  const toggleLanguage = () => {
    changeLanguage(language.startsWith('hi') ? 'en' : 'hi');
  };

  const navLinks = [
    { to: '/', label: 'nav.home', default: 'Home' },
    { to: '/audit', label: 'nav.audit', default: 'Audit Scanner' },
    { to: '/compare', label: 'nav.compare', default: 'Compare' },
    { to: '/trust-shield', label: 'nav.trust', default: 'Trust Shield' },
    { to: '/tech-stack', label: 'nav.tech', default: 'Tech Stack' },
    { to: '/history', label: 'nav.history', default: 'History' },
    { to: '/about', label: 'nav.about', default: 'About' },
  ];

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickUrl.trim()) return;
    navigate(`/audit?url=${encodeURIComponent(quickUrl.trim())}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-surface-900/10 dark:border-surface-50/[0.06] bg-white/95 dark:bg-surface-900/95 supports-backdrop-blur:bg-white/60 dark:supports-backdrop-blur:bg-surface-900/60">
        <Container>
          <div className="flex h-16 items-center justify-between">
            {/* Logo & Navigation */}
            <div className="flex items-center gap-6">
              <NavLink 
                to="/" 
                className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-md group"
              >
                <img 
                  src="/logo.png" 
                  alt="Audit AI" 
                  className="w-8 h-8 rounded-lg object-cover shadow-sm shadow-primary-500/20 group-hover:scale-105 transition-transform" 
                />
                <span className="text-xl font-bold tracking-tight text-surface-900 dark:text-white">
                  Audit<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">AI</span>
                </span>
              </NavLink>

              <nav className="hidden xl:flex items-center gap-1 ml-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-surface-100 text-primary-600 dark:bg-surface-800 dark:text-primary-400 font-semibold'
                          : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50 dark:text-surface-300 dark:hover:text-white dark:hover:bg-surface-800'
                      }`
                    }
                  >
                    {t(link.label, link.default)}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Quick URL Bar & Actions */}
            <div className="flex items-center gap-3">
              <form onSubmit={handleQuickSubmit} className="hidden md:flex relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-surface-400 dark:text-surface-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={quickUrl}
                  onChange={(e) => setQuickUrl(e.target.value)}
                  placeholder={t('hero.inputPlaceholder', 'Quick audit URL...')}
                  className="w-44 lg:w-60 pl-9 pr-4 py-1.5 text-xs bg-surface-100 border border-transparent rounded-full focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:bg-surface-800 dark:focus:bg-surface-900 dark:text-surface-200 transition-all outline-none"
                />
              </form>

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800 transition-colors flex items-center gap-1.5 border border-surface-200 dark:border-surface-700"
                title="Toggle Language"
              >
                <span>🌐</span>
                <span className="uppercase">{language.startsWith('hi') ? 'HI' : 'EN'}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* CTA button */}
              <NavLink
                to="/audit"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-primary-600 hover:bg-primary-700 text-white shadow-sm transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                <span>Audit Now</span>
              </NavLink>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg text-surface-600 dark:text-surface-300 xl:hidden hover:bg-surface-100 dark:hover:bg-surface-800"
                aria-label="Open navigation menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        toggleLanguage={toggleLanguage}
        language={language}
      />
    </>
  );
};

export default Navbar;
