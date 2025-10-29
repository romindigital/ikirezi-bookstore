// Internationalization utilities
export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', nativeName: 'English', rtl: false },
  rw: { name: 'Kinyarwanda', nativeName: 'Ikinyarwanda', rtl: false },
  fr: { name: 'French', nativeName: 'Français', rtl: false }
};

export const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
  EUR: { symbol: '€', name: 'Euro', locale: 'de-DE' },
  GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
  JPY: { symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' }
};

// Get user's preferred language
export function getPreferredLanguage() {
  if (typeof window === 'undefined') return 'en';
  
  // Check localStorage first
  const stored = localStorage.getItem('preferred-language');
  if (stored && SUPPORTED_LANGUAGES[stored]) {
    return stored;
  }
  
  // Check browser language
  const browserLang = navigator.language.split('-')[0];
  if (SUPPORTED_LANGUAGES[browserLang]) {
    return browserLang;
  }
  
  // Default to English
  return 'en';
}

// Get user's preferred currency
export function getPreferredCurrency() {
  if (typeof window === 'undefined') return 'USD';
  
  const stored = localStorage.getItem('preferred-currency');
  if (stored && CURRENCIES[stored]) {
    return stored;
  }
  
  // Try to detect from locale
  const locale = navigator.language;
  if (locale.includes('en-GB')) return 'GBP';
  if (locale.includes('en-CA')) return 'CAD';
  if (locale.includes('en-AU')) return 'AUD';
  if (locale.includes('de')) return 'EUR';
  if (locale.includes('ja')) return 'JPY';
  
  return 'USD';
}

