import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
    throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?",
    );
}

// Fix hostname if it is 'helium' which is failing DNS
let connectionString = process.env.DATABASE_URL;
if (connectionString.includes("@helium/")) {
    console.warn("Detected 'helium' hostname, falling back to '127.0.0.1'...");
    connectionString = connectionString.replace("@helium/", "@127.0.0.1/");
}

export const pool = new pg.Pool({ connectionString });
export const db = drizzle(pool, { schema });