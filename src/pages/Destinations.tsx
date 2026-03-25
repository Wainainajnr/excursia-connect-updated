import { useState, useEffect } from 'react';
import { MapPin, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
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
    setDynamicDestinations(posters.filter(p => p.category === 'destination' || p.category === 'offer'));
  }, []);

  const allDestinations = dynamicDestinations
    .filter(p => p.category === 'destination')
    .map(p => ({
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
    
  const specialOffers = dynamicDestinations.filter(p => p.category === 'offer').map(p => ({
    image: p.image,
    title: p.title,
    location: p.location || 'Special Offer',
    originalPrice: '',
    discountedPrice: p.price,
    discount: 'SPECIAL VALUE',
    features: [p.description],
    id: p.id
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

      {/* Special Offers Section */}
      <section className="py-20 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-luxury text-[#1B2A4A] mb-8 leading-tight">
              Special <span className="italic">Travel</span> Offers
            </h2>
            <div className="w-24 h-1 bg-[#C17F59] mx-auto mb-10 rounded-full" />
            <p className="text-xl text-muted-foreground font-serif italic max-w-2xl mx-auto leading-relaxed">
              Curated limited-time collections for the discerning traveler.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {specialOffers.map((offer, index) => (
              <div key={index} className="group bg-white rounded-luxury overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 right-6 bg-[#C17F59] text-[#1B2A4A] px-6 py-2 rounded-full font-bold text-sm tracking-widest shadow-xl z-20">
                    {offer.discount}
                  </div>
                  <div className="absolute inset-0 bg-[#1B2A4A]/20 group-hover:bg-[#1B2A4A]/10 transition-colors" />
                </div>

                <div className="p-10">
                  <div className="flex items-center space-x-2 text-muted-foreground mb-4 tracking-[0.2em] text-[10px] font-bold">
                    <MapPin className="h-3 w-3 text-[#C17F59]" />
                    <span>{offer.location}</span>
                  </div>

                  <h3 className="text-xl font-luxury text-[#1B2A4A] mb-6 leading-tight">{offer.title}</h3>

                  <div className="flex items-baseline space-x-4 mb-8">
                    <span className="text-2xl font-bold text-[#1B2A4A]">{offer.discountedPrice}</span>
                    {offer.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through italic">{offer.originalPrice}</span>
                    )}
                  </div>

                  <ul className="space-y-4 mb-10 border-t border-gray-50 pt-8">
                    {offer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-sm text-muted-foreground font-serif italic">
                        <CheckCircle className="h-4 w-4 text-[#C17F59] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className="w-full rounded-full bg-[#1B2A4A] text-white hover:bg-[#1B2A4A]/90 py-8 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300">
                    DISCOVER OFFER
                  </Button>
                </div>
              </div>
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
