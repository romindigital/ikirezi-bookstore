import { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { AdvancedParallax, MagneticButton, FloatingElements } from '../components/AdvancedParallax';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Headphones,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Users
} from 'lucide-react';

export function Contact() {
  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [formRef, formVisible] = useScrollAnimation(0.2);
  const [infoRef, infoVisible] = useScrollAnimation(0.3);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 3000);
  };

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
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568'],
      description: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Book Street', 'Reading City, RC 12345'],
      description: 'Open Mon-Sat 10AM-8PM'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Fri: 9AM-6PM', 'Sat: 10AM-8PM', 'Sun: Closed'],
      description: 'Customer support available'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'press', label: 'Press Inquiry' }
  ];

  return (
    <>
      <SEOHead 
        title="Contact Us | Ikirezi Bookstore"
        description="Get in touch with Ikirezi. We're here to help with your questions, support needs, and feedback. Contact us today!"
        keywords="contact ikirezi, customer support, help, bookstore contact, support"
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
            <h1 className="desktop-text-6xl font-bold text-white mb-6">
              Get in <span className="text-yellow-300">Touch</span>
            </h1>
            <p className="desktop-text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, 
              our team is here to help.
            </p>
            <div className="flex justify-center items-center space-x-8 mt-12">
              <div className="flex items-center space-x-2 text-blue-100">
                <MessageCircle className="w-6 h-6" />
                <span className="desktop-text-lg">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <Headphones className="w-6 h-6" />
                <span className="desktop-text-lg">Expert Help</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-100">
                <Users className="w-6 h-6" />
                <span className="desktop-text-lg">Friendly Team</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <FloatingElements count={6} intensity={0.2} />
          <div className="desktop-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <AdvancedParallax intensity={0.1} ref={formRef}>
                <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                  <h2 className="desktop-text-4xl font-bold text-gray-900 mb-8">
                    Send us a <span className="gradient-text-primary">Message</span>
                  </h2>
                  
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />
                      <h3 className="desktop-text-2xl font-bold text-gray-900 mb-4">Message Sent!</h3>
                      <p className="desktop-text-lg text-gray-600">
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block desktop-text-lg font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 desktop-text-lg"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block desktop-text-lg font-semibold text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 desktop-text-lg"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="inquiryType" className="block desktop-text-lg font-semibold text-gray-700 mb-2">
                          Inquiry Type
                        </label>
                        <select
                          id="inquiryType"
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 desktop-text-lg"
                        >
                          {inquiryTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block desktop-text-lg font-semibold text-gray-700 mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 desktop-text-lg"
                          placeholder="What's this about?"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block desktop-text-lg font-semibold text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 desktop-text-lg resize-none"
                          placeholder="Tell us more about your inquiry..."
                        />
                      </div>

                      <MagneticButton
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                            Send Message
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </MagneticButton>
                    </form>
                  )}
                </div>
              </AdvancedParallax>

              {/* Contact Information */}
              <AdvancedParallax intensity={0.15} ref={infoRef}>
                <div className="space-y-8">
                  <div>
                    <h2 className="desktop-text-4xl font-bold text-gray-900 mb-6">
                      Contact <span className="gradient-text-primary">Information</span>
                    </h2>
                    <p className="desktop-text-lg text-gray-600 leading-relaxed">
                      Choose the most convenient way to reach us. We're here to help with any questions 
                      or concerns you might have.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <info.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="desktop-text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                              {info.title}
                            </h3>
                            <div className="space-y-1">
                              {info.details.map((detail, idx) => (
                                <p key={idx} className="desktop-text-lg text-gray-700 font-medium">
                                  {detail}
                                </p>
                              ))}
                            </div>
                            <p className="desktop-text-sm text-gray-500 mt-2 italic">
                              {info.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                    <h3 className="desktop-text-2xl font-bold mb-4">Quick Actions</h3>
                    <div className="space-y-4">
                      <MagneticButton className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 py-3 px-6 rounded-xl flex items-center justify-center group">
                        <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Live Chat Support
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </MagneticButton>
                      <MagneticButton className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 py-3 px-6 rounded-xl flex items-center justify-center group">
                        <Headphones className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Schedule Call
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </AdvancedParallax>
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
                Find quick answers to common questions about our services, shipping, and more.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                {
                  question: "How long does shipping take?",
                  answer: "We offer free shipping on orders over $25. Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days."
                },
                {
                  question: "Can I return books?",
                  answer: "Yes! We offer a 30-day return policy for all books in new condition. Contact us to initiate a return."
                },
                {
                  question: "Do you have a mobile app?",
                  answer: "Yes, our mobile app is available for both iOS and Android. Download it from the App Store or Google Play."
                },
                {
                  question: "How do I track my order?",
                  answer: "Once your order ships, you'll receive a tracking number via email. You can also track orders in your account dashboard."
                },
                {
                  question: "Do you offer international shipping?",
                  answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location."
                },
                {
                  question: "How can I contact customer support?",
                  answer: "You can reach us via email, phone, live chat, or our contact form. We typically respond within 24 hours."
                }
              ].map((faq, index) => (
                <AdvancedParallax key={index} intensity={0.1} className="group">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
                    <h3 className="desktop-text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <p className="desktop-text-lg text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </AdvancedParallax>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
