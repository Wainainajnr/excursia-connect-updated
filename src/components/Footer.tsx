import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';
import { ExcursiaLogo } from './ExcursiaLogo';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Company Info */}
          <div>
            <div className="flex flex-col mb-4 -ml-8 lg:-ml-16">
              <ExcursiaLogo className="h-56 w-auto mb-3" textColor="#ffffff" />
            </div>
            <p className="text-xs text-background/70 mb-3">
              Your trusted partner for unforgettable travel experiences and seamless relocation services.
            </p>
            {/* Social Media */}
            <div className="flex space-x-3">
              <a href="#" className="bg-background/10 p-2 rounded-full hover:bg-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="bg-background/10 p-2 rounded-full hover:bg-primary transition-colors" aria-label="X">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="bg-background/10 p-2 rounded-full hover:bg-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-xs text-white/60 hover:text-white transition-colors tracking-widest uppercase">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-xs text-white/60 hover:text-white transition-colors tracking-widest uppercase">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/relocation-offers" className="text-xs text-white/60 hover:text-white transition-colors tracking-widest uppercase">
                  Relocation & Offers
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-xs text-white/60 hover:text-white transition-colors tracking-widest uppercase">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xs text-white/60 hover:text-white transition-colors tracking-widest uppercase">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white mb-5">Services</h4>
            <ul className="space-y-3 text-xs text-white/60 tracking-widest">
              <li>Safari tours</li>
              <li>Beach vacations</li>
              <li>Wildlife experiences</li>
              <li>Relocation services</li>
              <li>Special travel packages</li>
              <li>Group tours</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-xs tracking-widest">
                <MapPin className="h-4 w-4 text-[#C17F59] mt-0.5 flex-shrink-0" />
                <span className="text-white/60 leading-relaxed lowercase">spur mall — 2nd floor</span>
              </li>
              <li className="flex items-center space-x-3 text-xs tracking-widest uppercase">
                <Phone className="h-4 w-4 text-[#C17F59] flex-shrink-0" />
                <span className="text-white/60">0724415820</span>
              </li>
              <li className="flex items-center space-x-3 text-xs tracking-widest">
                <Mail className="h-4 w-4 text-[#C17F59] flex-shrink-0" />
                <span className="text-white/60 lowercase">karibu@excursiaconnect.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col items-center text-center gap-4">
          <p className="text-sm text-background/70">
            &copy; 2026 Excursia Connect. All rights reserved.
          </p>
          <p className="text-xs text-background/50 italic tracking-widest lowercase">
            Designed and Developed by <a href="https://ericwainaina.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[#C17F59] hover:text-white transition-colors">nexeric innovation</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
