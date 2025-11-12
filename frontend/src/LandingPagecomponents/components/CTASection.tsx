import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface CTASectionProps {
  darkMode?: boolean
}

const CTASection: React.FC<CTASectionProps> = ({ darkMode = false }) => {
  return (
    <section className={`py-16 sm:py-20 relative transition-colors duration-300 ${
      darkMode 
        ? 'bg-black' 
        : 'bg-[#1A1A1A]'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Sparkle Icon */}
          <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-6 sm:mb-8 ${
            darkMode ? 'bg-white' : 'bg-white'
          }`}>
            <Sparkles className={`w-8 h-8 sm:w-10 sm:h-10 ${
              darkMode ? 'text-black' : 'text-black'
            }`} />
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-white px-4">
            Ready to experience the{" "}
            <span className="text-white">
              future of therapy
            </span>
            ?
          </h2>

          {/* Subtext */}
          <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4">
            Join thousands of families who have found the therapeutic support they need. 
            Your child's mental health journey starts with a single click.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-4">
            <Link to="/login">
              <Button 
                size="lg" 
                className={`text-base sm:text-xl px-8 sm:px-10 py-4 sm:py-6 font-semibold w-full sm:w-auto ${
                  darkMode 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                Sign In
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">24/7</div>
              <div className="text-sm sm:text-base text-white/80">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">HIPAA</div>
              <div className="text-sm sm:text-base text-white/80">Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">100%</div>
              <div className="text-sm sm:text-base text-white/80">Secure</div>
            </div>
          </div>

          {/* Rating Display */}
          <div className="mt-8">
            <div className="flex justify-center items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-6 h-6 bg-white rounded-full"
                />
              ))}
              <span className="ml-3 text-white/90">4.9/5 rating from 2,000+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
