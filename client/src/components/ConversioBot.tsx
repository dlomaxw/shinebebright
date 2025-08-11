import { useEffect } from 'react';

const ConversioBot = () => {
  useEffect(() => {
    // Wait for DOM to be fully ready
    const initializeConversioBot = () => {
      // Check if already loaded
      if (document.getElementById('bot-widget-script') || (window as any).botId) {
        return;
      }

      try {
        // Set the bot ID globally
        (window as any).botId = "tduSLX";
        
        // Create and inject the ConversioBot script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'bot-widget-script';
        script.src = 'https://app.conversiobot.com/lib/js/gadget.js';
        script.setAttribute('bid', 'tduSLX');
        script.async = true;
        
        script.onload = () => {
          console.log('ConversioBot loaded successfully');
        };
        
        script.onerror = () => {
          console.error('Failed to load ConversioBot script');
        };
        
        document.head.appendChild(script);
      } catch (error) {
        console.error('Error initializing ConversioBot:', error);
      }
    };

    // Initialize after a short delay to ensure React app is ready
    const timer = setTimeout(initializeConversioBot, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default ConversioBot;