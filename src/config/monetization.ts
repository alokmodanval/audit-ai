/**
 * Monetization Configuration for Audit AI
 * Supports Monetag SmartLink (Direct Link) and ad integration.
 */

export const MONETIZATION_CONFIG = {
  // Whether SmartLink monetization is enabled
  enabled: true,

  // Monetag SmartLink / Direct Link URL
  smartLinkUrl: 'https://uplcm.com/4/12323974',

  // Fallback / Partner label
  partnerLabel: 'AI Cloud Optimizer',
};

/**
 * Safely trigger the Monetag SmartLink in a new tab.
 * Ensures popup blockers don't completely swallow user-initiated events.
 */
export const triggerSmartLink = (customUrl?: string): boolean => {
  if (!MONETIZATION_CONFIG.enabled) return false;

  const url = customUrl || MONETIZATION_CONFIG.smartLinkUrl;
  if (!url) {
    console.info('[Monetag] SmartLink URL is not yet configured.');
    return false;
  }

  try {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
      return true;
    }
  } catch (e) {
    console.error('[Monetag] Failed to open SmartLink:', e);
  }
  return false;
};
