import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { AdvancedParallax, MagneticButton, FloatingElements } from '../components/AdvancedParallax';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Phone, 
  Mail,
  BookOpen,
  CreditCard,
  Truck,
  RotateCcw,
  User,
  Settings,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export function Help() {
  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [contentRef, contentVisible] = useScrollAnimation(0.2);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const helpCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of using Ikirezi",
      articles: 12,
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: CreditCard,
      title: "Orders & Payments",
      description: "Manage your orders and payment methods",
      articles: 8,
      color: "from-green-500 to-green-600"
    },
    {
      icon: Truck,
      title: "Shipping & Delivery",
      description: "Track packages and delivery information",
      articles: 6,
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: RotateCcw,
      title: "Returns & Refunds",
      description: "Return books and get refunds",
      articles: 5,
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: User,
      title: "Account & Profile",
      description: "Manage your account settings",
      articles: 7,
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Settings,
      title: "Technical Support",
      description: "Troubleshoot technical issues",
      articles: 10,
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const faqs = [
    {
      category: "Getting Started",
      question: "How do I create an account?",
      answer: "Creating an account is easy! Click the 'Sign Up' button in the top right corner, fill in your details, and verify your email address. You'll then have access to personalized recommendations, order history, and more."
    },
    {
      category: "Orders & Payments",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through our encrypted payment system."
    },
    {
      category: "Shipping & Delivery",
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. International shipping times vary by location but typically take 7-14 business days. You'll receive tracking information once your order ships."
    },
    {
      category: "Returns & Refunds",
      question: "Can I return books I've already read?",
      answer: "Books must be returned in new, unread condition within 30 days of purchase. We cannot accept returns for books that show signs of wear, highlighting, or damage. Digital books are generally non-refundable."
    },
    {
      category: "Account & Profile",
      question: "How do I change my password?",
      answer: "Go to your account settings, click on 'Security', and then 'Change Password'. Enter your current password and your new password twice. Make sure your new password is strong and unique."
    },
    {
      category: "Technical Support",
      question: "The website is loading slowly. What should I do?",
      answer: "Try refreshing the page, clearing your browser cache, or using a different browser. If the problem persists, check your internet connection or try accessing the site from a different device. Contact support if issues continue."
    },
    {
      category: "Orders & Payments",
      question: "Will I be charged immediately?",
      answer: "Yes, payment is processed immediately when you place an order. This helps us ensure inventory availability and process your order quickly. You'll receive an email confirmation with your receipt."
    },
    {
      category: "Shipping & Delivery",
      question: "Do you ship internationally?",
      answer: "Yes! We ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. Some countries may have customs duties or taxes that are the customer's responsibility."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      <SEOHead 
        title="Help Center | Ikirezi Bookstore"
        description="Get help with your Ikirezi account, orders, shipping, and more. Find answers to common questions and contact our support team."
        keywords="help center, support, FAQ, customer service, ikirezi help, assistance"
      />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
          <FloatingElements count={8} intensity={0.4} />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div ref={heroRef} className="desktop-container relative z-10 text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <HelpCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="desktop-text-6xl font-bold text-white mb-6">
              Help <span className="text-yellow-300">Center</span>
            </h1>
            <p className="desktop-text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              Find answers to your questions and get the support you need. We're here to help!
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles, FAQs, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 text-lg focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-lg"
                />
              </div>
            </div>

            <div className="flex justify-center items-center space-x-8 mt-12">
              <div className="flex items-center space-x-2 text-blue-100">
                <MessageCircle className="w-6 h-6" />
                <span className="desktop-text-lg">Live Chat</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <Phone className="w-6 h-6" />
                <span className="desktop-text-lg">Phone Support</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <Mail className="w-6 h-6" />
                <span className="desktop-text-lg">Email Help</span>
              </div>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section ref={contentRef} className="py-24 bg-white relative overflow-hidden">
          <FloatingElements count={6} intensity={0.2} />
          <div className="desktop-container">
            <div className="text-center mb-16">
              <h2 className="desktop-text-5xl font-bold text-gray-900 mb-6">
                Browse Help <span className="gradient-text-primary">Categories</span>
              </h2>
              <p className="desktop-text-xl text-gray-600 max-w-3xl mx-auto">
                Find the help you need by browsing our organized categories of support articles and guides.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {helpCategories.map((category, index) => (
                <AdvancedParallax key={index} intensity={0.15} className="group">
                  <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 group-hover:-translate-y-2">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="desktop-text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 text-center">
                      {category.title}
                    </h3>
                    <p className="desktop-text-lg text-gray-600 text-center mb-4 group-hover:text-gray-700 transition-colors duration-300">
                      {category.description}
                    </p>
                    <div className="text-center">
                      <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full desktop-text-sm font-medium">
                        {category.articles} articles
                      </span>
                    </div>
                    <MagneticButton className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group">
                      Browse Articles
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </MagneticButton>
                  </div>
                </AdvancedParallax>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
          <FloatingElements count={4} intensity={0.1} />
          <div className="desktop-container">
            <div className="text-center mb-16">
              <h2 className="desktop-text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked <span className="gradient-text-primary">Questions</span>
              </h2>
              <p className="desktop-text-xl text-gray-600 max-w-3xl mx-auto">
                Quick answers to the most common questions our customers ask.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {filteredFaqs.length > 0 ? (
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <AdvancedParallax key={index} intensity={0.1} className="group">
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full desktop-text-sm font-medium">
                                {faq.category}
                              </span>
                            </div>
                            <h3 className="desktop-text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                              {faq.question}
                            </h3>
                          </div>
                          {expandedFaq === index ? (
                            <ChevronUp className="w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-colors duration-300" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-gray-500 group-hover:text-blue-600 transition-colors duration-300" />
                          )}
                        </button>
                        {expandedFaq === index && (
                          <div className="px-6 pb-6">
                            <div className="border-t border-gray-100 pt-4">
                              <p className="desktop-text-lg text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </AdvancedParallax>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="desktop-text-2xl font-bold text-gray-900 mb-4">No results found</h3>
                  <p className="desktop-text-lg text-gray-600">
                    Try searching with different keywords or browse our help categories above.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white relative overflow-hidden">
          <FloatingElements count={6} intensity={0.3} />
          <div className="desktop-container text-center relative z-10">
            <h2 className="desktop-text-5xl font-bold mb-8">
              Still Need <span className="text-yellow-300">Help?</span>
            </h2>
            <p className="desktop-text-2xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              Our support team is here to help you with any questions or issues you might have.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <MagneticButton className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 p-8 rounded-2xl group">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="desktop-text-2xl font-bold mb-4">Live Chat</h3>
                <p className="desktop-text-lg text-blue-100 mb-6">Get instant help from our support team</p>
                <div className="flex items-center justify-center space-x-2 text-yellow-300">
                  <CheckCircle className="w-5 h-5" />
                  <span className="desktop-text-lg font-medium">Available 24/7</span>
                </div>
              </MagneticButton>

              <MagneticButton className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 p-8 rounded-2xl group">
                <Phone className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="desktop-text-2xl font-bold mb-4">Phone Support</h3>
                <p className="desktop-text-lg text-blue-100 mb-6">Call us for immediate assistance</p>
                <div className="text-yellow-300 desktop-text-xl font-bold">+1 (555) 123-4567</div>
              </MagneticButton>

              <MagneticButton className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 p-8 rounded-2xl group">
                <Mail className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="desktop-text-2xl font-bold mb-4">Email Support</h3>
                <p className="desktop-text-lg text-blue-100 mb-6">Send us a detailed message</p>
                <div className="text-yellow-300 desktop-text-lg font-medium">support@ikirezi.com</div>
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
