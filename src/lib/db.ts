// src/lib/db.ts
// Neon serverless database client + Drizzle ORM setup
//
// ─── SETUP INSTRUCTIONS ────────────────────────────────────────────────────────
// 1. Go to https://neon.tech → Create a new project → Copy the connection string
// 2. Add to your .env file:
//    DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
// 3. Run: npx drizzle-kit push   (this creates the tables in your Neon DB)
// ────────────────────────────────────────────────────────────────────────────────

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(import.meta.env.VITE_DATABASE_URL!);
export const db = drizzle(sql, { schema });

export { schema };
