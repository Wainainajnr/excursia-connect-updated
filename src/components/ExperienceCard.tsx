import React from 'react';
import { Star, MapPin } from 'lucide-react';

interface ExperienceCardProps {
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, location, price, rating, image }) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-gray-100">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#1B2A4A] shadow-sm">
          KSh {price.toLocaleString()}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1 text-amber-500 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
              className={i < Math.floor(rating) ? 'text-amber-500' : 'text-gray-300'}
            />
          ))}
          <span className="text-xs font-bold text-gray-600 ml-1">{rating.toFixed(1)}</span>
        </div>
        <h3 className="text-xl font-bold text-[#1B2A4A] mb-2 group-hover:text-[#C17F59] transition-colors line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <MapPin size={14} />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
