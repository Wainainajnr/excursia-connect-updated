import { useState, useEffect } from 'react';
import { Route, ShieldCheck, MapPinned, Trophy, Map, Compass, Shield, Users, Award } from 'lucide-react';
import Layout from '@/components/Layout';
import HeroCarousel from '@/components/HeroCarousel';
import DestinationCard from '@/components/DestinationCard';
import Newsletter from '@/components/Newsletter';
import PosterGrid from '@/components/PosterGrid';
import { Button } from '@/components/ui/button';
import { getPosters, seedStorage } from '@/lib/posterStorage';
import { Poster } from '@/types/poster';
import heroSafari from '@/assets/hero-safari.jpg';
import heroBeach from '@/assets/hero-beach.jpg';
import heroWildlife from '@/assets/hero-wildlife.jpg';

// Import destination images
import destMountains from '@/assets/destination-mountains.jpg';
import destIsland from '@/assets/destination-island.jpg';
import destCity from '@/assets/destination-city.jpg';
import destCoastal from '@/assets/destination-coastal.jpg';

const Home = () => {
  const featuredServices = [
    {
      icon: Map,
      title: 'Custom Itineraries',
      tagline: 'TAILORED FOR YOU',
      description: 'Tailored travel plans designed specifically for your preferences and budget.',
      color: 'bg-blue-50',
      iconColor: 'text-blue-500',
      lineColor: 'bg-blue-300',
    },
    {
      icon: ShieldCheck,
      title: 'Safe & Secure',
      tagline: 'PRIORITY SAFETY',
      description: 'Travel with confidence knowing your safety and security are our top priorities.',
      color: 'bg-green-50',
      iconColor: 'text-green-600',
      lineColor: 'bg-green-600/50',
    },
    {
      icon: MapPinned,
      title: 'Expert Guides',
      tagline: 'LOCAL EXPERTISE',
      description: 'Knowledgeable local guides who bring destinations to life with authentic experiences.',
      color: 'bg-amber-50',
      iconColor: 'text-amber-600',
      lineColor: 'bg-amber-600/50',
    },
    {
      icon: Trophy,
      tagline: 'TOP EXCELLENCE',
      title: 'Award-Winning',
      description: 'Recognized for excellence in customer service and unforgettable travel experiences.',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
      lineColor: 'bg-purple-600/50',
    },
  ];

  const [dynamicPosters, setDynamicPosters] = useState<Poster[]>([]);

  // No longer need manual seeding here, handled in posterStorage.ts
  useEffect(() => {
    setDynamicPosters(getPosters());
  }, []);

  const topDestinations = dynamicPosters
    .filter(p => p.category === 'destination')
    .slice(0, 3)
    .map(p => ({
      id: p.id,
      image: p.image,
      title: p.title,
      location: p.location || '',
      description: p.description,
      price: p.price,
      link: `/destinations/${p.id}`,
    }));

  const recommendedPackages = dynamicPosters
    .filter(p => p.category === 'offer')
    .map(p => ({
      id: p.id,
      image: p.image,
      title: p.title,
      location: p.location || '',
      description: p.description,
      price: p.price,
      link: `/destinations/${p.id}`,
    }));

  return (
    <Layout>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Introduction Section */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto text-center animate-fade-in px-8 py-12 md:px-20 rounded-luxury bg-[#F9F9F9] border border-gray-100 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-3 text-left">
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#C17F59] uppercase mb-6 block">
                  The Vision
                </span>
                <h2 className="text-3xl md:text-5xl font-luxury text-[#1B2A4A] mb-8 leading-tight">
                  Where epic travel meets <span className="italic">epic expectations</span>.
                </h2>
                <div className="w-24 h-1 bg-[#C17F59] mb-8 rounded-full" />
                <p className="text-lg text-muted-foreground leading-relaxed font-serif italic tracking-wide">
                  From thrilling safaris to peaceful beach retreats, from cultural explorations to seamless relocation services—we're your partner in every adventure.
                </p>
              </div>
              
              <div className="lg:col-span-2">
                <div className="relative p-8 border-l-2 border-[#C17F59]/30">
                  <p className="text-xl md:text-2xl text-[#1B2A4A] font-luxury italic leading-relaxed py-2">
                    "We specialize in creating unforgettable journeys that transform the way you experience the world."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Destinations Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-3xl md:text-5xl font-luxury text-[#1B2A4A] italic">
              Top <span className="not-italic">Destinations</span>
            </h2>
            <Button 
              variant="outline" 
              className="rounded-full border-black text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white transition-all duration-300 text-xs font-bold tracking-[0.2em] uppercase px-8"
              onClick={() => window.location.href = '/destinations'}
            >
              VIEW COLLECTION
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDestinations.map((destination, index) => (
              <DestinationCard key={index} {...destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended for You - Horizontal Scroll */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-luxury text-[#1B2A4A] italic">
              Recommended for <span className="not-italic">You</span>
            </h2>
            <div className="w-20 h-1 bg-[#C17F59] mx-auto mt-6 rounded-full" />
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
            {recommendedPackages.map((pkg, index) => (
              <div key={index} className="flex-shrink-0 w-80 snap-start">
                <DestinationCard {...pkg} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services - Why Choose Excursia Connect */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24 max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-luxury text-[#1B2A4A] mb-6 leading-tight">
              Why Choose <span className="italic">Excursia Connect</span>
            </h2>
            <div className="w-24 h-1 bg-[#C17F59] mx-auto mb-8 rounded-full" />
            <p className="text-lg text-muted-foreground font-serif italic tracking-wide">
              Authentic Kenyan travel experiences crafted with passion and precision.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {[
              {
                title: 'Local Expertise',
                desc: 'Deep knowledge of East African destinations with insider access to hidden gems and authentic experiences.'
              },
              {
                title: 'Personalized Service',
                desc: 'Every journey is tailored to your unique preferences, ensuring a truly personalized adventure.'
              },
              {
                title: '24/7 Support',
                desc: 'Round-the-clock assistance ensures you\'re never alone, no matter where your travels take you.'
              },
              {
                title: 'Sustainable Tourism',
                desc: 'Committed to responsible travel practices that protect wildlife, culture, and local communities.'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#F9F9F9] p-10 rounded-luxury border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center">
                <h3 className="font-luxury font-bold text-xl mb-4 text-[#1B2A4A] tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              className="rounded-full bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white text-xs font-bold tracking-[0.3em] px-12 py-8 h-auto uppercase transition-all duration-300 hover:scale-105 shadow-xl"
              onClick={() => window.location.href = '/contact'}
            >
              PLAN YOUR ESCAPE
            </Button>
          </div>
        </div>
      </section>

      {/* Admin-Added Posters */}
      <PosterGrid />

      {/* Newsletter Signup */}
      <Newsletter />
    </Layout>
  );
};

export default Home;
