// Analytics service for tracking user behavior and performance
class AnalyticsService {
  constructor() {
    this.events = [];
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
    this.isEnabled = process.env.NODE_ENV === 'production';
  }

  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  getUserId() {
    return localStorage.getItem('user_id') || 'anonymous_' + Math.random().toString(36).substr(2, 9);
  }

  // Track page views
  trackPageView(page, title, url) {
    const event = {
      type: 'page_view',
      page,
      title,
      url: url || window.location.href,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`
    };

    this.sendEvent(event);
  }

  // Track user interactions
  trackInteraction(action, element, value = null, category = null) {
    const event = {
      type: 'interaction',
      action,
      element,
      value,
      category,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      url: window.location.href
    };

    this.sendEvent(event);
  }

  // Track e-commerce events
  trackEcommerce(eventName, data) {
    const event = {
      type: 'ecommerce',
      event: eventName,
      data,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      url: window.location.href
    };

    this.sendEvent(event);
  }

  // Track performance metrics
  trackPerformance(metric, value, unit = 'ms') {
    const event = {
      type: 'performance',
      metric,
      value,
      unit,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      url: window.location.href
    };

    this.sendEvent(event);
  }

  // Track errors
  trackError(error, context = {}) {
    const event = {
      type: 'error',
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      context,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      url: window.location.href
    };

    this.sendEvent(event);
  }

  // Track custom events
  trackCustomEvent(eventName, properties = {}) {
    const event = {
      type: 'custom',
      event: eventName,
      properties,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      url: window.location.href
    };

    this.sendEvent(event);
  }

  // Send event to analytics service
  sendEvent(event) {
    if (!this.isEnabled) {
      // Only log in development if it's an important event
      if (event.type === 'error' || event.type === 'performance') {
        console.log('Analytics Event:', event);
      }
      return;
    }

    // In production, send to your analytics service
    // Example: Google Analytics, Mixpanel, Amplitude, etc.
    this.events.push(event);
    
    // Batch send events every 10 seconds or when 20 events are queued
    if (this.events.length >= 20) {
      this.flushEvents();
    }
  }

  // Flush events to server
  flushEvents() {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    // Send to your analytics endpoint
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        events: eventsToSend,
        sessionId: this.sessionId,
        userId: this.userId
      })
    }).catch(error => {
      console.error('Failed to send analytics events:', error);
      // Re-queue events on failure
      this.events.unshift(...eventsToSend);
    });
  }

  // Set user properties
  setUserProperties(properties) {
    const event = {
      type: 'user_properties',
      properties,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId
    };

    this.sendEvent(event);
  }

  // Track conversion funnel
  trackFunnelStep(step, data = {}) {
    const event = {
      type: 'funnel',
      step,
      data,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      url: window.location.href
    };

    this.sendEvent(event);
  }

  // Track A/B test participation
  trackABTest(testName, variant, action) {
    const event = {
      type: 'ab_test',
      testName,
      variant,
      action,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId: this.userId,
      url: window.location.href
    };

    this.sendEvent(event);
  }

  // Initialize analytics
  init() {
    // Track initial page view
    this.trackPageView(
      window.location.pathname,
      document.title,
      window.location.href
    );

    // Set up automatic flushing
    setInterval(() => {
      this.flushEvents();
    }, 10000);

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackCustomEvent('page_hidden');
      } else {
        this.trackCustomEvent('page_visible');
      }
    });

    // Track unload events
    window.addEventListener('beforeunload', () => {
      this.flushEvents();
    });
  }
}

// Create singleton instance
export const analytics = new AnalyticsService();

// Initialize on load
if (typeof window !== 'undefined') {
  analytics.init();
}

// Export individual tracking functions for convenience
export const trackPageView = (page, title, url) => analytics.trackPageView(page, title, url);
export const trackInteraction = (action, element, value, category) => analytics.trackInteraction(action, element, value, category);
export const trackEcommerce = (eventName, data) => analytics.trackEcommerce(eventName, data);
export const trackPerformance = (metric, value, unit) => analytics.trackPerformance(metric, value, unit);
export const trackError = (error, context) => analytics.trackError(error, context);
export const trackCustomEvent = (eventName, properties) => analytics.trackCustomEvent(eventName, properties);
export const trackFunnelStep = (step, data) => analytics.trackFunnelStep(step, data);
export const trackABTest = (testName, variant, action) => analytics.trackABTest(testName, variant, action);