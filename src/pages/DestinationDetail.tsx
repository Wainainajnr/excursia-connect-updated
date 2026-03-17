import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPosterById } from '@/lib/posterStorage';
import { MapPin, ArrowLeft, Check } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

// Import destination images
import destMountains from '@/assets/destination-mountains.jpg';
import destIsland from '@/assets/destination-island.jpg';
import destCity from '@/assets/destination-city.jpg';
import destCoastal from '@/assets/destination-coastal.jpg';
import heroSafari from '@/assets/hero-safari.jpg';
import heroBeach from '@/assets/hero-beach.jpg';

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const p = getPosterById(id);
      if (p) {
        setDestination(p);
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) return <Layout><div className="pt-28 sm:pt-36 lg:pt-48 text-center">Loading...</div></Layout>;

  if (!destination) {
    return (
      <Layout>
        <section className="pt-32 pb-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-heading font-bold mb-6">Destination Not Found</h1>
            <p className="text-muted-foreground mb-8">The destination you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/destinations')}>Back to Destinations</Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] lg:h-[75vh] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1B2A4A]/40" />
        
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#C17F59] uppercase mb-6 block drop-shadow-lg">
              Exceptional Sanctuary
            </span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-luxury text-white mb-8 leading-tight drop-shadow-2xl">
              {destination.title}
            </h1>
            <div className="flex items-center justify-center space-x-3 text-white/90 font-serif italic text-xl md:text-2xl">
              <MapPin className="h-6 w-6 text-[#C17F59]" />
              <span>{destination.location}</span>
            </div>
          </div>
        </div>

        <Link
          to="/destinations"
          className="absolute top-24 sm:top-32 lg:top-44 left-8 flex items-center space-x-2 text-white/80 hover:text-white transition-colors group z-20"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold tracking-widest uppercase">Back to Collection</span>
        </Link>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Price Badge */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 p-8 bg-[#F9F9F9] rounded-luxury border border-gray-100 shadow-sm gap-8 transition-all hover:bg-white hover:shadow-xl group">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#C17F59] uppercase mb-2 block">Premium Experience</span>
                <div className="text-4xl md:text-5xl font-luxury text-[#1B2A4A] uppercase tracking-tight">{destination.price}</div>
              </div>
              <Button 
                size="lg" 
                className="w-full md:w-auto rounded-full bg-[#1B2A4A] text-white hover:bg-[#1B2A4A]/90 py-8 px-12 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 shadow-xl"
                onClick={() => navigate('/contact')}
              >
                SECURE YOUR JOURNEY
              </Button>
            </div>

            {/* Description */}
            <div className="mb-20">
              <h2 className="text-3xl font-luxury text-[#1B2A4A] mb-8">About This <span className="italic">Experience</span></h2>
              <div className="w-20 h-1 bg-[#C17F59] mb-8 rounded-full" />
              <p className="text-muted-foreground text-lg leading-relaxed font-serif italic border-l-4 border-gray-100 pl-8">{destination.longDescription}</p>
            </div>

            {/* Highlights */}
            {destination.highlights && (
              <div className="mb-20">
                <h3 className="text-2xl font-luxury text-[#1B2A4A] mb-8 uppercase tracking-tight">Experience <span className="italic">Highlights</span></h3>
                <div className="grid gap-6">
                  {destination.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-luxury hover:bg-[#F9F9F9] transition-colors group">
                      <div className="bg-[#C17F59] shadow-sm p-1.5 rounded-full mt-1 group-hover:scale-110 transition-transform">
                        <Check className="h-3 w-3 text-[#1B2A4A]" />
                      </div>
                      <p className="text-muted-foreground text-lg leading-relaxed">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            {destination.included && (
              <div className="bg-[#1B2A4A] p-12 rounded-luxury mb-20 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C17F59] rounded-full blur-[100px] opacity-10 -mr-32 -mt-32 transition-opacity group-hover:opacity-20" />
                <h3 className="text-2xl font-luxury text-white mb-10 uppercase tracking-tight relative z-10">What's <span className="italic text-[#C17F59]">Included</span></h3>
                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  {destination.included.map((item: string, index: number) => (
                    <div key={index} className="flex items-start space-x-4 border-b border-white/10 pb-4">
                      <div className="bg-[#C17F59] p-1 rounded-full mt-1 shrink-0">
                        <Check className="h-3 w-3 text-[#1B2A4A]" />
                      </div>
                      <p className="text-white/80 text-lg leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="bg-[#F9F9F9] p-12 rounded-luxury text-center border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#C17F59] rounded-full blur-[80px] opacity-10 -ml-16 -mt-16" />
              <h3 className="text-3xl font-luxury text-[#1B2A4A] mb-6 uppercase tracking-tight relative z-10">Ready for Your <span className="italic">Adventure?</span></h3>
              <p className="text-muted-foreground text-lg mb-10 font-serif italic relative z-10">
                Contact our private travel consultants today to customize this sanctuary or explore further possibilities.
              </p>
              <Button 
                size="lg" 
                className="rounded-full bg-[#1B2A4A] text-white hover:bg-[#1B2A4A]/90 py-8 px-16 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 shadow-xl relative z-10"
                onClick={() => navigate('/contact')}
              >
                GET IN TOUCH
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DestinationDetail;
