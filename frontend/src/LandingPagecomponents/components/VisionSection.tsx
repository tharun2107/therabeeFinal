import React from "react";
import familyImage from "../../assets/family-therapist-illustration.jpg";

interface VisionSectionProps {
  darkMode?: boolean
}

const VisionSection: React.FC<VisionSectionProps> = ({ darkMode = false }) => {
  return (
    <section 
      className={`py-12 sm:py-16 lg:py-20 transition-colors duration-300 ${
        darkMode 
          ? 'bg-black' 
          : 'bg-[#F9F9F9]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Image */}
          <div className="relative">
            <div className="relative">
              <img
                src={familyImage}
                alt="Happy family with therapist showing care and support"
                className="w-full h-auto rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Our <span className={darkMode ? 'text-accent-blue' : 'text-[#1A1A1A]'}>
                  Mission
                </span>
              </h2>
              <div className={`w-16 h-1 rounded-full ${
                darkMode ? 'bg-accent-blue' : 'bg-[#1A1A1A]'
              }`} />
            </div>
            
            <div className="space-y-4">
              <p className={`text-base sm:text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                At Therabee, we aim to make therapy accessible, secure, and seamless 
                for every child. We believe that mental health support should be available 
                when and where families need it most.
              </p>
              
              <p className={`text-base sm:text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Our platform bridges the gap between families seeking help and qualified 
                therapists ready to provide compassionate, professional care through 
                innovative technology.
              </p>
            </div>

            {/* Mission Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {['Accessible Care', 'Verified Therapists', 'Secure Platform', 'Family-Centered'].map((point, index) => (
                <div 
                  key={point}
                  className="flex items-center space-x-3"
                >
                  <div className={`w-3 h-3 rounded-full ${
                    darkMode ? 'bg-accent-blue' : 'bg-accent-blue'
                  }`} />
                  <span className={`font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
