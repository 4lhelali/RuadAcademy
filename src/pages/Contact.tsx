// src/pages/Contact.tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import emailjs from "emailjs-com";

export default function Contact() {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: MapPin,
      title: t("contact.info.items.location.title"),
      details: [t("contact.info.items.location.line1"), t("contact.info.items.location.line2")],
    },
    { icon: Mail, title: t("contact.info.items.email.title"), details: ["akadymytruad@gmail.com"] },
  ];

  const inquiryTypes = [
    t("contact.inquiryTypes.program"),
    t("contact.inquiryTypes.admissions"),
    t("contact.inquiryTypes.financial"),
    t("contact.inquiryTypes.corporate"),
    t("contact.inquiryTypes.support"),
    t("contact.inquiryTypes.other"),
  ];

  const [form, setForm] = useState({
    name: "", email: "", phone: "", inquiry: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const subject = encodeURIComponent(`Contact Form: ${form.inquiry || "Inquiry"} from ${form.name}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "Not provided"}\nInquiry Type: ${form.inquiry}\n\nMessage:\n${form.message}`
      );
      window.location.href = `mailto:akadymytruad@gmail.com?subject=${subject}&body=${body}`;
      setLoading(false);
      setSubmitted(true);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone || "Not provided",
          inquiry: form.inquiry,
          message: form.message,
          to_email: "akadymytruad@gmail.com",
        },
        publicKey
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError(t("contact.form.error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-x-hidden">
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-red-700 via-red-900 to-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-red-400/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-200 font-semibold text-sm uppercase tracking-wider mb-4">{t("contact.hero.eyebrow")}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {t("contact.hero.titlePart1")} <span className="text-yellow-300">{t("contact.hero.titleHighlight")}</span>
          </h1>
          <p className="text-lg text-red-100 leading-relaxed max-w-2xl mx-auto">
            {t("contact.hero.subtitle")}
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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">{t("contact.info.eyebrow")}</p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t("contact.info.title")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("contact.info.subtitle")}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground mb-1">{info.title}</p>
                      {info.details.map((d) => (
                        <p key={d} className="text-sm text-muted-foreground">{d}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-card border border-border rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{t("contact.form.success.title")}</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm">
                    {t("contact.form.success.body")}
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "", inquiry: "", message: "" });
                    }}
                  >
                    {t("contact.form.success.another")}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-foreground mb-6">{t("contact.form.title")}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        {t("contact.form.fullName")} <span className="text-destructive">{t("contact.form.required")}</span>
                      </label>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange} required
                        placeholder={t("contact.form.namePlaceholder")}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        {t("contact.form.email")} <span className="text-destructive">{t("contact.form.required")}</span>
                      </label>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange} required
                        placeholder={t("contact.form.emailPlaceholder")}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.form.phone")}</label>
                      <input
                        type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder={t("contact.form.phonePlaceholder")}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        {t("contact.form.inquiry")} <span className="text-destructive">{t("contact.form.required")}</span>
                      </label>
                      <select
                        name="inquiry" value={form.inquiry} onChange={handleChange} required
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      >
                        <option value="">{t("contact.form.selectTopic")}</option>
                        {inquiryTypes.map((opt) => (<option key={opt} value={opt}>{opt}</option>))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      {t("contact.form.message")} <span className="text-destructive">{t("contact.form.required")}</span>
                    </label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange} required rows={5}
                      placeholder={t("contact.form.messagePlaceholder")}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                      {error}
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full rounded-full font-semibold" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2 justify-center">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {t("contact.form.submitting")}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 justify-center">
                        <Send className="w-4 h-4" /> {t("contact.form.submit")}
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
