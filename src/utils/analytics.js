/**
 * Google Analytics 4 (GA4) Custom Event Tracking Helper
 *
 * Easily log user behaviors: what sections they look at, what buttons they click,
 * and what custom cards they interact with.
 */

// Track a custom event
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...eventParams,
      timestamp: new Date().toISOString(),
    });
  } else {
    // Silent fallback in dev mode if GA is not loaded/blocked
    console.debug(`[Analytics Event Logged]: ${eventName}`, eventParams);
  }
};

// Track specific portfolio interactions
export const trackPortfolioClick = (itemName, category = 'navigation') => {
  trackEvent('portfolio_click', {
    item_name: itemName,
    category: category,
  });
};

// Track AI Guide usage (what users are asking about)
export const trackAIGuideQuery = (queryText, detectedIntent = 'general_qa') => {
  trackEvent('ai_guide_query', {
    query: queryText,
    intent: detectedIntent,
  });
};

// Track Section Views / Hovers (what users read most)
export const trackSectionHover = (sectionId) => {
  trackEvent('section_hover', {
    section_id: sectionId,
  });
};
