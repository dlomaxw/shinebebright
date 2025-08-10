import { storage } from "../server/storage";

const garnetResidencyProperty = {
  title: "Garnet Residency",
  location: "Kirode Road, Muyenga Hills",
  price: "Contact for Price",
  type: "residential" as const,
  status: "under-construction" as const,
  bedrooms: "3",
  bathrooms: "3",
  squareMeters: 185,
  featured: true,
  description: "Garnet Residency is coming up at Kirode Road, Muyenga Hills. The Muyenga hill stands 4,285 feet above sea level and is one of the highest points in the city of Kampala. The hill commands expansive views of the city and the predominant view is that of the Lake Victoria. Located in the heart of the city The Garnet Residency is a contemporary design elevation coming up at a prestigious address that offers you panoramic views, plus a little more.",
  amenities: [
    "Serene location with Panoramic View",
    "Lake facing Roof Top Gym",
    "Kids Creche & Play Area",
    "Grand Entrance Lobby",
    "Car Park Space for every home",
    "Individual NWSC Water meter",
    "Individual UMEME YAKA meter",
    "24hours Security Guard",
    "24hours Surveillance Camera",
    "Recognized Fire Fighting System Installed",
    "BBQ Area on Terrace",
    "Gazebo on Terrace",
    "Grand Living Room",
    "Dining space with balcony",
    "Master bedroom with balcony, Wardrobe, and Toilet",
    "One bedroom with common toilet",
    "One self-contained bedroom",
    "Kitchen with Dry yard"
  ],
  images: [
    "https://hk-properties.com/assets/images/projects/garnet-residency/garnet-resi-bg.jpg",
    "https://hk-properties.com/assets/images/projects/garnet-residency/3bhk-side.jpg",
    "https://hk-properties.com/assets/images/projects/garnet-residency/3bhk-top.jpg",
    "https://hk-properties.com/assets/images/projects/garnet-residency/3d-render.jpg"
  ],
  specifications: {
    "Area": "185 sq.m",
    "Bedrooms": "3BHK",
    "Location": "Kirode Road, Muyenga Hills",
    "Start Date": "1st June 2023",
    "Completion Date": "31st March 2025",
    "Project Status": "Construction Ongoing",
    "Highlights": "Smartly Planned Home, Serene & Tranquil Environment"
  },
  originalUrl: "https://hk-properties.com/projects/garnet-residency.html"
};

async function addGarnetResidency() {
  console.log("Adding Garnet Residency...");
  
  try {
    // Check if Garnet Residency already exists
    const existingProperties = await storage.getProperties();
    const exists = existingProperties.some(
      (existing) => 
        existing.title === garnetResidencyProperty.title
    );
    
    if (!exists) {
      await storage.createProperty(garnetResidencyProperty);
      console.log("✓ Added: Garnet Residency");
    } else {
      console.log("ℹ Garnet Residency already exists");
    }
    
    console.log("\n🎉 Garnet Residency process completed!");
    
  } catch (error) {
    console.error("❌ Error adding Garnet Residency:", error);
  }
}

addGarnetResidency();