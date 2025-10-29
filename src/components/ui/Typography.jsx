import React from 'react';

const Typography = {
  // Page Titles - Large, bold, dark text
  PageTitle: ({ children, className = '', ...props }) => (
    <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight ${className}`} {...props}>
      {children}
    </h1>
  ),

  // Section Titles - Medium-large, bold
  SectionTitle: ({ children, className = '', ...props }) => (
    <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight ${className}`} {...props}>
      {children}
    </h2>
  ),

  // Subsection Titles - Medium, semibold
  SubsectionTitle: ({ children, className = '', ...props }) => (
    <h3 className={`text-xl md:text-2xl font-semibold text-gray-900 leading-snug ${className}`} {...props}>
      {children}
    </h3>
  ),

  // Card Titles - Small-medium, semibold
  CardTitle: ({ children, className = '', ...props }) => (
    <h4 className={`text-lg md:text-xl font-semibold text-gray-900 leading-snug ${className}`} {...props}>
      {children}
    </h4>
  ),

  // Small Titles - Small, semibold
  SmallTitle: ({ children, className = '', ...props }) => (
    <h5 className={`text-base md:text-lg font-semibold text-gray-900 leading-snug ${className}`} {...props}>
      {children}
    </h5>
  ),

  // Lead Text - Large, readable paragraphs
  Lead: ({ children, className = '', ...props }) => (
    <p className={`text-lg md:text-xl text-gray-700 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  ),

  // Body Text - Standard paragraphs
  Body: ({ children, className = '', ...props }) => (
    <p className={`text-base text-gray-700 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  ),

  // Small Text - Smaller paragraphs or captions
  Small: ({ children, className = '', ...props }) => (
    <p className={`text-sm text-gray-600 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  ),

  // Muted Text - Very subtle text
  Muted: ({ children, className = '', ...props }) => (
    <p className={`text-sm text-gray-500 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  ),

  // Accent Text - Emerald colored text for emphasis
  Accent: ({ children, className = '', ...props }) => (
    <span className={`text-emerald-600 font-medium ${className}`} {...props}>
      {children}
    </span>
  ),

  // Price Text - Special styling for prices
  Price: ({ children, className = '', size = 'md', ...props }) => {
    const sizes = {
      sm: 'text-lg',
      md: 'text-xl md:text-2xl',
      lg: 'text-2xl md:text-3xl',
      xl: 'text-3xl md:text-4xl'
    };
    return (
      <span className={`font-bold text-emerald-600 ${sizes[size]} ${className}`} {...props}>
        {children}
      </span>
    );
  },

  // Label Text - For form labels and small UI text
  Label: ({ children, className = '', ...props }) => (
    <label className={`block text-sm font-medium text-gray-700 mb-1 ${className}`} {...props}>
      {children}
    </label>
  ),

  // Error Text - For validation messages
  Error: ({ children, className = '', ...props }) => (
    <p className={`text-sm text-red-600 mt-1 ${className}`} {...props}>
      {children}
    </p>
  ),

  // Success Text - For success messages
  Success: ({ children, className = '', ...props }) => (
    <p className={`text-sm text-green-600 mt-1 ${className}`} {...props}>
      {children}
    </p>
  )
};

export default Typography;