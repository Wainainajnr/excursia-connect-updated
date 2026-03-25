import React from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '@/data/mockExperiences';

const TrustSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#1B2A4A] overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C17F59]/5 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C17F59]/5 rounded-full -ml-32 -mb-32 blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.4em] text-[#C17F59] uppercase mb-4 block">
            Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-luxury text-white italic">
            Trusted by <span className="not-italic">Travelers in Kenya</span>
          </h2>
          <div className="w-24 h-1 bg-[#C17F59] mx-auto mt-6 rounded-full" />
        </div>

        <div className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-80 md:w-[400px] bg-white/5 backdrop-blur-xl p-8 rounded-luxury border border-white/10 snap-start hover:bg-white/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < testimonial.rating ? '#C17F59' : 'none'}
                      className={i < testimonial.rating ? 'text-[#C17F59]' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <p className="text-white/80 text-xl font-serif italic mb-8 group-hover:text-white transition-colors leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full border-2 border-[#C17F59]/30 p-0.5 object-cover"
                />
                <div className="text-left">
                  <h4 className="text-white font-bold text-lg tracking-tight">{testimonial.name}</h4>
                  <p className="text-[#C17F59] text-xs font-bold uppercase tracking-[0.2em]">Verified Traveler</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
