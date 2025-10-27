// A/B Testing service for experimentation and optimization
class ABTestingService {
  constructor() {
    this.experiments = new Map();
    this.userId = this.getUserId();
    this.sessionId = this.getSessionId();
    this.isEnabled = process.env.NODE_ENV === 'production';
  }

  getUserId() {
    return localStorage.getItem('user_id') || 'anonymous_' + Math.random().toString(36).substr(2, 9);
  }

  getSessionId() {
    return sessionStorage.getItem('session_id') || 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Define an A/B test
  defineExperiment(experimentName, variants, options = {}) {
    const experiment = {
      name: experimentName,
      variants: variants,
      trafficAllocation: options.trafficAllocation || 1.0, // 100% by default
      startDate: options.startDate || new Date(),
      endDate: options.endDate || null,
      isActive: true,
      metrics: options.metrics || [],
      winner: null
    };

    this.experiments.set(experimentName, experiment);
    return experiment;
  }

  // Get user's variant for an experiment
  getVariant(experimentName) {
    const experiment = this.experiments.get(experimentName);
    if (!experiment || !experiment.isActive) {
      return null;
    }

    // Check if user is already assigned to a variant
    const storedVariant = localStorage.getItem(`ab_test_${experimentName}`);
    if (storedVariant) {
      return storedVariant;
    }

    // Assign user to a variant based on consistent hashing
    const hash = this.hashString(this.userId + experimentName);
    const variantIndex = Math.floor(hash * experiment.variants.length);
    const variant = experiment.variants[variantIndex];

    // Store the assignment
    localStorage.setItem(`ab_test_${experimentName}`, variant);
    
    // Track the assignment
    this.trackAssignment(experimentName, variant);

    return variant;
  }

  // Check if user is in a specific variant
  isInVariant(experimentName, variant) {
    return this.getVariant(experimentName) === variant;
  }

  // Track experiment event
  trackEvent(experimentName, eventName, properties = {}) {
    const variant = this.getVariant(experimentName);
    if (!variant) return;

    const event = {
      experimentName,
      variant,
      eventName,
      properties,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: Date.now(),
      url: window.location.href
    };

    // Send to analytics
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.trackABTest(experimentName, variant, eventName);
    }

    // Store locally for debugging
    console.log('AB Test Event:', event);
  }

  // Track conversion
  trackConversion(experimentName, conversionName, value = 1) {
    this.trackEvent(experimentName, 'conversion', {
      conversionName,
      value
    });
  }

  // Track assignment
  trackAssignment(experimentName, variant) {
    this.trackEvent(experimentName, 'assignment', {
      variant
    });
  }

  // Hash function for consistent user assignment
  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) / 2147483647; // Normalize to 0-1
  }

  // Get experiment results
  getExperimentResults(experimentName) {
    // In a real implementation, this would fetch from your analytics service
    return {
      experimentName,
      totalUsers: 0,
      variants: {},
      significance: 0,
      winner: null
    };
  }

  // End an experiment
  endExperiment(experimentName, winner = null) {
    const experiment = this.experiments.get(experimentName);
    if (experiment) {
      experiment.isActive = false;
      experiment.winner = winner;
      experiment.endDate = new Date();
    }
  }

  // Get all active experiments
  getActiveExperiments() {
    return Array.from(this.experiments.values()).filter(exp => exp.isActive);
  }

  // Check if user should see experiment (traffic allocation)
  shouldShowExperiment(experimentName) {
    const experiment = this.experiments.get(experimentName);
    if (!experiment) return false;

    const hash = this.hashString(this.userId + experimentName + 'traffic');
    return hash < experiment.trafficAllocation;
  }
}

// Create singleton instance
export const abTesting = new ABTestingService();

// Define common experiments
export function initializeExperiments() {
  // Homepage hero section experiment
  abTesting.defineExperiment('homepage_hero', ['control', 'variant_a'], {
    trafficAllocation: 0.5, // 50% of users
    metrics: ['click_through_rate', 'conversion_rate'],
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  });

  // Book card layout experiment
  abTesting.defineExperiment('book_card_layout', ['grid', 'list'], {
    trafficAllocation: 0.3, // 30% of users
    metrics: ['add_to_cart_rate', 'view_details_rate'],
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days
  });

  // Search bar experiment
  abTesting.defineExperiment('search_bar_style', ['minimal', 'enhanced'], {
    trafficAllocation: 0.4, // 40% of users
    metrics: ['search_usage', 'search_conversion'],
    startDate: new Date(),
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000) // 21 days
  });

  // Newsletter signup experiment
  abTesting.defineExperiment('newsletter_cta', ['button', 'form'], {
    trafficAllocation: 0.2, // 20% of users
    metrics: ['signup_rate', 'email_engagement'],
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  });
}

// Initialize experiments
if (typeof window !== 'undefined') {
  initializeExperiments();
}

// Export individual functions for convenience
export const getVariant = (experimentName) => abTesting.getVariant(experimentName);
export const isInVariant = (experimentName, variant) => abTesting.isInVariant(experimentName, variant);
export const trackEvent = (experimentName, eventName, properties) => abTesting.trackEvent(experimentName, eventName, properties);
export const trackConversion = (experimentName, conversionName, value) => abTesting.trackConversion(experimentName, conversionName, value);
export const shouldShowExperiment = (experimentName) => abTesting.shouldShowExperiment(experimentName);
