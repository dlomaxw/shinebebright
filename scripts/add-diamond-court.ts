import { storage } from "../server/storage";

const diamondCourtProperty = {
  title: "Diamond Court Apartments",
  location: "Kila-Mulawa, Wakiso District",
  price: "UGX 140M-338M",
  type: "residential" as const,
  status: "for-sale" as const,
  bedrooms: "1, 2 & 3",
  bathrooms: "1, 2 & 3",
  squareMeters: 106,
  featured: true,
  description: "Diamond Court Apartments by Knightsbridge Avenues offers a unique opportunity to own a luxurious home with flexible payment options. You can purchase your next apartment with just a 20% down payment, and the remaining 80% can be conveniently paid over a 12-month period. Every apartment at Diamond Court is fully fitted, so you can move in or rent out your new home immediately without the hassle of refurbishing or fitting.",
  amenities: [
    "Air Conditioning",
    "Barbeque",
    "Dryer", 
    "Gym",
    "Laundry",
    "Lawn",
    "Microwave",
    "Outdoor Shower",
    "Refrigerator",
    "Sauna",
    "Swimming Pool",
    "TV Cable",
    "Washer",
    "WiFi",
    "Window Coverings",
    "Rooftop Running Track",
    "Games Room",
    "24-hour Concierge Services",
    "CCTV Security",
    "Covered Parking",
    "Kids Play Area"
  ],
  images: [
    "https://properties.shinebebright.com/wp-content/uploads/2016/03/Untitled-design.png",
    "https://properties.shinebebright.com/wp-content/uploads/2016/03/Scene-1-1.png",
    "https://properties.shinebebright.com/wp-content/uploads/2016/03/Scene-2-1.png",
    "https://properties.shinebebright.com/wp-content/uploads/2016/03/Scene-3_1.png",
    "https://properties.shinebebright.com/wp-content/uploads/2016/03/Diamond-Court_-02-Front-Night-View-1-1536x864-1.jpg"
  ],
  specifications: {
    "Property Size": "52 - 106 Sqm",
    "Bedrooms": "1, 2 & 3",
    "Bathrooms": "1, 2 & 3",
    "Garage": "1",
    "Property Type": "Villa",
    "Payment Option": "20% down payment, 80% over 12 months",
    "Special Feature": "Fully fitted apartments"
  },
  originalUrl: "https://properties.shinebebright.com/property/luxury-villa-with-pool/"
};

async function addDiamondCourt() {
  console.log("Adding Diamond Court Apartments...");
  
  try {
    // Check if Diamond Court already exists
    const existingProperties = await storage.getProperties();
    const exists = existingProperties.some(
      (existing) => 
        existing.title === diamondCourtProperty.title
    );
    
    if (!exists) {
      await storage.createProperty(diamondCourtProperty);
      console.log("✓ Added: Diamond Court Apartments");
    } else {
      console.log("ℹ Diamond Court Apartments already exists");
    }
    
    console.log("\n🎉 Diamond Court process completed!");
    
  } catch (error) {
    console.error("❌ Error adding Diamond Court:", error);
  }
}

addDiamondCourt();