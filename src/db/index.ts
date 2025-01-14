import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL!);

// Pass the Neon client directly to drizzle

const db = drizzle(sql);

export default db;
