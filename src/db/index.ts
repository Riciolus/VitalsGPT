import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-serverless";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);

// @ts-expect-error I think it's the library incompability
const db = drizzle({ sql });

export default db;
