import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faTimes, faChevronDown, faSearch, faFilter, faSort } from '@fortawesome/free-solid-svg-icons';

export function FilterPanel({ 
  filters = {}, 
  onFiltersChange, 
  isOpen, 
  onToggle, 
  categories = [], 
  priceRanges = [],
  sortOptions = []
}) {
  const [localFilters, setLocalFilters] = useState(filters || {});

  // Sync local filters with props
  useEffect(() => {
    setLocalFilters(filters || {});
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      priceRange: '',
      sortBy: 'relevance',
      search: ''
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = localFilters && Object.values(localFilters).some(value => 
    value && value !== '' && value !== 'relevance'
  );

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'}`}
        onClick={onToggle}
      />
      
      {/* Panel */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon icon={faSliders} className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
            </div>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <FontAwesomeIcon icon={faSearch} className="w-4 h-4 text-blue-600" />
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={localFilters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search books..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Search by title, author, or description</p>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <FontAwesomeIcon icon={faFilter} className="w-4 h-4 text-green-600" />
                  Category
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all duration-200">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={!localFilters.category || localFilters.category === ''}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category} className="flex items-center p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all duration-200">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={localFilters.category === category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Range */}
            {priceRanges.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <FontAwesomeIcon icon={faFilter} className="w-4 h-4 text-orange-600" />
                  Price Range
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all duration-200">
                    <input
                      type="radio"
                      name="priceRange"
                      value=""
                      checked={!localFilters.priceRange || localFilters.priceRange === ''}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">Any Price</span>
                  </label>
                  {priceRanges.map((range) => (
                    <label key={range.value} className="flex items-center p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all duration-200">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range.value}
                        checked={localFilters.priceRange === range.value}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Sort By */}
            {sortOptions.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <FontAwesomeIcon icon={faSort} className="w-4 h-4 text-purple-600" />
                  Sort By
                </label>
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <label key={option.value} className="flex items-center p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all duration-200">
                      <input
                        type="radio"
                        name="sortBy"
                        value={option.value}
                        checked={localFilters.sortBy === option.value}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 space-y-3">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Clear All Filters
              </button>
            )}
            <button
              onClick={onToggle}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile Filter Toggle Button
export function FilterToggle({ onClick, filterCount = 0 }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <FontAwesomeIcon icon={faSliders} className="w-4 h-4 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">Filters</span>
      {filterCount > 0 && (
        <span className="px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
          {filterCount}
        </span>
      )}
    </button>
  );
}
