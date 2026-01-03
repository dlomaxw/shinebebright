
import 'dotenv/config';
import { storage } from '../server/storage';

async function cleanup() {
    console.log("Scanning for properties to remove...");
    const properties = await storage.getProperties();

    // Terms to look for in title or Description (or we might need to check the image paths/config if we can't tell by title)
    // The user listed: "elite-palazzo", "Cadenza", "Pearl View", "vaal", "saif-real-estate"
    const removeKeywords = ["Cadenza", "Pearl View", "Elite Pallazo", "Elite Palazzo", "Vaal", "Saif Real Estate"];

    // Also check if we can identify by image path if title is ambiguous
    const toRemove = properties.filter(p => {
        const titleMatch = removeKeywords.some(kw => p.title.toLowerCase().includes(kw.toLowerCase()));

        // Check image paths for developer folders if title doesn't match
        // "vaal", "saif-real-estate"
        const imageMatch = Array.isArray(p.images) && p.images.some((img: string) =>
            img.includes('/vaal/') ||
            img.includes('/saif-real-estate/') ||
            img.includes('/elite-palazzo/') ||
            img.includes('/elite-properties/') // check correct folder names
        );

        return titleMatch || imageMatch;
    });

    console.log(`Found ${toRemove.length} properties to remove:`);
    toRemove.forEach(p => console.log(`- ${p.title} (ID: ${p.id})`));

    // Uncomment to actually delete
    for (const p of toRemove) {
        await storage.deleteProperty(p.id);
        console.log(`Deleted: ${p.title}`);
    }

    console.log("Cleanup complete.");
    process.exit(0);
}

cleanup();
