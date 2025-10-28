import React from 'react';

export const CompactBookCard = ({ book, onAddToCart }) => {
  return (
    <div
      className="snap-start flex-shrink-0 w-36 sm:w-40 md:w-44 lg:w-48"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="relative group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="w-full" style={{ height: '160px' }}>
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-2 text-sm">
          <div className="font-medium text-gray-900 line-clamp-2 text-xs h-10 overflow-hidden">
            {book.title}
          </div>
          <div className="text-[11px] text-gray-500 mt-1">{book.author}</div>
        </div>

        {/* Hover CTA */}
        <button
          onClick={(e) => { e.stopPropagation(); onAddToCart && onAddToCart(book); }}
          className="absolute inset-x-3 -bottom-7 opacity-0 group-hover:opacity-100 hover:translate-y-0 transform translate-y-2 transition-all duration-200 bg-emerald-600 text-white text-sm font-medium py-2 px-3 rounded-full shadow-lg mx-auto left-0 right-0 w-auto"
          aria-label={`Add ${book.title} to cart`}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default CompactBookCard;
