import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import { CompactBookCard } from '../../components/CompactBookCard';
import { FilterPanel } from '../../components/FilterPanel';
import { MobileFilterSheet } from '../../components/MobileFilterSheet';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { EmptyState } from '../../components/EmptyState';
import { useTranslation } from '../../hooks/useTranslation';
import { useCart } from '../../context/CartContext';

const mockBooks = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=280&h=360&fit=crop',
    rating: 4.7,
    stock: 12,
    isNew: true
  },
  // Add more mock books
];

export default function CategoryPage() {
  const { category, subcategory } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    price: [0, 100],
    rating: 0,
    availability: 'all',
    format: 'all',
    language: 'all',
    sortBy: 'featured'
  });
  const [viewMode, setViewMode] = useState('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Get category title from route
  const getCategoryTitle = () => {
    const path = location.pathname;
    if (path.includes('/fiction')) return t('categories.fiction');
    if (path.includes('/nonfiction')) return t('categories.nonfiction');
    if (path.includes('/children')) return t('categories.children');
    return t('categories.all_books');
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBooks(mockBooks);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [category, subcategory]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const filteredBooks = books.filter(book => {
    if (filters.price[0] > book.price || filters.price[1] < book.price) return false;
    if (filters.rating > 0 && book.rating < filters.rating) return false;
    if (filters.availability === 'in_stock' && book.stock === 0) return false;
    if (filters.availability === 'out_of_stock' && book.stock > 0) return false;
    return true;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.isNew ? 1 : -1;
      default:
        return 0;
    }
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{getCategoryTitle()}</h1>
          {subcategory && (
            <p className="mt-2 text-gray-600">
              {t('categories.browsing_category', { category: subcategory })}
            </p>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Books Grid */}
          <main className="lg:col-span-9">
            {/* Toolbar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {t('categories.filters')}
                </button>

                {/* Results Count */}
                <p className="text-sm text-gray-600">
                  {t('categories.showing_results', { count: sortedBooks.length })}
                </p>
              </div>

              {/* View Mode and Sort */}
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center border border-gray-300 rounded-lg divide-x">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                    className="text-sm border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="featured">{t('categories.sort.featured')}</option>
                    <option value="price_low">{t('categories.sort.price_low')}</option>
                    <option value="price_high">{t('categories.sort.price_high')}</option>
                    <option value="rating">{t('categories.sort.rating')}</option>
                    <option value="newest">{t('categories.sort.newest')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Books Grid */}
            {sortedBooks.length === 0 ? (
              <EmptyState
                icon={Filter}
                title={t('categories.no_results')}
                description={t('categories.no_results_description')}
                action={{
                  label: t('categories.clear_filters'),
                  onClick: () => setFilters({
                    price: [0, 100],
                    rating: 0,
                    availability: 'all',
                    format: 'all',
                    language: 'all',
                    sortBy: 'featured'
                  })
                }}
              />
            ) : (
              <div className={`grid ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                  : 'grid-cols-1'
              } gap-6`}>
                {sortedBooks.map((book) => (
                  <CompactBookCard
                    key={book.id}
                    book={book}
                    onAddToCart={() => addToCart(book)}
                    className={viewMode === 'list' ? 'w-full !max-w-none' : ''}
                  />
                ))}
              </div>
            )}
          </main>
        </div>

        {/* Mobile Filter Sheet */}
        <MobileFilterSheet
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
}