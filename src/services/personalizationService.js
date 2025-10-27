// Personalization service for user-specific recommendations and content
class PersonalizationService {
  constructor() {
    this.userPreferences = this.loadUserPreferences();
    this.viewingHistory = this.loadViewingHistory();
    this.purchaseHistory = this.loadPurchaseHistory();
    this.searchHistory = this.loadSearchHistory();
  }

  // Load user preferences from localStorage
  loadUserPreferences() {
    try {
      return JSON.parse(localStorage.getItem('user_preferences') || '{}');
    } catch {
      return {};
    }
  }

  // Load viewing history
  loadViewingHistory() {
    try {
      return JSON.parse(localStorage.getItem('viewing_history') || '[]');
    } catch {
      return [];
    }
  }

  // Load purchase history
  loadPurchaseHistory() {
    try {
      return JSON.parse(localStorage.getItem('purchase_history') || '[]');
    } catch {
      return [];
    }
  }

  // Load search history
  loadSearchHistory() {
    try {
      return JSON.parse(localStorage.getItem('search_history') || '[]');
    } catch {
      return [];
    }
  }

  // Save data to localStorage
  saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  // Track book view
  trackBookView(bookId, bookData) {
    const view = {
      bookId,
      timestamp: Date.now(),
      category: bookData.categories?.[0],
      author: bookData.author,
      price: bookData.price
    };

    // Add to viewing history
    this.viewingHistory.unshift(view);
    
    // Keep only last 50 views
    this.viewingHistory = this.viewingHistory.slice(0, 50);
    
    this.saveToStorage('viewing_history', this.viewingHistory);
  }

  // Track search query
  trackSearch(query, results) {
    const search = {
      query,
      resultsCount: results.length,
      timestamp: Date.now()
    };

    this.searchHistory.unshift(search);
    this.searchHistory = this.searchHistory.slice(0, 20);
    
    this.saveToStorage('search_history', this.searchHistory);
  }

  // Track purchase
  trackPurchase(orderData) {
    const purchase = {
      orderId: orderData.id,
      items: orderData.items,
      total: orderData.total,
      timestamp: Date.now()
    };

    this.purchaseHistory.unshift(purchase);
    this.purchaseHistory = this.purchaseHistory.slice(0, 100);
    
    this.saveToStorage('purchase_history', this.purchaseHistory);
  }

  // Get personalized recommendations
  getPersonalizedRecommendations(allBooks, limit = 8) {
    const recommendations = [];
    
    // Get user's favorite categories
    const favoriteCategories = this.getFavoriteCategories();
    
    // Get user's favorite authors
    const favoriteAuthors = this.getFavoriteAuthors();
    
    // Get recently viewed books
    const recentlyViewed = this.getRecentlyViewed();
    
    // Score books based on user preferences
    const scoredBooks = allBooks.map(book => {
      let score = 0;
      
      // Category preference
      if (book.categories?.some(cat => favoriteCategories.includes(cat))) {
        score += 3;
      }
      
      // Author preference
      if (favoriteAuthors.includes(book.author)) {
        score += 2;
      }
      
      // Price preference (prefer books in similar price range)
      const avgPrice = this.getAveragePurchasePrice();
      if (avgPrice && Math.abs(book.price - avgPrice) < 5) {
        score += 1;
      }
      
      // Avoid recently viewed books
      if (recentlyViewed.includes(book.id)) {
        score -= 2;
      }
      
      // Boost highly rated books
      if (book.rating > 4.5) {
        score += 1;
      }
      
      // Boost books with discounts
      if (book.discountPercent > 0) {
        score += 0.5;
      }
      
      return { ...book, personalizationScore: score };
    });
    
    // Sort by score and return top recommendations
    return scoredBooks
      .sort((a, b) => b.personalizationScore - a.personalizationScore)
      .slice(0, limit);
  }

