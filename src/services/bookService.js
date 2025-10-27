import { mockApi } from '../data/mockData';

export const bookService = {
  async getBooks(params = {}) {
    try {
      return await mockApi.getBooks(params);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch books');
    }
  },

  async getBookById(id) {
    try {
      return await mockApi.getBookById(id);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch book details');
    }
  },

  async searchBooks(query, filters = {}) {
    try {
      return await mockApi.getBooks({ search: query, ...filters });
    } catch (error) {
      throw new Error(error.message || 'Search failed');
    }
  },

  async getFeaturedBooks() {
    try {
      return await mockApi.getFeaturedBooks();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch featured books');
    }
  },

  async getBooksByCategory(category) {
    try {
      return await mockApi.getBooksByCategory(category);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch books by category');
    }
  },

  async getRelatedBooks(bookId) {
    try {
      // For demo, return random books excluding the current one
      const allBooks = await mockApi.getBooks();
      return allBooks.filter(book => book.id !== parseInt(bookId)).slice(0, 4);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch related books');
    }
  },

  async getBookReviews(bookId) {
    try {
      return await mockApi.getBookReviews(bookId);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch reviews');
    }
  },

  async getBookAnalytics(bookId) {
    try {
      await mockApi.delay(300);
      // Mock analytics data
      return {
        readingTime: '6-8 hours',
        difficulty: 'Intermediate',
        popularityScore: 85,
        completionRate: 78,
        averageRating: 4.2
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch book analytics');
    }
  },

  async getBookSocialStats(bookId) {
    try {
      await mockApi.delay(200);
      // Mock social stats data
      return {
        readersCount: Math.floor(Math.random() * 1000) + 100,
        bookmarksCount: Math.floor(Math.random() * 500) + 50,
        viewsCount: Math.floor(Math.random() * 5000) + 500,
        sharesCount: Math.floor(Math.random() * 200) + 20
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch social stats');
    }
  },

  async addBookReview(bookId, reviewData) {
    try {
      // Simulate adding review
      await mockApi.delay(500);
      return { success: true, message: 'Review added successfully' };
    } catch (error) {
      throw new Error(error.message || 'Failed to add review');
    }
  },

  async getCategories() {
    try {
      return await mockApi.getCategories();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch categories');
    }
  },

  // Admin functions
  async createBook(bookData) {
    try {
      await mockApi.delay(800);
      return { success: true, message: 'Book created successfully' };
    } catch (error) {
      throw new Error(error.message || 'Failed to create book');
    }
  },

  async updateBook(id, bookData) {
    try {
      await mockApi.delay(600);
      return { success: true, message: 'Book updated successfully' };
    } catch (error) {
      throw new Error(error.message || 'Failed to update book');
    }
  },

  async deleteBook(id) {
    try {
      await mockApi.delay(400);
      return { success: true, message: 'Book deleted successfully' };
    } catch (error) {
      throw new Error(error.message || 'Failed to delete book');
    }
  }
};
