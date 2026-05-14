import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { GrainOverlay } from "@/components/shared/GrainOverlay";
import { StartForm } from "@/components/start/StartForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "start" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

function StartFormFallback() {
  return (
    <div
      className="mx-auto max-w-xl animate-pulse space-y-6 rounded-2xl border border-white/[0.06] bg-[#13131F]/40 p-8"
      aria-hidden
    >
      <div className="mx-auto h-3 w-32 rounded bg-white/10" />
      <div className="mx-auto h-8 w-full max-w-md rounded bg-white/10" />
      <div className="mx-auto h-4 w-full max-w-sm rounded bg-white/10" />
      <div className="mt-8 space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 rounded-xl bg-white/[0.06]" />
        ))}
      </div>
    </div>
  );
}

export default async function StartPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <GrainOverlay />
      <main
        className="relative min-h-screen bg-[#08080D] text-[#F0EDE6]"
        style={{ backgroundColor: "var(--bg-primary, #08080d)" }}
      >
        <Navbar />
        <div className="relative z-10 px-6 pb-24 pt-28 md:pb-32 md:pt-32">
          <Suspense fallback={<StartFormFallback />}>
            <StartForm />
          </Suspense>
        </div>
        <Footer />
      </main>
    </>
  );
}
