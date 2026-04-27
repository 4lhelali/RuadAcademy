// src/pages/PostDetail.tsx
import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ImageOff,
  Loader2,
  Calendar,
} from "lucide-react";
import { getPostById, Post } from "@/lib/postsApi";

export default function PostDetail() {
  const { t, i18n } = useTranslation();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Number.isNaN(id)) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(false);
    setNotFound(false);
    getPostById(id)
      .then((p) => {
        if (!p) setNotFound(true);
        else setPost(p);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const localeMap: Record<string, string> = {
    en: "en-US",
    ar: "ar",
    tr: "tr-TR",
  };
  const dateLocale = localeMap[i18n.language] ?? "en-US";
  const isRtl = i18n.dir() === "rtl";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  return (
    <div className="overflow-x-hidden">
      {/* Hero strip */}
      <section className="relative pt-28 pb-10 md:pt-36 md:pb-14 bg-gradient-to-br from-red-700 via-red-900 to-gray-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/posts">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-red-100 hover:text-white cursor-pointer">
              <BackIcon className="w-4 h-4" />
              {t("posts.detail.back")}
            </span>
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="flex justify-center py-24">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-20">
              <ImageOff className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {t("posts.states.loadError")}
              </p>
            </div>
          )}

          {notFound && !loading && (
            <div className="text-center py-20">
              <ImageOff className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">
                {t("posts.detail.notFoundTitle")}
              </p>
              <p className="text-muted-foreground text-sm mt-1 mb-6">
                {t("posts.detail.notFoundSubtitle")}
              </p>
              <Link href="/posts">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline cursor-pointer">
                  <BackIcon className="w-4 h-4" />
                  {t("posts.detail.back")}
                </span>
              </Link>
            </div>
          )}

          {post && !loading && !error && (
            <article className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden">
              <div className="relative w-full bg-muted">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full max-h-[520px] object-cover"
                />
              </div>

              <div className="p-6 sm:p-10">
                <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-4">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>
                    {new Date(post.createdAt).toLocaleDateString(dateLocale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
                  {post.title}
                </h1>

                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line break-words">
                    {post.description}
                  </p>
                </div>

                {post.link && (
                  <div className="mt-8 pt-6 border-t border-border">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      {t("posts.detail.externalLink")}{" "}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </article>
          )}

          {post && !loading && !error && (
            <div className="mt-10 text-center">
              <Link href="/posts">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline cursor-pointer">
                  <BackIcon className="w-4 h-4" />
                  {t("posts.detail.backToAll")}
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
