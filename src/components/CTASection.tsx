import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const CTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-[#C17F59] z-0" />
      <div className="absolute inset-0 bg-black/10 z-10" />
      
      {/* Decorative SVG elements */}
      <svg className="absolute left-0 bottom-0 text-white/5 w-64 h-64 z-10 -ml-20 -mb-20 transform -rotate-12" fill="currentColor" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" />
      </svg>
      <svg className="absolute right-0 top-0 text-white/5 w-96 h-96 z-10 -mr-32 -mt-32 transform rotate-45" fill="currentColor" viewBox="0 0 100 100">
        <rect x="10" y="10" width="80" height="80" rx="20" />
      </svg>

      <div className="container mx-auto px-4 relative z-20 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <span className="text-[12px] font-bold tracking-[0.5em] text-white/80 uppercase mb-6 block">
            Start Your Journey
          </span>
          <h2 className="text-4xl md:text-7xl font-luxury text-white mb-10 leading-tight">
            Ready for your <span className="italic">next adventure?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              className="rounded-full bg-white text-[#1B2A4A] hover:bg-gray-100 text-sm font-bold tracking-[0.3em] px-14 py-8 h-auto uppercase transition-all duration-500 hover:scale-110 shadow-2xl group"
              onClick={() => navigate('/destinations')}
            >
              EXPLORE TOURS
              <span className="inline-block transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300 ml-2">→</span>
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-2 border-white text-white hover:bg-white/10 text-sm font-bold tracking-[0.3em] px-14 py-8 h-auto uppercase transition-all duration-500 hover:scale-105"
              onClick={() => navigate('/contact')}
            >
              GET IN TOUCH
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
