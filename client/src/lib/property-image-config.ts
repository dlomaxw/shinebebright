/**
 * Property Image Configuration
 * Maps properties to their correct developer folders to prevent mixing images
 */

export interface PropertyImageConfig {
  propertyTitle: string;
  developer: string;
  folder: string;
  images: string[];
}

/**
 * Developer-based image organization to prevent mixing images between developers
 */
export const DEVELOPER_FOLDERS = {
  VAAL: 'vaal',
  SAIF_REAL_ESTATE: 'saif-real-estate', 
  EDIFICE_PROPERTIES: 'edifice-properties',
  NOVUS_REAL_ESTATE: 'novus-real-estate',
  HK_PROPERTIES: 'hk-properties',
  RF_DEVELOPERS: 'rf-developers',
  GENERAL: 'general',
  RESIDENTIAL: 'residential',
  COMMERCIAL: 'commercial'
} as const;

/**
 * Property to developer mapping - CRITICAL: Do not mix images between developers
 */
export const PROPERTY_IMAGE_MAPPING: Record<string, PropertyImageConfig> = {
  'The Futur by VAAL': {
    propertyTitle: 'The Futur by VAAL',
    developer: 'VAAL',
    folder: DEVELOPER_FOLDERS.VAAL,
    images: ['the_futur_by_vaal.jpeg']
  },
  'Saif Real Estate Shell Units - 2 Bedroom': {
    propertyTitle: 'Saif Real Estate Shell Units - 2 Bedroom',
    developer: 'Saif Real Estate',
    folder: DEVELOPER_FOLDERS.SAIF_REAL_ESTATE,
    images: ['saif_real_estate_2bed.png']
  },
  'Saif Real Estate Shell Units - 3 Bedroom': {
    propertyTitle: 'Saif Real Estate Shell Units - 3 Bedroom', 
    developer: 'Saif Real Estate',
    folder: DEVELOPER_FOLDERS.SAIF_REAL_ESTATE,
    images: ['saif_real_estate_3bed.png']
  },
  'Prince Charles Luxury Apartments': {
    propertyTitle: 'Prince Charles Luxury Apartments',
    developer: 'General',
    folder: DEVELOPER_FOLDERS.RESIDENTIAL,
    images: ['prince_charles_luxury.jpg']
  },
  'Icon 180 Luxury Complex': {
    propertyTitle: 'Icon 180 Luxury Complex',
    developer: 'Novus Real Estate',
    folder: DEVELOPER_FOLDERS.NOVUS_REAL_ESTATE,
    images: ['icon_180_exterior.jpg', 'icon_180_living.jpg', 'icon_180_gym.jpg', 'icon_180_pool.jpg', 'icon_180_lake_view.jpg']
  },
  'Cadenza Residence - One Bedroom': {
    propertyTitle: 'Cadenza Residence - One Bedroom',
    developer: 'VAAL',
    folder: DEVELOPER_FOLDERS.VAAL,
    images: ['cadenza_interior_real_1.jpg', 'cadenza_facade_1.jpg']
  },
  'Cadenza Residence - Two Bedroom': {
    propertyTitle: 'Cadenza Residence - Two Bedroom',
    developer: 'VAAL',
    folder: DEVELOPER_FOLDERS.VAAL, 
    images: ['cadenza_interior_real_2.jpg', 'cadenza_facade_2.jpg']
  },
  'Embassy Towers Residency': {
    propertyTitle: 'Embassy Towers Residency',
    developer: 'Edifice Properties',
    folder: DEVELOPER_FOLDERS.EDIFICE_PROPERTIES,
    images: ['embassy_towers.webp']
  },
  'Skyrise Apartments': {
    propertyTitle: 'Skyrise Apartments',
    developer: 'RF Developers',
    folder: DEVELOPER_FOLDERS.RF_DEVELOPERS,
    images: ['skyrise_building.png', 'skyrise_main.tif']
  },
  'Amber Residency': {
    propertyTitle: 'Amber Residency',
    developer: 'General',
    folder: DEVELOPER_FOLDERS.RESIDENTIAL,
    images: ['amber_residency.jpg']
  },
  'Atlantic Heights': {
    propertyTitle: 'Atlantic Heights',
    developer: 'General', 
    folder: DEVELOPER_FOLDERS.RESIDENTIAL,
    images: ['atlantic_heights.png']
  },
  'Canaan Apartments': {
    propertyTitle: 'Canaan Apartments',
    developer: 'General',
    folder: DEVELOPER_FOLDERS.RESIDENTIAL,
    images: ['canaan_apartments.jpg']
  },
  'Canaan Residence Apartment': {
    propertyTitle: 'Canaan Residence Apartment',
    developer: 'General',
    folder: DEVELOPER_FOLDERS.RESIDENTIAL,
    images: ['canaan_residence.jpg']
  },
  'Pearl View Kisaasi': {
    propertyTitle: 'Pearl View Kisaasi',
    developer: 'General',
    folder: DEVELOPER_FOLDERS.RESIDENTIAL,
    images: ['pearl_view_kisaasi.png']
  },
  'Sapphire Residency': {
    propertyTitle: 'Sapphire Residency',
    developer: 'General',
    folder: DEVELOPER_FOLDERS.RESIDENTIAL,
    images: ['sapphire_residency.jpg']
  },
  'Urban View Apartments': {
    propertyTitle: 'Urban View Apartments',
    developer: 'General',
    folder: DEVELOPER_FOLDERS.RESIDENTIAL,
    images: ['urban_view_apartments.png']
  },
  'Pearl View Kisaasi - 2 Bedroom Shell Unit': {
    propertyTitle: 'Pearl View Kisaasi - 2 Bedroom Shell Unit',
    developer: 'Saif Real Estate',
    folder: DEVELOPER_FOLDERS.SAIF_REAL_ESTATE,
    images: ['pearl_view_building.jpg', 'pearl_view_interior.jpg']
  },
  'Pearl View Kisaasi - 3 Bedroom Shell Unit': {
    propertyTitle: 'Pearl View Kisaasi - 3 Bedroom Shell Unit',
    developer: 'Saif Real Estate', 
    folder: DEVELOPER_FOLDERS.SAIF_REAL_ESTATE,
    images: ['pearl_view_building.jpg', 'pearl_view_interior.jpg']
  },
  'Elite Pallazo Naguru': {
    propertyTitle: 'Elite Pallazo Naguru',
    developer: 'Edifice Properties',
    folder: 'edifice-properties',
    images: ['elite_pallazo_1.webp', 'elite_pallazo_interior.webp', 'elite_pallazo_bedroom.webp', 'elite_pallazo_2.webp']
  },
  'The Horizon Residency': {
    propertyTitle: 'The Horizon Residency',
    developer: 'Edifice Properties',
    folder: 'edifice-properties', 
    images: ['horizon_residency_exterior.webp', 'horizon_residency_1.webp', 'horizon_residency_balcony.webp', 'horizon_residency_2.webp']
  },
  'The Bridge Kololo Pre-Launch': {
    propertyTitle: 'The Bridge Kololo',
    developer: 'VAAL',
    folder: DEVELOPER_FOLDERS.VAAL,
    images: ['the_bridge_kololo_main.jpg', 'the_bridge_aerial.jpg']
  },
  'Cadenza One Bedroom Nakasero': {
    propertyTitle: 'Cadenza One Bedroom Nakasero',
    developer: 'VAAL',
    folder: DEVELOPER_FOLDERS.VAAL,
    images: ['cadenza_interior_real_3.jpg', 'cadenza_facade_1.jpg']
  },
  'Cadenza Two Bedroom Nakasero': {
    propertyTitle: 'Cadenza Two Bedroom Nakasero',
    developer: 'VAAL',
    folder: DEVELOPER_FOLDERS.VAAL,
    images: ['cadenza_facade_2.jpg', 'cadenza_interior_real_2.jpg']
  }
};

/**
 * Get property image configuration by title
 * @param propertyTitle - The property title
 * @returns PropertyImageConfig or null if not found
 */
export function getPropertyImageConfig(propertyTitle: string): PropertyImageConfig | null {
  return PROPERTY_IMAGE_MAPPING[propertyTitle] || null;
}

/**
 * Get developer folder for a property
 * @param propertyTitle - The property title
 * @returns Folder name or 'general' as fallback
 */
export function getPropertyDeveloperFolder(propertyTitle: string): string {
  const config = getPropertyImageConfig(propertyTitle);
  return config?.folder || DEVELOPER_FOLDERS.GENERAL;
}