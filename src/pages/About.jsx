import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { AdvancedParallax, MagneticButton, FloatingElements } from '../components/AdvancedParallax';
import { TypewriterText } from '../components/TypewriterText';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  BookOpen, 
  Users, 
  Star, 
  Award, 
  Heart, 
  Globe, 
  Shield, 
  Truck,
  CheckCircle,
  ArrowRight,
  Quote,
  Calendar,
  MapPin,
  TrendingUp,
  Sparkles,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  ThumbsUp,
  BookMarked,
  Search,
  Filter,
  Book,
  Flame,
  Zap
} from 'lucide-react';

export function About() {
  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [statsRef, statsVisible] = useScrollAnimation(0.2);
  const [categoriesRef, categoriesVisible] = useScrollAnimation(0.2);
  const [storyRef, storyVisible] = useScrollAnimation(0.3);
  const [valuesRef, valuesVisible] = useScrollAnimation(0.2);
  const [teamRef, teamVisible] = useScrollAnimation(0.2);
  const [missionRef, missionVisible] = useScrollAnimation(0.2);

  const stats = [
    { number: 50000, label: 'Books Available', icon: BookOpen, suffix: '+' },
    { number: 1000000, label: 'Happy Readers', icon: Users, suffix: '+' },
    { number: 4.9, label: 'Average Rating', icon: Star, suffix: '/5' },
    { number: 24, label: 'Customer Support', icon: Award, suffix: '/7' }
  ];

  const categories = [
    { 
      id: 1, 
      name: 'Fiction', 
      emoji: '📚', 
      bookCount: 1250, 
      isTrending: true, 
      color: 'from-blue-500 to-indigo-600',
      description: 'Imaginative stories and creative narratives'
    },
    { 
      id: 2, 
      name: 'Romance', 
      emoji: '💕', 
      bookCount: 1100, 
      isTrending: false, 
      color: 'from-pink-500 to-rose-600',
      description: 'Love stories and romantic tales'
    },
    { 
      id: 3, 
      name: 'Fantasy', 
      emoji: '🧙‍♂️', 
      bookCount: 980, 
      isTrending: true, 
      color: 'from-purple-500 to-violet-600',
      description: 'Magical worlds and mythical adventures'
    },
    { 
      id: 4, 
      name: 'Mystery', 
      emoji: '🔍', 
      bookCount: 890, 
      isTrending: true, 
      color: 'from-gray-600 to-slate-700',
      description: 'Suspenseful puzzles and thrilling investigations'
    },
    { 
      id: 5, 
      name: 'Non-Fiction', 
      emoji: '📖', 
      bookCount: 850, 
      isTrending: false, 
      color: 'from-green-500 to-emerald-600',
      description: 'Real stories and factual information'
    },
    { 
      id: 6, 
      name: 'Sci-Fi', 
      emoji: '🚀', 
      bookCount: 750, 
      isTrending: true, 
      color: 'from-cyan-500 to-blue-600',
      description: 'Futuristic tales and scientific adventures'
    },
    { 
      id: 7, 
      name: 'Thriller', 
      emoji: '⚡', 
      bookCount: 650, 
      isTrending: false, 
      color: 'from-orange-500 to-red-600',
      description: 'Fast-paced and intense stories'
    },
    { 
      id: 8, 
      name: 'Biography', 
      emoji: '👤', 
      bookCount: 420, 
      isTrending: false, 
      color: 'from-amber-500 to-yellow-600',
      description: 'Life stories of remarkable people'
    },
    { 
      id: 9, 
      name: 'History', 
      emoji: '📜', 
      bookCount: 380, 
      isTrending: true, 
      color: 'from-stone-600 to-gray-700',
      description: 'Stories from the past and historical events'
    },
    { 
      id: 10, 
      name: 'Self-Help', 
      emoji: '💪', 
      bookCount: 320, 
      isTrending: true, 
      color: 'from-lime-500 to-green-600',
      description: 'Personal development and growth guides'
    },
    { 
      id: 11, 
      name: 'Business', 
      emoji: '💼', 
      bookCount: 280, 
      isTrending: false, 
      color: 'from-indigo-500 to-blue-600',
      description: 'Professional development and business insights'
    },
    { 
      id: 12, 
      name: 'Science', 
      emoji: '🔬', 
      bookCount: 190, 
      isTrending: false, 
      color: 'from-teal-500 to-cyan-600',
      description: 'Scientific discoveries and research'
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(categories);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = categories.filter(category => 
      category.name.toLowerCase().includes(term) ||
      category.description.toLowerCase().includes(term)
    );
    setFilteredCategories(filtered);
  };

  const values = [
    {
      icon: Heart,
      title: 'Passion for Literature',
      description: 'We believe in the transformative power of books and are passionate about connecting readers with stories that inspire, educate, and entertain.'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Our platform brings together readers from around the world, creating a diverse community united by the love of reading.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every book in our collection is carefully curated to ensure the highest quality and authenticity for our customers.'
    },
    {
      icon: Truck,
      title: 'Reliable Service',
      description: 'We provide fast, secure, and reliable delivery services to ensure your books reach you in perfect condition.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      bio: 'Literature enthusiast with 15+ years in publishing'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Curation',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Expert in discovering hidden literary gems'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Customer Experience',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Dedicated to creating exceptional reading experiences'
    }
  ];

  const testimonials = [
    {
      name: 'Jessica Martinez',
      role: 'Book Blogger',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'Ikirezi has completely transformed my reading experience. Their curated selection and personalized recommendations have introduced me to books I never would have discovered otherwise.'
    },
    {
      name: 'David Thompson',
      role: 'Literature Professor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'As an educator, I appreciate Ikirezi\'s commitment to quality literature. Their platform makes it easy to find both classic works and contemporary masterpieces for my students.'
    },
    {
      name: 'Maria Garcia',
      role: 'Avid Reader',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'The customer service is outstanding, and the book quality is always perfect. I\'ve been a loyal customer for over two years and have never been disappointed.'
    },
    {
      name: 'James Wilson',
      role: 'Book Collector',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      rating: 5,
      text: 'Ikirezi\'s rare book collection is incredible. I\'ve found several first editions and signed copies that I couldn\'t find anywhere else. Highly recommended!'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@ikirezi.com', 'support@ikirezi.com'],
      description: 'We respond within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', 'Mon-Fri 9AM-6PM EST'],
      description: 'Speak with our team directly'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      details: ['Available 24/7', 'Instant support'],
      description: 'Get help right away'
    }
  ];

  return (
    <>
      <SEOHead 
        title="About Us | Ikirezi Bookstore"
        description="Learn about Ikirezi's mission to connect readers with amazing books. Discover our story, values, and commitment to literature."
        keywords="about ikirezi, bookstore story, mission, values, team, literature, reading"
      />
      
      <main className="min-h-screen bg-gray-50" role="main" aria-label="About Ikirezi Bookstore">
        {/* Skip Navigation */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Skip to main content
        </a>
        
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden" aria-labelledby="hero-heading">
          <FloatingElements count={8} intensity={0.4} />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-pink-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div ref={heroRef} className="desktop-container relative z-10 text-center">
            <h1 id="hero-heading" className="desktop-text-6xl font-bold text-white mb-6">
              About <span className="text-yellow-300">Ikirezi</span>
            </h1>
            <div className="desktop-text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              We're more than just a bookstore. We're a community of passionate readers, 
              dedicated to bringing you the world's finest literature and creating{' '}
              <TypewriterText 
                texts={['meaningful connections', 'inspiring stories', 'lasting memories', 'beautiful experiences']}
                speed={100}
                deleteSpeed={50}
                pauseTime={2000}
                className="text-yellow-300 font-semibold"
              />{' '}
              through stories.
            </div>
            <div className="flex justify-center items-center space-x-8 mt-12">
              <div className="flex items-center space-x-2 text-blue-100">
                <Calendar className="w-6 h-6" />
                <span className="desktop-text-lg">Founded 2020</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <MapPin className="w-6 h-6" />
                <span className="desktop-text-lg">Global Community</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <TrendingUp className="w-6 h-6" />
                <span className="desktop-text-lg">Growing Daily</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section ref={statsRef} id="main-content" className="py-20 bg-white" aria-labelledby="stats-heading">
          <div className="desktop-container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AdvancedParallax key={index} intensity={0.1} className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="desktop-text-4xl font-bold text-gray-900 mb-2">
                    <AnimatedCounter 
                      end={stat.number} 
                      duration={2000}
                      suffix={stat.suffix}
                      className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text"
                    />
                  </h3>
                  <p className="desktop-text-lg text-gray-600 font-medium">{stat.label}</p>
                </AdvancedParallax>
              ))}
            </div>
          </div>
        </section>

        {/* Browse Categories Section */}
        <section ref={categoriesRef} className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden" aria-labelledby="categories-heading">
          <FloatingElements count={8} intensity={0.15} />
          <div className="desktop-container">
            {/* Header */}
            <div className="text-center mb-20">
              <h2 id="categories-heading" className="text-5xl font-bold text-gray-900 mb-6">
                Browse <span className="gradient-text-primary">Categories</span>
              </h2>
              <div className="flex items-center justify-center space-x-4 mb-10">
                <div className="flex items-center space-x-3 bg-blue-100 text-blue-800 px-6 py-3 rounded-full shadow-lg">
                  <Book className="w-6 h-6" />
                  <span className="text-lg font-semibold">
                    <AnimatedCounter end={categories.length} duration={1500} suffix=" categories available" />
                  </span>
                </div>
              </div>
              
              {/* Search Bar */}
              <div className="max-w-lg mx-auto relative">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-14 pr-12 py-5 bg-white border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                    aria-label="Search categories"
                  />
                  <Filter className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Most Popular Section */}
            <div className="mb-16">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
                <h3 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Flame className="w-8 h-8 text-orange-500 mr-3" />
                  Most Popular
                </h3>
                <div className="flex items-center space-x-2 text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-lg font-medium">Popular Categories</span>
                </div>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredCategories.map((category, index) => (
                  <AdvancedParallax key={category.id} intensity={0.1} className="group">
                    <Link 
                      to={`/categories/${category.name.toLowerCase()}`}
                      className="block bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 group-hover:-translate-y-2 group-hover:scale-105 relative min-h-[280px]"
                      aria-label={`Browse ${category.name} category with ${category.bookCount} books`}
                    >
                      {/* Trending Badge */}
                      {category.isTrending && (
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1 shadow-lg z-10">
                          <Zap className="w-4 h-4" />
                          <span>Trending</span>
                        </div>
                      )}

                      {/* Category Content */}
                      <div className="text-center h-full flex flex-col justify-between">
                        {/* Emoji */}
                        <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
                          {category.emoji}
                        </div>

                        {/* Category Name */}
                        <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                          {category.name}
                        </h4>

                        {/* Book Count */}
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          <Book className="w-5 h-5 text-gray-500" />
                          <span className="text-lg font-semibold text-gray-700">
                            <AnimatedCounter 
                              end={category.bookCount} 
                              duration={2000 + (index * 100)}
                              suffix=" books"
                            />
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed flex-grow">
                          {category.description}
                        </p>

                        {/* Gradient Bar */}
                        <div className={`h-3 bg-gradient-to-r ${category.color} rounded-full group-hover:scale-105 transition-transform duration-300 mb-4`}></div>

                        {/* Hover Effect */}
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <div className="flex justify-center space-x-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AdvancedParallax>
                ))}
              </div>

              {/* No Results Message */}
              {filteredCategories.length === 0 && (
                <div className="text-center py-16">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="desktop-text-2xl font-bold text-gray-500 mb-2">No categories found</h3>
                  <p className="desktop-text-lg text-gray-400">Try adjusting your search terms</p>
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-20">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 text-white shadow-2xl">
                <h3 className="text-3xl font-bold mb-6">Can't find what you're looking for?</h3>
                <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Explore our complete collection or get personalized recommendations based on your reading preferences.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link to="/books">
                    <MagneticButton className="inline-flex items-center px-10 py-5 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl group text-lg">
                      <BookOpen className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                      Browse All Books
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </MagneticButton>
                  </Link>
                  <Link to="/contact">
                    <MagneticButton className="inline-flex items-center px-10 py-5 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl group text-lg">
                      <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                      Get Recommendations
                      <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section ref={storyRef} className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
          <FloatingElements count={6} intensity={0.2} />
          <div className="desktop-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AdvancedParallax intensity={0.05}>
                <div>
                  <h2 className="desktop-text-5xl font-bold text-gray-900 mb-8">
                    Our <span className="gradient-text-primary">Story</span>
                  </h2>
                  <div className="space-y-6 desktop-text-lg text-gray-600 leading-relaxed">
                    <p className="fade-in-up">
                      Founded in 2020, Ikirezi began as a small passion project with a simple mission: 
                      to make great books accessible to everyone, everywhere. What started as a local 
                      bookstore has grown into a global platform serving over a million readers worldwide.
                    </p>
                    <p className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                      Our name "Ikirezi" means "beautiful" in Kinyarwanda, reflecting our belief that 
                      every book has the potential to bring beauty, knowledge, and inspiration into your life. 
                      We carefully curate our collection to include both timeless classics and contemporary 
                      masterpieces from around the world.
                    </p>
                    <p className="fade-in-up" style={{ animationDelay: '0.4s' }}>
                      Today, we're proud to be more than just a bookstore. We're a community hub where 
                      readers discover new authors, share recommendations, and connect over their love of literature.
                    </p>
                  </div>
                </div>
              </AdvancedParallax>
              <AdvancedParallax intensity={0.1}>
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500">
                    <Quote className="w-12 h-12 mb-6 opacity-80 animate-pulse" />
                    <blockquote className="desktop-text-2xl font-medium mb-6 italic">
                      "A room without books is like a body without a soul."
                    </blockquote>
                    <cite className="desktop-text-lg opacity-90">— Cicero</cite>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-pink-400/15 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </AdvancedParallax>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="py-24 bg-white relative overflow-hidden">
          <FloatingElements count={4} intensity={0.1} />
          <div className="desktop-container">
            <div className="text-center mb-20">
              <h2 className="desktop-text-5xl font-bold text-gray-900 mb-6">
                Our <span className="gradient-text-primary">Values</span>
              </h2>
              <p className="desktop-text-xl text-gray-600 max-w-3xl mx-auto">
                These core values guide everything we do and shape the experience we create for our community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <AdvancedParallax key={index} intensity={0.15} className="text-center group">
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 group-hover:-translate-y-2">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <value.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="desktop-text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{value.title}</h3>
                    <p className="desktop-text-lg text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{value.description}</p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles className="w-6 h-6 text-yellow-400 mx-auto animate-pulse" />
                    </div>
                  </div>
                </AdvancedParallax>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section ref={teamRef} className="py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
          <FloatingElements count={5} intensity={0.15} />
          <div className="desktop-container">
            <div className="text-center mb-20">
              <h2 className="desktop-text-5xl font-bold text-gray-900 mb-6">
                Meet Our <span className="gradient-text-primary">Team</span>
              </h2>
              <p className="desktop-text-xl text-gray-600 max-w-3xl mx-auto">
                The passionate people behind Ikirezi who work every day to bring you the best reading experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {team.map((member, index) => (
                <AdvancedParallax key={index} intensity={0.2} className="text-center group">
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 group-hover:-translate-y-3">
                    <div className="relative mb-8">
                      <div className="w-48 h-48 rounded-3xl mx-auto overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-transparent to-transparent rounded-3xl group-hover:from-purple-600/30 transition-all duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-600/10 rounded-3xl group-hover:to-purple-600/20 transition-all duration-500"></div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="desktop-text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">{member.name}</h3>
                    <p className="desktop-text-lg text-blue-600 font-semibold mb-4 group-hover:text-purple-600 transition-colors duration-300">{member.role}</p>
                    <p className="desktop-text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{member.bio}</p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </AdvancedParallax>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <FloatingElements count={6} intensity={0.2} />
          <div className="desktop-container">
            <div className="text-center mb-20">
              <h2 className="desktop-text-5xl font-bold text-gray-900 mb-6">
                What Our <span className="gradient-text-primary">Customers</span> Say
              </h2>
              <p className="desktop-text-xl text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our community of readers has to say about their Ikirezi experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <AdvancedParallax key={index} intensity={0.15} className="group">
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 border border-gray-100 group-hover:border-blue-200 group-hover:-translate-y-2">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="desktop-text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {testimonial.name}
                        </h3>
                        <p className="desktop-text-lg text-blue-600 font-semibold mb-2">
                          {testimonial.role}
                        </p>
                        <div className="flex items-center space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="desktop-text-lg text-gray-700 leading-relaxed italic">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="flex justify-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </AdvancedParallax>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section ref={missionRef} className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
          <FloatingElements count={10} intensity={0.3} />
          <div className="desktop-container text-center relative z-10">
            <h2 className="desktop-text-5xl font-bold mb-8">
              Our <span className="text-yellow-300">Mission</span>
            </h2>
            <div className="desktop-text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
              To democratize access to literature and create a global community where every reader 
              can discover their next favorite book, connect with like-minded individuals, and 
              experience the{' '}
              <TypewriterText 
                texts={['transformative power', 'magic', 'beauty', 'wisdom']}
                speed={120}
                deleteSpeed={60}
                pauseTime={2500}
                className="text-yellow-300 font-semibold"
              />{' '}
              of storytelling.
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { icon: CheckCircle, title: 'Accessible', description: 'Making great books available to everyone, everywhere', color: 'from-green-400 to-emerald-500' },
                { icon: CheckCircle, title: 'Inclusive', description: 'Celebrating diverse voices and perspectives', color: 'from-pink-400 to-rose-500' },
                { icon: CheckCircle, title: 'Inspiring', description: 'Fostering a lifelong love of reading', color: 'from-yellow-400 to-orange-500' }
              ].map((item, index) => (
                <AdvancedParallax key={index} intensity={0.1} className="group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                    <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="desktop-text-xl font-bold mb-4 group-hover:text-yellow-300 transition-colors duration-300">{item.title}</h3>
                    <p className="desktop-text-lg text-blue-100 group-hover:text-white transition-colors duration-300">{item.description}</p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"></div>
                    </div>
                  </div>
                </AdvancedParallax>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
          <FloatingElements count={4} intensity={0.1} />
          <div className="desktop-container">
            <div className="text-center mb-16">
              <h2 className="desktop-text-5xl font-bold text-gray-900 mb-6">
                Get in <span className="gradient-text-primary">Touch</span>
              </h2>
              <p className="desktop-text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions about our services? Want to learn more about our mission? We'd love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {contactInfo.map((contact, index) => (
                <AdvancedParallax key={index} intensity={0.15} className="group">
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-blue-200 group-hover:-translate-y-2 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <contact.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="desktop-text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {contact.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      {contact.details.map((detail, idx) => (
                        <p key={idx} className="desktop-text-lg text-gray-700 font-medium">
                          {detail}
                        </p>
                      ))}
                    </div>
                    <p className="desktop-text-sm text-gray-500 italic mb-6">
                      {contact.description}
                    </p>
                    <Link to="/contact">
                      <MagneticButton className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
                        Contact Us
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </MagneticButton>
                    </Link>
                  </div>
                </AdvancedParallax>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <FloatingElements count={6} intensity={0.2} />
          <div className="desktop-container text-center relative z-10">
            <h2 className="desktop-text-5xl font-bold text-gray-900 mb-8">
              Join Our <span className="gradient-text-primary">Community</span>
            </h2>
            <p className="desktop-text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Ready to discover your next great read? Join thousands of readers who trust Ikirezi 
              for their literary adventures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link to="/books">
                <MagneticButton 
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl group focus:outline-none focus:ring-4 focus:ring-blue-300"
                  aria-label="Browse our collection of books"
                >
                  <BookOpen className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                  Browse Books
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </MagneticButton>
              </Link>
              <Link to="/categories">
                <MagneticButton 
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full border-2 border-blue-600 hover:bg-blue-50 hover:border-purple-600 hover:text-purple-600 transition-all duration-300 shadow-lg hover:shadow-2xl group focus:outline-none focus:ring-4 focus:ring-blue-300"
                  aria-label="Explore book categories"
                >
                  <Globe className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
                  Explore Categories
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                </MagneticButton>
              </Link>
            </div>

            {/* Additional Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link to="/contact">
                <MagneticButton className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
                  <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Contact Support
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </MagneticButton>
              </Link>
              <Link to="/about">
                <MagneticButton className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
                  <BookMarked className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Read Our Story
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </MagneticButton>
              </Link>
              <Link to="/help">
                <MagneticButton className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
                  <ThumbsUp className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Get Help
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </MagneticButton>
              </Link>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="desktop-text-xl font-bold text-gray-900 mb-2">Love Reading</h3>
                <p className="desktop-text-lg text-gray-600">Join our passionate community</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="desktop-text-xl font-bold text-gray-900 mb-2">Discover Gems</h3>
                <p className="desktop-text-lg text-gray-600">Find your next favorite book</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="desktop-text-xl font-bold text-gray-900 mb-2">Connect</h3>
                <p className="desktop-text-lg text-gray-600">Share with fellow readers</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}


