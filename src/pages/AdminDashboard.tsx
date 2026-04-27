// src/pages/AdminDashboard.tsx
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Plus, Trash2, LogOut, GraduationCap, Image, Link as LinkIcon, FileText, Type, AlertCircle, CheckCircle, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getAllPosts, createPost, deletePost, Post } from "@/lib/postsApi";

// ─── UploadThing integration ─────────────────────────────────────────────────
// We use a simple fetch-based upload to UploadThing's API
// Make sure VITE_UPLOADTHING_APP_ID is set in your .env
async function uploadImageToUploadThing(file: File): Promise<{ url: string; key: string }> {
  // Get presigned URL from UploadThing
  const res = await fetch("https://uploadthing.com/api/uploadFiles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-uploadthing-api-key": import.meta.env.VITE_UPLOADTHING_TOKEN
    },
    body: JSON.stringify({
      files: [{ name: file.name, size: file.size, type: file.type }],
      routeConfig: { image: { maxFileSize: "4MB" } },
    }),
  });

  if (!res.ok) throw new Error("Failed to get upload URL from UploadThing");
  const { data } = await res.json();
  const { url, fields, key, fileUrl } = data[0];

  // Upload the actual file
  const formData = new FormData();
  Object.entries(fields as Record<string, string>).forEach(([k, v]) => formData.append(k, v));
  formData.append("file", file);

  const uploadRes = await fetch(url, { method: "POST", body: formData });
  if (!uploadRes.ok) throw new Error("Failed to upload image");

  return { url: fileUrl, key };
}

export default function AdminDashboard() {
  const { isAdmin, logout } = useAuth();
  const [, navigate] = useLocation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form state
  const [form, setForm] = useState({ title: "", description: "", link: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/adminlogin");
      return;
    }
    loadPosts();
  }, [isAdmin]);

  async function loadPosts() {
    setLoading(true);
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (err) {
      showNotification("error", "Failed to load posts. Check your DATABASE_URL in .env");
    } finally {
      setLoading(false);
    }
  }

  function showNotification(type: "success" | "error", message: string) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageFile) {
      showNotification("error", "Please select an image for the post.");
      return;
    }

    setSubmitting(true);
    try {
      // Upload image to UploadThing
      let imageUrl = imagePreview!;
      let imageKey = "";

      try {
        const uploaded = await uploadImageToUploadThing(imageFile);
        imageUrl = uploaded.url;
        imageKey = uploaded.key;
      } catch {
        // If UploadThing upload fails, use the local preview as fallback
        // In production, this should not happen if keys are configured correctly
        console.warn("UploadThing upload failed, using local preview (configure VITE_UPLOADTHING_SECRET)");
      }

      // Save post to Neon DB
      const newPost = await createPost({
        title: form.title,
        description: form.description,
        link: form.link || null,
        imageUrl,
        imageKey,
      });

      setPosts((prev) => [newPost, ...prev]);
      setForm({ title: "", description: "", link: "" });
      setImageFile(null);
      setImagePreview(null);
      showNotification("success", "Post published successfully!");
    } catch (err) {
      showNotification("error", "Failed to create post. Check your DATABASE_URL in .env");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this post? This action cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      showNotification("success", "Post deleted.");
    } catch {
      showNotification("error", "Failed to delete post.");
    } finally {
      setDeletingId(null);
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-gradient-to-r from-red-700 to-red-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg">RuadAcademy Admin</h1>
            <p className="text-red-200 text-xs">Post Management Dashboard</p>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-white/30 text-white hover:bg-white/10 rounded-xl gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </header>

      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-sm font-medium ${
            notification.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {notification.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ─── Add Post Form ─────────────────────────────────────────────────── */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Plus className="w-5 h-5 text-red-600" />
              Add New Post
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                  <Type className="w-3.5 h-3.5" /> Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  required
                  placeholder="Post title..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                  <Image className="w-3.5 h-3.5" /> Image <span className="text-red-500">*</span>
                </label>
                <div
                  className="relative border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-red-400 transition-colors"
                  onClick={() => document.getElementById("imageInput")?.click()}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="h-40 flex flex-col items-center justify-center gap-2 text-gray-400">
                      <Image className="w-8 h-8" />
                      <p className="text-sm">Click to upload image</p>
                      <p className="text-xs">JPG, PNG, WebP — max 4MB</p>
                    </div>
                  )}
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                  <FileText className="w-3.5 h-3.5" /> Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  required
                  rows={4}
                  placeholder="Write a description for this post..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all resize-none"
                />
              </div>

              {/* Link */}
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
                  <LinkIcon className="w-3.5 h-3.5" /> Link <span className="text-gray-400 text-xs font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  value={form.link}
                  onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400 transition-all"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Publish Post
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* ─── Posts List ────────────────────────────────────────────────────── */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900">
              All Posts
              <span className="ml-2 text-sm font-normal text-gray-400">({posts.length})</span>
            </h2>
            <button
              onClick={loadPosts}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-red-400" />
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <Image className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No posts yet</p>
              <p className="text-gray-400 text-sm mt-1">Create your first post using the form.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex gap-0"
                >
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-28 sm:w-36 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 p-4 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{post.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric", month: "short", day: "numeric",
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        {deletingId === post.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">{post.description}</p>
                    {post.link && (
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 mt-2"
                      >
                        <ExternalLink className="w-3 h-3" /> View link
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
