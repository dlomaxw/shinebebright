// ===== AUTHENTIC PROPERTY IMAGES FROM DEVELOPER WEBSITES =====

// This system now handles authentic images directly from developer websites
// Each developer's images are correctly mapped to their properties

// ===== ORGANIZED PROPERTY IMAGES BY DEVELOPER FOLDERS =====

// Direct root images
import cadenzaReal01 from './cadenza-real-01.jpg';
import cadenzaReal02 from './cadenza-real-02.jpg';
import bridge01 from './bridge-01.jpeg';
import atlantic01 from './atlantic-01.png';
import embassy01 from './embassy-01.png';
import pearlView01 from './pearl-view-01.png';
import canaanPrince01 from './canaan-prince-01.jpg';

// The Futur images
import future1 from './the_futur/future1.jpeg';
import futureJpeg from './the_futur/future.jpeg.jpg';

// Cadenza images from VAAL folder
import cadenzaFacade01 from './vaal/candenza/CAD_EXT-FACADE-CAM01.jpg';
import cadenzaFacade02 from './vaal/candenza/CAD_EXT-FACADE-CAM02.jpg';
import cadenzaArial from './vaal/candenza/CAD_EXT-ARIAL.jpg';

// The Bridge images from VAAL folder
import bridgeImg1 from './vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.45 PM.jpeg';
import bridgeImg2 from './vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.46 PM.jpeg';
import bridgeImg3 from './vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.47 PM.jpeg';

// Icon 180 images
import icon180Cam01 from './icon_180/CAM01_FINAL_01.jpg';
import icon180Cam02 from './icon_180/CAM02_FINAL.jpg';
import icon180Cam03 from './icon_180/Cam 03_01 (1).jpg';

// Canaanze properties
import princeLuxury01 from './canaan_residency/Prince_Charles_Luxury_Apartments/1-1-680x510.jpg';
import princeLuxury02 from './canaan_residency/Prince_Charles_Luxury_Apartments/IMG_4793-1-680x510.jpg';
import canaanApt01 from './canaan_residency/Canaan_Apartments/IMG_9500-2-680x510.jpg';
import canaanApt02 from './canaan_residency/Canaan_Apartments/IMG_4775-680x510.jpg';

// Edifice properties
import horizon01 from './edifice/horizon_residency/1.png';
import horizon02 from './edifice/horizon_residency/2.png';
import atlanticHeight01 from './edifice/atlantic_heights/2.png';
import atlanticHeight02 from './edifice/atlantic_heights/3.png';
import embassyTower01 from './edifice/embassy_towers/2.png';
import embassyTower02 from './edifice/embassy_towers/3.png';

// Comprehensive image mapping for organized folder structure
const localImageMap: Record<string, string> = {
  // Direct root images
  'cadenza-real-01.jpg': cadenzaReal01,
  'cadenza-real-02.jpg': cadenzaReal02,
  'bridge-01.jpeg': bridge01,
  'atlantic-01.png': atlantic01,
  'embassy-01.png': embassy01,
  'pearl-view-01.png': pearlView01,
  'canaan-prince-01.jpg': canaanPrince01,

  // The Futur by VAAL
  'the_futur/future1.jpeg': future1,
  'the_futur/future.jpeg.jpg': futureJpeg,
  '@assets/properties/the_futur/future1.jpeg': future1,
  '@assets/properties/the_futur/future.jpeg.jpg': futureJpeg,
  
  // Cadenza Residence by VAAL
  'vaal/candenza/CAD_EXT-FACADE-CAM01.jpg': cadenzaFacade01,
  'vaal/candenza/CAD_EXT-FACADE-CAM02.jpg': cadenzaFacade02,  
  'vaal/candenza/CAD_EXT-ARIAL.jpg': cadenzaArial,
  '@assets/properties/vaal/candenza/CAD_EXT-FACADE-CAM01.jpg': cadenzaFacade01,
  '@assets/properties/vaal/candenza/CAD_EXT-FACADE-CAM02.jpg': cadenzaFacade02,
  '@assets/properties/vaal/candenza/CAD_EXT-ARIAL.jpg': cadenzaArial,
  
  // The Bridge Kololo by VAAL  
  'vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.45 PM.jpeg': bridgeImg1,
  'vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.46 PM.jpeg': bridgeImg2,
  'vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.47 PM.jpeg': bridgeImg3,
  '@assets/properties/vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.45 PM.jpeg': bridgeImg1,
  '@assets/properties/vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.46 PM.jpeg': bridgeImg2,
  '@assets/properties/vaal/the_bridge/WhatsApp Image 2025-08-02 at 12.06.47 PM.jpeg': bridgeImg3,
  
  // Icon 180 by Novus
  'icon_180/CAM01_FINAL_01.jpg': icon180Cam01,
  'icon_180/CAM02_FINAL.jpg': icon180Cam02,
  'icon_180/Cam 03_01 (1).jpg': icon180Cam03,
  '@assets/properties/icon_180/CAM01_FINAL_01.jpg': icon180Cam01,
  '@assets/properties/icon_180/CAM02_FINAL.jpg': icon180Cam02,
  '@assets/properties/icon_180/Cam 03_01 (1).jpg': icon180Cam03,

  // Canaanze Properties
  'canaan_residency/Prince_Charles_Luxury_Apartments/1-1-680x510.jpg': princeLuxury01,
  'canaan_residency/Prince_Charles_Luxury_Apartments/IMG_4793-1-680x510.jpg': princeLuxury02,
  'canaan_residency/Canaan_Apartments/IMG_9500-2-680x510.jpg': canaanApt01,
  'canaan_residency/Canaan_Apartments/IMG_4775-680x510.jpg': canaanApt02,

  // Edifice Properties
  'edifice/horizon_residency/1.png': horizon01,
  'edifice/horizon_residency/2.png': horizon02,
  'edifice/atlantic_heights/2.png': atlanticHeight01,
  'edifice/atlantic_heights/3.png': atlanticHeight02,
  'edifice/embassy_towers/2.png': embassyTower01,
  'edifice/embassy_towers/3.png': embassyTower02,
};

// Helper function to get authentic property images using organized folder structure
export const getPropertyImage = (imageUrl: string): string => {
  if (!imageUrl) {
    return '/placeholder-property.jpg';
  }
  
  // Clean the imageUrl for mapping
  const cleanUrl = imageUrl.replace('@assets/properties/', '').replace('./', '');
  
  // Check direct mapping first
  if (localImageMap[imageUrl]) {
    return localImageMap[imageUrl];
  }
  
  // Check cleaned URL mapping
  if (localImageMap[cleanUrl]) {
    return localImageMap[cleanUrl];
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