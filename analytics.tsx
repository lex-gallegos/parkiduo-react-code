// Analytics utility for tracking events according to Prompt Maestro specifications
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
  }
}

// Event naming convention: PRK_[Category]_[Action]
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'parkiduo',
      event_label: eventData?.label || '',
      custom_parameter: eventData?.custom || '',
      ...eventData
    });
  }
};

// Specific tracking functions according to Prompt Maestro event map
export const analytics = {
  // CTA tracking
  trackDriverCTA: (destination: string) => {
    trackEvent('PRK_CTA_Driver_Click', { 
      label: destination,
      button_destination: destination 
    });
  },

  trackParkerCTA: (destination: string) => {
    trackEvent('PRK_CTA_Parker_Click', { 
      label: destination,
      button_destination: destination 
    });
  },

  // FAQ tracking
  trackFAQToggle: (question: string) => {
    trackEvent('PRK_FAQ_Toggle', { 
      label: question,
      faq_question: question 
    });
  },

  // WhatsApp tracking
  trackWhatsAppClick: (location: string) => {
    trackEvent('PRK_WhatsApp_Click', { 
      label: location,
      whatsapp_location: location 
    });
  },

  // Scroll tracking
  trackScroll50: () => {
    trackEvent('PRK_Scroll_50', { 
      label: 'scroll_depth',
      scroll_depth: 50 
    });
  },

  trackScroll90: () => {
    trackEvent('PRK_Scroll_90', { 
      label: 'scroll_depth',
      scroll_depth: 90 
    });
  },

  // Testimonial tracking
  trackTestimonialView: (index: number) => {
    trackEvent('PRK_Testimonial_View', { 
      label: `testimonial_${index}`,
      testimonial_index: index 
    });
  },

  // Price section tracking
  trackPriceView: () => {
    trackEvent('PRK_Price_View', { 
      label: 'price_section',
      price_amount: '29.95' 
    });
  },

  // City selection tracking
  trackCityClick: (cityName: string) => {
    trackEvent('PRK_City_Click', { 
      label: cityName,
      city_name: cityName 
    });
  },

  // How it works section tracking
  trackHowItWorksView: (role: 'driver' | 'parker') => {
    trackEvent('PRK_HowItWorks_View', { 
      label: role,
      user_role: role 
    });
  },

  // Contract calculator tracking
  trackCalculatorClick: () => {
    trackEvent('PRK_Calculator_Click', { 
      label: 'price_calculator',
      tool_name: 'calculator' 
    });
  },

  // Price calculator tracking - new events
  trackPriceCalculatorView: () => {
    trackEvent('calc_view', { 
      label: 'calculator_view',
      tool_name: 'price_calculator' 
    });
  },

  trackPriceCalculatorCityChange: (city: string) => {
    trackEvent('calc_change_city', { 
      label: city,
      city: city 
    });
  },

  trackPriceCalculatorSlotChange: (slot: string) => {
    trackEvent('calc_change_slot', { 
      label: slot,
      slot: slot 
    });
  },

  trackPriceCalculatorHowItWorks: () => {
    trackEvent('calc_view_howitworks', { 
      label: 'how_it_works_from_calculator',
      source: 'price_calculator' 
    });
  },

  // Trust badge tracking
  trackTrustBadgeClick: (badgeType: string) => {
    trackEvent('PRK_Trust_Badge_Click', { 
      label: badgeType,
      badge_type: badgeType 
    });
  },

  // Page view tracking
  trackPageView: (pageName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-PARKIDUO123', {
        page_title: pageName,
        page_location: window.location.href
      });
    }
  }
};

// Scroll depth tracking setup
export const setupScrollTracking = () => {
  if (typeof window === 'undefined') return;

  let scroll50Triggered = false;
  let scroll90Triggered = false;

  const handleScroll = () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

    if (!scroll50Triggered && scrollPercent >= 50) {
      scroll50Triggered = true;
      analytics.trackScroll50();
    }

    if (!scroll90Triggered && scrollPercent >= 90) {
      scroll90Triggered = true;
      analytics.trackScroll90();
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

// Intersection Observer for element visibility tracking
export const trackElementVisibility = (elementId: string, eventName: string, eventData?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  const element = document.getElementById(elementId);
  if (!element) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trackEvent(eventName, eventData);
          observer.unobserve(element);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(element);
};

// Cookie consent tracking
export const trackCookieConsent = (consentType: 'accept_all' | 'reject_all' | 'customize') => {
  trackEvent('PRK_Cookie_Consent', { 
    label: consentType,
    consent_type: consentType 
  });
};

// Error tracking
export const trackError = (errorType: string, errorMessage: string) => {
  trackEvent('PRK_Error', { 
    label: errorType,
    error_type: errorType,
    error_message: errorMessage 
  });
};

// Form interaction tracking
export const trackFormStart = (formName: string) => {
  trackEvent('PRK_Form_Start', { 
    label: formName,
    form_name: formName 
  });
};

export const trackFormComplete = (formName: string) => {
  trackEvent('PRK_Form_Complete', { 
    label: formName,
    form_name: formName 
  });
};

// Search tracking
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent('PRK_Search', {
    label: searchTerm,
    search_term: searchTerm,
    results_count: resultsCount
  });
};

// Social share tracking
export const trackSocialShare = (platform: string, url: string) => {
  trackEvent('PRK_Social_Share', {
    label: platform,
    platform: platform,
    shared_url: url
  });
};