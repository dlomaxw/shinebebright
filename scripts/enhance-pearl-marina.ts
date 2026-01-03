
import 'dotenv/config';
import { storage } from '../server/storage';

async function enhancePearlMarina() {
    console.log("Enhancing Pearl Marina property details from Centum info...");

    try {
        const properties = await storage.getProperties();
        // Find by title (already updated to "Pearl Marina Estates" or original "Pearl Marina")
        const pearlMarina = properties.find(p => p.title.toLowerCase().includes("pearl marina"));

        if (!pearlMarina) {
            console.error("Pearl Marina property not found!");
            process.exit(1);
        }

        console.log(`Found property: ${pearlMarina.title} (ID: ${pearlMarina.id})`);

        const updatedData = {
            ...pearlMarina,
            title: "Pearl Marina Estates",
            description: `Pearl Marina Estates is a luxurious, master-planned urban waterfront development on the Garuga Peninsula in Entebbe, Uganda. Designed as a self-sustaining lakeside city by Centum Real Estate, it integrates residential, recreational, social, and retail facilities on 389 acres with over 3 km of Lake Victoria frontage.\n\nUnit Types & Indicative Pricing:\n- Bellavista Apartments (1 Bedroom, 50sqm): ~$56,200\n- Bellavista Apartments (2 Bedrooms, ~80sqm): ~$90,000\n- Bellavista Apartments (3 Bedrooms, 100sqm): ~$112,500\n- La Perla Bungalows (3 Bedrooms, 150sqm): ~$210,000\n\nAmenities include a private beach, lakeside boardwalk, beach club, swimming pools, clubhouse, and landscaped gardens. Facilities for retail centers, schools, and a hospital are planned.`,
            price: "$56,200 - $210,000+", // Updated based on specific list
            location: "Garuga Peninsula, Entebbe",
            area: "Garuga",
            city: "Entebbe",
            propertyType: "Mixed Use Development", // Changed from Apartment as it has bungalows/villas too
            propertySize: "389 Acres",
            features: [
                "Lake Victoria Frontage (3km)",
                "Private Beach",
                "Beach Club",
                "Lakeside Boardwalk",
                "Swimming Pools",
                "Clubhouse",
                "Kids' Play Areas",
                "Secure Gated Community",
                "Master Planned City"
            ],
            // Images remain the same
        };

        await storage.updateProperty(pearlMarina.id, updatedData);
        console.log("✓ Successfully enhanced Pearl Marina Estates details.");
        process.exit(0);

    } catch (error) {
        console.error("Error updating property:", error);
        process.exit(1);
    }
}

enhancePearlMarina();
