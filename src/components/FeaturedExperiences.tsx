import React, { useState, useMemo } from 'react';
import ExperienceCard from './ExperienceCard';
import ExperienceFilters from './ExperienceFilters';
import { mockExperiences, categories } from '@/data/mockExperiences';

const FeaturedExperiences: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(50000);

  const filteredExperiences = useMemo(() => {
    return mockExperiences.filter((exp) => {
      const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exp.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || exp.category === selectedCategory;
      const matchesPrice = exp.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, maxPrice]);

  return (
    <section id="experiences" className="py-24 bg-[#FDFBF9] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <span className="text-[10px] font-bold tracking-[0.4em] text-[#C17F59] uppercase mb-4 block">
            Curated For You
          </span>
          <h2 className="text-4xl md:text-6xl font-luxury text-[#1B2A4A] mb-6">
            Featured <span className="italic">Experiences</span>
          </h2>
          <div className="w-24 h-1 bg-[#C17F59] mx-auto rounded-full" />
        </div>

        <ExperienceFilters
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onPriceChange={setMaxPrice}
          categories={categories}
          maxPrice={maxPrice}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-all duration-500">
          {filteredExperiences.length > 0 ? (
            filteredExperiences.map((exp) => (
              <ExperienceCard key={exp.id} {...exp} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-gray-500 font-serif italic">No experiences found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperiences;
