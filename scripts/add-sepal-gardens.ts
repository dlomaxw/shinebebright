
import 'dotenv/config';
import { storage } from '../server/storage';

async function addSepalGardens() {
    console.log("Adding/Updating Sepal Gardens property...");

    try {
        const properties = await storage.getProperties();
        // Check for existing by title or folder-like name
        let sepal = properties.find(p => p.title.toLowerCase().includes("sepal garden"));

        if (!sepal) {
            console.log("Creating new property entry for Sepal Gardens...");
            sepal = await storage.createProperty({
                title: "Sepal Gardens",
                description: "", // Will update below
                price: "",
                location: "",
                type: "sale",
                propertyType: "Apartment",
                area: "",
                city: "",
                images: [],
                features: [],
                listedDate: new Date().toISOString(),
                status: "available",
                featured: false,
                specs: { beds: 3, baths: 2, sqft: 0 }
            });
        } else {
            console.log(`Found existing property: ${sepal.title} (ID: ${sepal.id})`);
        }

        const updatedData = {
            ...sepal,
            title: "Sepal Gardens",
            description: `Sepal Gardens (also linked to Sepal Heights) offers modern 1- to 4-bedroom apartments and duplexes in the prestigious Bugolobi/Ntinda area of Kampala. Emphasizing luxury living with convenient city access and greenery views.\n\nUnit Types & Pricing:\n- 1-Bedroom: From ~$70,000 (Sepal Heights)\n- 2-Bedroom: From ~$90,000 (or ~UGX 285M)\n- 3-Bedroom: From ~$120,000+ (Sepal Gardens)\n- 4-Bedroom/Duplex: Starting around $120,000\n\nThe development features premium finishes including fully fitted Bosch kitchens and panoramic elevators.`,
            price: "$70,000 - $120,000+",
            location: "Bugolobi/Ntinda, Kampala",
            area: "Bugolobi",
            city: "Kampala",
            propertyType: "Luxury Apartments & Duplexes",
            features: [
                "Rooftop Gym & Terrace",
                "BBQ Area",
                "Swimming Pool",
                "High-speed Elevators",
                "Backup Generator",
                "Borehole Water",
                "24/7 Surveillance & CCTV",
                "Biometric Locks",
                "Fully Fitted Bosch Kitchens",
                "Panoramic Elevators"
            ],
            // Images will be synced by the sync script, but we can hint at them
            // We rely on the sync script to populate the actual filenames from the folder
        };

        if (sepal) {
            await storage.updateProperty(sepal.id, updatedData);
        }

        console.log("✓ Successfully added/updated Sepal Gardens details.");
        process.exit(0);

    } catch (error) {
        console.error("Error updating property:", error);
        process.exit(1);
    }
}

addSepalGardens();
