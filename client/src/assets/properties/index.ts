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
  // Handle null or undefined image URLs
  if (!imageUrl || imageUrl === 'null' || imageUrl === 'undefined') {
    return property01; // Default fallback
  }

  // Local asset mappings
  if (imageUrl.includes('/src/assets/properties/cadenza-facade-01.webp') || imageUrl.includes('cadenza-facade-01')) {
    return cadenzaFacade01;
  }
  if (imageUrl.includes('/src/assets/properties/cadenza-facade-02.webp') || imageUrl.includes('cadenza-facade-02')) {
    return cadenzaFacade02;
  }
  if (imageUrl.includes('/src/assets/properties/cadenza-facade-03.webp') || imageUrl.includes('cadenza-facade-03')) {
    return cadenzaFacade03;
  }
  if (imageUrl.includes('/src/assets/properties/property-01.jpeg') || imageUrl.includes('property-01')) {
    return property01;
  }
  if (imageUrl.includes('/src/assets/properties/property-02.jpeg') || imageUrl.includes('property-02')) {
    return property02;
  }
  if (imageUrl.includes('/src/assets/properties/property-03.jpg') || imageUrl.includes('property-03')) {
    return property03;
  }
  if (imageUrl.includes('/src/assets/properties/property-04.jpg') || imageUrl.includes('property-04')) {
    return property04;
  }
  if (imageUrl.includes('/src/assets/properties/property-05.jpg') || imageUrl.includes('property-05')) {
    return property05;
  }
  if (imageUrl.includes('/src/assets/properties/property-06.jpg') || imageUrl.includes('property-06')) {
    return property06;
  }
  if (imageUrl.includes('/src/assets/properties/property-07.jpg') || imageUrl.includes('property-07')) {
    return property07;
  }
  if (imageUrl.includes('/src/assets/properties/property-08.jpg') || imageUrl.includes('property-08')) {
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
  
  // For broken external images, use fallback based on property type
  if (imageUrl.includes('shinebebright.com') || imageUrl.includes('hkproperties.com') || imageUrl.includes('rfdevelopers.ug')) {
    // Cycle through available images for variety
    const fallbackImages = [property01, property02, property03, property04, property05, property06, property07, property08];
    const index = Math.abs(imageUrl.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % fallbackImages.length;
    return fallbackImages[index];
  }
  
  // For any other broken or invalid images, provide fallback
  if (imageUrl.includes('http') && !imageUrl.includes('localhost')) {
    // Cycle through available images for variety
    const fallbackImages = [property01, property02, property03, property04, property05, property06, property07, property08];
    const index = Math.abs(imageUrl.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % fallbackImages.length;
    return fallbackImages[index];
  }
  
  // Return original URL for working external images
  return imageUrl;
};

// Get multiple images for a property (minimum 4)
export const getPropertyImages = (propertyTitle: string, existingImages: string[] = []): string[] => {
  const baseImages = [
    '/src/assets/properties/property-01.jpeg',
    '/src/assets/properties/property-02.jpeg', 
    '/src/assets/properties/property-03.jpg',
    '/src/assets/properties/property-04.jpg',
    '/src/assets/properties/property-05.jpg',
    '/src/assets/properties/property-06.jpg',
    '/src/assets/properties/property-07.jpg',
    '/src/assets/properties/property-08.jpg'
  ];

  // Special handling for Cadenza properties
  if (propertyTitle.toLowerCase().includes('cadenza')) {
    return [
      '/src/assets/properties/cadenza-facade-01.webp',
      '/src/assets/properties/cadenza-facade-02.webp',
      '/src/assets/properties/cadenza-facade-03.webp',
      '/src/assets/properties/property-01.jpeg'
    ];
  }

  // Use hash of property title to get consistent image selection
  const hash = propertyTitle.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const startIndex = hash % (baseImages.length - 3); // Ensure we can get 4 consecutive images
  
  return [
    baseImages[startIndex],
    baseImages[(startIndex + 1) % baseImages.length],
    baseImages[(startIndex + 2) % baseImages.length], 
    baseImages[(startIndex + 3) % baseImages.length]
  ];
};