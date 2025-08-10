import { storage } from "../server/storage";
import type { InsertProperty } from "../shared/schema";

const hkProperties: InsertProperty[] = [
  {
    title: "Sapphire Residency",
    location: "Mutungo Hill, Kampala",
    price: "242M - 353M UGX",
    type: "residential",
    status: "completed",
    bedrooms: "2",
    bathrooms: "2",
    squareMeters: 112,
    featured: true,
    description: "Our latest project, Sapphire Residency is located in Mutungo Hill, one of the most upscale suburbs in Kampala. It has both two and three-bedroomed apartments with a total area of 112 and 150 square meters respectively. The two-bedroomed apartments are being sold for UGX 242 M while the three-bedroomed apartments have been priced at UGX 353M and have a flexible payment plan spanning over 24 months.",
    amenities: [
      "Gym Area",
      "Swimming Pool", 
      "Ample Parking",
      "Gazebo Two Decks",
      "Rooftop Gazebo",
      "Utility Area",
      "Condominium Private Mailo Title",
      "Prime Location",
      "Serene Environment",
      "Lift",
      "Backup Generators",
      "Community Hall"
    ],
    images: [
      "https://hk-properties.com/assets/images/projects/sapphire-residency/2bhk-render.jpg",
      "https://hk-properties.com/assets/images/projects/sapphire-residency/3bhk-render.jpg",
      "https://hk-properties.com/assets/images/projects/sapphire-residency/3d-render.jpg",
      "https://hk-properties.com/assets/images/projects/sapphire-residency/3d-render-01.jpg"
    ],
    specifications: {
      "2BHK Area": "112 sq.m",
      "3BHK Area": "150 sq.m", 
      "Penthouse Area": "420 sq.m",
      "2BHK Price": "UGX 242M",
      "3BHK Price": "UGX 353M",
      "Payment Plan": "Flexible Pay within 24 months",
      "Start Date": "1st October 2020",
      "Completion Date": "30th September 2023",
      "Project Status": "Completed"
    },
    originalUrl: "https://hk-properties.com/projects/sapphire-residency.html"
  },
  {
    title: "Sapphire Residency - 3BHK",
    location: "Mutungo Hill, Kampala", 
    price: "353M UGX",
    type: "residential",
    status: "completed",
    bedrooms: "3",
    bathrooms: "3",
    squareMeters: 150,
    featured: true,
    description: "Premium three-bedroom apartment at Sapphire Residency, located in Mutungo Hill, one of the most upscale suburbs in Kampala. This spacious 150 square meter apartment features modern amenities and flexible payment options spanning over 24 months.",
    amenities: [
      "Gym Area",
      "Swimming Pool",
      "Ample Parking", 
      "Gazebo Two Decks",
      "Rooftop Gazebo",
      "Utility Area",
      "Condominium Private Mailo Title",
      "Prime Location",
      "Serene Environment",
      "Lift",
      "Backup Generators",
      "Community Hall"
    ],
    images: [
      "https://hk-properties.com/assets/images/projects/sapphire-residency/3bhk-render.jpg",
      "https://hk-properties.com/assets/images/projects/sapphire-residency/2bhk-render.jpg",
      "https://hk-properties.com/assets/images/projects/sapphire-residency/3d-render.jpg",
      "https://hk-properties.com/assets/images/projects/sapphire-residency/3d-render-01.jpg"
    ],
    specifications: {
      "Area": "150 sq.m",
      "Price": "UGX 353M",
      "Payment Plan": "Flexible Pay within 24 months",
      "Project Status": "Completed",
      "Building Type": "Condominium",
      "Location Advantage": "Mutungo Hill - Upscale Suburb"
    },
    originalUrl: "https://hk-properties.com/projects/sapphire-residency.html"
  },
  {
    title: "Lulu Residency - 2BHK",
    location: "Munyonyo, Lake Victoria",
    price: "Contact for Price",
    type: "residential", 
    status: "under-construction",
    bedrooms: "2",
    bathrooms: "2",
    squareMeters: 138,
    featured: true,
    description: "Lulu Residency is a seven-storey iconic luxurious structure rising with fabulous panoramic views of Lake Victoria. The structural design captures the outdoor connections that occur naturally when living closer to the ground. Each apartment offers comfortable outdoor terraces with gorgeous views of the calm Victoria Lake.",
    amenities: [
      "Serene 360° Lake view",
      "Big Swimming Pool",
      "Kids Creche & Play Area", 
      "Individual UMEME YAKA Meter",
      "Individual NWSC Water Meter",
      "24-hour Security Guard",
      "24-hour Surveillance Camera",
      "Rooftop Gazebo",
      "Posh Tranquil Neighborhood",
      "Dedicated Parking Spaces"
    ],
    images: [
      "https://hk-properties.com/assets/images/projects/lulu-residency/2bhk-render-1.jpg",
      "https://hk-properties.com/assets/images/projects/lulu-residency/2bhk-render.jpg",
      "https://hk-properties.com/assets/images/projects/lulu-residency/3d-render-xl.jpg",
      "https://hk-properties.com/assets/images/projects/lulu-residency/3d-render-xl-01.jpg",
      "https://hk-properties.com/assets/images/projects/lulu-residency/3d-render-xl-02.jpg"
    ],
    specifications: {
      "Area": "138 sq.m",
      "Building Type": "Seven-storey iconic structure",
      "View": "Panoramic Lake Victoria views",
      "Design": "Curved form with outdoor terraces",
      "Start Date": "1st March 2021",
      "Completion Date": "31st March 2024",
      "Project Status": "Construction Ongoing"
    },
    originalUrl: "https://hk-properties.com/projects/lulu-residency.html"
  },
  {
    title: "Lulu Residency - 3BHK", 
    location: "Munyonyo, Lake Victoria",
    price: "Contact for Price",
    type: "residential",
    status: "under-construction", 
    bedrooms: "3",
    bathrooms: "3",
    squareMeters: 158,
    featured: true,
    description: "Premium three-bedroom apartment at Lulu Residency with fabulous panoramic views of Lake Victoria. Features curved design with comfortable outdoor terraces, natural light, ventilation, and gorgeous lake views. Includes 2 car parking spaces.",
    amenities: [
      "Serene 360° Lake view",
      "Big Swimming Pool",
      "Kids Creche & Play Area",
      "Individual UMEME YAKA Meter", 
      "Individual NWSC Water Meter",
      "24-hour Security Guard",
      "24-hour Surveillance Camera",
      "Rooftop Gazebo",
      "Posh Tranquil Neighborhood",
      "2 Car Park Spaces",
      "BBQ and Lounge area with Gazebo"
    ],
    images: [
      "https://hk-properties.com/assets/images/projects/lulu-residency/3bhk-render-1.jpg",
      "https://hk-properties.com/assets/images/projects/lulu-residency/3bhk-render.jpg",
      "https://hk-properties.com/assets/images/projects/lulu-residency/3d-render-xl.jpg",
      "https://hk-properties.com/assets/images/projects/lulu-residency/3d-render-xl-01.jpg",
      "https://hk-properties.com/assets/images/projects/lulu-residency/3d-render-xl-02.jpg"
    ],
    specifications: {
      "Area": "158 sq.m",
      "Parking": "2 Car Park Spaces", 
      "View": "Panoramic Lake Victoria views",
      "Special Features": "BBQ and Lounge area with Gazebo on Rooftop",
      "Design": "Curved form with outdoor terraces",
      "Project Status": "Construction Ongoing"
    },
    originalUrl: "https://hk-properties.com/projects/lulu-residency.html"
  },
  {
    title: "Amber Residency",
    location: "Bukasa, Muyenga",
    price: "257M UGX", 
    type: "residential",
    status: "completed",
    bedrooms: "3",
    bathrooms: "3",
    squareMeters: 130,
    featured: true,
    description: "Located in Bukasa, Muyenga, the Amber Residency comprises of three bedroomed apartments with a total area of 130 square meters each. This project perfectly fuses beauty, class and quality and boasts of a beautiful view overlooking the Muyenga hill. The apartments have appreciated 15% upon completion showing guaranteed returns for your investment.",
    amenities: [
      "Individual Yaka Meters",
      "NWSC Water Meter",
      "2 Dedicated Parking Spaces",
      "Gazebo Rooftop",
      "Stand by Generator", 
      "Prime Location",
      "Serene Environment",
      "Swimming Pool"
    ],
    images: [
      "https://hk-properties.com/assets/images/projects/amber-resi-layout.jpg",
      "https://hk-properties.com/assets/images/projects/amber-residency/amber-resi-elev-01.jpg",
      "https://hk-properties.com/assets/images/projects/amber-residency/amber-resi-elev-02.jpg",
      "https://hk-properties.com/assets/images/projects/amber-residency/gal-img-01.jpg",
      "https://hk-properties.com/assets/images/projects/amber-residency/gal-img-02.jpg"
    ],
    specifications: {
      "Area": "130 sq.m",
      "Starting Price": "257M UGX",
      "Original Price": "275M UGX off plan",
      "Appreciation": "15% upon completion",
      "Start Date": "1st January 2016",
      "Completion Date": "30th April 2019", 
      "Project Status": "Completed",
      "Location Advantage": "Beautiful view overlooking Muyenga hill"
    },
    originalUrl: "https://hk-properties.com/projects/amber-residency.html"
  }
];

async function populateHKProperties() {
  console.log("Starting to populate HK Properties...");
  
  try {
    // Get existing properties to avoid duplicates
    const existingProperties = await storage.getProperties();
    console.log(`Found ${existingProperties.length} existing properties`);
    
    let addedCount = 0;
    
    for (const property of hkProperties) {
      // Check if property already exists by title and location
      const exists = existingProperties.some(
        (existing) => 
          existing.title === property.title && 
          existing.location === property.location
      );
      
      if (!exists) {
        await storage.createProperty(property);
        addedCount++;
        console.log(`✓ Added: ${property.title}`);
      } else {
        console.log(`⚠ Skipped (already exists): ${property.title}`);
      }
    }
    
    console.log(`\n🎉 Successfully processed HK Properties!`);
    console.log(`📊 Added ${addedCount} new properties`);
    console.log(`📊 Skipped ${hkProperties.length - addedCount} existing properties`);
    
  } catch (error) {
    console.error("❌ Error populating HK properties:", error);
  }
}

// Run the script if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  populateHKProperties();
}

export { populateHKProperties };