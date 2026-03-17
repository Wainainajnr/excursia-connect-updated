import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DestinationCardProps {
  image: string;
  title: string;
  location: string;
  description: string;
  price: string;
  link?: string;
}

const DestinationCard = ({ image, title, location, description, price, link = '#' }: DestinationCardProps) => {
  return (
    <div className="destination-card bg-white rounded-luxury overflow-hidden border border-gray-100/50 group transition-all duration-500 hover:shadow-2xl">
      <div className="relative h-[28rem] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Luxury Gold Price Badge */}
        <div className="absolute top-4 right-4 bg-[#C17F59] text-[#1B2A4A] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg z-10">
          {price}
        </div>
        
        {/* Bottom Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
        
        {/* Overlay Content */}
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <div className="flex items-center space-x-1 text-white/90 mb-2">
            <MapPin className="h-3 w-3" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">{location}</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-luxury text-white mb-2 leading-tight">{title}</h3>
          
          <p className="text-white/80 text-xs mb-6 line-clamp-2 max-w-[80%]">
            {description}
          </p>
          
          <Button 
            variant="outline" 
            className="w-full rounded-full bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-[#1B2A4A] transition-all duration-300 py-6 text-xs font-bold tracking-[0.2em]"
            onClick={() => {
              if (link && link !== '#') {
                window.location.href = link;
              }
            }}
          >
            DISCOVER MORE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
