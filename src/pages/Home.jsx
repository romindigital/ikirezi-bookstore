import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { AdvancedBookShowcase } from '../components/AdvancedBookShowcase';
import { Recommendations } from '../components/Recommendations';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { WhyChooseIkirezi } from '../components/WhyChooseIkirezi';
import { AdvancedReviews } from '../components/AdvancedReviews';
import { 
  BookOpen, 
  Heart, 
  Star, 
  Users, 
  ArrowRight,
  Sparkles,
  Coffee,
  Moon,
  Sun,
  BookMarked,
  Quote,
  Flame,
  Zap,
  Globe,
  Shield,
  Truck,
  Gift
} from 'lucide-react';

export function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef(null);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      text: "Ikirezi isn't just a bookstore, it's a sanctuary for book lovers. Every recommendation feels like it was chosen just for me.",
      author: "Sarah M.",
      role: "Book Blogger",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      text: "The personal touch here is incredible. I've discovered so many hidden gems I never would have found elsewhere.",
      author: "Michael R.",
      role: "Literature Professor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      text: "Reading has become an adventure again. Every book I get from Ikirezi opens up new worlds and perspectives.",
      author: "Emily C.",
      role: "Avid Reader",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Ikirezi Bookstore - Where Stories Come Alive"
        description="Step into a world where every page holds a new adventure. Discover books that speak to your soul, curated with love by fellow book lovers."
        keywords="books, bookstore, reading, literature, stories, adventure, curated books, book lovers"
      />
      
      <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        {/* Creative Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, rgba(120, 53, 15, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(180, 83, 9, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(217, 119, 6, 0.05) 0%, transparent 50%),
              linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fdba74 100%)
            `
          }}
        >
          {/* Floating Book Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute opacity-20 animate-float"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 25}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${6 + i}s`
                }}
              >
                <div className="w-16 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-lg shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-1000">
                  <div className="w-full h-full bg-gradient-to-b from-amber-100 to-amber-200 rounded-lg p-2">
                    <div className="w-full h-1 bg-amber-400 rounded mb-1"></div>
                    <div className="w-3/4 h-1 bg-amber-400 rounded mb-1"></div>
                    <div className="w-1/2 h-1 bg-amber-400 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Hand-drawn style badge */}
            <div className="inline-block mb-8">
              <div className="relative">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-amber-900 px-8 py-3 rounded-full font-bold text-lg shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  ✨ Handpicked by Book Lovers
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Creative Typography */}
            <div className="space-y-6 mb-12">
              <h1 className="text-6xl md:text-8xl font-black leading-none">
                <span className="block text-amber-900 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  Stories
                </span>
                <span className="block text-orange-800 text-5xl md:text-7xl font-light mt-2 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  That Matter
                </span>
              </h1>
              
              <div className="max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-amber-800 font-medium leading-relaxed">
                  Every book on our shelves has been touched by someone who believes in the magic of reading. 
                  <span className="block mt-2 text-lg text-amber-700">
                    Join our community of passionate readers discovering their next favorite story.
                  </span>
                </p>
              </div>
            </div>

            {/* Creative Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/books"
                className="group relative inline-block"
              >
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                  <span className="flex items-center gap-3">
                    📚 Explore Our Library
                    <span className="text-2xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-300 -z-10"></div>
              </Link>

              <Link
                to="/categories"
                className="group relative inline-block"
              >
                <div className="bg-white/80 backdrop-blur-sm text-amber-800 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl border-2 border-amber-200 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                  <span className="flex items-center gap-3">
                    🎯 Find Your Genre
                    <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">✨</span>
                  </span>
                </div>
              </Link>
            </div>

            {/* Hand-drawn style stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: '50K+', label: 'Books', emoji: '📖', color: 'from-amber-400 to-orange-400' },
                { number: '1M+', label: 'Readers', emoji: '👥', color: 'from-orange-400 to-red-400' },
                { number: '4.9', label: 'Rating', emoji: '⭐', color: 'from-yellow-400 to-amber-400' },
                { number: '24/7', label: 'Support', emoji: '💬', color: 'from-green-400 to-emerald-400' }
              ].map((stat, index) => (
                <div key={index} className="group text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-3xl">{stat.emoji}</span>
                  </div>
                  <div className="text-3xl font-black text-amber-900 mb-1 group-hover:scale-105 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-amber-700 font-semibold text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator with personality */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="text-amber-800 text-sm flex flex-col items-center gap-2 animate-bounce">
              <span className="font-semibold">Keep Scrolling</span>
              <div className="w-8 h-12 border-3 border-amber-600 rounded-full flex justify-center p-1">
                <div className="w-2 h-3 bg-amber-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Books Section with Creative Layout */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400"></div>
          <div className="absolute top-10 right-10 text-6xl opacity-10 transform rotate-12">📚</div>
          <div className="absolute bottom-10 left-10 text-4xl opacity-10 transform -rotate-12">✨</div>
          
          <div className="desktop-container relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-6">
                <h2 className="text-5xl font-black text-gray-900 transform -rotate-1">
                  Featured <span className="text-amber-600">Treasures</span>
                </h2>
                <div className="w-full h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mt-2"></div>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Handpicked by our team of book enthusiasts, these stories have touched hearts and changed lives.
              </p>
            </div>
            <AdvancedBookShowcase 
              title=""
              autoSlide={true}
              slideInterval={5000}
              showControls={true}
              showDots={true}
              booksPerSlide={4}
            />
          </div>
        </section>

        {/* Categories with Creative Design */}
        <section className="py-24 bg-gradient-to-br from-amber-50 to-orange-100 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-32 h-32 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-orange-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="desktop-container relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Explore <span className="text-orange-600 transform rotate-2 inline-block">Genres</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every genre has its own magic. Find yours and let the adventure begin.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {[
                { name: 'Fiction', emoji: '📚', count: '1,250', color: 'from-blue-400 to-indigo-500', rotation: '-rotate-1' },
                { name: 'Romance', emoji: '💕', count: '1,100', color: 'from-pink-400 to-rose-500', rotation: 'rotate-1' },
                { name: 'Fantasy', emoji: '🧙‍♂️', count: '980', color: 'from-purple-400 to-violet-500', rotation: '-rotate-2' },
                { name: 'Mystery', emoji: '🔍', count: '890', color: 'from-gray-400 to-slate-500', rotation: 'rotate-2' },
                { name: 'Sci-Fi', emoji: '🚀', count: '750', color: 'from-cyan-400 to-blue-500', rotation: '-rotate-1' },
                { name: 'History', emoji: '📜', count: '380', color: 'from-amber-400 to-yellow-500', rotation: 'rotate-1' }
              ].map((category, index) => (
                <Link
                  key={index}
                  to={`/categories/${category.name.toLowerCase()}`}
                  className={`group bg-white rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform ${category.rotation} hover:rotate-0`}
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.emoji}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">{category.count} books</p>
                  <div className={`w-full h-2 bg-gradient-to-r ${category.color} rounded-full mt-3 group-hover:scale-105 transition-transform duration-300`}></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials with Creative Design */}
        <section className="py-24 bg-gradient-to-r from-amber-600 to-orange-600 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 text-8xl opacity-10 transform rotate-12">💬</div>
            <div className="absolute bottom-10 right-10 text-6xl opacity-10 transform -rotate-12">⭐</div>
          </div>
          
          <div className="desktop-container relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-6">
                What Our <span className="text-yellow-300">Readers</span> Say
              </h2>
              <p className="text-xl text-amber-100 max-w-3xl mx-auto">
                Real stories from real people who've found their perfect books with us.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center">
                <Quote className="w-12 h-12 text-yellow-300 mx-auto mb-6" />
                <blockquote className="text-2xl font-medium mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].author}
                    className="w-16 h-16 rounded-full border-4 border-yellow-300"
                  />
                  <div className="text-left">
                    <div className="font-bold text-lg">{testimonials[currentTestimonial].author}</div>
                    <div className="text-amber-200">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="py-24 bg-white">
          <div className="desktop-container">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Picked <span className="text-purple-600">Just for You</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI and human curators work together to find books that match your unique taste.
              </p>
            </div>
            <Recommendations 
              title=""
              limit={8}
              autoSlide={true}
              slideInterval={6000}
              showControls={true}
              showDots={true}
            />
          </div>
        </section>

        {/* Why Choose Us with Creative Layout */}
        <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="desktop-container relative z-10">
            <WhyChooseIkirezi />
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-24 bg-white">
          <div className="desktop-container">
            <AdvancedReviews />
          </div>
        </section>

        {/* Newsletter with Creative Design */}
        <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 text-6xl opacity-10 transform rotate-12">📧</div>
            <div className="absolute bottom-20 right-20 text-4xl opacity-10 transform -rotate-12">🎁</div>
          </div>
          
          <div className="desktop-container relative z-10">
            <NewsletterSignup />
          </div>
        </section>
      </main>
    </>
  );
}