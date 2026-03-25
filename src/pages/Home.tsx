import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import HeroCarousel from '@/components/HeroCarousel';
import Newsletter from '@/components/Newsletter';
import FeaturedExperiences from '@/components/FeaturedExperiences';
import TrustSection from '@/components/TrustSection';
import { getPosters } from '@/lib/posterStorage';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Carousel */}
      <HeroCarousel />


      {/* Featured Experiences with Search and Filters */}
      <FeaturedExperiences />

      {/* Trust & Testimonials */}
      <TrustSection />

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
        </div>
      </section>

      {/* Newsletter Signup */}
      <Newsletter />
    </Layout>
  );
};

export default Home;
