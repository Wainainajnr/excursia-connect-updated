export interface Experience {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  category: string;
}

export const mockExperiences: Experience[] = [
  {
    id: '1',
    title: 'Maasai Mara Safari',
    location: 'Maasai Mara, Kenya',
    price: 15000,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    category: 'Safaris',
  },
  {
    id: '2',
    title: 'Diani Beach Getaway',
    location: 'Diani, Kenya',
    price: 12000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1589979486221-5f0532152848?auto=format&fit=crop&q=80&w=800',
    category: 'Beach Getaways',
  },
  {
    id: '3',
    title: 'Nairobi City Tour',
    location: 'Nairobi, Kenya',
    price: 5000,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1614242239388-9bb3be885474?auto=format&fit=crop&q=80&w=800',
    category: 'Nairobi Experiences',
  },
  {
    id: '4',
    title: 'Mount Kenya Climbing',
    location: 'Mount Kenya, Kenya',
    price: 25000,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544621245-090c88390d45?auto=format&fit=crop&q=80&w=800',
    category: 'Adventure Activities',
  },
  {
    id: '5',
    title: 'Amboseli Elephant Watch',
    location: 'Amboseli, Kenya',
    price: 18000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551101918-0387e07eb423?auto=format&fit=crop&q=80&w=800',
    category: 'Safaris',
  },
  {
    id: '6',
    title: 'Watamu Snorkeling',
    location: 'Watamu, Kenya',
    price: 8000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
    category: 'Beach Getaways',
  },
];

export const categories = [
  'Nairobi Experiences',
  'Safaris',
  'Beach Getaways',
  'Adventure Activities',
];

export const testimonials = [
  {
    id: '1',
    name: 'Sarah W.',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    rating: 5,
    text: 'Excursia Connect made our Maasai Mara trip unforgettable. The booking process was seamless!',
  },
  {
    id: '2',
    name: 'James K.',
    avatar: 'https://i.pravatar.cc/150?u=james',
    rating: 5,
    text: 'The best safari experience I have ever had. Highly recommend Excursia for anyone visiting Kenya.',
  },
  {
    id: '3',
    name: 'Elena M.',
    avatar: 'https://i.pravatar.cc/150?u=elena',
    rating: 4,
    text: 'Lovely beach holiday in Diani. Everything was well coordinated. Great value for money.',
  },
];
