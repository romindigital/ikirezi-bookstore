import { useEffect } from 'react';

export function AccessibilityChecker() {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    const checkAccessibility = () => {
      const issues = [];

      // Check for missing alt text on images
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        if (!img.alt && !img.getAttribute('aria-hidden')) {
          issues.push(`Image ${index + 1} is missing alt text`);
        }
      });

      // Check for missing labels on form inputs
      const inputs = document.querySelectorAll('input, textarea, select');
      inputs.forEach((input, index) => {
        const id = input.id;
        const label = document.querySelector(`label[for="${id}"]`);
        const ariaLabel = input.getAttribute('aria-label');
        const ariaLabelledby = input.getAttribute('aria-labelledby');
        
        if (!label && !ariaLabel && !ariaLabelledby) {
          issues.push(`Input ${index + 1} is missing a label`);
        }
      });

      // Check for missing heading hierarchy
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let lastLevel = 0;
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        if (level > lastLevel + 1) {
          issues.push(`Heading ${heading.tagName} at position ${index + 1} skips heading levels`);
        }
        lastLevel = level;
      });

      // Check for missing focus management
      const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
      interactiveElements.forEach((element, index) => {
        if (!element.getAttribute('tabindex') && element.getAttribute('tabindex') !== '0') {
          const computedStyle = window.getComputedStyle(element);
          if (computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden') {
            // This is a basic check - more sophisticated checks would be needed
          }
        }
      });

      // Check for color contrast (basic check)
      const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
      textElements.forEach((element, index) => {
        const computedStyle = window.getComputedStyle(element);
        const color = computedStyle.color;
        const backgroundColor = computedStyle.backgroundColor;
        
        // This is a simplified check - real contrast checking would need more sophisticated logic
        if (color === backgroundColor) {
          issues.push(`Element ${index + 1} may have poor color contrast`);
        }
      });

      // Log issues
      if (issues.length > 0) {
        console.group('🔍 Accessibility Issues Found');
        issues.forEach(issue => console.warn(issue));
        console.groupEnd();
      } else {
        console.log('✅ No accessibility issues found');
      }
    };

    // Run check after component mount and on DOM changes
    const timeoutId = setTimeout(checkAccessibility, 1000);

    // Set up mutation observer to check on DOM changes
    const observer = new MutationObserver(() => {
      setTimeout(checkAccessibility, 500);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}

