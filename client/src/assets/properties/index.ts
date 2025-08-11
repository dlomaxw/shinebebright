// Local property images
import cadenzaFacade01 from './cadenza-facade-01.webp';
import cadenzaFacade02 from './cadenza-facade-02.webp';
import cadenzaFacade03 from './cadenza-facade-03.webp';

export const propertyImages = {
  cadenzaFacade01,
  cadenzaFacade02,
  cadenzaFacade03,
};

// Helper function to get local image or fallback to external
export const getPropertyImage = (imageUrl: string): string => {
  // Check if it's a local asset reference
  if (imageUrl.includes('@assets/CAD_EXT-FACADE-CAM01')) {
    return cadenzaFacade01;
  }
  if (imageUrl.includes('@assets/CAD_EXT-FACADE-CAM02-N')) {
    return cadenzaFacade03;
  }
  if (imageUrl.includes('@assets/CAD_EXT-FACADE-CAM02')) {
    return cadenzaFacade02;
  }
  
  // Return original URL for external images
  return imageUrl;
};