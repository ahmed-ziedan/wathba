import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "WATHBA — موقع احترافي لبيزنسك في أيام"
      : "WATHBA — Professional Websites for Your Business in Days",
    description: isAr
      ? "نبنيلك موقع احترافي بسعر ثابت وبدون مفاجآت. استضافة السنة الأولى مجانية."
      : "We build professional websites with fixed pricing, no surprises. First year hosting included.",
    openGraph: {
      title: isAr
        ? "WATHBA — موقع احترافي لبيزنسك في أيام"
        : "WATHBA — Professional Websites for Your Business in Days",
      description: isAr
        ? "نبنيلك موقع احترافي بسعر ثابت وبدون مفاجآت. استضافة السنة الأولى مجانية."
        : "We build professional websites with fixed pricing, no surprises. First year hosting included.",
      url: `https://wathba.tech/${locale}`,
      locale: isAr ? "ar_EG" : "en_US",
      siteName: "WATHBA",
      type: "website",
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://wathba.tech/${locale}`,
      languages: {
        en: "https://wathba.tech/en",
        ar: "https://wathba.tech/ar",
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "ar" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const isAr = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isAr ? "rtl" : "ltr"}
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      style={
        {
          "--font-display": isAr ? "ThmanyahDisplay" : "var(--font-syne)",
          "--font-body": isAr ? "ThmanyahSans" : "var(--font-dm-sans)",
        } as React.CSSProperties
      }
    >
      <body className="bg-[#0a0a0a] text-white font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
