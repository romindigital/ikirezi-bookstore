import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // Performance monitoring
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Track Core Web Vitals (only log in development)
        if (entry.entryType === 'largest-contentful-paint') {
          if (process.env.NODE_ENV === 'development') {
            console.log('LCP:', entry.startTime);
          }
          // Send to analytics service
          // analytics.track('web_vital', { metric: 'LCP', value: entry.startTime });
        }
        
        if (entry.entryType === 'first-input') {
          if (process.env.NODE_ENV === 'development') {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
          // analytics.track('web_vital', { metric: 'FID', value: entry.processingStart - entry.startTime });
        }
        
        if (entry.entryType === 'layout-shift') {
          if (!entry.hadRecentInput) {
            if (process.env.NODE_ENV === 'development') {
              console.log('CLS:', entry.value);
            }
            // analytics.track('web_vital', { metric: 'CLS', value: entry.value });
          }
        }
      }
    });

    // Observe Core Web Vitals
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      // Browser doesn't support these metrics
      console.log('Performance monitoring not supported');
    }

    // Track page load time
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        if (process.env.NODE_ENV === 'development') {
          console.log('Page Load Time:', loadTime);
        }
        // analytics.track('page_load_time', { value: loadTime });
      }
    });

    // Track user interactions
    const trackInteraction = (event) => {
      const interaction = {
        type: event.type,
        target: event.target.tagName,
        timestamp: Date.now(),
        url: window.location.pathname
      };
      // Only log important interactions in development
      if (process.env.NODE_ENV === 'development' && event.type === 'click') {
        console.log('User Interaction:', interaction);
      }
      // analytics.track('user_interaction', interaction);
    };

    // Add event listeners for key interactions
    document.addEventListener('click', trackInteraction);
    document.addEventListener('scroll', trackInteraction);
    document.addEventListener('keydown', trackInteraction);

    // Cleanup
    return () => {
      observer.disconnect();
      document.removeEventListener('click', trackInteraction);
      document.removeEventListener('scroll', trackInteraction);
      document.removeEventListener('keydown', trackInteraction);
    };
  }, []);

  return null; // This component doesn't render anything
}

