import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import heroImage from "../../assets/hero-therapy-session.jpg";

interface HeroSectionProps {
  darkMode?: boolean
  onBookDemoClick?: () => void
}

const HeroSection: React.FC<HeroSectionProps> = ({ darkMode = false, onBookDemoClick }) => {
  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode 
          ? 'bg-black' 
          : 'bg-[#F9F9F9]'
      }`}
    >

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
              darkMode ? 'text-white' : 'text-[#1A1A1A]'
            }`}>
              Connecting Children with{" "}
              <span className={darkMode ? 'text-accent-blue' : 'text-[#1A1A1A]'}>
                Trusted Therapists
              </span>,{" "}
              <span className={darkMode ? 'text-white' : 'text-[#4D4D4D]'}>
                Anytime, Anywhere
              </span>
            </h1>
            <p className={`text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-[#4D4D4D]'
            }`}>
              Therabee helps families find verified therapists, book secure sessions, 
              and track progress — all in one place.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/login">
              <Button 
                size="lg" 
                className={`text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 font-bold transition-colors ${
                  darkMode 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-black text-white hover:bg-[#1A1A1A]'
                }`}
              >
                Sign In
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              onClick={onBookDemoClick}
              className={`text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 font-bold transition-colors ${
                darkMode 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-[#1A1A1A]'
              }`}
            >
              <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Book Demo Session
            </Button>
          </div>

          {/* Partner Logos */}
          <div className="pt-8">
            <p className={`text-sm mb-4 ${
              darkMode ? 'text-gray-300' : 'text-[#4D4D4D]'
            }`}>Trusted by leading healthcare providers</p>
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6">
              <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
                darkMode 
                  ? 'text-gray-300 bg-white/10' 
                  : 'text-[#4D4D4D] bg-white border border-[#E6E6E6]'
              }`}>Mayo Clinic</div>
              <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
                darkMode 
                  ? 'text-gray-300 bg-white/10' 
                  : 'text-[#4D4D4D] bg-white border border-[#E6E6E6]'
              }`}>Johns Hopkins</div>
              <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
                darkMode 
                  ? 'text-gray-300 bg-white/10' 
                  : 'text-[#4D4D4D] bg-white border border-[#E6E6E6]'
              }`}>Cleveland Clinic</div>
              <div className={`text-sm font-semibold px-3 py-1 rounded-full ${
                darkMode 
                  ? 'text-accent-blue bg-accent-blue/20' 
                  : 'text-[#1A1A1A] bg-accent-blue/20'
              }`}>+500 more</div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={heroImage}
              alt="Child having a therapy session with a professional therapist via video call"
              className="w-full h-auto rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;