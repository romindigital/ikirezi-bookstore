import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBookOpen, faRefresh, faHome } from '@fortawesome/free-solid-svg-icons';

export function EmptyState({ 
  type = 'no-results', 
  title, 
  description, 
  action, 
  onAction,
  icon,
  className = ''
}) {
  const getEmptyStateConfig = () => {
    switch (type) {
      case 'no-results':
        return {
          icon: faSearch,
          title: title || 'No books found',
          description: description || 'Try adjusting your search or filter criteria to find what you\'re looking for.',
          action: action || 'Clear filters',
          onAction: onAction || (() => window.location.reload())
        };
      case 'error':
        return {
          icon: faRefresh,
          title: title || 'Something went wrong',
          description: description || 'We couldn\'t load the books. Please try again.',
          action: action || 'Try again',
          onAction: onAction || (() => window.location.reload())
        };
      case 'offline':
        return {
          icon: faBookOpen,
          title: title || 'You\'re offline',
          description: description || 'Check your internet connection and try again.',
          action: action || 'Go home',
          onAction: onAction || (() => window.location.href = '/')
        };
      case 'loading':
        return {
          icon: faBookOpen,
          title: title || 'Loading books...',
          description: description || 'Please wait while we fetch your books.',
          action: null,
          onAction: null
        };
      default:
        return {
          icon: icon || faBookOpen,
          title: title || 'Empty state',
          description: description || 'No content available.',
          action: action || 'Refresh',
          onAction: onAction || (() => window.location.reload())
        };
    }
  };

  const config = getEmptyStateConfig();

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="text-center max-w-md">
        <div className="mb-6">
          <FontAwesomeIcon 
            icon={config.icon} 
            className={`w-16 h-16 mx-auto ${
              type === 'error' ? 'text-red-500' :
              type === 'offline' ? 'text-yellow-500' :
              type === 'loading' ? 'text-blue-500 animate-pulse' :
              'text-gray-400'
            }`} 
          />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {config.title}
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {config.description}
        </p>
        
        {config.action && config.onAction && (
          <button
            onClick={config.onAction}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              type === 'error' 
                ? 'bg-red-600 text-white hover:bg-red-700'
                : type === 'offline'
                ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {config.action}
          </button>
        )}
      </div>
    </div>
  );
}

// Specialized empty state components
export function NoResultsEmptyState({ onClearFilters, searchQuery }) {
  return (
    <EmptyState
      type="no-results"
      title={searchQuery ? `No results for "${searchQuery}"` : 'No books found'}
      description="Try adjusting your search terms or clearing some filters to see more results."
      action="Clear all filters"
      onAction={onClearFilters}
    />
  );
}

export function ErrorEmptyState({ onRetry, error }) {
  return (
    <EmptyState
      type="error"
      title="Failed to load books"
      description={error || 'Something went wrong while loading the books. Please try again.'}
      action="Try again"
      onAction={onRetry}
    />
  );
}

export function OfflineEmptyState() {
  return (
    <EmptyState
      type="offline"
      title="You're offline"
      description="Check your internet connection and try again."
      action="Go home"
      onAction={() => window.location.href = '/'}
    />
  );
}
