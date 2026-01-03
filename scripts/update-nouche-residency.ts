
import 'dotenv/config';
import { storage } from '../server/storage';

async function updateNoucheResidency() {
    console.log("Updating Nouche Residency property details...");

    try {
        const properties = await storage.getProperties();
        // Find by title (created as "Nouche Residency" by ensure-folder-properties script)
        const nouche = properties.find(p => p.title.toLowerCase().includes("nouche residency"));

        if (!nouche) {
            console.error("Nouche Residency property not found!");
            process.exit(1);
        }

        console.log(`Found property: ${nouche.title} (ID: ${nouche.id})`);

        const updatedData = {
            ...nouche,
            title: "Nòuche Residency", // Correct accent
            description: `Nòuche Residency is a luxury residential development in the Nakasero area of Kampala, Uganda, offering spacious apartments and villas. Designed with soundproof doors, windows, and premium finishes.\n\nUnit Types & Sizes:\n- 1 Bedroom: 100m²\n- 2 Bedroom: 130m² - 150m²\n- 3 Bedroom: 205m² - 215m²\n- 4 Bedroom: 280m² - 295m²\n- 5 Bedroom Villas: 440m² - 465m²\n- Penthouses: 570m² - 600m²\n\nIndicative Pricing:\n- 2 Bedroom: ~$280,000\n- 3 Bedroom: ~$380,000\n- 4 Bedroom: ~$500,000\n- 5 Bedroom: ~$930,000\n- Penthouse: ~$1,200,000`,
            price: "$280,000 - $1,200,000",
            location: "Nakasero, Kampala",
            area: "Nakasero",
            city: "Kampala",
            propertyType: "Luxury Apartments & Villas",
            features: [
                "Two Swimming Pools",
                "Two State-of-the-art Gyms",
                "Fine Dining Restaurant",
                "Coffee Shop & Supermarket",
                "Saloon & Pharmacy",
                "Co-working Spaces",
                "Sauna & Steam Facilities",
                "Children's Playground",
                "Running Track",
                "24/7 Security & CCTV"
            ],
            // Images should already be there from previous sync
        };

        await storage.updateProperty(nouche.id, updatedData);
        console.log("✓ Successfully updated Nòuche Residency details.");
        process.exit(0);

    } catch (error) {
        console.error("Error updating property:", error);
        process.exit(1);
    }
}

updateNoucheResidency();
