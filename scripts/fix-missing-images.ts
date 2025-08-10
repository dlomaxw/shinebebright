import { storage } from "../server/storage";

async function fixMissingImages() {
  console.log("Fixing missing images for Sapphire 2BHK and Atlantic Heights...");
  
  try {
    const allProperties = await storage.getProperties();
    
    // Find Sapphire Residency (not 3BHK) - this should be the 2BHK version
    const sapphire2BHK = allProperties.find(p => 
      p.title === "Sapphire Residency" && !p.title.includes("3BHK")
    );
    
    if (sapphire2BHK) {
      console.log(`Found Sapphire 2BHK: ${sapphire2BHK.title}`);
      console.log(`Current images: ${sapphire2BHK.images.length}`);
      
      // Update with working 2BHK images
      const updatedSapphire = {
        ...sapphire2BHK,
        images: [
          "https://hk-properties.com/assets/images/projects/sapphire-residency/sapphire-bg.jpg",
          "https://hk-properties.com/assets/images/projects/sapphire-residency/2bhk-render.jpg",
          "https://hk-properties.com/assets/images/projects/sapphire-residency/3d-render.jpg",
          "https://hk-properties.com/assets/images/projects/sapphire-residency/3d-render-01.jpg"
        ]
      };
      
      await storage.updateProperty(sapphire2BHK.id, updatedSapphire);
      console.log("✓ Fixed Sapphire Residency 2BHK images");
    }
    
    // Find Atlantic Heights
    const atlanticHeights = allProperties.find(p => 
      p.title.includes("Atlantic Heights")
    );
    
    if (atlanticHeights) {
      console.log(`Found Atlantic Heights: ${atlanticHeights.title}`);
      console.log(`Current images: ${atlanticHeights.images.length}`);
      
      // Update with working Atlantic Heights images
      const updatedAtlantic = {
        ...atlanticHeights,
        images: [
          "https://properties.shinebebright.com/wp-content/uploads/2025/06/Untitled-design-9.png",
          "https://properties.shinebebright.com/wp-content/uploads/2025/06/30-768x643-1.webp",
          "https://properties.shinebebright.com/wp-content/uploads/2025/06/Atlantic-Heights-1.jpg",
          "https://properties.shinebebright.com/wp-content/uploads/2025/06/Atlantic-Heights-2.jpg"
        ]
      };
      
      await storage.updateProperty(atlanticHeights.id, updatedAtlantic);
      console.log("✓ Fixed Atlantic Heights images");
    }
    
    console.log("\n🎉 Image fixes completed!");
    
  } catch (error) {
    console.error("❌ Error fixing images:", error);
  }
}

fixMissingImages();