// Format currency based on locale
export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  try {
    const currencyInfo = CURRENCIES[currency];
    if (!currencyInfo) return `$${amount.toFixed(2)}`;
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

// Format number based on locale
export function formatNumber(number, locale = 'en-US') {
  try {
    return new Intl.NumberFormat(locale).format(number);
  } catch {
    return number.toString();
  }
}

// Format date based on locale
export function formatDate(date, locale = 'en-US', options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  try {
    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(new Date(date));
  } catch {
    return new Date(date).toLocaleDateString();
  }
}

// Get RTL direction
export function isRTL(language) {
  return SUPPORTED_LANGUAGES[language]?.rtl || false;
}

// Set document direction
export function setDocumentDirection(language) {
  if (typeof document === 'undefined') return;
  
  const isRightToLeft = isRTL(language);
  document.documentElement.dir = isRightToLeft ? 'rtl' : 'ltr';
  document.documentElement.lang = language;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.books': 'Books',
    'nav.categories': 'Categories',
    'nav.about': 'About',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.profile': 'Profile',
    'nav.admin': 'Admin',
    'nav.logout': 'Logout',
    'nav.cart': 'Shopping cart with {count} items',
    'nav.search': 'Search',
    'nav.browse_categories': 'Browse Categories',
    'nav.popular_categories': 'Popular Categories',
    'nav.featured_books': 'Featured Books',
    'nav.view_all_categories': 'View All Categories',
    'nav.view_all_books': 'View All Books',
    'nav.featured': 'Featured',
    'nav.new_releases': 'New Releases',
    'nav.bestsellers': 'Bestsellers',
    'nav.on_sale': 'On Sale',
    'nav.book_details': 'Book Details',
    'nav.orders': 'My Orders',
    'nav.wishlist': 'My Wishlist',
    'nav.trending': 'Trending Now',

    // Home Page
    'home.title': 'Discover Your Next Great Read',
    'home.subtitle': 'Explore our curated collection of books from bestselling authors',
    'home.browse_books': 'Browse Books',
    'home.explore_categories': 'Explore Categories',
    'home.featured_books': 'Featured Books',
    'home.bestsellers': 'Bestsellers',
    'home.categories': 'Browse by Category',
    'home.trending_description': 'See what readers are loving right now',
    'home.deals_description': 'Limited time offers on great books',
    'home.newsletter.title': 'Stay Updated',
    'home.newsletter.subtitle': 'Get the latest book releases, author interviews, and exclusive offers delivered to your inbox.',
    'home.newsletter.placeholder': 'Enter your email',
    'home.newsletter.subscribe': 'Subscribe',
    'home.why_choose': 'Why Choose',
    'home.why_choose_description': 'We\'re committed to providing the best book shopping experience with premium services, exceptional quality, and unmatched customer satisfaction.',
    'home.featured_books_title': 'Featured Books',
    'home.featured_books_description': 'Discover our handpicked selection of bestselling and trending books. Each title has been carefully curated by our literary experts.',
    'home.view_all_books': 'View All Books',
    'home.discover_in_category': 'Discover the best in {category}',

    // Categories (common)
    'category.fiction': 'Fiction',
    'category.mystery': 'Mystery',
    'category.romance': 'Romance',
    'category.sci_fi': 'Sci‑Fi',
    'category.science_fiction': 'Science Fiction',
    'category.biography': 'Biography',
    'category.history': 'History',
    'category.business': 'Business',
    'category.selfhelp': 'Self-Help',
    'category.fantasy': 'Fantasy',
    'home.free_shipping': 'Free Shipping',
    'home.free_shipping_description': 'Free shipping on orders over $50. Fast and reliable delivery to your doorstep with real-time tracking.',
    'home.secure_payment': 'Secure Payment',
    'home.secure_payment_description': '100% secure and encrypted payments. Your financial information is always protected with bank-level security.',
    'home.quality_guarantee': 'Quality Guarantee',
    'home.quality_guarantee_description': 'Every book comes with our quality guarantee. If you\'re not satisfied, we\'ll make it right with our hassle-free return policy.',

    // Common Elements
    'common.loading': 'Loading...',
    'common.filters_and_sort': 'Filters & Sort',
    'common.price_range': 'Price Range',
    'common.sort_by': 'Sort By',
    'common.clear_all': 'Clear All',
    'common.apply_filters': 'Apply Filters',
    'common.categories': 'Categories',
    'common.error.generic': 'Something went wrong',
    'common.try_again': 'Try Again',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.clear': 'Clear',
    'common.apply': 'Apply',
    'common.close': 'Close',
    'common.open': 'Open',
    'common.more': 'More',
    'common.less': 'Less',
    'common.all': 'All',
    'common.none': 'None',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.status.success': 'Success',
    'common.status.error': 'Error',
    'common.status.warning': 'Warning',
    'common.status.info': 'Information',
    'common.view_all': 'View All',

    // Book Related
    'book.by': 'by {author}',
    'book.badge_bestseller': 'Bestseller',
    'book.badge_new': 'New',
    'book.badge_trending': 'Trending',
    'book.add_to_cart': 'Add to Cart',
    'book.in_cart': 'In Cart',
    'book.out_of_stock': 'Out of Stock',
    'book.only_left': 'Only {count} left in stock',
    'only_stock_left': 'Only {stock} left in stock',
    'book.rating': '{rating}/5 Rating',
    'book.reviews': 'From {count}+ customers'
  },

  fr: {
    'common.filters_and_sort': 'Filtres & Tri',
    'common.price_range': 'Fourchette de prix',
    'common.sort_by': 'Trier par',
    'common.clear_all': 'Tout effacer',
    'common.apply_filters': 'Appliquer',
    'common.categories': 'Catégories',
    'book.by': 'par {author}',
    'book.badge_bestseller': 'Meilleure vente',
    'book.badge_new': 'Nouveau',
    'book.badge_trending': 'Tendance',
    // French translations
    'nav.home': 'Accueil',
    'nav.books': 'Livres',
    'nav.categories': 'Catégories',
    'nav.about': 'À Propos',
    'nav.login': 'Connexion',
    'nav.signup': 'S\'inscrire',
    'nav.profile': 'Profil',
    'nav.admin': 'Administration',
    'nav.logout': 'Déconnexion',
    'nav.cart': 'Panier avec {count} articles',
    'nav.search': 'Recherche',
    'nav.browse_categories': 'Parcourir les Catégories',
    'nav.popular_categories': 'Catégories Populaires',
    'nav.featured_books': 'Livres en Vedette',
    'nav.featured': 'En Vedette',
    'nav.new_releases': 'Nouvelles Sorties',
    'nav.bestsellers': 'Meilleures Ventes',
    'nav.on_sale': 'En Promotion',
    'nav.book_details': 'Détails du Livre',
    'nav.orders': 'Mes Commandes',
    'nav.wishlist': 'Ma Liste de Souhaits',
    'nav.trending': 'Tendances',

    'home.title': 'Découvrez Votre Prochaine Grande Lecture',
    'home.subtitle': 'Explorez notre collection sélectionnée de livres d\'auteurs à succès',
    'home.browse_books': 'Parcourir les Livres',
    'home.explore_categories': 'Explorer les Catégories',
    'home.featured_books': 'Livres en Vedette',
    'home.bestsellers': 'Meilleures Ventes',
    'home.categories': 'Parcourir par Catégorie',
    'home.trending_description': 'Découvrez ce que les lecteurs adorent en ce moment',
    'home.deals_description': 'Offres à durée limitée sur d\'excellents livres',
    'home.featured_books_description': 'Découvrez notre sélection de livres à succès et tendances, soigneusement choisie par nos experts.',
    'home.view_all_books': 'Voir tous les livres',
    'home.discover_in_category': 'Découvrez le meilleur de {category}',

    // Catégories
    'category.fiction': 'Fiction',
    'category.mystery': 'Policier',
    'category.romance': 'Romance',
    'category.sci_fi': 'Science‑fiction',
    'category.science_fiction': 'Science‑fiction',
    'category.biography': 'Biographie',
    'category.history': 'Histoire',
    'category.business': 'Business',
    'category.selfhelp': 'Développement personnel',
    'category.fantasy': 'Fantasy',

    // Common Elements (missing)
    'common.view_all': 'Tout voir',

    'book.add_to_cart': 'Ajouter au Panier',
    'book.in_cart': 'Dans le Panier',
    'book.out_of_stock': 'Rupture de Stock',
    'book.only_left': 'Seulement {count} en stock',
    'only_stock_left': 'Il reste seulement {stock} en stock',
    'book.rating': 'Note de {rating}/5',
    'book.reviews': 'De {count}+ clients'
  },

  rw: {
    'common.filters_and_sort': 'Muyunguruzi & Itondekanya',
    'common.price_range': 'Ibiciro',
    'common.sort_by': 'Shungura ku',
    'common.clear_all': 'Siba Byose',
    'common.apply_filters': 'Shyira mu bikorwa',
    'common.categories': 'Ibyiciro',
    'book.by': 'na {author}',
    'book.badge_bestseller': 'Bikunzwe cyane',
    'book.badge_new': 'Gishya',
    'book.badge_trending': 'Bikunzwe',
    // Kinyarwanda translations
    'nav.home': 'Ahabanza',
    'nav.books': 'Ibitabo',
    'nav.categories': 'Ibyiciro',
    'nav.about': 'Abo turibo',
    'nav.login': 'Injira',
    'nav.signup': 'Iyandikishe',
    'nav.profile': 'Umwirondoro',
    'nav.admin': 'Ubuyobozi',
    'nav.logout': 'Sohoka',
    'nav.cart': 'Igare rifite {count}',
    'nav.search': 'Shakisha',
    'nav.browse_categories': 'Reba Ibyiciro',
    'nav.popular_categories': 'Ibyiciro Bikunzwe',
    'nav.featured_books': 'Ibitabo Byatoranijwe',
    'nav.featured': 'Byatoranijwe',
    'nav.new_releases': 'Ibishya',
    'nav.bestsellers': 'Bigurishwa Cyane',
    'nav.on_sale': 'Bigurisha',
    'nav.book_details': 'Ibisobanuro by\'Igitabo',
    'nav.orders': 'Ibyo Naguze',
    'nav.wishlist': 'Ibyo Nifuza',
    'nav.trending': 'Bikunzwe Cyane',

    'home.title': 'Menya Igitabo Cyawe Gikurikira',
    'home.subtitle': 'Shakisha uruganda rwacu rw\'ibitabo by\'abanditsi b\'abantu benshi',
    'home.browse_books': 'Reba Ibitabo',
    'home.explore_categories': 'Reba Ibyiciro',
    'home.featured_books': 'Ibitabo Byatoranijwe',
    'home.bestsellers': 'Bigurishwa Cyane',
    'home.categories': 'Shakisha ku Byiciro',
    'home.trending_description': 'Reba ibyo abasomyi bakunda ubu',
    'home.deals_description': 'Ibiciro byihariye ku bitabo byiza',
    'home.featured_books_description': 'Reba ibyatoranyijwe mu bitabo bikunzwe kandi bigezweho byahiswemo n’impuguke zacu.',
    'home.view_all_books': 'Reba ibitabo byose',
    'home.discover_in_category': 'Menya ibyiza muri {category}',

    // Ibyiciro
    'category.fiction': 'Imikino y\'ibitekerezo',
    'category.mystery': 'Urukurikirane',
    'category.romance': 'Urukundo',
    'category.sci_fi': 'Si‑Fizi (Sci‑Fi)',
    'category.science_fiction': 'Si‑Fizi (Science Fiction)',
    'category.biography': 'Ubuzima bw\'abantu',
    'category.history': 'Amateka',
    'category.business': 'Ubucuruzi',
    'category.selfhelp': 'Ubufasha bwite',
    'category.fantasy': 'Imivugo y\'ibitangaza',

    // Common Elements (missing)
    'common.view_all': 'Reba byose',

    'book.add_to_cart': 'Shyira mu Gare',
    'book.in_cart': 'Biri mu Gare',
    'book.out_of_stock': 'Ntibihari',
    'book.only_left': 'Hasigaye {count} gusa',
    'only_stock_left': 'Hasigaye {stock} gusa',
    'book.rating': 'Amanota {rating}/5',
    'book.reviews': 'Bivuye kuri {count}+ abakiriya'
  }
};

export function t(key, language = 'en', params = {}) {
  const languageTranslations = translations[language] || translations.en;
  const translation = languageTranslations[key] || key;
  
  return Object.entries(params).reduce(
    (text, [param, value]) => text.replace(`{${param}}`, value),
    translation
  );
}

// Initialize i18n
export function initializeI18n() {
  const language = getPreferredLanguage();
  const currency = getPreferredCurrency();
  
  setDocumentDirection(language);
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', language);
    localStorage.setItem('preferred-currency', currency);
  }
  
  return { language, currency };
}