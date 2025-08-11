// Local property images
import cadenzaFacade01 from './cadenza-facade-01.webp';
import cadenzaFacade02 from './cadenza-facade-02.webp';
import cadenzaFacade03 from './cadenza-facade-03.webp';
import luxuryVilla01 from './luxury-villa-01.jpeg';
import luxuryVilla02 from './luxury-villa-02.jpeg';

export const propertyImages = {
  cadenzaFacade01,
  cadenzaFacade02,
  cadenzaFacade03,
  luxuryVilla01,
  luxuryVilla02,
};

// Helper function to get local image or fallback to external
export const getPropertyImage = (imageUrl: string): string => {
  // Check if it's a local asset reference
  if (imageUrl.includes('@assets/CAD_EXT-FACADE-CAM01') || imageUrl.includes('cadenza-facade-01')) {
    return cadenzaFacade01;
  }
  if (imageUrl.includes('@assets/CAD_EXT-FACADE-CAM02-N') || imageUrl.includes('cadenza-facade-03')) {
    return cadenzaFacade03;
  }
  if (imageUrl.includes('@assets/CAD_EXT-FACADE-CAM02') || imageUrl.includes('cadenza-facade-02')) {
    return cadenzaFacade02;
  }
  if (imageUrl.includes('luxury-villa-01')) {
    return luxuryVilla01;
  }
  if (imageUrl.includes('luxury-villa-02')) {
    return luxuryVilla02;
  }
  
  // Return original URL for external images
  return imageUrl;
};