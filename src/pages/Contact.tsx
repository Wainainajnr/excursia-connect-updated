import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Layout from '@/components/Layout';
import Newsletter from '@/components/Newsletter';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Show success message (no backend integration)
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } else {
      toast.error('Please fix the errors in the form');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Spur Mall — 2nd Floor',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '0724415820',
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'karibu@excursiaconnect.com',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM',
    },
  ];

  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-40 pb-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <span className="text-[10px] font-bold tracking-[0.4em] text-[#C17F59] uppercase mb-6 block">
            Plan Your Journey
          </span>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-luxury text-[#1B2A4A] mb-8 leading-tight">
            Get in <span className="italic">Touch</span>
          </h1>
          <div className="w-24 h-1 bg-[#C17F59] mx-auto mb-10 rounded-full" />
          <p className="text-xl md:text-2xl text-muted-foreground font-serif italic max-w-3xl mx-auto">
            Our private travel consultants are ready to craft your next extraordinary escape.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-[#F9F9F9] p-10 rounded-luxury border border-gray-100/50 text-center transition-all duration-500 hover:bg-white hover:shadow-xl group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white shadow-sm rounded-full mb-8 group-hover:scale-110 transition-transform duration-500">
                  <info.icon className="h-6 w-6 text-[#1B2A4A]" />
                </div>
                <h3 className="font-luxury font-bold text-xl mb-4 text-[#1B2A4A] uppercase tracking-tight">{info.title}</h3>
                <p className="text-muted-foreground text-sm font-serif italic">{info.details}</p>
              </div>
            ))}
          </div>

          {/* Contact Form & Social */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-12 rounded-luxury border border-gray-100 shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-luxury text-[#1B2A4A] mb-10 leading-tight">
                  Send Us a <span className="italic">Message</span>
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.name ? 'border-destructive' : 'border-input'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.email ? 'border-destructive' : 'border-input'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.subject ? 'border-destructive' : 'border-input'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                      placeholder="Safari Tour Inquiry"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-destructive">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border-2 ${
                        errors.message ? 'border-destructive' : 'border-input'
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none`}
                      placeholder="Tell us about your travel plans..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit"
                    className="w-full rounded-full bg-[#1B2A4A] text-white hover:bg-[#1B2A4A]/90 py-8 text-xs font-bold tracking-[0.3em] uppercase transition-all duration-300 shadow-xl"
                  >
                    SEND MESSAGE
                  </Button>
                </form>
              </div>
            </div>

            {/* Social & Additional Info */}
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-xl shadow-lg">
                <h3 className="font-heading font-semibold text-xl mb-4">Follow Us</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Stay connected and get inspired with travel tips, destination highlights, and exclusive offers.
                </p>
                
                <div className="space-y-3">
                  <a 
                    href="#"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-accent" />
                    <span>Facebook</span>
                  </a>
                  <a 
                    href="#"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-accent" />
                    <span>Twitter</span>
                  </a>
                  <a 
                    href="#"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-accent" />
                    <span>Instagram</span>
                  </a>
                  <a 
                    href="#"
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Linkedin className="h-5 w-5 text-accent" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="bg-[#1B2A4A] p-10 rounded-luxury shadow-2xl text-white">
                <h3 className="font-luxury font-bold text-2xl mb-4 uppercase tracking-tight">Ready to Book?</h3>
                <p className="text-white/60 text-sm mb-8 font-serif italic leading-relaxed">
                  Call us now to speak with one of our private travel consultants and start planning your return to majesty.
                </p>
                <Button 
                  className="w-full rounded-full bg-[#C17F59] text-[#1B2A4A] hover:bg-[#C17F59]/90 py-6 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300"
                  onClick={() => window.location.href = 'tel:+254724415820'}
                >
                  CALL +254 724 415 820
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </Layout>
  );
};

export default Contact;
