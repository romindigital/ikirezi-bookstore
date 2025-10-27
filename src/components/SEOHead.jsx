import { Helmet } from 'react-helmet-async';

export function SEOHead({ 
  title = "Ikirezi - Your Premier Bookstore",
  description = "Discover your next great read with Ikirezi's curated collection of books from bestselling authors. Free shipping, secure payments, and quality guarantee.",
  keywords = "books, bookstore, online books, fiction, non-fiction, bestsellers, reading, literature",
  image = "/api/placeholder/1200/630",
  url = "",
  type = "website",
  structuredData = null
}) {
  const fullTitle = title.includes('Ikirezi') ? title : `${title} | Ikirezi`;
  const fullUrl = url ? `https://ikirezi.com${url}` : 'https://ikirezi.com';
  const fullImage = image.startsWith('http') ? image : `https://ikirezi.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Ikirezi" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Ikirezi" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@ikirezi" />
      <meta name="twitter:creator" content="@ikirezi" />

      {/* Additional SEO Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Mobile App Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Ikirezi" />

      {/* Theme Color */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />

      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Default Structured Data for Homepage */}
      {!structuredData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BookStore",
            "name": "Ikirezi",
            "description": "Your premier destination for books. Discover, explore, and enjoy the world of literature with our curated collection.",
            "url": "https://ikirezi.com",
            "logo": "https://ikirezi.com/logo.png",
            "image": "https://ikirezi.com/og-image.jpg",
            "telephone": "+1 (555) 123-4567",
            "email": "info@ikirezi.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Book Street",
              "addressLocality": "Reading City",
              "addressRegion": "RC",
              "postalCode": "12345",
              "addressCountry": "US"
            },
            "openingHours": "Mo-Su 00:00-23:59",
            "paymentAccepted": ["Credit Card", "PayPal", "Apple Pay", "Google Pay"],
            "currenciesAccepted": "USD",
            "priceRange": "$",
            "sameAs": [
              "https://facebook.com/ikirezi",
              "https://twitter.com/ikirezi",
              "https://instagram.com/ikirezi"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Books",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Book",
                    "name": "Featured Books",
                    "description": "Curated collection of bestselling and featured books"
                  }
                }
              ]
            }
          })}
        </script>
      )}
    </Helmet>
  );
}

