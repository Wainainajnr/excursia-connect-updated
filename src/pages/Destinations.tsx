import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import DestinationCard from '@/components/DestinationCard';
import { getPosters } from '@/lib/posterStorage';
import { Poster } from '@/types/poster';

// Import destination images
import destMountains from '@/assets/destination-mountains.jpg';
import destIsland from '@/assets/destination-island.jpg';
import destCity from '@/assets/destination-city.jpg';
import destCoastal from '@/assets/destination-coastal.jpg';
import heroSafari from '@/assets/hero-safari.jpg';
import heroBeach from '@/assets/hero-beach.jpg';

const Destinations = () => {
  const [dynamicDestinations, setDynamicDestinations] = useState<Poster[]>([]);

  useEffect(() => {
    const posters = getPosters();
    setDynamicDestinations(posters.filter(p => p.category === 'destination'));
  }, []);

  const allDestinations = dynamicDestinations.map(p => ({
    id: p.id,
    image: p.image,
    title: p.title,
    location: p.location || '',
    description: p.description,
    price: p.price,
    link: `/destinations/${p.id}`,
  }));

  const recommendedPackages = dynamicDestinations
    .filter(p => p.category === 'offer' || p.category === 'destination')
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

  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-28 sm:pt-36 lg:pt-48 pb-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <span className="text-[10px] font-bold tracking-[0.4em] text-[#C17F59] uppercase mb-6 block">
            Discover Excellence
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-luxury text-[#1B2A4A] mb-8 leading-tight">
            Our <span className="italic">Destinations</span>
          </h1>
          <div className="w-24 h-1 bg-[#C17F59] mx-auto mb-10 rounded-full" />
          <p className="text-xl md:text-2xl text-muted-foreground font-serif italic max-w-3xl mx-auto">
            From the majestic Mara to pristine island echoes, discover handpicked sanctuaries of adventure.
          </p>
        </div>
      </section>

      {/* All Destinations Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-luxury text-[#1B2A4A] mb-6">
              The <span className="italic">Collection</span>
            </h2>
            <div className="w-20 h-1 bg-[#C17F59] mx-auto mb-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allDestinations.map((destination, index) => (
              <DestinationCard key={index} {...destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#C17F59] uppercase mb-6 block">
              Curated Selection
            </span>
            <h2 className="text-3xl md:text-5xl font-luxury text-[#1B2A4A] mb-6">
              Recommended for <span className="italic">You</span>
            </h2>
            <div className="w-20 h-1 bg-[#C17F59] mx-auto mb-8 rounded-full" />
            <p className="text-muted-foreground font-serif italic text-lg max-w-2xl mx-auto">
              Based on popular choices and current travel trends, these handpicked packages offer exceptional value and unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedPackages.map((pkg, index) => (
              <DestinationCard key={index} {...pkg} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Destinations;
