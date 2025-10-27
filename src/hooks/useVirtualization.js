import { useState, useEffect, useRef, useMemo } from 'react';

/**
 * Custom hook for virtualizing large lists
 * @param {Array} items - The array of items to virtualize
 * @param {Object} options - Configuration options
 * @returns {Object} Virtualization state and methods
 */
export function useVirtualization(items, options = {}) {
  const {
    itemHeight = 200,
    containerHeight = 600,
    overscan = 5,
    threshold = 0.1
  } = options;

  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeightState, setContainerHeight] = useState(containerHeight);
  const containerRef = useRef(null);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeightState / itemHeight) + overscan,
      items.length - 1
    );
    
    return {
      startIndex: Math.max(0, startIndex - overscan),
      endIndex: Math.max(0, endIndex)
    };
  }, [scrollTop, itemHeight, containerHeightState, overscan, items.length]);

  // Get visible items
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex + 1);
  }, [items, visibleRange]);

  // Calculate total height
  const totalHeight = items.length * itemHeight;

  // Calculate offset for visible items
  const offsetY = visibleRange.startIndex * itemHeight;

  // Handle scroll events
  const handleScroll = (e) => {
    const newScrollTop = e.target.scrollTop;
    setScrollTop(newScrollTop);
  };

  // Resize observer for container height
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return {
    containerRef,
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
    visibleRange,
    isScrolling: scrollTop > 0
  };
}

/**
 * Hook for infinite scroll with virtualization
 * @param {Array} items - The array of items
 * @param {Function} loadMore - Function to load more items
 * @param {Object} options - Configuration options
 * @returns {Object} Infinite scroll state and methods
 */
export function useInfiniteVirtualization(items, loadMore, options = {}) {
  const {
    itemHeight = 200,
    containerHeight = 600,
    overscan = 5,
    threshold = 0.1
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const virtualization = useVirtualization(items, {
    itemHeight,
    containerHeight,
    overscan
  });

  // Load more when approaching the end
  useEffect(() => {
    const { visibleRange } = virtualization;
    const { endIndex } = visibleRange;
    
    if (
      !isLoading &&
      hasMore &&
      endIndex >= items.length - 10 && // Load when 10 items from end
      items.length > 0
    ) {
      setIsLoading(true);
      loadMore(page + 1)
        .then((newItems) => {
          if (newItems && newItems.length > 0) {
            setPage(prev => prev + 1);
            setHasMore(newItems.length >= 20); // Assuming 20 items per page
          } else {
            setHasMore(false);
          }
        })
        .catch((error) => {
          console.error('Error loading more items:', error);
          setHasMore(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [virtualization.visibleRange, isLoading, hasMore, items.length, page, loadMore]);

  return {
    ...virtualization,
    isLoading,
    hasMore,
    loadMore: () => {
      if (!isLoading && hasMore) {
        setIsLoading(true);
        loadMore(page + 1)
          .then((newItems) => {
            if (newItems && newItems.length > 0) {
              setPage(prev => prev + 1);
              setHasMore(newItems.length >= 20);
            } else {
              setHasMore(false);
            }
          })
          .catch((error) => {
            console.error('Error loading more items:', error);
            setHasMore(false);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  };
}
