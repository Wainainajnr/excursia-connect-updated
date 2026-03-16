import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroSafari from '@/assets/hero-safari.jpg';
import heroBeach from '@/assets/hero-beach.jpg';
import heroWildlife from '@/assets/hero-wildlife.jpg';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
}

const slides: Slide[] = [
  {
    image: heroSafari,
    title: 'Epic Safari Adventures',
    subtitle: 'Experience the majesty of African wildlife in their natural habitat',
    cta: 'Explore Safaris',
  },
  {
    image: heroBeach,
    title: 'Paradise Beach Escapes',
    subtitle: 'Relax on pristine beaches with crystal-clear turquoise waters',
    cta: 'Discover Beaches',
  },
  {
    image: heroWildlife,
    title: 'Wildlife Encounters',
    subtitle: 'Get up close with magnificent creatures on unforgettable journeys',
    cta: 'Book Wildlife Tour',
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
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
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/60" />
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="w-full max-w-6xl animate-fade-in flex flex-col">
              <h1 className="font-serif w-full flex flex-col mb-12 lg:mb-20">
                <span className="text-3xl md:text-5xl lg:text-7xl font-normal text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-normal self-start md:ml-12 lg:ml-24 z-10 transition-all">
                  Epic Travel.
                </span>
                <span className="text-3xl md:text-5xl lg:text-7xl font-normal text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-normal self-end md:mr-16 lg:mr-32 -mt-1 md:-mt-4 z-10 transition-all">
                  Exceptional Events.
                </span>
              </h1>
              <div className="flex justify-center mt-8">
                <Button 
                  className="btn-pill bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg md:text-xl px-10 py-7 shadow-2xl hover:scale-105 transition-all duration-300 z-10"
                  onClick={() => window.location.href = '/contact'}
                >
                  {slide.cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 backdrop-blur-sm p-3 rounded-full transition-all z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 backdrop-blur-sm p-3 rounded-full transition-all z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

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
