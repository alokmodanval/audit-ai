import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@/components/layout/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { historyStorage } from '@/services/historyStorage';
import { FullAuditReport } from '@/types/audit';

const HistoryPage: React.FC = () => {
  const [reports, setReports] = useState<FullAuditReport[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setReports(historyStorage.getHistory());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    historyStorage.deleteReport(id);
    setReports(historyStorage.getHistory());
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your local audit history?')) {
      historyStorage.clearHistory();
      setReports([]);
    }
  };

  const filtered = reports.filter((r) => 
    r.domain.toLowerCase().includes(search.toLowerCase()) ||
    r.url.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-8 space-y-8 pb-20">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <Badge variant="primary" className="mb-2">Local Archives</Badge>
            <h1 className="text-3xl font-extrabold text-surface-900 dark:text-white">
              Audit History & Saved Reports
            </h1>
            <p className="text-sm text-surface-600 dark:text-surface-400 mt-1">
              Quickly re-open or review previously scanned website reports.
            </p>
          </div>
          {reports.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleClear} className="text-red-500 hover:text-red-600 shrink-0">
              Clear All History
            </Button>
          )}
        </div>

        {/* Search */}
        {reports.length > 0 && (
          <div className="max-w-md mb-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search past audits by domain..."
              className="w-full px-4 py-2 text-sm rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 outline-none focus:border-primary-500"
            />
          </div>
        )}

        {/* History List */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <Card
                key={item.id}
                variant="elevated"
                padding="none"
                onClick={() => navigate(`/audit?url=${encodeURIComponent(item.url)}`)}
                className="overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-surface-400">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </span>
                    <Badge variant={item.grade === 'A+' || item.grade === 'A' ? 'success' : 'warning'}>
                      Grade {item.grade}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-surface-900 dark:text-white truncate mb-1">
                    {item.domain}
                  </h3>
                  <p className="text-xs text-surface-500 truncate mb-4">
                    {item.url}
                  </p>

                  <div className="grid grid-cols-4 gap-2 text-center pt-3 border-t border-surface-200 dark:border-surface-800 text-xs">
                    <div>
                      <div className="text-[10px] text-surface-400">Overall</div>
                      <div className="font-bold text-surface-900 dark:text-white">{item.overallScore}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-surface-400">Speed</div>
                      <div className="font-bold text-primary-600 dark:text-primary-400">{item.performance.score}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-surface-400">SEO</div>
                      <div className="font-bold text-surface-900 dark:text-white">{item.seo.score}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-surface-400">Security</div>
                      <div className="font-bold text-accent-600 dark:text-accent-400">{item.security.score}</div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-3 bg-surface-50 dark:bg-surface-800/60 border-t border-surface-200 dark:border-surface-800 flex items-center justify-between text-xs">
                  <span className="font-medium text-primary-600 dark:text-primary-400">
                    Open Report →
                  </span>
                  <button
                    onClick={(e) => handleDelete(item.id, e)}
                    className="text-surface-400 hover:text-red-500 transition-colors p-1"
                    title="Delete record"
                  >
                    🗑️
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card variant="bordered" className="p-12 text-center max-w-lg mx-auto">
            <div className="text-4xl mb-3">📂</div>
            <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-1">
              No Audit History Found
            </h3>
            <p className="text-sm text-surface-500 mb-6">
              When you scan websites, your reports will be securely stored here for instant access.
            </p>
            <Button href="/audit" variant="primary">
              Audit a Website Now
            </Button>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default HistoryPage;
