import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSliders, 
  faTimes, 
  faChevronDown, 
  faCheck,
  faFilter,
  faSort,
  faTag,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../hooks/useTranslation';

export function MobileFilterSheet({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  categories = [],
  priceRanges = [],
  sortOptions = []
}) {
  const { t } = useTranslation();
  const [localFilters, setLocalFilters] = useState(filters || {});
  const [activeTab, setActiveTab] = useState('filters');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      priceRange: '',
      sortBy: 'popular',
      search: ''
    };
    setLocalFilters(clearedFilters);
  };

  const hasActiveFilters = Object.values(localFilters).some(value => 
    value && value !== '' && value !== 'popular'
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 max-h-[85vh] flex flex-col">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faSliders} className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-900">{t('common.filters_and_sort') || 'Filters & Sort'}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('filters')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'filters' 
                ? 'text-emerald-600 border-b-2 border-green-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FontAwesomeIcon icon={faFilter} className="w-4 h-4 mr-2" />
            {t('common.filter')}
          </button>
          <button
            onClick={() => setActiveTab('sort')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'sort' 
                ? 'text-emerald-600 border-b-2 border-green-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FontAwesomeIcon icon={faSort} className="w-4 h-4 mr-2" />
            {t('common.sort')}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'filters' && (
            <div className="p-6 space-y-6">
              {/* Categories */}
              {categories.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FontAwesomeIcon icon={faTag} className="w-4 h-4 text-emerald-600" />
                    {t('common.categories') || t('nav.categories')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleFilterChange('category', category === 'All' ? '' : category)}
                        className={`p-3 rounded-xl text-sm font-medium transition-all ${
                          localFilters.category === category || (category === 'All' && !localFilters.category)
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              {priceRanges.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FontAwesomeIcon icon={faTag} className="w-4 h-4 text-emerald-600" />
                    {t('common.price_range') || 'Price Range'}
                  </h3>
                  <div className="space-y-3">
                    {priceRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => handleFilterChange('priceRange', range.value)}
                        className={`w-full p-3 rounded-xl text-sm font-medium transition-all text-left ${
                          localFilters.priceRange === range.value
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'sort' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-emerald-600" />
                {t('common.sort_by') || 'Sort By'}
              </h3>
              <div className="space-y-3">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange('sortBy', option.value)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      localFilters.sortBy === option.value
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                      {localFilters.sortBy === option.value && (
                        <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex-1 py-3 px-4 text-gray-700 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                {t('common.clear_all') || 'Clear All'}
              </button>
            )}
            <button
              onClick={applyFilters}
              className="flex-1 py-3 px-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
            >
              {t('common.apply_filters') || t('common.apply')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
