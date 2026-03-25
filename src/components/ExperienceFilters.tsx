import React from 'react';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';

interface ExperienceFiltersProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceChange: (value: number) => void;
  categories: string[];
  maxPrice: number;
}

const ExperienceFilters: React.FC<ExperienceFiltersProps> = ({
  onSearchChange,
  onCategoryChange,
  onPriceChange,
  categories,
  maxPrice,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mb-12 transform -translate-y-12 max-w-5xl mx-auto z-20 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {/* Search Input */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search destinations or experiences"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C17F59] transition-all"
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Category Select */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Category</label>
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C17F59] transition-all appearance-none"
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Ranger */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center ml-1">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Max Price</label>
            <span className="text-sm font-bold text-[#C17F59]">KSh {maxPrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            defaultValue="50000"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C17F59]"
            onChange={(e) => onPriceChange(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceFilters;
