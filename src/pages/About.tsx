import { Heart, Globe, Users, Target } from 'lucide-react';
import Layout from '@/components/Layout';
import aboutHero from '@/assets/about-hero.jpg';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Travel',
      description: 'We love what we do and it shows in every journey we craft for our clients.',
    },
    {
      icon: Globe,
      title: 'Global Expertise',
      description: 'Extensive knowledge of destinations worldwide, combined with local insights.',
    },
    {
      icon: Users,
      title: 'Client-Centered',
      description: 'Your satisfaction and memorable experiences are at the heart of everything we do.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Committed to delivering the highest quality service and unforgettable adventures.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20">
        <div className="container mx-auto px-4 h-full py-8">
          <div className="relative h-[65vh] rounded-luxury overflow-hidden shadow-2xl">
            <img
              src={aboutHero}
              alt="About Excursia Connect"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1B2A4A]/40" />
            
            <div className="absolute inset-0 flex items-center px-8 md:px-16">
              <div className="max-w-3xl text-white">
                <span className="text-[10px] font-bold tracking-[0.4em] text-[#C17F59] uppercase mb-6 block">
                  The Excursia Legacy
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-luxury mb-8 leading-tight">
                  About <span className="italic font-serif">Excursia Connect</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 font-serif italic max-w-2xl leading-relaxed">
                  Crafting extraordinary journeys and seamless transitions since 2015.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-luxury text-[#1B2A4A] mb-6">
                Our <span className="italic">Story</span>
              </h2>
              <div className="w-20 h-1 bg-[#C17F59] mx-auto mb-12 rounded-full" />
            </div>
            
            <div className="space-y-10 text-muted-foreground">
              <p className="text-xl font-serif italic leading-relaxed text-[#1B2A4A]/80">
                Founded in 2015, Excursia Connect emerged from a simple vision: to transform the way people experience travel.
              </p>
              
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  What started as a small tour operation in Nairobi has grown into a comprehensive travel and relocation service provider, serving clients across the globe. Our team of passionate travel experts brings together decades of combined experience in tourism, hospitality, and international relocation services.
                </p>
                <p>
                  We've helped thousands of travelers discover the magic of Africa while providing seamless support for those making Kenya their home. At Excursia Connect, we believe that travel is more than just visiting new places—it's about creating lasting memories, forming meaningful connections, and experiencing personal transformation.
                </p>
                <p>
                  Whether you're embarking on an epic safari adventure, relaxing on pristine beaches, or relocating to your dream destination, we're committed to making your journey extraordinary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-[#1B2A4A]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-24 text-center">
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#C17F59] uppercase mb-6 block">
              The Mission
            </span>
            <h2 className="text-3xl md:text-5xl font-luxury text-white mb-10 italic">
              "Exceeding expectations, one journey at a time."
            </h2>
            <p className="text-lg text-white/70 font-serif max-w-3xl mx-auto leading-relaxed">
              To deliver exceptional travel experiences and relocation services that exceed expectations, while promoting sustainable tourism and creating positive impacts in the communities we serve.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm p-10 rounded-luxury border border-white/10 text-center hover:bg-white/10 transition-all duration-500 group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C17F59] rounded-full mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                    <value.icon className="h-6 w-6 text-[#1B2A4A]" />
                  </div>
                  <h4 className="text-lg font-luxury font-bold mb-4 text-white tracking-tight">{value.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-luxury text-[#1B2A4A] mb-6">
                Why <span className="italic">Excursia?</span>
              </h2>
              <div className="w-20 h-1 bg-[#C17F59] mx-auto mb-12 rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        </div>
      </section>
    </Layout>
  );
};

export default About;
