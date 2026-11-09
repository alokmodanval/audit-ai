export type AuditStatus = 'passed' | 'warning' | 'failed';

export interface AuditMetric {
  id: string;
  category: 'performance' | 'seo' | 'security' | 'accessibility' | 'trust';
  title: string;
  status: AuditStatus;
  score: number;
  value: string;
  description: string;
  recommendation: string;
  fixSnippet?: string;
  fixLanguage?: string;
}

export interface PerformanceData {
  score: number;
  loadTimeSec: number;
  ttfbMs: number;
  pageSizeKb: number;
  statusCode: number;
  compression: string;
  fcpSec: number;
  lcpSec: number;
  clsScore: number;
  metrics: AuditMetric[];
}

export interface SeoData {
  score: number;
  title: string;
  titleLength: number;
  metaDescription: string;
  descriptionLength: number;
  canonicalUrl: string | null;
  hasRobotsTxt: boolean;
  hasSitemap: boolean;
  h1List: string[];
  h2Count: number;
  totalImages: number;
  imagesWithAlt: number;
  internalLinks: number;
  externalLinks: number;
  openGraph: {
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
  };
  twitterCard: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  metrics: AuditMetric[];
}

export interface SecurityData {
  score: number;
  isHttps: boolean;
  tlsVersion: string;
  headers: {
    hsts: boolean;
    csp: boolean;
    xFrameOptions: boolean;
    xContentTypeOptions: boolean;
    referrerPolicy: boolean;
    permissionsPolicy: boolean;
  };
  vulnerabilitiesFound: string[];
  metrics: AuditMetric[];
}

export interface AccessibilityData {
  score: number;
  hasLang: boolean;
  langValue: string;
  missingAltCount: number;
  missingFormLabels: number;
  ariaElementsCount: number;
  buttonAccessibilityOk: boolean;
  viewportMetaOk: boolean;
  wcagLevel: 'AAA' | 'AA' | 'A' | 'Fail';
  metrics: AuditMetric[];
}

export interface TrustData {
  trustScore: number;
  status: 'Safe' | 'Suspicious' | 'High Risk';
  domain: string;
  isIpAddress: boolean;
  hasSuspiciousKeywords: boolean;
  detectedKeywords: string[];
  reasons: string[];
  safetyFlags: string[];
  verdict: string;
}

export interface TechStackData {
  frameworks: string[];
  cms: string[];
  analytics: string[];
  server: string;
  cdn: string;
  uiLibraries: string[];
}

export interface CarbonData {
  co2Grams: number;
  rating: 'A+' | 'A' | 'B' | 'C' | 'D' | 'E';
  cleanerThanPercent: number;
  isGreenHost: boolean;
}

export interface AiIssue {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  fix: string;
  codeSnippet?: string;
}

export interface AiDoctorData {
  summary: string;
  overallHealth: string;
  strengths: string[];
  criticalIssues: AiIssue[];
  quickWins: string[];
}

export interface WebsiteIntelligence {
  name: string;
  tagline: string;
  category: string;
  summary: string;
  whatItDoes: string;
  targetAudience: string;
  businessModel: string;
  coreOfferings: string[];
  primaryNiche: string;
  isCommercial: boolean;
  keyKeywords: string[];
}

export interface FullAuditReport {
  id: string;
  url: string;
  domain: string;
  timestamp: string;
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  performance: PerformanceData;
  seo: SeoData;
  security: SecurityData;
  accessibility: AccessibilityData;
  trust: TrustData;
  techStack: TechStackData;
  carbon: CarbonData;
  aiDoctor: AiDoctorData;
  websiteIntelligence: WebsiteIntelligence;
}
