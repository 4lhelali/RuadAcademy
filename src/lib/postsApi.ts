// src/lib/postsApi.ts
  // All post-related API operations — calls the PHP backend on Hostinger MySQL

  export type Post = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    imageKey: string | null;
    link: string | null;
    createdAt: string;
    updatedAt: string;
  };

  export type NewPost = Omit<Post, "id" | "createdAt" | "updatedAt">;

function normalizePost(data: any): Post {
  return {
    id: Number(data.id),
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    imageUrl: String(data.image_url ?? data.imageUrl ?? ""),
    imageKey: data.image_key ?? data.imageKey ?? null,
    link: data.link ?? null,
    createdAt: String(data.created_at ?? data.createdAt ?? ""),
    updatedAt: String(data.updated_at ?? data.updatedAt ?? ""),
  };
}

// Base URL for the PHP API (relative — works both in dev and on Hostinger)
const API_BASE = "/api/posts.php";

// ─── Fetch all posts (newest first) ─────────────────────────────────────────
  export async function getAllPosts(): Promise<Post[]> {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error("Failed to fetch posts. Check your PHP API and database connection.");
    return await res.json();
  }

  // ─── Fetch the N most recent posts (for home page carousel) ─────────────────
  export async function getRecentPosts(limit = 3): Promise<Post[]> {
    const res = await fetch(`${API_BASE}?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch recent posts.");
    return await res.json();
  }

  // ─── Create a new post ───────────────────────────────────────────────────────
  export async function createPost(data: NewPost): Promise<Post> {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        image_url: data.imageUrl,
        image_key: data.imageKey ?? null,
        link: data.link ?? null,
      }),
    });
    if (!res.ok) throw new Error("Failed to create post.");
    return await res.json();
  }

  // ─── Delete a post by ID ─────────────────────────────────────────────────────
  export async function deletePost(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}?id=${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete post.");
  }

  // ─── Get a single post by ID ─────────────────────────────────────────────────
  export async function getPostById(id: number): Promise<Post | undefined> {
    const res = await fetch(`${API_BASE}?id=${id}`);
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error("Failed to fetch post.");
    return normalizePost(await res.json());
  }
  