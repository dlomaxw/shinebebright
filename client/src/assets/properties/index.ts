// ===== COMPREHENSIVE PROPERTY IMAGES SYSTEM =====
// Import all available property images for authentic display

// Main property images
import cadenzaReal01 from './cadenza-real-01.jpg';
import cadenzaReal02 from './cadenza-real-02.jpg';
import bridge01 from './bridge-01.jpeg';
import atlantic01 from './atlantic-01.png';
import embassy01 from './embassy-01.png';
import pearlView01 from './pearl-view-01.png';
import canaanPrince01 from './canaan-prince-01.jpg';

// Additional property images
import property01 from './property-01.jpg';
import property02 from './property-02.jpg';
import property03 from './property-03.jpg';
import property04 from './property-04.jpg';
import property05 from './property-05.jpg';
import property06 from './property-06.jpg';
import property07 from './property-07.jpg';
import property08 from './property-08.jpg';

// Icon 180 images
import icon180_1 from './icon_180/CAM01_FINAL_01.jpg';
import icon180_2 from './icon_180/CAM02_FINAL.jpg';
import icon180_lobby from './icon_180/_2 Lobby.jpg';

// Pearl View images
import pearlView_1 from './Pearl_View/1.jpg';
import pearlView_interiors from './Pearl_View/Interiors-05-1-1024x720.jpg';

// Comprehensive image mapping
const imageMap: Record<string, string> = {
  // Main images
  'cadenza-real-01.jpg': cadenzaReal01,
  'cadenza-real-02.jpg': cadenzaReal02,
  'bridge-01.jpeg': bridge01,
  'atlantic-01.png': atlantic01,
  'embassy-01.png': embassy01,
  'pearl-view-01.png': pearlView01,
  'canaan-prince-01.jpg': canaanPrince01,
  
  // Generic property images (for fallbacks)
  'property-01.jpg': property01,
  'property-02.jpg': property02,
  'property-03.jpg': property03,
  'property-04.jpg': property04,
  'property-05.jpg': property05,
  'property-06.jpg': property06,
  'property-07.jpg': property07,
  'property-08.jpg': property08,
  
  // Icon 180 specific
  'icon-180-01.jpg': icon180_1,
  'icon-180-02.jpg': icon180_2,
  'icon-180-lobby.jpg': icon180_lobby,
  
  // Pearl View specific
  'pearl-view-interior.jpg': pearlView_interiors,
  'pearl-view-main.jpg': pearlView_1,
};

// Get property image function with comprehensive fallback system
export const getPropertyImage = (imageUrl: string): string => {
  if (!imageUrl) {
    return property01; // Use a real property image as fallback
  }
  
  // Return mapped image if found
  if (imageMap[imageUrl]) {
    return imageMap[imageUrl];
  }
  
  // Return authentic website URLs directly
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Smart fallback based on property name patterns
  if (imageUrl.includes('cadenza')) return cadenzaReal01;
  if (imageUrl.includes('bridge')) return bridge01;
  if (imageUrl.includes('atlantic')) return atlantic01;
  if (imageUrl.includes('embassy')) return embassy01;
  if (imageUrl.includes('pearl')) return pearlView01;
  if (imageUrl.includes('canaan') || imageUrl.includes('prince')) return canaanPrince01;
  if (imageUrl.includes('icon')) return icon180_1;
  
  // Use first available property image as fallback
  return property01;
};

// Get property gallery
export const getPropertyGallery = (property: any, count: number = 5): string[] => {
  if (property.images && Array.isArray(property.images)) {
    return property.images.slice(0, count).map((img: string) => getPropertyImage(img));
  }
  return [getMainPropertyImage(property)];
};

// Get main property image
export const getMainPropertyImage = (property: any): string => {
  if (property.images && Array.isArray(property.images) && property.images.length > 0) {
    return getPropertyImage(property.images[0]);
  }
  return '/placeholder-property.jpg';
};

// Developer mapping
export const developerImageSources = {
  'Canaanze': 'https://canaanze.com/',
  'HK Properties': 'https://www.hk-properties.com/',
  'VAAL': 'https://vaal.co.ug/',
  'Edifice': 'https://edificepropertiesug.com/',
  'Saif Real Estate': 'https://saifrealestate.ug/',
  'RF Developers': 'https://rfdevelopers.ug/',
  'Novus Real Estate': 'https://novusrel.com/',
};

export default { 
  getPropertyImage, 
  getPropertyGallery, 
  getMainPropertyImage, 
  developerImageSources 
};