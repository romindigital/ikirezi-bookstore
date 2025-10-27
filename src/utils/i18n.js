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
  const currencyInfo = CURRENCIES[currency];
  if (!currencyInfo) return `$${amount.toFixed(2)}`;
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (error) {
    return `${currencyInfo.symbol}${amount.toFixed(2)}`;
  }
}

// Format number based on locale
export function formatNumber(number, locale = 'en-US') {
  try {
    return new Intl.NumberFormat(locale).format(number);
  } catch (error) {
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
  } catch (error) {
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

// Translation function (simplified - in real app, use react-i18next or similar)
export function t(key, language = 'en', params = {}) {
  const translations = {
    en: {
      'home.title': 'Discover Your Next Great Read',
      'home.subtitle': 'Explore our curated collection of books from bestselling authors',
      'home.browse_books': 'Browse Books',
      'home.explore_categories': 'Explore Categories',
      'home.featured_books': 'Featured Books',
      'home.bestsellers': 'Bestsellers',
      'home.categories': 'Browse by Category',
      'home.newsletter.title': 'Stay Updated',
      'home.newsletter.subtitle': 'Get the latest book releases, author interviews, and exclusive offers delivered to your inbox.',
      'home.newsletter.placeholder': 'Enter your email',
      'home.newsletter.subscribe': 'Subscribe',
      'common.loading': 'Loading...',
      'common.error': 'Something went wrong',
      'common.try_again': 'Try Again',
      'common.view_all': 'View All',
      'book.add_to_cart': 'Add to Cart',
      'book.in_cart': 'In Cart',
      'book.out_of_stock': 'Out of Stock',
      'book.only_left': 'Only {count} left in stock',
      'book.rating': '{rating}/5 Rating',
      'book.reviews': 'From {count}+ customers',
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
      'search.suggestions': 'Suggestions',
      'search.recent': 'Recent Searches',
      'search.popular': 'Popular Searches',
      'search.clear': 'Clear',
      'search.loading': 'Searching...',
      'home.why_choose': 'Why Choose',
      'home.why_choose_description': 'We\'re committed to providing the best book shopping experience with premium services, exceptional quality, and unmatched customer satisfaction.',
      'home.featured_books_title': 'Featured Books',
      'home.featured_books_description': 'Discover our handpicked selection of bestselling and trending books. Each title has been carefully curated by our literary experts.',
      'home.view_all_books': 'View All Books',
      'home.free_shipping': 'Free Shipping',
      'home.free_shipping_description': 'Free shipping on orders over $50. Fast and reliable delivery to your doorstep with real-time tracking.',
      'home.secure_payment': 'Secure Payment',
      'home.secure_payment_description': '100% secure and encrypted payments. Your financial information is always protected with bank-level security.',
      'home.quality_guarantee': 'Quality Guarantee',
      'home.quality_guarantee_description': 'Every book comes with our quality guarantee. If you\'re not satisfied, we\'ll make it right with our hassle-free return policy.'
    },
    fr: {
      'home.title': 'Découvrez Votre Prochaine Grande Lecture',
      'home.subtitle': 'Explorez notre collection sélectionnée de livres d\'auteurs à succès',
      'home.browse_books': 'Parcourir les Livres',
      'home.explore_categories': 'Explorer les Catégories',
      'home.featured_books': 'Livres en Vedette',
      'home.bestsellers': 'Meilleures Ventes',
      'home.categories': 'Parcourir par Catégorie',
      'home.newsletter.title': 'Restez Informé',
      'home.newsletter.subtitle': 'Recevez les dernières sorties de livres, interviews d\'auteurs et offres exclusives dans votre boîte de réception.',
      'home.newsletter.placeholder': 'Entrez votre email',
      'home.newsletter.subscribe': 'S\'abonner',
      'common.loading': 'Chargement...',
      'common.error': 'Quelque chose s\'est mal passé',
      'common.try_again': 'Réessayer',
      'common.view_all': 'Voir Tout',
      'book.add_to_cart': 'Ajouter au Panier',
      'book.in_cart': 'Dans le Panier',
      'book.out_of_stock': 'Rupture de Stock',
      'book.only_left': 'Il ne reste que {count}',
      'book.rating': 'Note {rating}/5',
      'book.reviews': 'De {count}+ clients',
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
      'nav.view_all_categories': 'Voir Toutes les Catégories',
      'nav.view_all_books': 'Voir Tous les Livres',
      'nav.featured': 'En Vedette',
      'nav.new_releases': 'Nouvelles Sorties',
      'nav.bestsellers': 'Meilleures Ventes',
      'nav.on_sale': 'En Promotion',
      'nav.book_details': 'Détails du Livre',
      'search.suggestions': 'Suggestions',
      'search.recent': 'Recherches Récentes',
      'search.popular': 'Recherches Populaires',
      'search.clear': 'Effacer',
      'search.loading': 'Recherche...',
      'home.why_choose': 'Pourquoi Choisir',
      'home.why_choose_description': 'Nous nous engageons à fournir la meilleure expérience d\'achat de livres avec des services premium, une qualité exceptionnelle et une satisfaction client inégalée.',
      'home.featured_books_title': 'Livres en Vedette',
      'home.featured_books_description': 'Découvrez notre sélection soigneusement choisie de livres à succès et tendance. Chaque titre a été soigneusement sélectionné par nos experts littéraires.',
      'home.view_all_books': 'Voir Tous les Livres',
      'home.free_shipping': 'Livraison Gratuite',
      'home.free_shipping_description': 'Livraison gratuite sur les commandes de plus de 50$. Livraison rapide et fiable à votre porte avec suivi en temps réel.',
      'home.secure_payment': 'Paiement Sécurisé',
      'home.secure_payment_description': 'Paiements 100% sécurisés et cryptés. Vos informations financières sont toujours protégées avec une sécurité de niveau bancaire.',
      'home.quality_guarantee': 'Garantie de Qualité',
      'home.quality_guarantee_description': 'Chaque livre est accompagné de notre garantie de qualité. Si vous n\'êtes pas satisfait, nous le corrigerons avec notre politique de retour sans tracas.'
    },
    rw: {
      'home.title': 'Menya Igitabo Cyawe Gikurikira',
      'home.subtitle': 'Shakisha uruganda rwacu rw\'ibitabo by\'abanditsi b\'abantu benshi',
      'home.browse_books': 'Shakisha Ibitabo',
      'home.explore_categories': 'Shakisha Ibyiciro',
      'home.featured_books': 'Ibitabo By\'Icyubahiro',
      'home.bestsellers': 'Byaguzwe Cyane',
      'home.categories': 'Shakisha ku Byiciro',
      'home.newsletter.title': 'Komeza Umenye',
      'home.newsletter.subtitle': 'Habwa ibitabo bishya, ibiganiro n\'abanditsi n\'amasezerano yihariye mu bubiko bwawe.',
      'home.newsletter.placeholder': 'Injiza imeli yawe',
      'home.newsletter.subscribe': 'Kwiyandikisha',
      'common.loading': 'Birakomeje...',
      'common.error': 'Hari ikintu cyataye',
      'common.try_again': 'Gerageza Nanone',
      'common.view_all': 'Reba Byose',
      'book.add_to_cart': 'Ongeramo mu Gare',
      'book.in_cart': 'Mu Gare',
      'book.out_of_stock': 'Nta Gihari',
      'book.only_left': 'Gusa {count} byasigaye',
      'book.rating': 'Icyiciro {rating}/5',
      'book.reviews': 'Kuva ku {count}+ abakiriya',
      'nav.home': 'Urugo',
      'nav.books': 'Ibitabo',
      'nav.categories': 'Ibyiciro',
      'nav.about': 'Ibyerekeye',
      'nav.login': 'Kwinjira',
      'nav.signup': 'Kwiyandikisha',
      'nav.profile': 'Umwirondoro',
      'nav.admin': 'Ubuyobozi',
      'nav.logout': 'Gusohoka',
      'nav.cart': 'Gare rikubiyemo {count}',
      'nav.search': 'Shakisha',
      'nav.browse_categories': 'Shakisha Ibyiciro',
      'nav.popular_categories': 'Ibyiciro By\'Abantu Benshi',
      'nav.featured_books': 'Ibitabo By\'Icyubahiro',
      'nav.view_all_categories': 'Reba Ibyiciro Byose',
      'nav.view_all_books': 'Reba Ibitabo Byose',
      'nav.featured': 'By\'Icyubahiro',
      'nav.new_releases': 'Bishya',
      'nav.bestsellers': 'Byaguzwe Cyane',
      'nav.on_sale': 'Mu Gucuruzwa',
      'nav.book_details': 'Ibyerekeye Igitabo',
      'search.suggestions': 'Ibyifuzo',
      'search.recent': 'Shakisha Ryashize',
      'search.popular': 'Shakisha Ry\'Abantu Benshi',
      'search.clear': 'Gusiba',
      'search.loading': 'Birakomeje...',
      'home.why_choose': 'Kuki Gutoranya',
      'home.why_choose_description': 'Tugamije gutanga serivisi nziza zo gucuruza ibitabo, ubwiza bw\'ikirenga, n\'ishyaka ry\'abakiriya ridashobora gusubirwaho.',
      'home.featured_books_title': 'Ibitabo By\'Icyubahiro',
      'home.featured_books_description': 'Shakisha ibitabo byacu byatoranyijwe neza by\'abantu benshi n\'iby\'akazi. Buri ritabo ryatoranyijwe neza n\'abahanga bacu b\'ibitabo.',
      'home.view_all_books': 'Reba Ibitabo Byose',
      'home.free_shipping': 'Kohereza Bikabije',
      'home.free_shipping_description': 'Kohereza bikabije ku byaguzwe byarenze $50. Kohereza vuba kandi byizewe ku rugo rwawe hamwe n\'ukurikirana mu gihe cy\'ukuri.',
      'home.secure_payment': 'Kwishyura Byizewe',
      'home.secure_payment_description': 'Kwishyura 100% byizewe kandi byafunzwe. Amakuru y\'imari yawe agihoraho arinda hamwe n\'umutekano w\'urwego rw\'ubwoba.',
      'home.quality_guarantee': 'Garanti y\'Ubwiza',
      'home.quality_guarantee_description': 'Burigi gitabo kizana garanti yacu y\'ubwiza. Niba utishimye, tuzabikorera neza hamwe n\'itegeko ryacu ry\'gusubiraho ritagira ubwoba.'
    }
  };
  
  let translation = translations[language]?.[key] || translations.en[key] || key;
  
  // Replace parameters
  Object.keys(params).forEach(param => {
    translation = translation.replace(`{${param}}`, params[param]);
  });
  
  return translation;
}

// Initialize i18n
export function initializeI18n() {
  const language = getPreferredLanguage();
  const currency = getPreferredCurrency();
  
  setDocumentDirection(language);
  
  // Store preferences
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', language);
    localStorage.setItem('preferred-currency', currency);
  }
  
  return { language, currency };
}

