import { storage } from "../server/storage";

const skyriseApartmentsProperty = {
  title: "Skyrise Apartments",
  location: "Kololo, Kampala",
  price: "$135,000",
  type: "residential" as const,
  status: "under-construction" as const,
  bedrooms: "2 & 3",
  bathrooms: "2 & 3",
  squareMeters: 200,
  featured: true,
  description: "Skyrise Apartments presents an exclusive collection of meticulously designed luxury residences in the prestigious neighborhood of Kololo, Kampala. Crafted with premium materials and sophisticated modern finishes, each apartment embodies the highest standards of quality, comfort, and elegance. Enjoy breathtaking golf course views, expansive layouts, and thoughtfully designed interiors that maximize space and functionality.",
  amenities: [
    "Golf course views",
    "Luxury finishes",
    "World-class amenities",
    "Secure and private environment",
    "Premium materials",
    "Sophisticated modern design",
    "Spacious layouts",
    "Thoughtfully designed interiors",
    "Flexible payment plans",
    "40 Month Payment Plan available",
    "$5000 booking fee only"
  ],
  images: [
    "https://cdn.sanity.io/images/1m0hda6y/production/8e23e89b643a7bc40f10848394d382149723cdc4-2250x2250.tif",
    "/api/placeholder/400/300", // Placeholder for additional images
    "/api/placeholder/400/300",
    "/api/placeholder/400/300"
  ],
  specifications: {
    "Total Units": "72 luxury apartments",
    "Unit Types": "Apartment A-3BHK-200 sqm, Apartment B-3BHK-241 sqm, Apartment C-2BHK-125 sqm, Apartment D-2BHK-125 sqm",
    "Booking Fee": "$5,000",
    "Payment Plan": "40 Month Payment Plan",
    "Status": "In Progress",
    "Location": "Kololo, Kampala",
    "Developer": "RF Developers"
  },
  originalUrl: "https://rfdevelopers.ug/project/skyrise-apartments"
};

async function addSkyriseApartments() {
  console.log("Adding Skyrise Apartments...");
  
  try {
    // Check if Skyrise Apartments already exists
    const existingProperties = await storage.getProperties();
    const exists = existingProperties.some(
      (existing) => 
        existing.title === skyriseApartmentsProperty.title ||
        existing.title.toLowerCase().includes("skyrise") ||
        existing.title.toLowerCase().includes("sky rise")
    );
    
    if (!exists) {
      await storage.createProperty(skyriseApartmentsProperty);
      console.log("✓ Added: Skyrise Apartments");
    } else {
      console.log("ℹ Skyrise Apartments already exists");
    }
    
    console.log("\n🎉 Skyrise Apartments process completed!");
    
  } catch (error) {
    console.error("❌ Error adding Skyrise Apartments:", error);
  }
}

addSkyriseApartments();