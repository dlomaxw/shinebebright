/**
 * Property Image Utilities
 * Handles proper image path resolution and fallback logic
 * CRITICAL: Prevents mixing images between different developers/buildings
 */

import { getPropertyImageConfig, getPropertyDeveloperFolder } from './property-image-config';

export interface ImageConfig {
  filename: string;
  propertyTitle?: string;
  useThumbnail?: boolean;
}

/**
 * Generates the proper image URL for property images
 * PROFESSIONAL APPROACH: Organizes images by developer to prevent mixing
 * @param filename - The image filename from database
 * @param config - Image configuration options including propertyTitle for developer detection
 * @returns Proper image URL or placeholder if needed
 */
export function getPropertyImageUrl(filename: string, config: ImageConfig = { filename }): string {
  if (!filename) {
    return '/api/placeholder/400/300';
  }

  // Clean the filename
  const cleanFilename = filename.replace(/['"]/g, '').trim();
  
  if (!cleanFilename) {
    return '/api/placeholder/400/300';
  }

  // Get the correct developer folder to prevent image mixing
  const developerFolder = config.propertyTitle 
    ? getPropertyDeveloperFolder(config.propertyTitle)
    : 'general';

  // Build the path with proper developer organization
  const folder = config.useThumbnail ? 'thumbnails' : developerFolder;
  const imagePath = `/images/properties/${folder}/${cleanFilename}`;

  return imagePath;
}

/**
 * Processes image arrays from database (JSON strings or arrays)
 * PROFESSIONAL APPROACH: Uses developer-based organization to prevent image mixing
 * @param images - Images data from database
 * @param propertyTitle - Property title for developer identification
 * @param config - Image configuration options
 * @returns Array of image URLs organized by developer
 */
export function processPropertyImages(
  images: string | string[] | null, 
  propertyTitle: string,
  config: Partial<ImageConfig> = {}
): string[] {
  if (!images) {
    return ['/api/placeholder/400/300'];
  }

  let imageArray: string[] = [];
  
  if (Array.isArray(images)) {
    imageArray = images;
  } else if (typeof images === 'string') {
    try {
      // Try to parse as JSON first
      const parsed = JSON.parse(images);
      imageArray = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      // If not JSON, treat as single image
      imageArray = [images];
    }
  }

  // Filter out empty strings and process each image with proper developer organization
  return imageArray
    .filter(img => img && img.trim())
    .map(filename => getPropertyImageUrl(filename, { 
      filename, 
      propertyTitle, 
      ...config 
    }));
}

/**
 * Checks if an image exists (for future implementation with proper error handling)
 * Currently returns placeholder, but can be extended to check actual file existence
 * @param imageUrl - The image URL to check
 * @returns Promise resolving to the URL or placeholder
 */
export async function validateImageUrl(imageUrl: string): Promise<string> {
  // For now, return the URL as-is since our onError handlers will catch issues
  // In the future, this could make actual HTTP requests to validate images
  return imageUrl;
}

/**
 * Gets the fallback placeholder URL
 * @param width - Image width (default: 400)
 * @param height - Image height (default: 300)
 * @returns Placeholder image URL
 */
export function getPlaceholderUrl(width: number = 400, height: number = 300): string {
  return `/api/placeholder/${width}/${height}`;
}