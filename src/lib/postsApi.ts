// src/lib/postsApi.ts
// All post-related database operations using Neon + Drizzle ORM

import { db, schema } from "./db";
import { eq, desc } from "drizzle-orm";

export type Post = schema.Post;
export type NewPost = schema.NewPost;

// ─── Fetch all posts (newest first) ─────────────────────────────────────────
export async function getAllPosts(): Promise<Post[]> {
  return db.select().from(schema.posts).orderBy(desc(schema.posts.createdAt));
}

// ─── Fetch the 3 most recent posts (for home page carousel) ─────────────────
export async function getRecentPosts(limit = 3): Promise<Post[]> {
  return db
    .select()
    .from(schema.posts)
    .orderBy(desc(schema.posts.createdAt))
    .limit(limit);
}

// ─── Create a new post ───────────────────────────────────────────────────────
export async function createPost(data: NewPost): Promise<Post> {
  const [post] = await db.insert(schema.posts).values(data).returning();
  return post;
}

// ─── Delete a post by ID ─────────────────────────────────────────────────────
export async function deletePost(id: number): Promise<void> {
  await db.delete(schema.posts).where(eq(schema.posts.id, id));
}

// ─── Get a single post by ID ─────────────────────────────────────────────────
export async function getPostById(id: number): Promise<Post | undefined> {
  const [post] = await db
    .select()
    .from(schema.posts)
    .where(eq(schema.posts.id, id));
  return post;
}
