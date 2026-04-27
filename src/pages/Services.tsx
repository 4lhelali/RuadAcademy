import { useTranslation } from "react-i18next";
import { Code, BarChart2, Globe, CheckCircle2 } from "lucide-react";

export default function Services() {
  const { t } = useTranslation();

  const programs = [
    {
      icon: Code,
      title: t("services.programs.tech.title"),
      description: t("services.programs.tech.description"),
      courses: [
        t("services.programs.tech.courses.webs"),
        t("services.programs.tech.courses.word"),
        t("services.programs.tech.courses.excel"),
      ],
      duration: t("services.programs.tech.duration"),
      level: t("services.levels.beginnerToAdvanced"),
      color: "bg-red-50 text-red-700 border-red-100",
      tag: t("services.tags.mostPopular"),
      tagColor: "bg-red-700",
    },
    {
      icon: BarChart2,
      title: t("services.programs.human.title"),
      description: t("services.programs.human.description"),
      courses: [t("services.programs.human.courses.main")],
      duration: t("services.programs.human.duration"),
      level: t("services.levels.intermediateToAdvanced"),
      color: "bg-purple-50 text-purple-600 border-purple-100",
      tag: t("services.tags.highDemand"),
      tagColor: "bg-purple-600",
    },
    {
      icon: Globe,
      title: t("services.programs.languages.title"),
      description: t("services.programs.languages.description"),
      courses: [
        t("services.programs.languages.courses.english"),
        t("services.programs.languages.courses.turkish"),
      ],
      duration: t("services.programs.languages.duration"),
      level: t("services.levels.allLevels"),
      color: "bg-green-50 text-green-600 border-green-100",
      tag: "",
      tagColor: "",
    },
    {
      icon: Code,
      title: t("services.programs.career.title"),
      description: t("services.programs.career.description"),
      courses: [t("services.programs.career.courses.jobMarket")],
      duration: t("services.programs.career.duration"),
      level: t("services.levels.allLevels"),
      color: "bg-green-50 text-green-600 border-green-100",
      tag: "",
      tagColor: "",
    },
    {
      icon: BarChart2,
      title: t("services.programs.specialization.title"),
      description: t("services.programs.specialization.description"),
      courses: [t("services.programs.specialization.courses.jobMarket")],
      duration: t("services.programs.specialization.duration"),
      level: t("services.levels.allLevels"),
      color: "bg-green-50 text-green-600 border-green-100",
      tag: "",
      tagColor: "",
    },
    {
      icon: Globe,
      title: t("services.programs.innovation.title"),
      description: t("services.programs.innovation.description"),
      courses: [t("services.programs.innovation.courses.jobMarket")],
      duration: t("services.programs.innovation.duration"),
      level: t("services.levels.allLevels"),
      color: "bg-green-50 text-green-600 border-green-100",
      tag: "",
      tagColor: "",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-red-700 via-red-900 to-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-red-400/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-200 font-semibold text-sm uppercase tracking-wider mb-4">{t("services.hero.eyebrow")}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {t("services.hero.titlePart1")} <span className="text-yellow-300">{t("services.hero.titleHighlight")}</span>
          </h1>
          <p className="text-lg text-red-100 leading-relaxed max-w-2xl mx-auto">
            {t("services.hero.subtitle")}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 20C1200 50 960 60 720 45C480 30 240 5 0 20L0 60Z" fill="hsl(210 40% 98%)" />
          </svg>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">{t("services.tracks.eyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("services.tracks.title")}</h2>
            <p className="text-muted-foreground text-lg">
              {t("services.tracks.subtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div key={program.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/30 flex flex-col group relative overflow-hidden">
                {program.tag && (
                  <span className={`absolute top-4 end-4 ${program.tagColor} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}>
                    {program.tag}
                  </span>
                )}
                <div className={`w-12 h-12 rounded-xl ${program.color} border flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <program.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{program.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{program.description}</p>
                <div className="space-y-2 mb-5 flex-1">
                  {program.courses.map((course) => (
                    <div key={course} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{course}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                  <span>{program.duration}</span>
                  <span>{program.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
