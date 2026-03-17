import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getPosters } from '@/lib/posterStorage';

const HeroCarousel = () => {
  const [slides, setSlides] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const posters = getPosters();
    const heroSlides = posters
      .filter(p => p.category === 'hero')
      .map(p => ({
        image: p.image,
        title: p.title,
        subtitle: p.description,
        cta: p.price === 'Curated' ? 'Explore More' : p.price,
      }));
    setSlides(heroSlides);
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);


  return (
    <section className="relative h-[75vh] md:h-screen overflow-hidden">
      {/* Slides */}
      <div className="w-full h-full p-4 md:p-8">
        <div className="h-full w-full rounded-luxury overflow-hidden relative shadow-2xl">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : 'inactive'}`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[#1B2A4A]/30" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <div className="w-full max-w-5xl animate-fade-in flex flex-col items-center">
                  <span className="text-[10px] font-bold tracking-[0.4em] text-[#C17F59] uppercase mb-8">
                    Curated Luxury Travel
                  </span>
                  
                  <h1 className="font-luxury text-4xl md:text-7xl lg:text-8xl text-white text-center mb-12 drop-shadow-lg leading-tight">
                    {slide.title}
                  </h1>
                  
                  <p className="text-white/80 text-lg md:text-xl font-serif italic text-center mb-12 max-w-2xl leading-relaxed">
                    {slide.subtitle}
                  </p>
                  
                  <Button 
                    className="rounded-full bg-white text-black hover:bg-white/90 px-12 py-8 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 hover:scale-105 shadow-2xl"
                    onClick={() => window.location.href = '/contact'}
                  >
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-secondary' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
