import { useEffect } from 'react';

const ConversioBot = () => {
  useEffect(() => {
    // Check if ConversioBot is already initialized
    if ((window as any).ConversioBot || (window as any).botId) {
      return;
    }

    // Force visibility by adding CSS to ensure the widget shows up
    const addConversioBotStyles = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        #bot-widget-script,
        .conversiobot-widget,
        .conversio-widget,
        .cb-widget,
        [id*="conversio"],
        [class*="conversio"] {
          z-index: 999999 !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          pointer-events: auto !important;
        }
        
        /* Force show chat bubble */
        .cb-chat-bubble {
          position: fixed !important;
          bottom: 20px !important;
          right: 20px !important;
          z-index: 999999 !important;
          display: block !important;
          visibility: visible !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Initialize ConversioBot with multiple approaches
    const initializeConversioBot = () => {
      // Set global properties
      (window as any).botId = "tduSLX";
      
      // Add forced styles
      addConversioBotStyles();
      
      // Load the script if not already loaded
      if (!document.querySelector('script[src*="conversiobot.com"]')) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://app.conversiobot.com/lib/js/gadget.js';
        script.setAttribute('bid', 'tduSLX');
        script.id = 'conversiobot-widget-script';
        
        script.onload = () => {
          console.log('ConversioBot widget loaded');
          // Force initialize after load
          setTimeout(() => {
            if ((window as any).ConversioBot && (window as any).ConversioBot.init) {
              (window as any).ConversioBot.init();
            }
          }, 1000);
        };
        
        script.onerror = () => {
          console.error('ConversioBot script failed to load');
        };
        
        document.body.appendChild(script);
      }
    };

    // Initialize immediately and also after DOM is fully ready
    initializeConversioBot();
    
    // Also try after page fully loads
    window.addEventListener('load', initializeConversioBot);
    
    // Cleanup
    return () => {
      window.removeEventListener('load', initializeConversioBot);
    };
  }, []);

  return null;
};

export default ConversioBot;