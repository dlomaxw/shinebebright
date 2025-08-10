import { storage } from "../server/storage";
import { type InsertProperty } from "../shared/schema";

const propertyData: InsertProperty[] = [
  {
    title: "Atlantic Heights",
    description: "About Atlantic Heights: Atlantic Heights stands as the latest flagship project by Edifice Properties, marking a revolutionary shift in luxury living. This mixed-use development has set the gold standard for contemporary architecture and elevated lifestyle in Uganda's capital. From state-of-the-art amenities to meticulously planned interior spaces, Atlantic Heights epitomizes the pinnacle of urban sophistication.",
    price: "PRICES INSIDE",
    bedrooms: "1,2&3",
    bathrooms: "3,2&1",
    propertySize: null,
    garage: 1,
    yearBuilt: null,
    propertyType: "Apartment, Residential",
    status: "For Sale",
    location: "Muyenga",
    address: "Muyenga",
    city: "Kampala",
    area: "Central City",
    country: "Uganda",
    images: [
      "https://properties.shinebebright.com/wp-content/uploads/2025/06/Untitled-design-5-1170x785.png",
      "https://edificepropertiesug.com/wp-content/uploads/2024/07/23.webp",
      "https://edificepropertiesug.com/wp-content/uploads/2024/07/EDIFICE-PROFILE._page-0056.jpg"
    ],
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Elevator", "Parking Space", "Rooftop terraces", "Swimming Pool"],
    featured: true,
    originalUrl: "https://properties.shinebebright.com/property/luxury-family-home-3-3-2-2-2/"
  },
  {
    title: "Baskerville Canaan Apartment",
    description: "Modern luxury apartment in the heart of Canaan with spacious layouts and premium amenities. Features contemporary design with high-quality finishes throughout.",
    price: "PRICES INSIDE",
    bedrooms: "3",
    bathrooms: "3",
    propertySize: "300 Sqm",
    garage: 1,
    yearBuilt: null,
    propertyType: "Apartment, Residential",
    status: "For Sale",
    location: "Kampala",
    address: "Kampala",
    city: "Kampala",
    area: "Central City",
    country: "Uganda",
    images: [
      "https://properties.shinebebright.com/wp-content/uploads/2025/07/Untitled-design-584x438.png",
      "https://properties.shinebebright.com/wp-content/uploads/2025/07/Bright-BASKERVILLE-MAIL.pdf-4-584x438.png",
      "https://properties.shinebebright.com/wp-content/uploads/2025/07/Bright-BASKERVILLE-MAIL.pdf-5-584x438.png",
      "https://properties.shinebebright.com/wp-content/uploads/2025/07/Bright-BASKERVILLE-MAIL.pdf-1.png",
      "https://properties.shinebebright.com/wp-content/uploads/2025/07/Bright-BASKERVILLE-MAIL.pdf-7-584x438.png"
    ],
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Elevator", "Parking Space", "Rooftop terraces", "Swimming Pool"],
    featured: true,
    originalUrl: "https://properties.shinebebright.com/property/luxury-family-home-3-3-2-2-2-3-2-2-2-3-2/"
  },
  {
    title: "Canaan Residence Apartment",
    description: "Experience luxury living at Canaan Residence with modern amenities and elegant design. Located in a prime area with easy access to the city center.",
    price: "PRICES ON CALL",
    bedrooms: "3",
    bathrooms: "4",
    propertySize: "280 Sq Ft",
    garage: 1,
    yearBuilt: null,
    propertyType: "Apartment, Residential",
    status: "For Sale",
    location: "Kampala",
    address: "Kampala",
    city: "Kampala",
    area: "Central City",
    country: "Uganda",
    images: [
      "https://properties.shinebebright.com/wp-content/uploads/2025/06/Untitled-design-2-584x438.png",
      "https://properties.shinebebright.com/wp-content/uploads/2025/06/CANAAN-RESIDENCE-6-1240x720-1-584x438.jpg"
    ],
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Elevator", "Parking Space", "Rooftop terraces", "Swimming Pool"],
    featured: false,
    originalUrl: "https://properties.shinebebright.com/property/luxury-family-home-3-3-2-2-2-3-2-2-2-3/"
  },
  {
    title: "Diamond Court",
    description: "Luxurious residential development offering contemporary living spaces with premium finishes and world-class amenities in a secure, gated community.",
    price: "PRICES ON CALL",
    bedrooms: "1,2&3",
    bathrooms: "3,2&1",
    propertySize: null,
    garage: 1,
    yearBuilt: null,
    propertyType: "Apartment, Residential",
    status: "For Sale",
    location: "Kampala",
    address: "Kampala",
    city: "Kampala",
    area: "Central City",
    country: "Uganda",
    images: [
      "https://properties.shinebebright.com/wp-content/uploads/2025/06/Untitled-design-3-1170x785.png",
      "https://edificepropertiesug.com/wp-content/uploads/2024/07/23.webp"
    ],
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Elevator", "Parking Space", "Rooftop terraces", "Swimming Pool"],
    featured: false,
    originalUrl: "https://properties.shinebebright.com/property/luxury-family-home-3-3-2-2-2-3-2-2/"
  },
  {
    title: "Divyabav Vertica",
    description: "Modern high-rise development featuring luxury apartments with stunning views and premium amenities. Multiple bedroom configurations available from 1BHK to penthouse suites.",
    price: "PRICES ON CALL",
    bedrooms: "1,2,3,4,5,6 & PENTHOUSE",
    bathrooms: "3,2&1",
    propertySize: null,
    garage: 1,
    yearBuilt: null,
    propertyType: "Apartment, Residential",
    status: "For Sale",
    location: "Kampala",
    address: "Kampala",
    city: "Kampala",
    area: "Central City",
    country: "Uganda",
    images: [
      "https://properties.shinebebright.com/wp-content/uploads/2025/06/Untitled-design-1-584x438.png"
    ],
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Elevator", "Parking Space", "Rooftop terraces", "Swimming Pool"],
    featured: false,
    originalUrl: "https://properties.shinebebright.com/property/luxury-family-home-3-3-2-2-2-3-2-2-2-2/"
  },
  {
    title: "Elite Palazzo Naguru",
    description: "Being an Elite resident means having the metropolis at your fingertips. At the crossroads of Naguru Ntinda II rd, Elite offers unparalleled connectivity. With efficient road networks, four entry-exit stations, and a nearest taxi to Downtown Kampala, every destination is just moments away. Elite offers a variety of city-inspired residences with elegant 1-bedroom units perfect for individuals or couples, and 2- and 3-bedroom apartments with expansive layouts, large terraces, and locally + internationally sourced materials.",
    price: "$65,000 FOR 1BHK, $85,000 FOR 2BHK & $120,000 FOR 3BHK",
    bedrooms: "1,2&3",
    bathrooms: "3,2&1",
    propertySize: null,
    garage: 1,
    yearBuilt: null,
    propertyType: "Apartment, Residential",
    status: "For Sale",
    location: "Luthuli Avenue, Bugolobi-Kampala",
    address: "Bugolobi-Kampala",
    city: "Kampala",
    area: "Central City",
    country: "Uganda",
    images: [
      "https://properties.shinebebright.com/wp-content/uploads/2025/05/IMG-20250407-WA0003-1170x785.jpg",
      "https://edificepropertiesug.com/wp-content/uploads/2024/07/3.webp",
      "https://properties.shinebebright.com/wp-content/uploads/2025/06/EDIFICE-PROFILE._page-0020-1024x724-1.jpg",
      "https://properties.shinebebright.com/wp-content/uploads/2025/06/EDIFICE-PROFILE._page-0038-1024x724.jpg",
      "https://edificepropertiesug.com/wp-content/uploads/2024/07/8-1.webp"
    ],
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Elevator", "Parking Space", "Rooftop terraces", "Swimming Pool"],
    featured: true,
    originalUrl: "https://properties.shinebebright.com/property/luxury-family-home-3-3-2-2-2-3/"
  },
  {
    title: "KENDAL VILLAS",
    description: "NEW PROJECT LAUNCH 🔥🔥🏠🏠 KENDAL VILLAS IN KISASI_KIKAYA Rd BAHAI TEMPLE. Situated within the lovely neighborhood of Kikaaya Kawempe Division near Bahai temple. MODERN 3 BEDROOM DUPLEX VILLAS with 18-month interest-free payment plan and exceptional arrangements with the bank for mortgage financing.",
    price: "PRICES ON CALL",
    bedrooms: "3",
    bathrooms: "4",
    propertySize: "154 Sqm",
    garage: 1,
    yearBuilt: 2025,
    propertyType: "Apartment, Residential",
    status: "For Sale",
    location: "Kikaaya near Bahai temple",
    address: "Kikaaya near Bahai temple",
    city: "Kampala",
    area: "Central City",
    country: "Uganda",
    images: [
      "https://properties.shinebebright.com/wp-content/uploads/2025/07/WhatsApp-Image-2024-06-19-at-3.23.20-PM.jpeg",
      "https://properties.shinebebright.com/wp-content/uploads/2025/07/WhatsApp-Image-2024-06-19-at-2.18.29-PM.jpeg",
      "https://properties.shinebebright.com/wp-content/uploads/2025/07/3d1_3-Photo-scaled-1-1170x785.jpg",
      "https://properties.shinebebright.com/wp-content/uploads/2025/07/3d1_1-Photo-1-scaled-1-1170x785.jpg",
      "https://properties.shinebebright.com/wp-content/uploads/2025/07/INTER-SEC-1-1-scaled-1-1170x785.jpg"
    ],
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Elevator", "Parking Space", "Rooftop terraces", "Swimming Pool"],
    featured: true,
    originalUrl: "https://properties.shinebebright.com/property/luxury-family-home-3-3-2-2-2-3-2-2-2-3-2-2-2/"
  },
  {
    title: "Kisaasi Heights",
    description: "Enjoy luxurious apartments with tasteful interior finishing, topped off with rooftop access and a ground floor packed with supermarkets, designer shops, and high-end fashion boutiques. Located at Kisasi Kynja Road, Opp Satellite Hotel, Near Kampala Academy School, Kisasi. 2 Bedroom 240 Million, 3 Bedroom 280 Million. Ready to Move Project with flexible payment plans.",
    price: "PRICES INSIDE",
    bedrooms: "2&3",
    bathrooms: "2",
    propertySize: "115 Sqm",
    garage: 1,
    yearBuilt: 2025,
    propertyType: "Apartment, Residential",
    status: "For Sale",
    location: "KYANJA-KISASI",
    address: "Bugolobi-Kampala",
    city: "Kampala",
    area: "Central City",
    country: "Uganda",
    images: [
      "https://properties.shinebebright.com/wp-content/uploads/2025/07/Untitled-design-1-1170x785.png",
      "https://properties.shinebebright.com/wp-content/uploads/2025/07/Garden-kisasi-3BHK-1080x785.jpeg",
      "https://properties.shinebebright.com/wp-content/uploads/2025/07/Garden-Towers-1BHK-768x576-1.jpeg"
    ],
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Elevator", "Parking Space", "Rooftop terraces", "Swimming Pool"],
    featured: true,
    originalUrl: "https://properties.shinebebright.com/property/luxury-family-home-3-3-2-2-2-3-2-2-2-3-2-2/"
  },
  {
    title: "Embassy Towers Residency",
    description: "About Embassy Towers Residency - Your Gateway to Elevated Living. Experience upscale living in the serene hills of Muyenga at Embassy Residency. With elegantly designed apartments and top-tier amenities, Embassy Residency offers the perfect blend of sophistication and comfort. Enjoy the peaceful environment while staying close to the city's vibrant lifestyle, all in one of Kampala's most sought-after locations. PRICES: 1BHK= $64,000, 2BHK= $80,000, 3BHK= $115,000",
    price: "PRICES INSIDE",
    bedrooms: "1,2&3",
    bathrooms: "3,2&1",
    propertySize: null,
    garage: 1,
    yearBuilt: null,
    propertyType: "Apartment, Residential",
    status: "For Sale",
    location: "Muyenga",
    address: "Bugolobi-Kampala",
    city: "Kampala",
    area: "Central City",
    country: "Uganda",
    images: [
      "https://properties.shinebebright.com/wp-content/uploads/2025/06/Untitled-design-8-1170x785.png",
      "https://edificepropertiesug.com/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-12-at-1.16.20-PM-1024x576.jpeg",
      "https://properties.shinebebright.com/wp-content/uploads/2025/06/Prices-05-1024x724.png",
      "https://edificepropertiesug.com/wp-content/uploads/2024/09/WhatsApp-Image-2024-09-12-at-1.16.24-PM-1024x576.jpeg"
    ],
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Elevator", "Parking Space", "Rooftop terraces", "Swimming Pool"],
    featured: false,
    originalUrl: "https://properties.shinebebright.com/property/luxury-family-home-3-3-2-2-2-3-2-2/"
  },
  {
    title: "Urban View Apartment Kulambiro",
    description: "About Urban View Apartments: Forged from glass and steel, Urban View stands tall enough for a serene View and welcomes the city's innovators, professionals, and creatives through its doors. This luxury high-rise community provides its residents with sophisticated and trendy apartment features, extravagant and resort-style amenities at a very effective price. Take in gorgeous views from within your home, work out with a personal trainer in the fitness center or a calm rooftop to relax after a long day.",
    price: "PRICES INSIDE",
    bedrooms: "1,2&3",
    bathrooms: "3,2&1",
    propertySize: null,
    garage: 1,
    yearBuilt: null,
    propertyType: "Apartment, Residential",
    status: "For Sale",
    location: "Kulambiro",
    address: "Bugolobi-Kampala",
    city: "Kampala",
    area: "Central City",
    country: "Uganda",
    images: [
      "https://properties.shinebebright.com/wp-content/uploads/2025/06/Untitled-design-7-1170x785.png",
      "https://edificepropertiesug.com/wp-content/uploads/2024/07/23.webp",
      "https://edificepropertiesug.com/wp-content/uploads/2024/07/EDIFICE-PROFILE._page-0058.jpg",
      "https://edificepropertiesug.com/wp-content/uploads/2024/07/EDIFICE-PROFILE._page-0060.jpg"
    ],
    features: ["Air Conditioning", "Balconies", "CCTV cameras", "Elevator", "Parking Space", "Rooftop terraces", "Swimming Pool"],
    featured: false,
    originalUrl: "https://properties.shinebebright.com/property/luxury-family-home-3-3-2-2-2-3-2/"
  }
];

async function populateProperties() {
  console.log("Starting property population...");
  
  try {
    for (const property of propertyData) {
      console.log(`Creating property: ${property.title}`);
      await storage.createProperty(property);
      console.log(`✓ Created: ${property.title}`);
    }
    
    console.log(`\n✅ Successfully populated ${propertyData.length} properties!`);
    
    // Verify the data was inserted
    const allProperties = await storage.getProperties();
    console.log(`📊 Total properties in database: ${allProperties.length}`);
    
  } catch (error) {
    console.error("❌ Error populating properties:", error);
  }
}

// Run the script
populateProperties().then(() => {
  console.log("Property population completed!");
  process.exit(0);
}).catch((error) => {
  console.error("Property population failed:", error);
  process.exit(1);
});