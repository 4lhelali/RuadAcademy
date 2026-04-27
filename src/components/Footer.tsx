import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { GraduationCap, Mail,ExternalLink, MapPin,Youtube, Instagram } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.services"), href: "/services" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const programs = [
    t("footer.programList.humanDevelopment"),
    t("footer.programList.languageLearning"),
    t("footer.programList.officeTools"),
    t("footer.programList.graphicDesign"),
    t("footer.programList.others"),
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">RuadAcademy</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/akadymytruad/"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@ruad_academy"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors duration-200"
                aria-label="Link in bio"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://tinyurl.com/Ruad-Link-bio"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors duration-200"
                aria-label="Link in bio"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              {t("footer.programs")}
            </h3>
            <ul className="space-y-2.5">
              {programs.map((p) => (
                <li key={p}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors duration-200">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              {t("footer.contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">{t("footer.address")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:hello@eduacademy.com" className="text-sm text-gray-400 hover:text-white transition-colors" dir="ltr">
                  akadymytruad@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} RuadAcademy. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
