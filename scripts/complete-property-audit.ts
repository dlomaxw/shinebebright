import { storage } from "../server/storage";

async function completePropertyAudit() {
  console.log("Complete Property Audit Report");
  console.log("===============================\n");
  
  try {
    const allProperties = await storage.getProperties();
    console.log(`Total Properties Found: ${allProperties.length}\n`);
    
    // Group by source
    const brightProperties = allProperties.filter(p => 
      !p.title.includes("Sapphire") && 
      !p.title.includes("Lulu") && 
      !p.title.includes("Amber") &&
      !p.title.includes("Garnet")
    );
    
    const hkProperties = allProperties.filter(p => 
      p.title.includes("Sapphire") || 
      p.title.includes("Lulu") || 
      p.title.includes("Amber") ||
      p.title.includes("Garnet")
    );
    
    console.log("BRIGHT PROPERTIES (properties.shinebebright.com):");
    console.log("================================================");
    brightProperties.forEach((property, index) => {
      console.log(`${index + 1}. ${property.title}`);
      console.log(`   Location: ${property.location}`);
      console.log(`   Price: ${property.price}`);
      console.log(`   Images: ${property.images.length} images`);
      console.log("");
    });
    
    console.log("\nHK PROPERTIES (hk-properties.com):");
    console.log("==================================");
    hkProperties.forEach((property, index) => {
      console.log(`${index + 1}. ${property.title}`);
      console.log(`   Location: ${property.location}`);
      console.log(`   Price: ${property.price}`);
      console.log(`   Images: ${property.images.length} images`);
      console.log("");
    });
    
    console.log("PROPERTY COUNT SUMMARY:");
    console.log("======================");
    console.log(`Bright Properties: ${brightProperties.length}`);
    console.log(`HK Properties: ${hkProperties.length}`);
    console.log(`Total: ${allProperties.length}`);
    
    console.log("\nMISSING PROPERTIES ANALYSIS:");
    console.log("============================");
    console.log("Based on website research:");
    console.log("• Sky Rise - NOT FOUND on current websites");
    console.log("• Sky Residency - NOT FOUND on current websites");
    console.log("• Topaz Court - NOT FOUND on current websites");
    console.log("");
    console.log("These properties may be:");
    console.log("1. Older/discontinued projects");
    console.log("2. Future developments not yet listed");
    console.log("3. Properties from different developers");
    console.log("4. Projects listed under different names");
    
  } catch (error) {
    console.error("❌ Error in property audit:", error);
  }
}

completePropertyAudit();