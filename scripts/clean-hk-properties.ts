import { storage } from "../server/storage";

// Remove existing HK properties that might not have the featured field
const hkPropertyTitles = [
  "Sapphire Residency",
  "Sapphire Residency - 3BHK", 
  "Lulu Residency - 2BHK",
  "Lulu Residency - 3BHK",
  "Amber Residency"
];

async function cleanHKProperties() {
  console.log("Starting to clean existing HK Properties...");
  
  try {
    // Get all properties
    const allProperties = await storage.getProperties();
    console.log(`Found ${allProperties.length} total properties`);
    
    // Find HK properties to remove
    const hkPropertiesToRemove = allProperties.filter(p => 
      hkPropertyTitles.includes(p.title)
    );
    
    console.log(`Found ${hkPropertiesToRemove.length} HK properties to remove`);
    
    // Remove each HK property
    for (const property of hkPropertiesToRemove) {
      await storage.deleteProperty(property.id);
      console.log(`✓ Removed: ${property.title}`);
    }
    
    console.log("\n🎉 Successfully cleaned HK Properties!");
    console.log(`📊 Removed ${hkPropertiesToRemove.length} properties`);
    
  } catch (error) {
    console.error("Error cleaning HK properties:", error);
  }
}

cleanHKProperties();