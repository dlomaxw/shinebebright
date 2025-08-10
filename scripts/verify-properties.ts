import { storage } from "../server/storage";

async function verifyProperties() {
  console.log("Verifying all properties...");
  
  try {
    const allProperties = await storage.getProperties();
    console.log(`\nFound ${allProperties.length} total properties:\n`);
    
    allProperties.forEach((property, index) => {
      console.log(`${index + 1}. ${property.title} - ${property.location}`);
      console.log(`   Status: ${property.status} | Price: ${property.price}`);
      console.log(`   Images: ${property.images.length} images`);
      console.log("");
    });
    
    // Check for specific issues
    console.log("=== CHECKING FOR ISSUES ===");
    
    // Check for Elite Palazzo (should not be Horizon Residency)
    const elitePalazzo = allProperties.find(p => p.title.includes("Elite Palazzo"));
    if (elitePalazzo) {
      console.log("✓ Elite Palazzo found (correct name)");
    } else {
      const horizonResidency = allProperties.find(p => p.title.includes("Horizon Residency"));
      if (horizonResidency) {
        console.log("❌ Found Horizon Residency - should be Elite Palazzo");
      }
    }
    
    // Check for Diamond Court
    const diamondCourt = allProperties.find(p => p.title.includes("Diamond Court"));
    if (diamondCourt) {
      console.log("✓ Diamond Court found");
    } else {
      console.log("❌ Diamond Court is missing");
    }
    
    // Check for Sapphire Residency
    const sapphireProperties = allProperties.filter(p => p.title.includes("Sapphire"));
    console.log(`✓ Found ${sapphireProperties.length} Sapphire Residency properties`);
    
    // Check for properties with missing images
    const propertiesWithoutImages = allProperties.filter(p => p.images.length === 0);
    if (propertiesWithoutImages.length > 0) {
      console.log(`❌ ${propertiesWithoutImages.length} properties have no images:`);
      propertiesWithoutImages.forEach(p => console.log(`   - ${p.title}`));
    } else {
      console.log("✓ All properties have images");
    }
    
  } catch (error) {
    console.error("❌ Error verifying properties:", error);
  }
}

verifyProperties();