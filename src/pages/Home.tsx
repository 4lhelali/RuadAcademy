// src/pages/Home.tsx
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import {
  ArrowRight, CheckCircle2, BookOpen, Users, Award, TrendingUp,
  Star, ChevronRight, ChevronLeft, ExternalLink, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRecentPosts, Post } from "@/lib/postsApi";

// ─── Recent Posts Carousel ────────────────────────────────────────────────────
function RecentPostsCarousel() {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    getRecentPosts(3)
      .then(setPosts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (posts.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % posts.length);
      }, 4500);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [posts.length]);

  function goTo(idx: number) {
    setCurrent(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % posts.length);
    }, 4500);
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
      </div>
    );
  }

  if (posts.length === 0) return null;

  const localeMap: Record<string, string> = { en: "en-US", ar: "ar", tr: "tr-TR" };
  const dateLocale = localeMap[i18n.language] ?? "en-US";

  return (
    <section className="py-20 md:py-28 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">{t("home.posts.eyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("home.posts.title")}</h2>
          </div>
          <Link href="/posts">
            <Button variant="outline" className="flex items-center gap-2 rounded-full shrink-0">
              {t("home.posts.viewAll")} <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-3xl shadow-xl border border-border bg-card">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {posts.map((post) => (
              <div key={post.id} className="min-w-full relative">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <Link href={`/posts/${post.id}`}>
                    <a className="relative h-64 md:h-96 overflow-hidden block group cursor-pointer">
                      <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                    </a>
                  </Link>
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <span className="inline-block text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                      {new Date(post.createdAt).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                    <Link href={`/posts/${post.id}`}>
                      <a className="cursor-pointer">
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                      </a>
                    </Link>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                      <Link href={`/posts/${post.id}`}>
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline cursor-pointer">
                          {t("home.posts.readMore")} <ArrowRight className="w-4 h-4" />
                        </span>
                      </Link>
                      {post.link && (
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
                        >
                          {t("home.posts.externalLink")} <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {posts.length > 1 && (
            <>
              <button
                onClick={() => goTo((current - 1 + posts.length) % posts.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => goTo((current + 1) % posts.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}

          {posts.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {posts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-6 h-2" : "bg-primary/30 w-2 h-2"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Main Home Component ──────────────────────────────────────────────────────
export default function Home() {
  const { t } = useTranslation();

  const stats = [
    { value: "300+", label: t("home.stats.students") },
    { value: "10+", label: t("home.stats.instructors") },
    { value: "10+", label: t("home.stats.courses") },
    { value: "80%", label: t("home.stats.success") },
  ];

  const features = [
    { icon: Users, title: t("home.why.items.instructors.title"), description: t("home.why.items.instructors.description") },
    { icon: Award, title: t("home.why.items.certificates.title"), description: t("home.why.items.certificates.description") },
    { icon: TrendingUp, title: t("home.why.items.career.title"), description: t("home.why.items.career.description") },
  ];

  const testimonials = [
    { name: t("home.testimonials.items.sarah.name"), role: t("home.testimonials.items.sarah.role"), avatar: "SJ", content: t("home.testimonials.items.sarah.content"), rating: 5 },
    { name: t("home.testimonials.items.ahmed.name"), role: t("home.testimonials.items.ahmed.role"), avatar: "MC", content: t("home.testimonials.items.ahmed.content"), rating: 4 },
    { name: t("home.testimonials.items.manar.name"), role: t("home.testimonials.items.manar.role"), avatar: "ER", content: t("home.testimonials.items.manar.content"), rating: 3 },
  ];

  const courses = [
    { title: t("home.courses.items.humanDevelopment.title") },
    { title: t("home.courses.items.office.title"), level: t("home.courses.items.office.level"), duration: t("home.courses.items.office.duration"), students: t("home.courses.items.office.students") },
    { title: t("home.courses.items.languages.title"), level: t("home.courses.items.languages.level"), duration: t("home.courses.items.languages.duration"), students: t("home.courses.items.languages.students") },
    { title: t("home.courses.items.design.title"), level: t("home.courses.items.design.level"), duration: t("home.courses.items.design.duration"), students: t("home.courses.items.design.students") },
    { title: t("home.courses.items.others.title"), level: t("home.courses.items.others.level"), duration: t("home.courses.items.others.duration"), students: t("home.courses.items.others.students") },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-red-700 via-red-900 to-gray-950 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-red-400/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-black/20 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-sm font-medium">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span>{t("home.hero.badge")}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {t("home.hero.titlePart1")}{" "}
                <span className="text-yellow-300">{t("home.hero.titleHighlight")}</span>{" "}
                {t("home.hero.titlePart2")}
              </h1>
              <p className="text-lg text-red-100 mb-8 max-w-xl leading-relaxed">
                {t("home.hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/services">
                  <Button size="lg" className="bg-white text-red-700 hover:bg-red-50 rounded-full px-7 font-semibold shadow-lg">
                    {t("home.hero.ctaExplore")} <ArrowRight className="w-4 h-4 ms-2" />
                  </Button>
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-6">
                {[t("home.hero.perks.schedule"), t("home.hero.perks.certificates"), t("home.hero.perks.mentorship")].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-red-100">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L1440 80L1440 20C1200 70 960 80 720 60C480 40 240 10 0 20L0 80Z" fill="hsl(210 40% 98%)" />
          </svg>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">{t("home.why.eyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("home.why.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("home.why.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow duration-300 hover:border-primary/30 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">{t("home.courses.eyebrow")}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("home.courses.title")}</h2>
            </div>
            <Link href="/services">
              <Button variant="outline" className="flex items-center gap-2 rounded-full shrink-0">
                {t("home.courses.viewAll")} <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course.title} className="bg-card border border-border rounded-2xl p-6 flex items-center justify-between gap-4 hover:shadow-md transition-shadow hover:border-primary/30 group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{course.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 rtl:rotate-180" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT POSTS CAROUSEL */}
      <RecentPostsCarousel />

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">{t("home.testimonials.eyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("home.testimonials.title")}</h2>
            <p className="text-muted-foreground text-lg">{t("home.testimonials.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((tt) => (
              <div key={tt.name} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: tt.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-5">"{tt.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                    {tt.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{tt.name}</p>
                    <p className="text-xs text-muted-foreground">{tt.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
