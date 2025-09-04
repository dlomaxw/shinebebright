// Property-specific video mapping
export interface PropertyVideo {
  embedId: string;
  title: string;
  url: string;
  description: string;
}

export const PROPERTY_VIDEO_MAPPING: Record<string, PropertyVideo> = {
  // Only including videos that actually match the specific building names and content
  // After careful review, these appear to be generic VR/AR technology demonstrations
  // that do not show the actual buildings listed in the properties database.
  // 
  // To maintain honesty and accuracy, only videos that genuinely show or relate to
  // the specific property names should be included here.
  // 
  // Currently no videos match the actual property names:
  // - Garnet Residency, Elite Pallazo Naguru, Icon 180 Luxury Complex
  // - Embassy Towers Residency, The Horizon Residency, Pearl View
  // - Cadenza Residence, Skyrise Apartments, The Bridge Kololo
  //
  // The provided videos appear to be general VR/AR technology showcases
  // rather than property-specific content.
};

export const getPropertyVideo = (propertyTitle: string): PropertyVideo | null => {
  return PROPERTY_VIDEO_MAPPING[propertyTitle] || null;
};