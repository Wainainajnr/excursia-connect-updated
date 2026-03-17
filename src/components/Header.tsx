import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ExcursiaLogo } from './ExcursiaLogo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/relocation-offers', label: 'Relocation & Offers' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        !isHomePage || isScrolled ? 'header-solid' : 'header-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-32 sm:h-48 lg:h-72 pt-3 lg:pt-0">
          {/* Logo */}
          <Link to="/" className="flex items-center group py-1 lg:py-4 shrink-0 overflow-hidden -ml-8 lg:-ml-16">
            <ExcursiaLogo 
              className="h-32 sm:h-38 lg:h-64 max-h-[8.5rem] lg:max-h-none w-auto group-hover:scale-105 transition-all duration-500"
              textColor={!isHomePage || isScrolled ? "#000000" : "white"}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors ${
                  location.pathname === item.path
                    ? (!isHomePage || isScrolled)
                      ? 'text-[#1B2A4A]'
                      : 'text-white'
                    : (!isHomePage || isScrolled)
                    ? 'text-foreground/70 hover:text-[#1B2A4A]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              className="rounded-full bg-[#1B2A4A] text-white hover:bg-[#1B2A4A]/90 px-8 py-6 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/contact')}
            >
              BOOK NOW
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 rounded-xl bg-[#1B2A4A]/10 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-[#1B2A4A]" />
            ) : (
              <Menu className="h-6 w-6 text-[#1B2A4A]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-6 space-y-2 bg-background rounded-b-2xl shadow-xl px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 text-xs font-bold tracking-[0.15em] uppercase rounded-xl transition-colors ${
                  location.pathname === item.path
                    ? 'text-[#1B2A4A] bg-gray-100'
                    : 'text-foreground/70 hover:text-[#1B2A4A] hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
               <Button 
                className="w-full rounded-full bg-[#1B2A4A] text-white hover:bg-[#1B2A4A]/90 py-6 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300"
                onClick={() => {
                  navigate('/contact');
                  setIsMobileMenuOpen(false);
                }}
              >
                BOOK NOW
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
