import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env" });

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!);

// Pass the Neon client directly to drizzle

const db = drizzle(sql);

export default db;
