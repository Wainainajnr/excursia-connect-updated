import { Poster } from '@/types/poster';

const STORAGE_KEY = 'excursia_posters';

// Import destination images for seeding
import heroSafari from '@/assets/hero-safari.jpg';
import heroBeach from '@/assets/hero-beach.jpg';
import heroWildlife from '@/assets/hero-wildlife.jpg';
import destMountains from '@/assets/destination-mountains.jpg';
import destIsland from '@/assets/destination-island.jpg';
import destCity from '@/assets/destination-city.jpg';
import destCoastal from '@/assets/destination-coastal.jpg';

const initialData: Poster[] = [
  // Hero Slides
  { id: 'h1', title: 'Epic Safari Adventures', description: 'Experience the majesty of African wildlife', price: 'Curated', category: 'hero', image: heroSafari, date: '', highlights: [], included: [], createdAt: new Date().toISOString() },
  { id: 'h2', title: 'Paradise Beach Escapes', description: 'Relax on pristine beaches', price: 'Curated', category: 'hero', image: heroBeach, date: '', highlights: [], included: [], createdAt: new Date().toISOString() },
  { id: 'h3', title: 'Wildlife Encounters', description: 'Get up close with magnificent creatures', price: 'Curated', category: 'hero', image: heroWildlife, date: '', highlights: [], included: [], createdAt: new Date().toISOString() },
  // Destinations (Legacy Static)
  { id: 'kenya-safari', image: heroSafari, title: 'Kenya Safari Experience', location: 'Maasai Mara, Kenya', description: 'Witness the spectacular Great Migration...', price: 'From KShs 312,000', category: 'destination', date: '', createdAt: new Date().toISOString() },
  { id: 'zanzibar-beach', image: heroBeach, title: 'Zanzibar Beach Paradise', location: 'Zanzibar, Tanzania', description: 'Relax on pristine white sand beaches...', price: 'From KShs 175,000', category: 'destination', date: '', createdAt: new Date().toISOString() },
  { id: 'kilimanjaro-trek', image: destMountains, title: 'Mount Kilimanjaro Trek', location: 'Tanzania', description: 'Conquer Africa\'s highest peak...', price: 'From KShs 400,000', category: 'destination', date: '', createdAt: new Date().toISOString() },
  { id: 'seychelles-island', image: destIsland, title: 'Seychelles Island Escape', location: 'Seychelles', description: 'Experience luxury on stunning tropical islands...', price: 'From KShs 500,000', category: 'destination', date: '', createdAt: new Date().toISOString() },
  { id: 'marrakech-tour', image: destCity, title: 'Marrakech Cultural Tour', location: 'Morocco', description: 'Explore vibrant souks...', price: 'From KShs 137,000', category: 'destination', date: '', createdAt: new Date().toISOString() },
  { id: 'lamu-coastal', image: destCoastal, title: 'Coastal Village Retreat', location: 'Lamu, Kenya', description: 'Discover a tranquil coastal town...', price: 'From KShs 200,000', category: 'destination', date: '', createdAt: new Date().toISOString() },
  // Offers (Legacy Static)
  { id: 'o1', image: heroBeach, title: 'Coastal Getaway Package', location: 'Mombasa, Kenya', description: '5 nights all-inclusive coastal experience.', price: 'KShs 212,000', category: 'offer', date: '', createdAt: new Date().toISOString() },
  { id: 'o2', image: destCity, title: 'Cultural Heritage Tour', location: 'Stone Town, Zanzibar', description: '4 nights boutique hotel and guided tours.', price: 'KShs 162,000', category: 'offer', date: '', createdAt: new Date().toISOString() },
  { id: 'o3', image: destCoastal, title: 'Island Hopping Adventure', location: 'Lamu Archipelago', description: '7 nights island hopping and sailing.', price: 'KShs 300,000', category: 'offer', date: '', createdAt: new Date().toISOString() },
  // Relocation Services
  { id: 'r1', title: 'Housing Assistance', description: 'Find your perfect home with our comprehensive property search and viewing services.', price: 'Consultation', category: 'relocation', image: '', date: '', createdAt: new Date().toISOString() },
  { id: 'r2', title: 'Documentation Support', description: 'Navigate visa requirements, work permits, and all necessary legal documentation.', price: 'Consultation', category: 'relocation', image: '', date: '', createdAt: new Date().toISOString() },
  { id: 'r3', title: 'Area Orientation', description: 'Get acquainted with local neighborhoods, schools, healthcare, and amenities.', price: 'Consultation', category: 'relocation', image: '', date: '', createdAt: new Date().toISOString() },
  { id: 'r4', title: 'Moving Logistics', description: 'Coordinated shipping, packing, and transportation of your belongings.', price: 'Consultation', category: 'relocation', image: '', date: '', createdAt: new Date().toISOString() },
];

export const getPosters = (): Poster[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    seedStorage(initialData);
    return initialData;
  }
  try {
    const posters = JSON.parse(stored);
    if (posters.length === 0) {
      seedStorage(initialData);
      return initialData;
    }
    return posters;
  } catch (e) {
    return [];
  }
};

export const getPosterById = (id: string): Poster | undefined => {
  return getPosters().find(p => p.id === id);
};

export const seedStorage = (data: Poster[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const savePosters = (posters: Poster[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posters));
};

export const addPoster = (poster: Omit<Poster, 'id' | 'createdAt'>): Poster => {
  const posters = getPosters();
  const newPoster: Poster = {
    ...poster,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  posters.push(newPoster);
  savePosters(posters);
  return newPoster;
};

export const updatePoster = (id: string, updates: Partial<Poster>): void => {
  const posters = getPosters();
  const index = posters.findIndex(p => p.id === id);
  if (index !== -1) {
    posters[index] = { ...posters[index], ...updates };
    savePosters(posters);
  }
};

export const deletePoster = (id: string): void => {
  const posters = getPosters().filter(p => p.id !== id);
  savePosters(posters);
};
