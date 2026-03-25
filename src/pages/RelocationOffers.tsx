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
    </Layout>
  );
};

export default RelocationOffers;
