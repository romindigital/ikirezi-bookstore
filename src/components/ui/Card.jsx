import React from 'react';

const Card = {
  // Main card container with consistent styling
  Container: ({ children, className = '', padding = 'default', shadow = 'default', ...props }) => {
    const paddings = {
      none: '',
      sm: 'p-4',
      default: 'p-6',
      lg: 'p-8'
    };

    const shadows = {
      none: '',
      sm: 'shadow-sm',
      default: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl'
    };

    return (
      <div
        className={`bg-white rounded-2xl border border-gray-100 ${paddings[padding]} ${shadows[shadow]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },

  // Card header with title and optional actions
  Header: ({ title, subtitle, actions, className = '', ...props }) => (
    <div className={`flex items-center justify-between mb-6 pb-4 border-b border-gray-100 ${className}`} {...props}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center space-x-3">{actions}</div>}
    </div>
  ),

  // Card content area
  Content: ({ children, className = '', ...props }) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),

  // Card footer
  Footer: ({ children, className = '', ...props }) => (
    <div className={`mt-6 pt-4 border-t border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  ),

  // Product card for books
  Product: ({ children, className = '', onClick, ...props }) => (
    <div
      className={`group bg-white border-2 border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  ),

  // Order/Summary card
  Summary: ({ children, className = '', ...props }) => (
    <div
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  ),

  // Empty state card
  Empty: ({ icon, title, description, actions, className = '', ...props }) => (
    <div className={`text-center py-16 px-4 ${className}`} {...props}>
      <div className="max-w-md mx-auto">
        {icon && <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">{icon}</div>}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-8 text-lg">{description}</p>
        {actions && <div className="flex flex-col sm:flex-row gap-4 justify-center">{actions}</div>}
      </div>
    </div>
  )
};

export default Card;