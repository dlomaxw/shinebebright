
import 'dotenv/config';
import { storage } from '../server/storage';

async function verify() {
    const properties = await storage.getProperties();
    console.log("Found properties:", properties.map(p => p.title));
    const ah = properties.find(p => p.title.includes("Atlantic Heights"));
    if (ah) {
        console.log("Atlantic Heights images:", ah.images);
    } else {
        console.log("Atlantic Heights not found");
    }
    process.exit(0);
}

verify();
