import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 — {t("notFound.title")}</h1>
          </div>
          <p className="mt-2 text-sm text-gray-600 mb-6">
            {t("notFound.subtitle")}
          </p>
          <Link href="/">
            <Button variant="outline" className="rounded-full flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> {t("notFound.back")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
