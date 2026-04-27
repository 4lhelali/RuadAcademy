// import { useTranslation } from "react-i18next";
// import { Target, Eye, Heart, Users, Award, BookOpen, Globe, CheckCircle2 } from "lucide-react";

// export default function About() {
//   const { t } = useTranslation();

//   const values = [
//     { icon: Target, title: t("about.values.items.excellence.title"), description: t("about.values.items.excellence.description") },
//     { icon: Heart,  title: t("about.values.items.passion.title"),    description: t("about.values.items.passion.description") },
//     { icon: Globe,  title: t("about.values.items.inclusion.title"),  description: t("about.values.items.inclusion.description") },
//     { icon: Eye,    title: t("about.values.items.innovation.title"), description: t("about.values.items.innovation.description") },
//   ];

//   const team = [
//     { name: t("about.team.members.zakir.name"), role: t("about.team.members.zakir.role"), initials: "ZA", bio: t("about.team.members.zakir.bio"), color: "bg-red-100 text-red-700" },
//     { name: t("about.team.members.bilal.name"), role: t("about.team.members.bilal.role"), initials: "BA", bio: t("about.team.members.bilal.bio"), color: "bg-purple-100 text-purple-600" },
//     { name: t("about.team.members.noor.name"),  role: t("about.team.members.noor.role"),  initials: "MN", bio: t("about.team.members.noor.bio"),  color: "bg-green-100 text-green-600" },
//   ];

//   const bullets = [
//     t("about.story.bullets.curriculum"),
//     t("about.story.bullets.projects"),
//     t("about.story.bullets.alumni"),
//     t("about.story.bullets.free"),
//   ];

//   const stats = [
//     { icon: Users,    value: "300+", label: t("about.story.stats.graduates") },
//     { icon: Award,    value: "80%",  label: t("about.story.stats.career") },
//     { icon: BookOpen, value: "10+",  label: t("about.story.stats.courses") },
//   ];

//   return (
//     <div className="overflow-x-hidden">
//       <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-red-700 via-red-900 to-gray-950 text-white overflow-hidden">
//         <div className="absolute inset-0">
//           <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
//           <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-red-400/10 blur-3xl" />
//         </div>
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-3xl">
//             <p className="text-red-200 font-semibold text-sm uppercase tracking-wider mb-4">{t("about.hero.eyebrow")}</p>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
//               {t("about.hero.titlePart1")} <span className="text-yellow-300">{t("about.hero.titleHighlight")}</span>
//             </h1>
//             <p className="text-lg text-red-100 leading-relaxed max-w-2xl">
//               {t("about.hero.subtitle")}
//             </p>
//           </div>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
//             <path d="M0 60L1440 60L1440 20C1200 50 960 60 720 45C480 30 240 5 0 20L0 60Z" fill="hsl(210 40% 98%)" />
//           </svg>
//         </div>
//       </section>

