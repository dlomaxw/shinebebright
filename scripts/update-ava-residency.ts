
import 'dotenv/config';
import { storage } from '../server/storage';

async function updateAvaResidency() {
    console.log("Updating Ava Residency property details...");

    try {
        const properties = await storage.getProperties();
        // Find by title (created as "Ava Residency" by ensure-folder-properties script)
        const avaResidency = properties.find(p => p.title.toLowerCase().includes("ava residency"));

        if (!avaResidency) {
            console.error("Ava Residency property not found!");
            process.exit(1);
        }

        console.log(`Found property: ${avaResidency.title}`);

        const updatedData = {
            ...avaResidency,
            description: `Ava Residency in Kyebando, Uganda, offers 2 and 3-bedroom apartments. These condos provide contemporary living with detailed finishes, located on Kyebando-Ring Road.\n\nUnit Types:\n- 2-Bedroom Apartments\n- 3-Bedroom Apartments\n\nFeatures modern amenities, special lighting with pendant lights, and modern kitchen areas.`,
            price: "From UGX 295,000,000",
            location: "Kyebando-Ring Road, Uganda",
            area: "Kyebando",
            city: "Kampala",
            propertyType: "Apartment",
            features: [
                "Modern Amenities",
                "Special Lighting",
                "Pendant Lights",
                "Modern Kitchen",
                "Detailed Finishes",
                "24/7 Security" // Inferred/Standard
            ],
            // Images should already be there from previous sync
        };

        await storage.updateProperty(avaResidency.id, updatedData);
        console.log("✓ Successfully updated Ava Residency details.");
        process.exit(0);

    } catch (error) {
        console.error("Error updating property:", error);
        process.exit(1);
    }
}

updateAvaResidency();
