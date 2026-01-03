import { storage } from "../server/storage";
import type { InsertProperty } from "../shared/schema";

const allProperties: Partial<InsertProperty>[] = [
    // 1. Atlantic Heights
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
    // 2. Baskerville Canaan Apartment
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
    // 3. Canaan Residence Apartment
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
    // 4. Diamond Court
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
    // 5. Divyabav Vertica
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
    // 6. Elite Palazzo Naguru
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
    // 7. KENDAL VILLAS
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
    // 8. Kisaasi Heights
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
    // 9. Embassy Towers Residency
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
    // 10. Urban View Apartment Kulambiro
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
    },
    // 11. Sapphire Residency
    {
        title: "Sapphire Residency",
        location: "Mutungo Hill, Kampala",
        price: "242M - 353M UGX",
        propertyType: "residential",
        status: "completed",
        bedrooms: "2",
        bathrooms: "2",
        propertySize: "112 sq.m",
        featured: true,
        description: "Our latest project, Sapphire Residency is located in Mutungo Hill, one of the most upscale suburbs in Kampala. It has both two and three-bedroomed apartments with a total area of 112 and 150 square meters respectively. The two-bedroomed apartments are being sold for UGX 242 M while the three-bedroomed apartments have been priced at UGX 353M and have a flexible payment plan spanning over 24 months.",
        features: [
            "Gym Area", "Swimming Pool", "Ample Parking", "Gazebo Two Decks", "Rooftop Gazebo", "Utility Area",
            "Condominium Private Mailo Title", "Prime Location", "Serene Environment", "Lift", "Backup Generators", "Community Hall"
        ],
        images: [
            "https://hk-properties.com/assets/images/projects/sapphire-residency/main-building.jpg",
            "https://hk-properties.com/assets/images/projects/sapphire-residency/exterior-view.jpg",
            "https://hk-properties.com/assets/images/projects/sapphire-residency/building-facade.jpg",
            "https://hk-properties.com/assets/images/projects/sapphire-residency/completed-structure.jpg"
        ],
        originalUrl: "https://hk-properties.com/projects/sapphire-residency.html"
    },
    // 12. Sapphire Residency - 3BHK
    {
        title: "Sapphire Residency - 3BHK",
        location: "Mutungo Hill, Kampala",
        price: "353M UGX",
        propertyType: "residential",
        status: "completed",
        bedrooms: "3",
        bathrooms: "3",
        propertySize: "150 sq.m",
        featured: true,
        description: "Premium three-bedroom apartment at Sapphire Residency, located in Mutungo Hill, one of the most upscale suburbs in Kampala. This spacious 150 square meter apartment features modern amenities and flexible payment options spanning over 24 months.",
        features: [
            "Gym Area", "Swimming Pool", "Ample Parking", "Gazebo Two Decks", "Rooftop Gazebo", "Utility Area",
            "Condominium Private Mailo Title", "Prime Location", "Serene Environment", "Lift", "Backup Generators", "Community Hall"
        ],
        images: [
            "https://hk-properties.com/assets/images/projects/sapphire-residency/sapphire-bg.jpg",
            "https://hk-properties.com/assets/images/projects/sapphire-residency/3bhk-render.jpg",
            "https://hk-properties.com/assets/images/projects/sapphire-residency/3d-render.jpg"
        ],
        originalUrl: "https://hk-properties.com/projects/sapphire-residency.html"
    },
    // 13. Lulu Residency - 2BHK
    {
        title: "Lulu Residency - 2BHK",
        location: "Munyonyo, Lake Victoria",
        price: "Contact for Price",
        propertyType: "residential",
        status: "under-construction",
        bedrooms: "2",
        bathrooms: "2",
        propertySize: "138 sq.m",
        featured: true,
        description: "Lulu Residency is a seven-storey iconic luxurious structure rising with fabulous panoramic views of Lake Victoria. The structural design captures the outdoor connections that occur naturally when living closer to the ground. Each apartment offers comfortable outdoor terraces with gorgeous views of the calm Victoria Lake.",
        features: [
            "Serene 360° Lake view", "Big Swimming Pool", "Kids Creche & Play Area", "Individual UMEME YAKA Meter",
            "Individual NWSC Water Meter", "24-hour Security Guard", "24-hour Surveillance Camera", "Rooftop Gazebo",
            "Posh Tranquil Neighborhood", "Dedicated Parking Spaces"
        ],
        images: [
            "https://hk-properties.com/assets/images/projects/lulu-residency/lulu-bg.jpg",
            "https://hk-properties.com/assets/images/projects/lulu-residency/2bhk-render-1.jpg",
            "https://hk-properties.com/assets/images/projects/lulu-residency/3d-render-xl.jpg"
        ],
        originalUrl: "https://hk-properties.com/projects/lulu-residency.html"
    },
    // 14. Lulu Residency - 3BHK
    {
        title: "Lulu Residency - 3BHK",
        location: "Munyonyo, Lake Victoria",
        price: "Contact for Price",
        propertyType: "residential",
        status: "under-construction",
        bedrooms: "3",
        bathrooms: "3",
        propertySize: "158 sq.m",
        featured: true,
        description: "Premium three-bedroom apartment at Lulu Residency with fabulous panoramic views of Lake Victoria. Features curved design with comfortable outdoor terraces, natural light, ventilation, and gorgeous lake views. Includes 2 car parking spaces.",
        features: [
            "Serene 360° Lake view", "Big Swimming Pool", "Kids Creche & Play Area", "Individual UMEME YAKA Meter",
            "Individual NWSC Water Meter", "24-hour Security Guard", "24-hour Surveillance Camera", "Rooftop Gazebo",
            "Posh Tranquil Neighborhood", "2 Car Park Spaces", "BBQ and Lounge area with Gazebo"
        ],
        images: [
            "https://hk-properties.com/assets/images/projects/lulu-residency/lulu-bg.jpg",
            "https://hk-properties.com/assets/images/projects/lulu-residency/3bhk-render-1.jpg",
            "https://hk-properties.com/assets/images/projects/lulu-residency/3d-render-xl.jpg"
        ],
        originalUrl: "https://hk-properties.com/projects/lulu-residency.html"
    },
    // 15. Amber Residency
    {
        title: "Amber Residency",
        location: "Bukasa, Muyenga",
        price: "257M UGX",
        propertyType: "residential",
        status: "completed",
        bedrooms: "3",
        bathrooms: "3",
        propertySize: "130 sq.m",
        featured: true,
        description: "Located in Bukasa, Muyenga, the Amber Residency comprises of three bedroomed apartments with a total area of 130 square meters each. This project perfectly fuses beauty, class and quality and boasts of a beautiful view overlooking the Muyenga hill. The apartments have appreciated 15% upon completion showing guaranteed returns for your investment.",
        features: [
            "Individual Yaka Meters", "NWSC Water Meter", "2 Dedicated Parking Spaces", "Gazebo Rooftop",
            "Stand by Generator", "Prime Location", "Serene Environment", "Swimming Pool"
        ],
        images: [
            "https://hk-properties.com/assets/images/projects/amber-residency/amber-resi-bg.jpg",
            "https://hk-properties.com/assets/images/projects/amber-resi-layout.jpg",
            "https://hk-properties.com/assets/images/projects/amber-residency/amber-resi-elev-01.jpg"
        ],
        originalUrl: "https://hk-properties.com/projects/amber-residency.html"
    },
    // 16. Garnet Residency
    {
        title: "Garnet Residency",
        location: "Kirode Road, Muyenga Hills",
        price: "Contact for Price",
        propertyType: "residential",
        status: "under-construction",
        bedrooms: "3",
        bathrooms: "3",
        propertySize: "185 sq.m",
        featured: true,
        description: "Garnet Residency is coming up at Kirode Road, Muyenga Hills. The Muyenga hill stands 4,285 feet above sea level and is one of the highest points in the city of Kampala. The hill commands expansive views of the city and the predominant view is that of the Lake Victoria. Located in the heart of the city The Garnet Residency is a contemporary design elevation coming up at a prestigious address that offers you panoramic views, plus a little more.",
        features: [
            "Serene location with Panoramic View", "Lake facing Roof Top Gym", "Kids Creche & Play Area", "Grand Entrance Lobby",
            "Car Park Space for every home", "Individual NWSC Water meter", "Individual UMEME YAKA meter", "24hours Security Guard",
            "24hours Surveillance Camera", "Recognized Fire Fighting System Installed", "BBQ Area on Terrace"
        ],
        images: [
            "https://hk-properties.com/assets/images/projects/garnet-residency/garnet-resi-bg.jpg",
            "https://hk-properties.com/assets/images/projects/garnet-residency/3bhk-side.jpg",
            "https://hk-properties.com/assets/images/projects/garnet-residency/3bhk-top.jpg"
        ],
        originalUrl: "https://hk-properties.com/projects/garnet-residency.html"
    },
    // 17. Skyrise Apartments
    {
        title: "Skyrise Apartments",
        location: "Kololo, Kampala",
        price: "$135,000",
        propertyType: "residential",
        status: "under-construction",
        bedrooms: "2 & 3",
        bathrooms: "2 & 3",
        propertySize: "200 sq.m",
        featured: true,
        description: "Skyrise Apartments presents an exclusive collection of meticulously designed luxury residences in the prestigious neighborhood of Kololo, Kampala. Crafted with premium materials and sophisticated modern finishes, each apartment embodies the highest standards of quality, comfort, and elegance. Enjoy breathtaking golf course views, expansive layouts, and thoughtfully designed interiors that maximize space and functionality.",
        features: [
            "Golf course views", "Luxury finishes", "World-class amenities", "Secure and private environment",
            "Premium materials", "Sophisticated modern design", "Spacious layouts", "Thoughtfully designed interiors"
        ],
        images: [
            "https://cdn.sanity.io/images/1m0hda6y/production/8e23e89b643a7bc40f10848394d382149723cdc4-2250x2250.tif"
        ],
        originalUrl: "https://rfdevelopers.ug/project/skyrise-apartments"
    }
];

async function seedProperties() {
    console.log("Starting property seeding...");

    try {
        const existingProperties = await storage.getProperties();
        console.log(`Currently have ${existingProperties.length} properties.`);

        let added = 0;

        for (const data of allProperties) {
            // Basic check for existing property
            const exists = existingProperties.some(
                (p) => p.title.toLowerCase() === data.title?.toLowerCase()
            );

            if (!exists) {
                // Safe casting as we manually shaped the data
                await storage.createProperty(data as InsertProperty);
                console.log(`✓ Added: ${data.title}`);
                added++;
            } else {
                console.log(`Skip: ${data.title} (Exists)`);
            }
        }

        console.log(`\nDone. Added ${added} new properties.`);

        // Verification
        const finalProperties = await storage.getProperties();
        console.log(`Total count: ${finalProperties.length} (Target: 17)`);

    } catch (error) {
        console.error("Error seeding properties:", error);
        process.exit(1);
    }
}

// Execute
seedProperties().then(() => process.exit(0));
