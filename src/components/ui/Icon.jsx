import React from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';

const Icon = {
  // Chevron Icons - Consistent across the app
  ChevronLeft: ({ className = 'w-5 h-5', ...props }) => (
    <ChevronLeft className={`text-gray-600 hover:text-emerald-600 transition-colors ${className}`} {...props} />
  ),

  ChevronRight: ({ className = 'w-5 h-5', ...props }) => (
    <ChevronRight className={`text-gray-600 hover:text-emerald-600 transition-colors ${className}`} {...props} />
  ),

  ChevronUp: ({ className = 'w-5 h-5', ...props }) => (
    <ChevronUp className={`text-gray-600 hover:text-emerald-600 transition-colors ${className}`} {...props} />
  ),

  ChevronDown: ({ className = 'w-5 h-5', ...props }) => (
    <ChevronDown className={`text-gray-600 hover:text-emerald-600 transition-colors ${className}`} {...props} />
  ),

  // Arrow Icons
  ArrowLeft: ({ className = 'w-5 h-5', ...props }) => (
    <ArrowLeft className={`text-gray-600 hover:text-emerald-600 transition-colors ${className}`} {...props} />
  ),

  ArrowRight: ({ className = 'w-5 h-5', ...props }) => (
    <ArrowRight className={`text-gray-600 hover:text-emerald-600 transition-colors ${className}`} {...props} />
  ),

  // Custom styled chevron buttons for carousels/navigation
  CarouselPrev: ({ onClick, className = '', disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <ChevronLeft className="w-5 h-5 text-gray-600" />
    </button>
  ),

  CarouselNext: ({ onClick, className = '', disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <ChevronRight className="w-5 h-5 text-gray-600" />
    </button>
  ),

  // Pagination chevrons
  PaginationPrev: ({ onClick, disabled = false, className = '' }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group px-6 py-3 text-sm font-semibold border-2 border-gray-300 rounded-2xl hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100 ${className}`}
    >
      <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
      Previous
    </button>
  ),

  PaginationNext: ({ onClick, disabled = false, className = '' }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group px-6 py-3 text-sm font-semibold border-2 border-gray-300 rounded-2xl hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100 ${className}`}
    >
      Next
      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </button>
  )
};

export default Icon;