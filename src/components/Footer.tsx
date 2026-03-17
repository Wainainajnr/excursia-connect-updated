import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { ExcursiaLogo } from './ExcursiaLogo';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Company Info */}
          <div>
            <div className="flex flex-col mb-4">
              <ExcursiaLogo className="h-20 w-auto mb-3" textColor="#ffffff" />
            </div>
            <p className="text-xs text-background/70 mb-3">
              Your trusted partner for unforgettable travel experiences and seamless relocation services.
            </p>
            {/* Social Media */}
            <div className="flex space-x-3">
              <a href="#" className="bg-background/10 p-2 rounded-full hover:bg-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="bg-background/10 p-2 rounded-full hover:bg-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="bg-background/10 p-2 rounded-full hover:bg-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="bg-background/10 p-2 rounded-full hover:bg-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
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
        <div className="border-t border-background/20 pt-4 text-center">
          <p className="text-sm text-background/70">
            &copy; {new Date().getFullYear()} Excursia Connect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
