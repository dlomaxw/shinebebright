import { db } from "../server/db";
import { properties } from "@shared/schema";
import { eq } from "drizzle-orm";

const getPropertyImages = (propertyTitle: string): string[] => {
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

const fixPropertyImages = async () => {
  console.log("🔧 Fixing property images - ensuring minimum 4 images per property...");

  try {
    // Get all properties
    const allProperties = await db.select().from(properties);
    console.log(`📋 Found ${allProperties.length} properties to update`);

    for (const property of allProperties) {
      console.log(`\n🏠 Processing: ${property.title}`);
      
      const currentImages = Array.isArray(property.images) ? property.images : [];
      console.log(`  Current images: ${currentImages.length}`);
      
      // Generate 4 images for each property
      const newImages = getPropertyImages(property.title);
      console.log(`  New images: ${newImages.length}`);
      
      // Update the property with new images
      await db
        .update(properties)
        .set({ 
          images: newImages,
          updatedAt: new Date()
        })
        .where(eq(properties.id, property.id));
        
      console.log(`  ✅ Updated ${property.title} with ${newImages.length} images`);
    }

    console.log("\n🎉 Successfully updated all property images!");
    console.log("✅ All properties now have minimum 4 images each");
    
  } catch (error) {
    console.error("❌ Error fixing property images:", error);
    throw error;
  }
};

// Run the script
fixPropertyImages()
  .then(() => {
    console.log("✨ Property image fix completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Script failed:", error);
    process.exit(1);
  });