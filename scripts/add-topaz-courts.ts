
import 'dotenv/config';
import { storage } from '../server/storage';

async function addTopazCourts() {
    console.log("Adding/Updating Topaz Courts property...");

    try {
        const properties = await storage.getProperties();
        // Check for existing by title
        let topaz = properties.find(p => p.title.toLowerCase().includes("topaz court"));

        if (!topaz) {
            console.log("Creating new property entry for Topaz Courts...");
            topaz = await storage.createProperty({
                title: "Topaz Courts",
                description: "", // Will update below
                price: "",
                location: "",
                type: "sale",
                propertyType: "Condominium",
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
            console.log(`Found existing property: ${topaz.title} (ID: ${topaz.id})`);
        }

        const updatedData = {
            ...topaz,
            title: "Topaz Courts",
            description: `Topaz Courts is a modern condominium development by NH Developers located in the prestigious Ministers Village area of Ntinda, Kampala. The complex features 32 units across 8 floors (4 units per floor).\n\nUnit Types & Pricing (Late 2024/2025):\n- 1 BHK (67 sqm): $60,000 (approx. UGX 225M)\n- 2 BHK (105 sqm): $90,000 (approx. UGX 338M)\n- 3 BHK (154 sqm): $128,000 (approx. UGX 480M)\n- 3 BHK + Maid's Room (161 sqm): $134,000 (approx. UGX 503M)\n\nA 2-year interest-free payment plan offered by the developer makes this an accessible luxury investment.`,
            price: "$60,000 - $134,000",
            location: "Ministers Village, Ntinda, Kampala",
            area: "Ministers Village, Ntinda",
            city: "Kampala",
            propertyType: "Condominium",
            features: [
                "Rooftop Terrace & Walking Track",
                "Fully Equipped Gym",
                "Multipurpose Hall",
                "Kids' Play Area",
                "Lifts (Elevators)",
                "Ample Parking",
                "2-Year Payment Plan",
                "32 Units Total"
            ],
            // Images synced from folder
        };

        if (topaz) {
            await storage.updateProperty(topaz.id, updatedData);
        }

        console.log("✓ Successfully added/updated Topaz Courts details.");
        process.exit(0);

    } catch (error) {
        console.error("Error updating property:", error);
        process.exit(1);
    }
}

addTopazCourts();
