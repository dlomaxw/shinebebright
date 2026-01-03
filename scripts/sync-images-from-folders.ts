
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { storage } from '../server/storage';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function sanitize(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

// Custom aliases for properties where folder name doesn't match sanitized title
const ALIASES: Record<string, string> = {
    'elite-pallazo-naguru': 'elite-palazzo',
    'embassy-towers-residency': 'embassy-towers',
    'pearl-marina-estates': 'pearl-marina',
    'n-uche-residency': 'nouche-residency', // Covers accent sanitization
    'nouche-residency': 'nouche-residency',
    'the-horizon-residency': 'horizon-residency',
    'garnet-residency-3-bedroom-apartments': 'garnet-residency',
    'the-bridge-kololo': 'vaal/the-bridge', // Nested path
    'icon-180-luxury-complex': 'icon180',
    'sepal-gardens': 'sepal-garden',
    'topaz-courts': 'topaz-court'
};

async function syncImages() {
    console.log("Starting image sync from folders...");

    try {
        const properties = await storage.getProperties();
        console.log(`Found ${properties.length} properties.`);

        for (const property of properties) {
            let folderName = sanitize(property.title);

            // Check for alias
            if (ALIASES[folderName]) {
                folderName = ALIASES[folderName];
            }

            const folderPath = path.resolve(__dirname, '../client/public/images/properties', folderName);

            if (fs.existsSync(folderPath)) {
                // Read image files
                const files = fs.readdirSync(folderPath)
                    .filter(file => /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file));

                if (files.length > 0) {
                    console.log(`✓ Found ${files.length} images for "${property.title}" in folder "${folderName}"`);

                    // Update property
                    // We store just filenames, assuming image-utils will prepend /images/properties/<folderName>/
                    await storage.updateProperty(property.id, {
                        ...property,
                        images: files
                    });
                    console.log(`  Updated database for "${property.title}"`);
                } else {
                    console.log(`- Folder exists but empty for "${property.title}" (${folderName})`);
                }
            } else {
                console.log(`! No folder found for "${property.title}" (expected: ${folderName})`);
            }
        }

        console.log("\nSync complete.");
        process.exit(0);
    } catch (error) {
        console.error("Error syncing images:", error);
        process.exit(1);
    }
}

syncImages();
