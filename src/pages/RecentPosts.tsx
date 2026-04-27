// src/pages/RecentPosts.tsx
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { ArrowRight, Loader2, ImageOff } from "lucide-react";
import { getAllPosts, Post } from "@/lib/postsApi";

export default function RecentPosts() {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const localeMap: Record<string, string> = { en: "en-US", ar: "ar", tr: "tr-TR" };
  const dateLocale = localeMap[i18n.language] ?? "en-US";

  return (
    <div className="overflow-x-hidden">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-red-700 via-red-900 to-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-red-400/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-200 font-semibold text-sm uppercase tracking-wider mb-4">{t("posts.hero.eyebrow")}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {t("posts.hero.titlePart1")} <span className="text-yellow-300">{t("posts.hero.titleHighlight")}</span>
          </h1>
          <p className="text-lg text-red-100 leading-relaxed max-w-2xl mx-auto">
            {t("posts.hero.subtitle")}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0 60L1440 60L1440 20C1200 50 960 60 720 45C480 30 240 5 0 20L0 60Z" fill="hsl(210 40% 98%)" />
          </svg>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">{t("posts.section.eyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("posts.section.title")}</h2>
            <p className="text-muted-foreground text-lg">
              {t("posts.section.subtitle")}
            </p>
          </div>

          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-20">
              <ImageOff className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">{t("posts.states.loadError")}</p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-20">
              <ImageOff className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">{t("posts.states.emptyTitle")}</p>
              <p className="text-muted-foreground text-sm mt-1">{t("posts.states.emptySubtitle")}</p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`}>
                  <a
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer block"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-foreground text-base mb-1 line-clamp-1">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{post.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.createdAt).toLocaleDateString(dateLocale, {
                            year: "numeric", month: "short", day: "numeric",
                          })}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline">
                          {t("posts.viewMore")} <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
