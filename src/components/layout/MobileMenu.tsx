import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { to: string; label: string; default: string }[];
  toggleTheme: () => void;
  isDarkMode: boolean;
  toggleLanguage: () => void;
  language: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  links,
  toggleTheme,
  isDarkMode,
  toggleLanguage,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div 
        className="fixed inset-0 bg-surface-950/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-surface-900 p-6 shadow-xl flex flex-col justify-between border-l border-surface-200 dark:border-surface-800">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-surface-200 dark:border-surface-800">
            <span className="text-xl font-bold tracking-tight text-surface-900 dark:text-white">
              Audit<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">AI</span>
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400 font-semibold'
                      : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50 dark:text-surface-300 dark:hover:text-white dark:hover:bg-surface-800'
                  }`
                }
              >
                {link.default}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-surface-200 dark:border-surface-800 flex items-center justify-between">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-surface-700 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
          >
            🌐 {language.startsWith('hi') ? 'Switch to English' : 'हिन्दी में देखें'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
