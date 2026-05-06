// src/components/LanguageSwitcher.tsx
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check, ChevronDown } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "@/i18n";

type Variant = "desktop" | "mobile";

export default function LanguageSwitcher({ variant = "desktop" }: { variant?: Variant }) {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) ?? SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  function pickLanguage(code: string) {
    i18n.changeLanguage(code);
    setOpen(false);
  }

  if (variant === "mobile") {
    // Inline radio-style list inside the mobile menu
    return (
      <div className="px-2 py-3 border-t border-border mt-1">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          <Globe className="w-3.5 h-3.5" />
          {t("language.label")}
        </div>
        <div className="grid grid-cols-1 gap-1">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const checked = current.code === lang.code;
            return (
              <label
                key={lang.code}
                className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                  checked
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <span className="flex items-center gap-3 text-sm font-medium">
                  <span
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                      checked ? "bg-primary border-primary text-white" : "border-border bg-background"
                    }`}
                    aria-hidden="true"
                  >
                    {checked && <Check className="w-3 h-3" />}
                  </span>
                  {lang.nativeLabel}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  name="language"
                  checked={checked}
                  onChange={() => pickLanguage(lang.code)}
                  aria-label={lang.label}
                />
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label={t("language.label")}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden lg:inline">{current.nativeLabel}</span>
        <span className="lg:hidden uppercase">{current.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute end-0 mt-2 w-52 rounded-xl border border-border bg-white dark:bg-gray-900 shadow-lg overflow-hidden z-50">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted/40">
            {t("language.label")}
          </div>
          <ul className="py-1">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const checked = current.code === lang.code;
              return (
                <li key={lang.code}>
                  <label
                    className={`flex items-center justify-between gap-3 px-3 py-2 cursor-pointer text-sm transition-colors ${
                      checked
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                          checked
                            ? "bg-primary border-primary text-white"
                            : "border-border bg-background"
                        }`}
                        aria-hidden="true"
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </span>
                      <span className="font-medium">{lang.nativeLabel}</span>
                    </span>
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {lang.code}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => pickLanguage(lang.code)}
                      aria-label={lang.label}
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
