import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HomePage from '@/pages/HomePage';
import AuditPage from '@/pages/AuditPage';
import ComparePage from '@/pages/ComparePage';
import TrustCheckerPage from '@/pages/TrustCheckerPage';
import TechStackPage from '@/pages/TechStackPage';
import HistoryPage from '@/pages/HistoryPage';
import AboutPage from '@/pages/AboutPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-surface-50 text-surface-900 dark:bg-surface-950 dark:text-surface-100 transition-colors duration-200">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/audit" element={<AuditPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/trust-shield" element={<TrustCheckerPage />} />
            <Route path="/tech-stack" element={<TechStackPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Fallback & legacy redirects */}
            <Route path="/reports" element={<Navigate to="/history" replace />} />
            <Route path="/dashboard" element={<Navigate to="/audit" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
