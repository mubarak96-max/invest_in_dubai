// Google Analytics utility functions

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Check if GA is available
const isGAAvailable = () => {
  return typeof window !== 'undefined' && window.gtag && GA_ID;
};

// Track page views
export const trackPageView = (url) => {
  if (isGAAvailable()) {
    window.gtag('config', GA_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (action, category = 'engagement', label = '', value = 0) => {
  if (isGAAvailable()) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined tracking functions for common actions
export const analytics = {
  // Property interactions
  viewProperty: (propertyId, propertyTitle) => {
    trackEvent('view_property', 'property', `${propertyId} - ${propertyTitle}`);
  },

  contactProperty: (propertyId, propertyTitle) => {
    trackEvent('contact_property', 'property', `${propertyId} - ${propertyTitle}`);
  },

  favoriteProperty: (propertyId, propertyTitle) => {
    trackEvent('favorite_property', 'property', `${propertyId} - ${propertyTitle}`);
  },

  // Search and filters
  searchProperties: (searchTerm) => {
    trackEvent('search', 'property_search', searchTerm);
  },

  filterProperties: (filterType, filterValue) => {
    trackEvent('filter', 'property_filter', `${filterType}: ${filterValue}`);
  },

  // Navigation
  viewArea: (areaName) => {
    trackEvent('view_area', 'navigation', areaName);
  },

  viewDeveloper: (developerName) => {
    trackEvent('view_developer', 'navigation', developerName);
  },

  viewProject: (projectName) => {
    trackEvent('view_project', 'navigation', projectName);
  },

  // Forms and CTAs
  submitContactForm: (formType) => {
    trackEvent('submit_form', 'form', formType);
  },

  downloadBrochure: (propertyId, propertyTitle) => {
    trackEvent('download_brochure', 'property', `${propertyId} - ${propertyTitle}`);
  },

  requestConsultation: () => {
    trackEvent('request_consultation', 'cta', 'free_consultation');
  },

  // Investment calculator
  useCalculator: (propertyPrice, calculationType) => {
    trackEvent('use_calculator', 'tools', `${calculationType} - ${propertyPrice}`);
  },

  // Market insights
  readInsight: (insightTitle) => {
    trackEvent('read_insight', 'content', insightTitle);
  },

  // Social sharing
  shareProperty: (propertyId, platform) => {
    trackEvent('share', 'social', `${platform} - ${propertyId}`);
  },

  // Phone calls and WhatsApp
  callAgent: (propertyId) => {
    trackEvent('call_agent', 'contact', propertyId);
  },

  whatsappContact: (propertyId) => {
    trackEvent('whatsapp_contact', 'contact', propertyId);
  },

  // Map interactions
  viewPropertyMap: () => {
    trackEvent('view_map', 'navigation', 'property_map');
  },

  // Newsletter and subscriptions
  subscribeNewsletter: (email) => {
    trackEvent('subscribe', 'newsletter', 'email_signup');
  },

  // Error tracking
  trackError: (errorMessage, page) => {
    trackEvent('error', 'technical', `${page}: ${errorMessage}`);
  }
};

export default analytics;
