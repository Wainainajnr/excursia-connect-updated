import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '254724415820';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group"
      aria-label="Contact on WhatsApp"
    >
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25 group-hover:hidden"></div>
      <MessageCircle className="w-8 h-8 relative z-10" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 px-3 py-1 bg-foreground text-background text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