//       <section className="py-20 md:py-28 bg-background">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">{t("about.story.eyebrow")}</p>
//               <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
//                 {t("about.story.title")}
//               </h2>
//               <p className="text-muted-foreground leading-relaxed mb-4">
//                 {t("about.story.body")}
//               </p>
//               <div className="space-y-3">
//                 {bullets.map((item) => (
//                   <div key={item} className="flex items-center gap-3">
//                     <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
//                     <span className="text-sm text-foreground">{item}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               {stats.map((stat) => (
//                 <div key={stat.label} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
//                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
//                     <stat.icon className="w-6 h-6 text-primary" />
//                   </div>
//                   <div className="text-2xl font-bold text-foreground">{stat.value}</div>
//                   <div className="text-sm text-muted-foreground">{stat.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 md:py-28 bg-muted/40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-14">
//             <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">{t("about.values.eyebrow")}</p>
//             <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//               {t("about.values.title")}
//             </h2>
//             <p className="text-muted-foreground text-lg">
//               {t("about.values.subtitle")}
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {values.map((value) => (
//               <div key={value.title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow hover:border-primary/30 group">
//                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
//                   <value.icon className="w-6 h-6 text-primary" />
//                 </div>
//                 <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
//                 <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-20 md:py-28 bg-background">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-14">
//             <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">{t("about.team.eyebrow")}</p>
//             <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
//               {t("about.team.title")}
//             </h2>
//             <p className="text-muted-foreground text-lg">
//               {t("about.team.subtitle")}
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {team.map((member) => (
//               <div key={member.name} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-md transition-shadow group">
//                 <div className={`w-16 h-16 rounded-2xl ${member.color} flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:scale-105 transition-transform`}>
//                   {member.initials}
//                 </div>
//                 <h3 className="font-semibold text-foreground mb-0.5">{member.name}</h3>
//                 <p className="text-xs text-primary font-medium mb-3">{member.role}</p>
//                 <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
import { useTranslation } from "react-i18next";
import { Target, Eye, Heart, Users, Award, BookOpen, Globe, CheckCircle2 } from "lucide-react";
import logo1 from "@/images/logo.png";
import logo from "@/images/logo2.jpg";
export default function About() {
  const { t } = useTranslation();

  const values = [
    { icon: Target, title: t("about.values.items.excellence.title"), description: t("about.values.items.excellence.description") },
    { icon: Heart,  title: t("about.values.items.passion.title"),    description: t("about.values.items.passion.description") },
    { icon: Globe,  title: t("about.values.items.inclusion.title"),  description: t("about.values.items.inclusion.description") },
    { icon: Eye,    title: t("about.values.items.innovation.title"), description: t("about.values.items.innovation.description") },
  ];

  const team = [
    { name: t("about.team.members.zakir.name"), role: t("about.team.members.zakir.role"), initials: "ZA", bio: t("about.team.members.zakir.bio"), color: "bg-red-100 text-red-700" },
    { name: t("about.team.members.bilal.name"), role: t("about.team.members.bilal.role"), initials: "BA", bio: t("about.team.members.bilal.bio"), color: "bg-purple-100 text-purple-600" },
    { name: t("about.team.members.noor.name"),  role: t("about.team.members.noor.role"),  initials: "MN", bio: t("about.team.members.noor.bio"),  color: "bg-green-100 text-green-600" },
  ];

  const bullets = [
    t("about.story.bullets.curriculum"),
    t("about.story.bullets.projects"),
    t("about.story.bullets.alumni"),
    t("about.story.bullets.free"),
  ];

  const stats = [
    { icon: Users,    value: "300+", label: t("about.story.stats.graduates") },
    { icon: Award,    value: "80%",  label: t("about.story.stats.career") },
    { icon: BookOpen, value: "10+",  label: t("about.story.stats.courses") },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 text-white overflow-hidden">
        <img
          src={logo}
          alt="About us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-red-200 font-semibold text-sm uppercase tracking-wider mb-4">{t("about.hero.eyebrow")}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t("about.hero.titlePart1")} <span className="text-yellow-300">{t("about.hero.titleHighlight")}</span>
            </h1>
            <p className="text-lg text-red-100 leading-relaxed max-w-2xl">
              {t("about.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* STORY SECTION WITH SIDE IMAGE */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* IMAGE */}
            <div>
              <img
                src={logo1}
                alt="Our story"
                className="rounded-2xl shadow-lg object-cover w-full h-[400px]"
              />
            </div>

            {/* TEXT */}
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">{t("about.story.eyebrow")}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
                {t("about.story.title")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("about.story.body")}
              </p>

              <div className="space-y-3">
                {bullets.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 text-center">
                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 md:py-28 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">{t("about.values.eyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("about.values.title")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("about.values.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-card border border-border rounded-2xl p-6">
                <value.icon className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">{t("about.team.eyebrow")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("about.team.title")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("about.team.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className={`w-16 h-16 rounded-2xl ${member.color} flex items-center justify-center text-xl font-bold mx-auto mb-4`}>
                  {member.initials}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-xs text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
