// Authentic property images from folder structure
import cadenzaReal01 from './cadenza-real-01.jpg';
import cadenzaReal02 from './cadenza-real-02.jpg';
import canaanPrince01 from './canaan-prince-01.jpg';
import pearlView01 from './pearl-view-01.png';
import atlantic01 from './atlantic-01.png';
import embassy01 from './embassy-01.png';
import bridge01 from './bridge-01.jpeg';

// Legacy fallback images (keeping for compatibility)
import cadenzaFacade01 from './cadenza-facade-01.webp';
import cadenzaFacade02 from './cadenza-facade-02.webp';
import cadenzaFacade03 from './cadenza-facade-03.webp';
import property01 from './property-01.jpeg';
import property02 from './property-02.jpeg';
import property03 from './property-03.jpg';
import property04 from './property-04.jpg';
import property05 from './property-05.jpg';
import property06 from './property-06.jpg';
import property07 from './property-07.jpg';
import property08 from './property-08.jpg';

export const propertyImages = {
  // Authentic property images
  cadenzaReal01,
  cadenzaReal02,
  canaanPrince01,
  pearlView01,
  atlantic01,
  embassy01,
  bridge01,
  // Legacy images
  cadenzaFacade01,
  cadenzaFacade02,
  cadenzaFacade03,
  property01,
  property02,
  property03,
  property04,
  property05,
  property06,
  property07,
  property08,
};

// Helper function to get local image or fallback to external
export const getPropertyImage = (imageUrl: string): string => {
  // Handle folder-based paths (the new authentic image system)
  
  // Cadenza properties - use authentic Cadenza images
  if (imageUrl.includes('vaal/candenza') || imageUrl.includes('CAD_EXT-FACADE') || imageUrl.includes('WhatsApp-Image')) {
    if (imageUrl.includes('CAD_EXT-FACADE-CAM01') || imageUrl.includes('CAD_EXT-ARIAL')) return cadenzaReal01;
    if (imageUrl.includes('CAD_EXT-FACADE-CAM02-N') || imageUrl.includes('CAD_EXT-FACADE-CAM02')) return cadenzaReal02;
    if (imageUrl.includes('WhatsApp-Image')) return cadenzaReal02;
    return cadenzaReal01; // Default for Cadenza
  }
  
  // Prince Charles Canaan apartments - use authentic Prince Charles images
  if (imageUrl.includes('Prince_Charles_Luxury_Apartments') || imageUrl.includes('canaan_residency')) {
    return canaanPrince01;
  }
  
  // Pearl View properties - use authentic Pearl View images
  if (imageUrl.includes('Pearl_View')) {
    return pearlView01;
  }
  
  // Atlantic Heights - use authentic Atlantic images
  if (imageUrl.includes('atlantic_heights') || imageUrl.includes('edifice/atlantic')) {
    return atlantic01;
  }
  
  // Embassy Towers - use authentic Embassy images
  if (imageUrl.includes('embassy_towers') || imageUrl.includes('edifice/embassy')) {
    return embassy01;
  }
  
  // Horizon Residency - use Embassy image for now
  if (imageUrl.includes('horizon_residency') || imageUrl.includes('edifice/horizon')) {
    return embassy01;
  }
  
  // The Bridge properties - use authentic Bridge images
  if (imageUrl.includes('the_bridge') || imageUrl.includes('vaal/the_bridge')) {
    return bridge01;
  }
  
  // Aquamarine and other HK properties - use variety from authentic images
  if (imageUrl.includes('aquamarine') || imageUrl.includes('hk_properties') || imageUrl.includes('Aquamarine Heights')) {
    const hkImages = [atlantic01, embassy01, pearlView01];
    const hash = imageUrl.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const index = Math.abs(hash) % hkImages.length;
    return hkImages[index];
  }
  
  // Marjan Residence - use Bridge image
  if (imageUrl.includes('Marjan_Residence') || imageUrl.includes('Marjan Residence')) {
    return bridge01;
  }
  
  // Icon 180 properties - use variety of authentic images
  if (imageUrl.includes('icon_180')) {
    const iconImages = [atlantic01, embassy01, cadenzaReal01];
    const hash = imageUrl.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const index = Math.abs(hash) % iconImages.length;
    return iconImages[index];
  }
  
  // The Future properties - use Cadenza images
  if (imageUrl.includes('the_futur')) {
    return cadenzaReal01;
  }
  
  // Legacy folder path support
  if (imageUrl.includes('/src/properties_images/')) {
    // Extract the relevant part and apply above logic
    const pathPart = imageUrl.replace('/src/properties_images/', '');
    return getPropertyImage(pathPart);
  }
  
  // Default fallback for any other folder-based images
  if (imageUrl.includes('/')) {
    const authenticImages = [cadenzaReal01, cadenzaReal02, canaanPrince01, pearlView01, atlantic01, embassy01, bridge01];
    const hash = imageUrl.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const index = Math.abs(hash) % authenticImages.length;
    return authenticImages[index];
  }
  
  // Legacy asset mappings for old paths
  if (imageUrl.includes('/src/assets/properties/cadenza-facade-01.webp')) {
    return cadenzaFacade01;
  }
  if (imageUrl.includes('/src/assets/properties/cadenza-facade-02.webp')) {
    return cadenzaFacade02;
  }
  if (imageUrl.includes('/src/assets/properties/cadenza-facade-03.webp')) {
    return cadenzaFacade03;
  }
  if (imageUrl.includes('/src/assets/properties/property-01.jpeg')) {
    return property01;
  }
  if (imageUrl.includes('/src/assets/properties/property-02.jpeg')) {
    return property02;
  }
  if (imageUrl.includes('/src/assets/properties/property-03.jpg')) {
    return property03;
  }
  if (imageUrl.includes('/src/assets/properties/property-04.jpg')) {
    return property04;
  }
  if (imageUrl.includes('/src/assets/properties/property-05.jpg')) {
    return property05;
  }
  if (imageUrl.includes('/src/assets/properties/property-06.jpg')) {
    return property06;
  }
  if (imageUrl.includes('/src/assets/properties/property-07.jpg')) {
    return property07;
  }
  if (imageUrl.includes('/src/assets/properties/property-08.jpg')) {
    return property08;
  }
  
  // Legacy mappings
  if (imageUrl.includes('@assets/CAD_EXT-FACADE-CAM01')) {
    return cadenzaFacade01;
  }
  if (imageUrl.includes('@assets/CAD_EXT-FACADE-CAM02-N')) {
    return cadenzaFacade03;
  }
  if (imageUrl.includes('@assets/CAD_EXT-FACADE-CAM02')) {
    return cadenzaFacade02;
  }
  
  // Handle non-existent building images by using authentic property images
  if (imageUrl.includes('building-01.webp') || imageUrl.includes('building-02.webp') || imageUrl.includes('building-03.webp')) {
    return cadenzaReal01; // Use authentic Cadenza image
  }
  
  // For broken external images, use authentic fallback images
  if (imageUrl.includes('shinebebright.com') || imageUrl.includes('hkproperties.com') || imageUrl.includes('rfdevelopers.ug')) {
    const authenticFallbacks = [cadenzaReal01, cadenzaReal02, canaanPrince01, pearlView01, atlantic01, embassy01, bridge01];
    const index = Math.abs(imageUrl.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % authenticFallbacks.length;
    return authenticFallbacks[index];
  }
  
  // Return original URL for working external images
  return imageUrl;
};