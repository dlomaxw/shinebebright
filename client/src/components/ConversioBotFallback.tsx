import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ConversioBotFallback = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showWidget, setShowWidget] = useState(true);

  useEffect(() => {
    // Show the fallback widget after 3 seconds if ConversioBot hasn't loaded
    const timer = setTimeout(() => {
      // Check if ConversioBot has loaded
      const hasConversioBot = document.querySelector('[id*="conversio"], [class*="conversio"], .cb-widget');
      if (!hasConversioBot) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible || !showWidget) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Bubble */}
      <div className="relative">
        <button 
          className="bg-bright-yellow hover:bg-yellow-400 text-bright-black p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 animate-pulse"
          onClick={() => {
            // Try to open ConversioBot if available, otherwise show contact info
            const phone = "+256 750 421 224";
            const message = "Hello! I'm interested in your services.";
            const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
          }}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
        
        {/* Close button */}
        <button
          className="absolute -top-2 -right-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full p-1"
          onClick={() => setShowWidget(false)}
        >
          <X className="h-3 w-3" />
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 bg-bright-black text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          Chat with us on WhatsApp!
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-bright-black"></div>
        </div>
      </div>
    </div>
  );
};

export default ConversioBotFallback;