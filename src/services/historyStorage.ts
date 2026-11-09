import { FullAuditReport } from '@/types/audit';

const STORAGE_KEY = 'audit_ai_reports_history_v2';

export const historyStorage = {
  getHistory(): FullAuditReport[] {
    try {
      if (typeof window === 'undefined') return [];
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as FullAuditReport[];
    } catch (e) {
      console.error('Failed to load audit history', e);
      return [];
    }
  },

  saveReport(report: FullAuditReport): void {
    try {
      if (typeof window === 'undefined') return;
      const current = this.getHistory();
      // Remove any duplicate for the same URL if done recently, or keep latest 30
      const filtered = current.filter((r) => r.url !== report.url || r.id === report.id);
      const updated = [report, ...filtered].slice(0, 30);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save audit report', e);
    }
  },

  getReportById(id: string): FullAuditReport | null {
    const list = this.getHistory();
    return list.find((r) => r.id === id) || null;
  },

  deleteReport(id: string): void {
    try {
      const current = this.getHistory();
      const updated = current.filter((r) => r.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete report', e);
    }
  },

  clearHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear history', e);
    }
  },
};
