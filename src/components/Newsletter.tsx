import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Show success message (no backend integration)
    toast.success('Successfully subscribed! Check your email for exclusive offers.');
    setEmail('');
  };

  return (
    <section className="py-16 bg-[#1B2A4A] overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C17F59] rounded-full blur-[150px] opacity-10 -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-[150px] opacity-5 -ml-48 -mb-48" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] font-bold tracking-[0.4em] text-[#C17F59] uppercase mb-4 block">
            The Inner Circle
          </span>
          
          <h2 className="text-4xl md:text-6xl font-luxury text-white mb-6 leading-tight">
            Journey with <span className="italic font-serif">Distinction</span>
          </h2>
          
          <p className="text-white/60 text-lg md:text-xl font-serif italic mb-8 max-w-2xl mx-auto">
            Subscribe to receive curated travel stories, exclusive private offers, and destination inspiration.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full sm:flex-1 px-8 py-6 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-[#C17F59] focus:ring-0 outline-none transition-all duration-300"
              aria-label="Email address"
            />
            <Button 
              type="submit"
              className="rounded-full bg-[#C17F59] text-black hover:bg-[#C17F59]/90 px-12 py-6 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap shadow-xl"
            >
              SUBSCRIBE
            </Button>
          </form>
          
          <p className="text-white/30 text-[10px] uppercase tracking-widest">
            Discretion guaranteed. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
