// Canaan Properties
import princeChadesLuxury from './canaan_properties/prince_charles_luxury.jpg';
import canaanApartments from './canaan_properties/canaan_apartments.jpg';
import canaanResidence from './canaan_properties/canaan_residence.jpg';

// VAAL Properties
import cadenzaResidence01 from './vaal_properties/cadenza_residence_01.jpg';
import cadenzaResidence02 from './vaal_properties/cadenza_residence_02.jpg';
import theBridgeKololo from './vaal_properties/the_bridge_kololo.jpeg';
import theFuturByVaal from './vaal_properties/the_futur_by_vaal.jpeg';

// Edifice Properties
import atlanticHeights from './edifice_properties/atlantic_heights.png';
import embassyTowers from './edifice_properties/embassy_towers.png';
import horizonResidency from './edifice_properties/horizon_residency.png';
import urbanViewApartments from './edifice_properties/urban_view_apartments.png';

// HK Properties
import sapphireResidency from './hk_properties/sapphire_residency.jpg';
import amberResidency from './hk_properties/amber_residency.jpg';

// Other Properties
import pearlViewKisaasi from './other_properties/pearl_view_kisaasi.png';
import icon180Luxury from './other_properties/icon_180_luxury.png';
import skyriseApartments from './other_properties/skyrise_apartments.png';
import saifRealEstate2Bed from './other_properties/saif_real_estate_2bed.png';
import saifRealEstate3Bed from './other_properties/saif_real_estate_3bed.png';

// Property image mapping based on property titles
export const propertyImages: Record<string, string[]> = {
  // Canaan Properties
  'Prince Charles Luxury Apartments': [princeChadesLuxury],
  'Canaan Apartments': [canaanApartments],
  'Canaan Residence Apartment': [canaanResidence],
  
  // VAAL Properties
  'Cadenza Residence - Studio': [cadenzaResidence01, cadenzaResidence02],
  'Cadenza Residence - One Bedroom': [cadenzaResidence01, cadenzaResidence02],
  'Cadenza Residence - Two Bedroom': [cadenzaResidence01, cadenzaResidence02],
  'The Bridge Kololo': [theBridgeKololo],
  'The Futur by VAAL': [theFuturByVaal],
  
  // Edifice Properties
  'Atlantic Heights': [atlanticHeights],
  'Embassy Towers Residency': [embassyTowers],
  'The Horizon Residency': [horizonResidency],
  'Urban View Apartments': [urbanViewApartments],
  
  // HK Properties
  'Sapphire Residency': [sapphireResidency],
  'Amber Residency': [amberResidency],
  
  // Other Properties
  'Pearl View Kisaasi': [pearlViewKisaasi],
  'Icon 180 Luxury Complex': [icon180Luxury],
  'Skyrise Apartments': [skyriseApartments],
  'Saif Real Estate Shell Units - 2 Bedroom': [saifRealEstate2Bed],
  'Saif Real Estate Shell Units - 3 Bedroom': [saifRealEstate3Bed],
};

// Helper function to get property image(s)
export function getPropertyImage(propertyTitle: string): string[] {
  const images = propertyImages[propertyTitle];
  if (images && images.length > 0) {
    return images;
  }
  
  // Fallback to first available image for any unmatched properties
  const allImages = Object.values(propertyImages).flat();
  return allImages.length > 0 ? [allImages[0]] : [];
}

// Helper function to get first property image
export function getFirstPropertyImage(propertyTitle: string): string {
  const images = getPropertyImage(propertyTitle);
  return images[0] || '';
}

export default propertyImages;