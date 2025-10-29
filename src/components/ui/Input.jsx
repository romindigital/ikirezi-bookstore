import React from 'react';

const Input = {
  // Standard input field
  Field: ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    success,
    required = false,
    disabled = false,
    icon,
    className = '',
    ...props
  }) => (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white ${
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : success
              ? 'border-green-300 focus:ring-green-500 focus:border-green-500'
              : 'border-gray-300 hover:border-gray-400'
          } ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      {success && <p className="text-sm text-green-600 mt-1">{success}</p>}
    </div>
  ),

  // Search input with built-in search icon
  Search: ({
    placeholder = 'Search...',
    value,
    onChange,
    onSubmit,
    className = '',
    ...props
  }) => (
    <div className="relative flex-1 max-w-2xl">
      <div className="relative">
        <svg className="absolute left-6 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit && onSubmit(value)}
          className={`w-full pl-16 pr-8 py-5 border-2 border-slate-200 rounded-3xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 text-xl font-semibold bg-white/80 shadow-xl transition-all duration-300 hover:shadow-2xl placeholder-slate-400 ${className}`}
          {...props}
        />
        {value && (
          <button
            onClick={() => onChange({ target: { value: '' } })}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-2 rounded-full hover:bg-slate-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  ),

  // Select dropdown
  Select: ({
    label,
    options = [],
    value,
    onChange,
    placeholder = 'Select an option',
    required = false,
    disabled = false,
    error,
    className = '',
    ...props
  }) => (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-3 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 bg-white appearance-none pr-10 ${
            error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 hover:border-gray-400'
          } ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''} ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  ),

  // Quantity selector
  Quantity: ({
    value,
    onChange,
    min = 1,
    max = 99,
    disabled = false,
    className = ''
  }) => (
    <div className={`flex items-center border border-gray-300 rounded-xl bg-white ${className}`}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      <span className="px-4 py-2 border-x border-gray-300 min-w-12 text-center font-medium">
        {value}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
};

export default Input;