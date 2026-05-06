// src/lib/schema.ts
  // TypeScript types matching the MySQL database schema on Hostinger

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

  export type User = {
    id: number;
    username: string;
    password: string;
    isAdmin: boolean;
    createdAt: string;
  };

  export type NewUser = Omit<User, "id" | "createdAt">;
  