  // Get favorite categories based on viewing/purchase history
  getFavoriteCategories() {
    const categoryCounts = {};
    
    // Count from viewing history
    this.viewingHistory.forEach(view => {
      if (view.category) {
        categoryCounts[view.category] = (categoryCounts[view.category] || 0) + 1;
      }
    });
    
    // Count from purchase history
    this.purchaseHistory.forEach(purchase => {
      purchase.items.forEach(item => {
        // This would need book category data from the item
        // For now, we'll use a simplified approach
      });
    });
    
    return Object.keys(categoryCounts)
      .sort((a, b) => categoryCounts[b] - categoryCounts[a])
      .slice(0, 5);
  }

  // Get favorite authors
  getFavoriteAuthors() {
    const authorCounts = {};
    
    this.viewingHistory.forEach(view => {
      if (view.author) {
        authorCounts[view.author] = (authorCounts[view.author] || 0) + 1;
      }
    });
    
    return Object.keys(authorCounts)
      .sort((a, b) => authorCounts[b] - authorCounts[a])
      .slice(0, 5);
  }

  // Get recently viewed book IDs
  getRecentlyViewed() {
    return this.viewingHistory.slice(0, 10).map(view => view.bookId);
  }

  // Get average purchase price
  getAveragePurchasePrice() {
    if (this.purchaseHistory.length === 0) return null;
    
    const totalSpent = this.purchaseHistory.reduce((sum, purchase) => sum + purchase.total, 0);
    return totalSpent / this.purchaseHistory.length;
  }

  // Get personalized homepage content
  getPersonalizedHomepageContent() {
    return {
      recommendedCategories: this.getFavoriteCategories().slice(0, 6),
      recentlyViewed: this.getRecentlyViewed(),
      searchSuggestions: this.getSearchSuggestions(),
      personalizedGreeting: this.getPersonalizedGreeting()
    };
  }

  // Get search suggestions based on history
  getSearchSuggestions() {
    const queryCounts = {};
    
    this.searchHistory.forEach(search => {
      queryCounts[search.query] = (queryCounts[search.query] || 0) + 1;
    });
    
    return Object.keys(queryCounts)
      .sort((a, b) => queryCounts[b] - queryCounts[a])
      .slice(0, 5);
  }

  // Get personalized greeting
  getPersonalizedGreeting() {
    const hour = new Date().getHours();
    const timeOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
    
    const userName = localStorage.getItem('user_name') || 'there';
    
    return `Good ${timeOfDay}, ${userName}!`;
  }

  // Update user preferences
  updatePreferences(preferences) {
    this.userPreferences = { ...this.userPreferences, ...preferences };
    this.saveToStorage('user_preferences', this.userPreferences);
  }

  // Get user preferences
  getPreferences() {
    return this.userPreferences;
  }

  // Clear all personalization data
  clearPersonalizationData() {
    localStorage.removeItem('user_preferences');
    localStorage.removeItem('viewing_history');
    localStorage.removeItem('purchase_history');
    localStorage.removeItem('search_history');
    
    this.userPreferences = {};
    this.viewingHistory = [];
    this.purchaseHistory = [];
    this.searchHistory = [];
  }

  // Get personalization insights
  getPersonalizationInsights() {
    return {
      totalBooksViewed: this.viewingHistory.length,
      totalSearches: this.searchHistory.length,
      totalPurchases: this.purchaseHistory.length,
      favoriteCategories: this.getFavoriteCategories(),
      favoriteAuthors: this.getFavoriteAuthors(),
      averagePurchasePrice: this.getAveragePurchasePrice(),
      lastActivity: this.viewingHistory[0]?.timestamp || null
    };
  }
}

// Create singleton instance
export const personalization = new PersonalizationService();

// Export individual functions for convenience
export const trackBookView = (bookId, bookData) => personalization.trackBookView(bookId, bookData);
export const trackSearch = (query, results) => personalization.trackSearch(query, results);
export const trackPurchase = (orderData) => personalization.trackPurchase(orderData);
export const getPersonalizedRecommendations = (allBooks, limit) => personalization.getPersonalizedRecommendations(allBooks, limit);
export const getPersonalizedHomepageContent = () => personalization.getPersonalizedHomepageContent();
export const updatePreferences = (preferences) => personalization.updatePreferences(preferences);
export const getPreferences = () => personalization.getPreferences();
