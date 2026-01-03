
import 'dotenv/config';
import { storage } from '../server/storage';

async function listProperties() {
    console.log("Listing properties...");
    const properties = await storage.getProperties();

    properties.forEach(p => {
        const imageCount = Array.isArray(p.images) ? p.images.length : 0;
        console.log(`Title: "${p.title}" | ID: ${p.id} | Images: ${imageCount}`);
        if (imageCount > 0 && Array.isArray(p.images)) {
            console.log(`   Sample Image: ${p.images[0]}`);
        }
    });

    process.exit(0);
}

listProperties();
