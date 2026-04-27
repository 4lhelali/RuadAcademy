// src/lib/schema.ts
// Drizzle ORM schema for Neon PostgreSQL database
// Run: npx drizzle-kit push to apply this schema to your Neon DB

import { pgTable, serial, text, timestamp, boolean, varchar } from "drizzle-orm/pg-core";

// ─── Users table (admin only) ─────────────────────────────────────────────────
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(), // store hashed password
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// ─── Posts table ─────────────────────────────────────────────────────────────
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),          // UploadThing URL
  imageKey: text("image_key"),                     // UploadThing file key (for deletion)
  link: text("link"),                              // optional external link
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
