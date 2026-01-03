import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Property names from the seed list
const propertyNames = [
    "Atlantic Heights",
    "Baskerville Canaan Apartment",
    "Canaan Residence Apartment",
    "Diamond Court",
    "Divyabav Vertica",
    "Elite Palazzo Naguru",
    "KENDAL VILLAS",
    "Kisaasi Heights",
    "Embassy Towers Residency",
    "Urban View Apartment Kulambiro",
    "Sapphire Residency",
    "Sapphire Residency - 3BHK",
    "Lulu Residency - 2BHK",
    "Lulu Residency - 3BHK",
    "Amber Residency",
    "Garnet Residency",
    "Skyrise Apartments"
];

const descriptions = [
    // Short filenames to use as folder names if full title is too long or contains special chars
    // Actually, we'll just sanitize the titles.
];

function sanitize(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

const baseDir = path.resolve(__dirname, '../client/public/images/properties');

// Ensure base dir exists
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
    console.log(`Created base directory: ${baseDir}`);
}

propertyNames.forEach(name => {
    const folderName = sanitize(name);
    const fullPath = path.join(baseDir, folderName);

    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`✓ Created folder: ${folderName}`);
    } else {
        console.log(`- Exists: ${folderName}`);
    }
});

console.log("\nFolder creation complete.");
