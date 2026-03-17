import { useState, useEffect } from 'react';
import { Home, Package, MapPin, CheckCircle, Plane, FileText, Globe } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { getPosters } from '@/lib/posterStorage';
import { Poster } from '@/types/poster';
import relocationHero from '@/assets/relocation-hero.jpg';
import destCoastal from '@/assets/destination-coastal.jpg';
import heroBeach from '@/assets/hero-beach.jpg';
import destCity from '@/assets/destination-city.jpg';

const RelocationOffers = () => {
  const [dynamicPosters, setDynamicPosters] = useState<Poster[]>([]);

  useEffect(() => {
    setDynamicPosters(getPosters());
  }, []);

  const relocationIcons: Record<string, any> = {
    'r1': Home,
    'r2': FileText,
    'r3': MapPin,
    'r4': Plane,
  };

  const relocationServices = dynamicPosters.filter(p => p.category === 'relocation').map(p => ({
    icon: relocationIcons[p.id] || Globe,
    title: p.title,
    description: p.description,
  }));

  const specialOffers = dynamicPosters.filter(p => p.category === 'offer').map(p => ({
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
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-36 lg:pt-48">
        <div className="container mx-auto px-4 h-full py-8">
          <div className="relative h-[60vh] rounded-luxury overflow-hidden shadow-2xl">
            <img
              src={relocationHero}
              alt="Relocation services"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1B2A4A]/40" />
            
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8 md:px-12">
                <div className="max-w-3xl text-white">
                  <span className="text-[10px] font-bold tracking-[0.4em] text-[#C17F59] uppercase mb-6 block">
                    Seamless Transitions
                  </span>
                  <h1 className="text-4xl md:text-6xl font-luxury mb-8 leading-tight">
                    Relocation <span className="italic font-serif">Services</span> & Offers
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 font-serif italic max-w-2xl leading-relaxed">
                    Experience a smooth transition to your new life in Kenya with our bespoke, high-touch relocation support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relocation Service Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-luxury text-[#1B2A4A] mb-8 leading-tight">
              Our <span className="italic">Relocation</span> Expertise
            </h2>
            <div className="w-24 h-1 bg-[#C17F59] mx-auto mb-10 rounded-full" />
            
            <div className="space-y-8">
              <p className="text-xl text-muted-foreground font-serif italic leading-relaxed">
                At Excursia Connect, we understand that relocating to a new country is an art of transition.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our dedicated white-glove team specializes in helping Kenyans living abroad make a smooth homecoming. Whether you're planning to retire in majesty, launch a new venture, or simply return to your roots, we ensure every detail of your journey is handled with grace and precision.
              </p>
            </div>
          </div>

            {/* Service Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
              {relocationServices.map((service, index) => (
                <div key={index} className="flex items-start space-x-8 p-10 bg-white rounded-luxury border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#F9F9F9] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <service.icon className="h-7 w-7 text-[#1B2A4A]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-luxury font-bold text-xl mb-4 text-[#1B2A4A]">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button className="rounded-full bg-[#1B2A4A] text-white hover:bg-[#1B2A4A]/90 text-xs font-bold tracking-[0.3em] px-12 py-8 h-auto uppercase transition-all duration-300 hover:scale-105 shadow-xl">
                SCHEDULE A CONSULTATION
              </Button>
            </div>
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
    </Layout>
  );
};

export default RelocationOffers;
