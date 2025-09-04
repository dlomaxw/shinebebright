// Property-specific video mapping
export interface PropertyVideo {
  embedId: string;
  title: string;
  url: string;
  description: string;
}

export const PROPERTY_VIDEO_MAPPING: Record<string, PropertyVideo> = {
  // Only include videos that actually match the property names or are legitimate technology demonstrations
  // Since these are generic VR/AR technology videos and not property-specific videos,
  // we should be very selective about which properties get videos to avoid misleading users
  
  // Note: These videos appear to be generic VR/AR technology demonstrations
  // and not specific to the properties listed, so removing inappropriate mappings
};

export const getPropertyVideo = (propertyTitle: string): PropertyVideo | null => {
  return PROPERTY_VIDEO_MAPPING[propertyTitle] || null;
};