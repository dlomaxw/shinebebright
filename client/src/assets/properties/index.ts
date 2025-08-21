// ===== SIMPLIFIED PROPERTY IMAGES SYSTEM =====
// Direct imports for authenticated property images

// Import working property images
import cadenzaReal01 from './cadenza-real-01.jpg';
import cadenzaReal02 from './cadenza-real-02.jpg';
import bridge01 from './bridge-01.jpeg';
import atlantic01 from './atlantic-01.png';
import embassy01 from './embassy-01.png';
import pearlView01 from './pearl-view-01.png';
import canaanPrince01 from './canaan-prince-01.jpg';

// Simple image mapping
const imageMap: Record<string, string> = {
  'cadenza-real-01.jpg': cadenzaReal01,
  'cadenza-real-02.jpg': cadenzaReal02,
  'bridge-01.jpeg': bridge01,
  'atlantic-01.png': atlantic01,
  'embassy-01.png': embassy01,
  'pearl-view-01.png': pearlView01,
  'canaan-prince-01.jpg': canaanPrince01,
};

// Get property image function
export const getPropertyImage = (imageUrl: string): string => {
  if (!imageUrl) {
    return '/placeholder-property.jpg';
  }
  
  // Return mapped image if found
  if (imageMap[imageUrl]) {
    return imageMap[imageUrl];
  }
  
  // Return authentic website URLs directly
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Default fallback
  return '/placeholder-property.jpg';
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