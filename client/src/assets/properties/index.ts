// Local property images
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
  // Local asset mappings for old paths
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
  
  // Handle new folder structure /src/properties_images/ paths
  if (imageUrl.includes('/src/properties_images/')) {
    // Map specific known images to available assets, use smart fallbacks for unknown images
    
    // Cadenza images
    if (imageUrl.includes('vaal/candenza') || imageUrl.includes('CAD_EXT-FACADE')) {
      if (imageUrl.includes('CAD_EXT-FACADE-CAM01')) return cadenzaFacade01;
      if (imageUrl.includes('CAD_EXT-FACADE-CAM02-N')) return cadenzaFacade03;
      if (imageUrl.includes('CAD_EXT-FACADE-CAM02')) return cadenzaFacade02;
      if (imageUrl.includes('CAD_EXT-ARIAL')) return cadenzaFacade01;
      if (imageUrl.includes('WhatsApp-Image')) return cadenzaFacade02;
      return cadenzaFacade01; // Default for Cadenza
    }
    
    // Use smart fallback based on property type or folder
    const fallbackImages = [property01, property02, property03, property04, property05, property06, property07, property08];
    
    // Create consistent but varied selection based on image path
    const hash = imageUrl.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const index = Math.abs(hash) % fallbackImages.length;
    return fallbackImages[index];
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
  
  // Handle non-existent building images by using property images
  if (imageUrl.includes('building-01.webp') || imageUrl.includes('building-02.webp') || imageUrl.includes('building-03.webp')) {
    return property01; // Use first property image as fallback
  }
  
  // For broken external images, use fallback based on property type
  if (imageUrl.includes('shinebebright.com') || imageUrl.includes('hkproperties.com') || imageUrl.includes('rfdevelopers.ug')) {
    // Cycle through available images for variety
    const fallbackImages = [property01, property02, property03, property04, property05, property06, property07, property08];
    const index = Math.abs(imageUrl.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % fallbackImages.length;
    return fallbackImages[index];
  }
  
  // Return original URL for working external images
  return imageUrl;
};