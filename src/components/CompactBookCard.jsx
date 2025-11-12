import React from 'react';
import { ShoppingCart, Sparkles, Award, Zap, Star } from 'lucide-react';
import { LazyImage } from './LazyImage';
import { RatingStars } from './RatingStars';
import { formatPrice } from '../utils/formatPrice';
import { calculateDiscount } from '../utils/calculateDiscount';
import { useTranslation } from '../hooks/useTranslation';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

export const CompactBookCard = ({ book, onAddToCart, className = '' }) => {
  const { t } = useTranslation();
  const discount = calculateDiscount(book.price, book.discountPercent || 0);
  
  // Premium badge configuration
  const getPremiumBadge = () => {
    if (book.isBestseller) {
      return {
        label: t('book.badge_bestseller') || 'Bestseller',
        icon: Award,
        color: 'from-purple-600 to-purple-700',
        glow: 'shadow-purple-500/25'
      };
    }
    if (book.isNew) {
      return {
        label: t('book.badge_new') || 'New',
        icon: Sparkles,
        color: 'from-blue-500 to-cyan-500',
        glow: 'shadow-blue-500/25'
      };
    }
    if (book.isTrending || book.rating >= 4.6) {
      return {
        label: t('book.badge_trending') || 'Trending',
        icon: Zap,
        color: 'from-orange-500 to-amber-500',
        glow: 'shadow-orange-500/25'
      };
    }
    return null;
  };

  const premiumBadge = getPremiumBadge();

  return (
    <div className={`w-[180px] flex-shrink-0 ${className}`}>
      <div className="relative group border border-gray-900 transition-all duration-500 overflow-hidden">
        {/* Book Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-[3/4]">
          <LazyImage
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            width={280}
            height={360}
          />
            
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* Premium Badge */}
          {premiumBadge && (
            <div className={`absolute top-3 left-3 bg-gradient-to-r ${premiumBadge.color} text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg ${premiumBadge.glow} flex items-center gap-1.5 z-10`}>
              <premiumBadge.icon className="w-3 h-3" />
              {premiumBadge.label}
            </div>
          )}

          {/* Discount Badge */}
          {discount.hasDiscount && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg shadow-red-500/25 z-10">
              -{discount.discountPercent}%
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="px-4 py-2 relative">
          {/* Main Info */}
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
              {book.title}
            </h3>
            <p className="text-gray-600 text-sm font-medium line-clamp-1">
              {t('book.by', { author: book.author })}
            </p>
            
            {/* Price and Rating Row */}
            <div className="flex items-center justify-between mb-2 group-hover:invisible">
              <div className="flex items-center gap-2">
                {/* Price */}
                {discount.hasDiscount ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(discount.finalPrice)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(book.price)}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(book.price)}
                  </span>
                )}
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 bg-gray-50 rounded-lg px-2 py-1">
                <Star className="w-3 h-3 text-amber-500 fill-current" />
                <span className="text-xs font-semibold text-gray-700">
                  {book.rating?.toFixed(1) || '4.5'}
                </span>
              </div>
            </div>
          </div>

          {/* Add to Cart Button - Hidden by default, slides up on hover */}
          <div className="absolute inset-x-0 bottom-0 px-1 py-3 bg-white translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <button
              onClick={(e) => { 
                e.stopPropagation(); 
                onAddToCart && onAddToCart(book); 
              }}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-2.5 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
              <span className="text-sm">{t('book.add_to_cart')}</span>
            </button>
          </div>
        </div>

        {/* Stock Indicator */}
        {book.stock <= 5 && book.stock > 0 && (
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg z-10">
            {t('only_stock_left', { stock: book.stock })}
          </div>
        )}
      </div>
    </div>
  );
};

// Premium Swiper Carousel Component - FIXED to accept children
export const PremiumCarousel = ({ 
  children,
  title, 
  subtitle, 
  className = '',
  slidesPerView = 'auto',
  spaceBetween = 24
}) => {
  // Custom navigation IDs for multiple carousels
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <section className={`relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '-0.02em', lineHeight: '1.2' }}>{title}</h2>
          {subtitle && (
            <p className="text-gray-600 mt-2 text-base md:text-lg font-normal" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', letterSpacing: '-0.01em', lineHeight: '1.5' }}>{subtitle}</p>
          )}
        </div>
        
        {/* Custom Navigation */}
        <div className="flex items-center gap-3">
          <button
            ref={navigationPrevRef}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center transition-all duration-300 hover:bg-gray-50 hover:scale-105 group swiper-button-disabled:opacity-30 swiper-button-disabled:cursor-not-allowed"
            aria-label="Previous books"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            ref={navigationNextRef}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center transition-all duration-300 hover:bg-gray-50 hover:scale-105 group swiper-button-disabled:opacity-30 swiper-button-disabled:cursor-not-allowed"
            aria-label="Next books"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Swiper Carousel */}
      <div className="relative">
        <Swiper
          modules={[Navigation, FreeMode]}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          freeMode={true}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          onSwiper={(swiper) => {
            // Delay navigation initialization
            setTimeout(() => {
              if (swiper.params.navigation && navigationPrevRef.current && navigationNextRef.current) {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }, 100);
          }}
          className="px-2 py-4"
        >
          {React.Children.map(children, (child, index) => (
            <SwiperSlide key={child?.key || child?.props?.book?.id || child?.props?.to || `slide-${index}`} className="!w-auto">
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

// Alternative Carousel that accepts children
export const ModernCarousel = ({ 
  children,
  title, 
  subtitle, 
  className = '' 
}) => {
  return (
    <section className={`relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-gray-600 mt-2">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Swiper with Built-in Navigation */}
      <div className="relative group">
        <Swiper
          modules={[Navigation]}
          navigation={true}
          slidesPerView={'auto'}
          spaceBetween={24}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          className="px-2 py-4 modern-carousel"
        >
          {React.Children.map(children, (child, index) => (
            <SwiperSlide key={child.key || index} className="!w-auto">
              {child}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom CSS for Modern Carousel */}
      <style jsx global>{`
        .modern-carousel .swiper-button-next,
        .modern-carousel .swiper-button-prev {
          width: 48px !important;
          height: 48px !important;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          opacity: 0;
        }

        .modern-carousel .swiper-button-next:hover,
        .modern-carousel .swiper-button-prev:hover {
          background: #f8fafc;
          transform: scale(1.1);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .modern-carousel .swiper-button-next:after,
        .modern-carousel .swiper-button-prev:after {
          font-size: 16px !important;
          font-weight: bold;
          color: #374151;
        }

        .modern-carousel .swiper-button-next:hover:after,
        .modern-carousel .swiper-button-prev:hover:after {
          color: #059669;
        }

        .modern-carousel:hover .swiper-button-next,
        .modern-carousel:hover .swiper-button-prev {
          opacity: 1;
        }

        .modern-carousel .swiper-button-disabled {
          opacity: 0.3 !important;
          cursor: not-allowed;
        }

        .modern-carousel .swiper-button-disabled:hover {
          transform: none !important;
        }
      `}</style>
    </section>
  );
};

export default CompactBookCard;