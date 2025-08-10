import { storage } from "../server/storage";

async function fixDuplicates() {
  console.log("Fixing duplicate properties...");
  
  try {
    const allProperties = await storage.getProperties();
    
    // Find Diamond Court duplicates
    const diamondCourtProperties = allProperties.filter(p => 
      p.title.includes("Diamond Court")
    );
    
    console.log(`Found ${diamondCourtProperties.length} Diamond Court properties:`);
    diamondCourtProperties.forEach((p, i) => {
      console.log(`  ${i + 1}. "${p.title}" - ${p.images.length} images - ${p.location}`);
    });
    
    // Remove the less detailed "Diamond Court" property (keep "Diamond Court Apartments")
    const duplicateToRemove = diamondCourtProperties.find(p => 
      p.title === "Diamond Court" && p.location === "Kampala"
    );
    
    if (duplicateToRemove) {
      await storage.deleteProperty(duplicateToRemove.id);
      console.log("✓ Removed duplicate: Diamond Court (basic version)");
    }
    
    // Check Sapphire Residency images
    const sapphireProperties = allProperties.filter(p => 
      p.title.includes("Sapphire")
    );
    
    console.log(`\nChecking Sapphire Residency images:`);
    sapphireProperties.forEach(p => {
      console.log(`  "${p.title}": ${p.images.length} images`);
      p.images.forEach((img, i) => {
        console.log(`    ${i + 1}. ${img}`);
      });
    });
    
    console.log("\n🎉 Duplicate cleanup completed!");
    
  } catch (error) {
    console.error("❌ Error fixing duplicates:", error);
  }
}

fixDuplicates();