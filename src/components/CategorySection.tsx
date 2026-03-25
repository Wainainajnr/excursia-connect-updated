import React from 'react';
import { Plane, Ship, TreePine, MapPin } from 'lucide-react';

const categories = [
  { name: 'Nairobi Experiences', icon: <MapPin className="text-[#C17F59]" size={32} />, count: '12+ Experiences' },
  { name: 'Safaris', icon: <TreePine className="text-[#C17F59]" size={32} />, count: '24+ Adventures' },
  { name: 'Beach Getaways', icon: <Ship className="text-[#C17F59]" size={32} />, count: '18+ Retreats' },
  { name: 'Adventure Activities', icon: <Plane className="text-[#C17F59]" size={32} />, count: '15+ Activities' },
];

const CategorySection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-luxury text-[#1B2A4A] italic">
              Explore by <span className="not-italic">Category</span>
            </h2>
            <div className="w-20 h-1 bg-[#C17F59] mt-4 rounded-full" />
          </div>
          <p className="max-w-md text-muted-foreground font-serif italic text-lg lg:text-right">
            Find the perfect adventure tailored to your interests and travel style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group p-10 bg-[#F9F9F9] rounded-luxury border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center cursor-pointer transform hover:-translate-y-2"
            >
              <div className="mb-6 p-5 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all duration-300">
                {cat.icon}
              </div>
              <h3 className="font-luxury font-bold text-xl mb-2 text-[#1B2A4A] tracking-tight group-hover:text-[#C17F59] transition-colors">
                {cat.name}
              </h3>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">{cat.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
