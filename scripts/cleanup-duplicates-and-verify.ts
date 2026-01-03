
import 'dotenv/config';
import { storage } from '../server/storage';

async function cleanupAndVerify() {
    console.log("Cleaning up duplicates and verifying images...");
    const properties = await storage.getProperties();

    // 1. Cleanup Nouche Duplicates
    const noucheProps = properties.filter(p => p.title.toLowerCase().includes("ouche residency"));
    if (noucheProps.length > 1) {
        console.log(`Found ${noucheProps.length} Nouche properties. Cleaning up...`);
        // Keep the one with the accent or most details
        const authentic = noucheProps.find(p => p.title.includes("Nòuche")) || noucheProps[0];

        for (const p of noucheProps) {
            if (p.id !== authentic.id) {
                console.log(`Deleting duplicate: "${p.title}" (ID: ${p.id})`);
                await storage.deleteProperty(p.id);
            }
        }
    } else {
        console.log("No duplicate Nouche properties found.");
    }

    // 2. Verify Kendal and Marjan
    const kendal = properties.find(p => p.title === "Kendal Villas");
    const marjan = properties.find(p => p.title === "Marjan Residency");

    if (kendal) {
        const count = Array.isArray(kendal.images) ? kendal.images.length : 0;
        console.log(`Kendal Villas: ${count} images found in DB.`);
    } else {
        console.log("Kendal Villas NOT found in DB.");
    }

    if (marjan) {
        const count = Array.isArray(marjan.images) ? marjan.images.length : 0;
        console.log(`Marjan Residency: ${count} images found in DB.`);
    } else {
        console.log("Marjan Residency NOT found in DB.");
    }

    process.exit(0);
}

cleanupAndVerify();
