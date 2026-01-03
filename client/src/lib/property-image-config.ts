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
  MODERN_DEVELOPERS: 'modern-developers',
  GENERAL: 'general',
  RESIDENTIAL: 'residential',
  COMMERCIAL: 'commercial'
} as const;

/**
 * Property to developer mapping - CRITICAL: Do not mix images between developers
 */
export const PROPERTY_IMAGE_MAPPING: Record<string, PropertyImageConfig> = {
  'Icon 180 Luxury Complex': {
    propertyTitle: 'Icon 180 Luxury Complex',
    developer: 'Novus Real Estate',
    folder: 'icon180',
    images: []
  },
  'Icon 180': {
    propertyTitle: 'Icon 180',
    developer: 'Novus Real Estate',
    folder: 'icon180',
    images: [] // database source
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
    folder: 'embassy-towers',
    images: []
  },
  'Skyrise Apartments': {
    propertyTitle: 'Skyrise Apartments',
    developer: 'RF Developers',
    folder: 'skyrise-apartments',
    images: []
  },
  'Pearl View - 2 Bedroom Apartment': {
    propertyTitle: 'Pearl View - 2 Bedroom Apartment',
    developer: 'Saif Real Estate',
    folder: DEVELOPER_FOLDERS.SAIF_REAL_ESTATE,
    images: []
  },
  'Pearl View - 3 Bedroom Apartment': {
    propertyTitle: 'Pearl View - 3 Bedroom Apartment',
    developer: 'Saif Real Estate',
    folder: DEVELOPER_FOLDERS.SAIF_REAL_ESTATE,
    images: []
  },
  'Elite Pallazo Naguru': {
    propertyTitle: 'Elite Pallazo Naguru',
    developer: 'Edifice Properties',
    folder: 'elite-palazzo',
    images: []
  },
  'The Horizon Residency': {
    propertyTitle: 'The Horizon Residency',
    developer: 'Edifice Properties',
    folder: DEVELOPER_FOLDERS.EDIFICE_PROPERTIES,
    images: ['horizon_residency_exterior.webp', 'horizon_residency_1.webp', 'horizon_residency_balcony.webp', 'horizon_residency_2.webp']
  },
  'The Bridge Kololo Pre-Launch': {
    propertyTitle: 'The Bridge Kololo',
    developer: 'VAAL',
    folder: 'the-bridge-kololo',
    images: ['bridge_kololo_night.webp', 'bridge_kololo_aerial.webp']
  },
  'The Bridge Kololo': {
    propertyTitle: 'The Bridge Kololo',
    developer: 'VAAL',
    folder: 'the-bridge-kololo',
    images: ['bridge_kololo_night.webp', 'bridge_kololo_aerial.webp']
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
  },
  'Garnet Residency - 3 Bedroom Apartments': {
    propertyTitle: 'Garnet Residency - 3 Bedroom Apartments',
    developer: 'HK Properties',
    folder: DEVELOPER_FOLDERS.HK_PROPERTIES,
    images: ['garnet_residency_main.jpg', 'garnet_residency_3bhk_side.jpg', 'garnet_residency_3bhk_top.jpg', 'garnet_residency_render.jpg']
  },
  'Avenue Muyenga - 1BHK Apartment': {
    propertyTitle: 'Avenue Muyenga - 1BHK Apartment',
    developer: 'Modern Developers',
    folder: DEVELOPER_FOLDERS.MODERN_DEVELOPERS,
    images: ['1bhk-3d_1757923575202.webp', 'front-view_1757923575207.webp', 'night-view_1757923575207.webp', 'side-view-02_1757923575208.webp']
  },
  'Avenue Muyenga - 2BHK Apartment': {
    propertyTitle: 'Avenue Muyenga - 2BHK Apartment',
    developer: 'Modern Developers',
    folder: DEVELOPER_FOLDERS.MODERN_DEVELOPERS,
    images: ['2bhk-plan_1757923575205.webp', 'front-view (1)_1757923575206.webp', 'night-viewr_1757923575208.webp', 'side-view-02_1757923575208.webp']
  },
  'Avenue Muyenga - 3BHK Apartment': {
    propertyTitle: 'Avenue Muyenga - 3BHK Apartment',
    developer: 'Modern Developers',
    folder: DEVELOPER_FOLDERS.MODERN_DEVELOPERS,
    images: ['3bhk-plan_1757923575206.webp', 'front-view_1757923575207.webp', 'night-view_1757923575207.webp', 'side-view-02_1757923575208.webp']
  },
  // NEW MAPPINGS FOR FOLDER ALIGNMENT
  'Pearl Marina Estates': {
    propertyTitle: 'Pearl Marina Estates',
    developer: 'Centum Real Estate',
    folder: 'pearl-marina',
    images: [] // Images loaded dynamically from DB
  },
  'Nòuche Residency': {
    propertyTitle: 'Nòuche Residency',
    developer: 'Nouche',
    folder: 'nouche-residency',
    images: []
  },
  'Marjan Residency': {
    propertyTitle: 'Marjan Residency',
    developer: 'Unknown',
    folder: 'marjan-residency',
    images: []
  },
  'Kendal Villas': {
    propertyTitle: 'Kendal Villas',
    developer: 'Unknown',
    folder: 'kendal-villas',
    images: []
  },
  'Garnet Residency - 3 Bedroom Apartments': {
    propertyTitle: 'Garnet Residency - 3 Bedroom Apartments',
    developer: 'HK Properties',
    folder: 'garnet-residency',
    images: []
  },
  'The Horizon Residency': {
    propertyTitle: 'The Horizon Residency',
    developer: 'Edifice Properties',
    folder: 'horizon-residency',
    images: []
  },
  'The Bridge Kololo Pre-Launch': {
    propertyTitle: 'The Bridge Kololo',
    developer: 'VAAL',
    folder: 'vaal/the-bridge',
    images: []
  },
  'The Bridge Kololo': {
    propertyTitle: 'The Bridge Kololo',
    developer: 'VAAL',
    folder: 'vaal/the-bridge',
    images: []
  },
  'Sepal Gardens': {
    propertyTitle: 'Sepal Gardens',
    developer: 'Sepal',
    folder: 'sepal-garden',
    images: []
  },
  'Topaz Courts': {
    propertyTitle: 'Topaz Courts',
    developer: 'NH Developers',
    folder: 'topaz-court',
    images: []
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

export function getPropertyDeveloperFolder(propertyTitle: string): string {
  const config = getPropertyImageConfig(propertyTitle);
  if (config?.folder) {
    return config.folder;
  }

  // Fallback to sanitized property title for property-specific folders
  // This supports the new folder structure (e.g. "Atlantic Heights" -> "atlantic-heights")
  return propertyTitle
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}