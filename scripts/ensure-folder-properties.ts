
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { storage } from '../server/storage';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROPERTIES_DIR = path.resolve(__dirname, '../client/public/images/properties');

// Folders to explicitly skip based on user request ("remove ... elite-palazzo, Cadenza, Pearl View, vaal, saif-real-estate")
const SKIP_FOLDERS = [
    'elite-palazzo',
    'vaal',
    'saif-real-estate',
    'the-bridge-kololo', // Known VAAL property
    'edifice-properties', // Generic developer folder, might duplicate if specific folders exist
    'modern-developers', // Generic developer folder
    'novo-real-estate',
    'hk-properties',
    'rf-developers',
    'residential',
    'commercial',
    'thumbnails'
];

function toTitleCase(str: string) {
    return str.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

async function ensureProperties() {
    console.log("Ensuring properties exist for local folders...");

    try {
        if (!fs.existsSync(PROPERTIES_DIR)) {
            console.error("Properties directory not found!");
            process.exit(1);
        }

        const folders = fs.readdirSync(PROPERTIES_DIR).filter(file => {
            return fs.statSync(path.join(PROPERTIES_DIR, file)).isDirectory();
        });

        const currentProperties = await storage.getProperties();

        for (const folder of folders) {
            if (SKIP_FOLDERS.includes(folder)) {
                console.log(`Skipping blacklisted/generic folder: ${folder}`);
                continue;
            }

            // Heuristic title from folder name
            const titleCandidate = toTitleCase(folder);

            // Check if property exists
            const exists = currentProperties.some(p =>
                p.title.toLowerCase() === titleCandidate.toLowerCase() ||
                p.title.toLowerCase().includes(titleCandidate.toLowerCase()) ||
                // Checks if the active property is using this folder? 
                // Hard to tell without checking image paths, but title match is a good start.
                // Also check if we have a property that is "mapped" to this folder in config?
                // For now, simple title match.
                (p.originalUrl && p.originalUrl.includes(folder))
            );

            if (exists) {
                console.log(`✓ Property "${titleCandidate}" (folder: ${folder}) already exists.`);
            } else {
                console.log(`+ Creating new property for folder: ${folder} ("${titleCandidate}")`);

                // Get images
                const folderPath = path.join(PROPERTIES_DIR, folder);
                const images = fs.readdirSync(folderPath)
                    .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
                    .map(f => `/images/properties/${folder}/${f}`); // Store full path? 
                // Previous sync script stored just filenames. 
                // image-utils.ts handles prepending path IF it goes through processPropertyImages.
                // BUT storage.ts usually stores full paths or filenames depending on implementation.
                // Let's look at existing data. "Atlantic Heights" images were just filenames in my sync-images script?
                // Wait, sync-images script: `images: files`. Just filenames!
                // BUT `image-utils.ts` `processPropertyImages` prepends paths. 
                // IF I create a new property, I should consistency.
                // Let's check `processPropertyImages` again.
                // it takes `filename` and `config.propertyTitle`.
                // It calls `getPropertyDeveloperFolder(propertyTitle)`.
                // If I create "Atlantic Heights", `getPropertyDeveloperFolder` returns "atlantic-heights".
                // `getPropertyImageUrl` returns `/images/properties/atlantic-heights/filename`.
                // SO storing just FILENAMES is correct for this system!

                const filenames = fs.readdirSync(folderPath)
                    .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));

                if (filenames.length === 0) {
                    console.log(`  - No images found in ${folder}, skipping creation.`);
                    continue;
                }

                const newProp = {
                    title: titleCandidate,
                    description: `Luxury property at ${titleCandidate}. Contact for details.`,
                    price: "Contact for Price",
                    location: "Kampala", // Default
                    status: "For Sale",
                    images: filenames, // Array of filenames
                    featured: true,
                    propertyType: "Apartment",
                    bedrooms: "3", // Placeholder
                    bathrooms: "3" // Placeholder
                };

                await storage.createProperty(newProp as any);
                console.log(`  ✓ Created "${titleCandidate}"`);
            }
        }

        console.log("\nDone ensuring properties.");
        process.exit(0);

    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

ensureProperties();
