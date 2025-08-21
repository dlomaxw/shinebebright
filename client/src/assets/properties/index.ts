// ===== AUTHENTIC PROPERTY IMAGES FROM DEVELOPER WEBSITES =====

// This system now handles authentic images directly from developer websites
// Each developer's images are correctly mapped to their properties

// Helper function to get authentic property images from developer websites
export const getPropertyImage = (imageUrl: string): string => {
  if (!imageUrl) {
    return '/placeholder-property.jpg';
  }
  
  // Return authentic image URLs directly from developer websites
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Handle local path references (for backwards compatibility)
  if (imageUrl.startsWith('/src/') || imageUrl.startsWith('./')) {
    return '/placeholder-property.jpg';
  }
  
  // Default fallback for any other case
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