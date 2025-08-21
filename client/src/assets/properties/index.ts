// ===== AUTHENTIC PROPERTY IMAGES FROM DEVELOPER WEBSITES =====

// This system now handles authentic images directly from developer websites
// Each developer's images are correctly mapped to their properties

// Import organized property images by developer folders
import future1 from './the_futur/future1.jpeg';
import futureJpeg from './the_futur/future.jpeg.jpg';

// Cadenza images
import cadenzaFacade01 from './vaal/candenza/CAD_EXT-FACADE-CAM01.jpg';
import cadenzaFacade02 from './vaal/candenza/CAD_EXT-FACADE-CAM02.jpg';
import cadenzaArial from './vaal/candenza/CAD_EXT-ARIAL.jpg';

// The Bridge images  
import bridgeImg1 from './vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.45 PM.jpeg';
import bridgeImg2 from './vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.46 PM.jpeg';
import bridgeImg3 from './vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.47 PM.jpeg';

// Icon 180 images
import icon180Cam01 from './icon_180/CAM01_FINAL_01.jpg';
import icon180Cam02 from './icon_180/CAM02_FINAL.jpg';
import icon180Cam03 from './icon_180/Cam 03_01 (1).jpg';

// Image mapping for organized folder structure
const localImageMap: Record<string, string> = {
  // The Futur
  '@assets/properties/the_futur/future1.jpeg': future1,
  '@assets/properties/the_futur/future.jpeg.jpg': futureJpeg,
  
  // Cadenza
  '@assets/properties/vaal/candenza/CAD_EXT-FACADE-CAM01.jpg': cadenzaFacade01,
  '@assets/properties/vaal/candenza/CAD_EXT-FACADE-CAM02.jpg': cadenzaFacade02,
  '@assets/properties/vaal/candenza/CAD_EXT-ARIAL.jpg': cadenzaArial,
  
  // The Bridge
  '@assets/properties/vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.45 PM.jpeg': bridgeImg1,
  '@assets/properties/vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.46 PM.jpeg': bridgeImg2,
  '@assets/properties/vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.47 PM.jpeg': bridgeImg3,
  
  // Icon 180
  '@assets/properties/icon_180/CAM01_FINAL_01.jpg': icon180Cam01,
  '@assets/properties/icon_180/CAM02_FINAL.jpg': icon180Cam02,
  '@assets/properties/icon_180/Cam 03_01 (1).jpg': icon180Cam03,
};

// Helper function to get authentic property images using organized folder structure
export const getPropertyImage = (imageUrl: string): string => {
  if (!imageUrl) {
    return '/placeholder-property.jpg';
  }
  
  // Check if it's an @assets local import path
  if (imageUrl.startsWith('@assets/')) {
    const localImage = localImageMap[imageUrl];
    if (localImage) {
      return localImage;
    }
  }
  
  // Return authentic image URLs directly from developer websites
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Handle local path references
  if (imageUrl.startsWith('/src/') || imageUrl.startsWith('./')) {
    return '/placeholder-property.jpg';
  }
  
  // Default fallback
  return imageUrl || '/placeholder-property.jpg';
};

// ===== UTILITY FUNCTIONS =====

// Get multiple images for property galleries (from authentic website sources)
export const getPropertyGallery = (property: any, count: number = 5): string[] => {
  if (property.images && Array.isArray(property.images)) {
    return property.images.slice(0, count).map((img: string) => getPropertyImage(img));
  }
  
  // Return single image array if no gallery available
  return [getMainPropertyImage(property)];
};

// Get main image for property cards
export const getMainPropertyImage = (property: any): string => {
  if (property.images && Array.isArray(property.images) && property.images.length > 0) {
    return getPropertyImage(property.images[0]);
  }
  
  // Fallback to placeholder for properties without images
  return '/placeholder-property.jpg';
};

// ===== DEVELOPER MAPPING =====
// This maps properties to their authentic developer websites for image sources

export const developerImageSources = {
  'Canaanze': 'https://canaanze.com/',
  'HK Properties': 'https://www.hk-properties.com/',
  'VAAL': 'https://vaal.co.ug/',
  'Edifice': 'https://edificepropertiesug.com/',
  'Saif Real Estate': 'https://saifrealestate.ug/',
  'RF Developers': 'https://rfdevelopers.ug/',
  'Novus Real Estate': 'https://novusrel.com/',
  'Reportage Properties': 'https://www.reportageug.com/'
};

export default { 
  getPropertyImage, 
  getPropertyGallery, 
  getMainPropertyImage, 
  developerImageSources 
};