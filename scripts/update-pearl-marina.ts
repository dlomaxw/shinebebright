
import 'dotenv/config';
import { storage } from '../server/storage';

async function updatePearlMarina() {
    console.log("Updating Pearl Marina property details...");

    try {
        const properties = await storage.getProperties();
        // Find by title (created as "Pearl Marina" by previous script)
        const pearlMarina = properties.find(p => p.title.toLowerCase().includes("pearl marina"));

        if (!pearlMarina) {
            console.error("Pearl Marina property not found!");
            process.exit(1);
        }

        console.log(`Found property: ${pearlMarina.title}`);

        const updatedData = {
            ...pearlMarina,
            title: "Pearl Marina Estates", // Full name
            description: `Pearl Marina Estates is a 389-acre luxury real estate development on the Garuga Peninsula in Uganda, offering a variety of properties with access to Lake Victoria. The development integrates residential, recreational, social, and retail facilities.\n\nProperty Types:\n- Bellavista Apartments (1-3 bedrooms)\n- La Perla Bungalows (3-bedroom units)\n- Springfield Apartments\n- Mirabella Residences (4-bedroom villas)\n- Riviera Residences (Townhouses/Villas)\n- Kingswood Park Serviced Plots\n\nLocated approximately 32 km from Kampala city center and 22 km from Entebbe International Airport.`,
            price: "$56,200 - $850,000+",
            location: "Garuga Peninsula, Uganda",
            area: "Garuga",
            city: "Entebbe",
            propertySize: "389 Acres",
            features: [
                "Private Sandy Beach",
                "Beach Club",
                "Lakeside Boardwalk",
                "Marinas",
                "Clubhouse",
                "Swimming Pools",
                "Landscaped Gardens",
                "Kids' Play Area",
                "Paved Roads",
                "Lake Victoria Access"
            ],
            // Images should already be there from previous sync
        };

        await storage.updateProperty(pearlMarina.id, updatedData);
        console.log("✓ Successfully updated Pearl Marina Estates details.");
        process.exit(0);

    } catch (error) {
        console.error("Error updating property:", error);
        process.exit(1);
    }
}

updatePearlMarina();
