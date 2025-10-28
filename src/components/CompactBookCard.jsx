import React from 'react';
import { LazyImage } from './LazyImage';
import { RatingStars } from './RatingStars';
import { formatPrice } from '../utils/formatPrice';

export const CompactBookCard = ({ book, onAddToCart }) => {
  return (
    <div
      className="snap-start flex-shrink-0 w-36 sm:w-40 md:w-44 lg:w-48"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="relative group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="w-full relative" style={{ height: '180px' }}>
          <LazyImage
            src={book.image}
            alt={book.title}
            className="w-full h-full"
            width={240}
            height={320}
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {book.discountPercent > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white shadow">
                -{book.discountPercent}%
              </span>
            )}
            {(book.isPopular || (book.rating || 0) >= 4.6) && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500 text-white shadow">
                Popular
              </span>
            )}
            {book.isNew && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-600 text-white shadow">
                New
              </span>
            )}
          </div>
        </div>

        {/* Info area that can be replaced by CTA on hover */}
        <div className="p-2 text-sm transition-transform duration-200 group-hover:opacity-0 group-hover:translate-y-2">
          <div className="font-medium text-gray-900 line-clamp-2 text-xs min-h-[2.25rem] overflow-hidden">
            {book.title}
          </div>
          <div className="text-[11px] text-gray-500 mt-1">{book.author}</div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[13px] font-semibold text-gray-900">{formatPrice(book.price)}</span>
            <span className="text-[11px] text-gray-600">{(book.rating || 0).toFixed(1)}★</span>
          </div>
        </div>

        {/* Hover CTA replaces info area */}
        <div className="absolute left-0 right-0 bottom-0 p-2">
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart && onAddToCart(book); }}
            className="w-full translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-emerald-600 text-white text-sm font-medium py-2 px-3 rounded-lg shadow-lg flex items-center justify-center gap-2"
            aria-label={`Add ${book.title} to cart`}
          >
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompactBookCard;
