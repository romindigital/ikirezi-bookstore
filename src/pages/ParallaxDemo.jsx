import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { AdvancedParallax, FloatingElements, CursorFollower, MagneticButton } from '../components/AdvancedParallax';
import { BookOpen, Star, Heart, Zap, Sparkles } from 'lucide-react';

export function ParallaxDemo() {
  return (
    <>
      <SEOHead
        title="Advanced Parallax Demo - Ikirezi"
        description="Experience advanced parallax effects and cursor-following animations on Ikirezi."
        keywords="parallax, animations, cursor effects, modern UI, interactive design"
      />
      
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Cursor Follower */}
        <CursorFollower />
        
        {/* Floating Elements */}
        <FloatingElements count={50} intensity={0.8} />
        
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="text-center z-10">
            <AdvancedParallax intensity={0.5}>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 animate-pulse-glow">
                Advanced <span className="gradient-text">Parallax</span>
              </h1>
            </AdvancedParallax>
            
            <AdvancedParallax intensity={0.3}>
              <p className="text-xl md:text-2xl text-blue-200 mb-12 max-w-3xl mx-auto">
                Experience modern cursor-following animations and 3D parallax effects
              </p>
            </AdvancedParallax>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <MagneticButton className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Books
              </MagneticButton>
              
              <MagneticButton className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors">
                <Star className="w-5 h-5 mr-2" />
                View Features
              </MagneticButton>
            </div>
          </div>
        </section>
        
        {/* Interactive Cards Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              Interactive <span className="gradient-text">Elements</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: BookOpen, title: "3D Tilt Effect", description: "Cards tilt based on cursor position", color: "from-blue-500 to-cyan-500" },
                { icon: Star, title: "Magnetic Buttons", description: "Buttons follow your cursor movement", color: "from-purple-500 to-pink-500" },
                { icon: Heart, title: "Floating Particles", description: "Animated particles that respond to cursor", color: "from-red-500 to-orange-500" },
                { icon: Zap, title: "Smooth Animations", description: "Fluid transitions and hover effects", color: "from-green-500 to-teal-500" },
                { icon: Sparkles, title: "Glow Effects", description: "Dynamic lighting and shadow effects", color: "from-yellow-500 to-amber-500" },
                { icon: BookOpen, title: "Responsive Design", description: "Works perfectly on all devices", color: "from-indigo-500 to-blue-500" }
              ].map((item, index) => (
                <AdvancedParallax key={index} intensity={0.4}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 glow-effect">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 animate-rotate3d`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </AdvancedParallax>
              ))}
            </div>
          </div>
        </section>
        
        {/* Cursor Interaction Demo */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Move Your <span className="gradient-text">Cursor</span> Around
            </h2>
            <p className="text-xl text-blue-200 mb-12">
              Watch how elements respond to your cursor movement with smooth 3D effects
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AdvancedParallax intensity={0.6}>
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-12 border border-white/30 hover:border-white/50 transition-all duration-300">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">3D Card Tilt</h3>
                  <p className="text-blue-200">This card tilts in 3D space based on your cursor position</p>
                </div>
              </AdvancedParallax>
              
              <AdvancedParallax intensity={0.6}>
                <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-sm rounded-3xl p-12 border border-white/30 hover:border-white/50 transition-all duration-300">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Magnetic Effect</h3>
                  <p className="text-green-200">Elements are drawn toward your cursor with magnetic attraction</p>
                </div>
              </AdvancedParallax>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AdvancedParallax intensity={0.3}>
              <h2 className="text-5xl font-bold text-white mb-8">
                Ready to <span className="gradient-text">Explore</span>?
              </h2>
            </AdvancedParallax>
            
            <AdvancedParallax intensity={0.2}>
              <p className="text-xl text-blue-200 mb-12">
                Experience these advanced animations throughout the entire Ikirezi website
              </p>
            </AdvancedParallax>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <MagneticButton className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl animate-pulse-glow">
                <BookOpen className="w-6 h-6 mr-3" />
                Browse Books
              </MagneticButton>
              
              <MagneticButton className="px-10 py-5 bg-gradient-to-r from-green-600 to-teal-600 text-white text-xl font-bold rounded-full hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-2xl animate-pulse-glow">
                <Star className="w-6 h-6 mr-3" />
                View Categories
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
