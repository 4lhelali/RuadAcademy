import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ar from "./locales/ar.json";
import tr from "./locales/tr.json";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" as const },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" as const },
  { code: "tr", label: "Turkish", nativeLabel: "Türkçe", dir: "ltr" as const },
];

const STORAGE_KEY = "ruadacademy.language";

function getInitialLanguage(): string {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) return saved;
  const browser = window.navigator.language.split("-")[0];
  if (SUPPORTED_LANGUAGES.some((l) => l.code === browser)) return browser;
  return "en";
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      tr: { translation: tr },
    },
    lng: getInitialLanguage(),
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

function applyDirection(lng: string) {
  if (typeof document === "undefined") return;
  const meta = SUPPORTED_LANGUAGES.find((l) => l.code === lng);
  const dir = meta?.dir ?? "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lng);
}

applyDirection(i18n.language);

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, lng);
  }
  applyDirection(lng);
});

export default i18n;
