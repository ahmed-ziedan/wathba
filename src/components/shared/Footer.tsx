"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const footerNav = [
  { key: "packages" as const, sectionId: "packages" },
  { key: "why" as const, sectionId: "why" },
  { key: "contact" as const, sectionId: "contact" },
];

function isHomePath(pathname: string | null) {
  return pathname === "/" || pathname === "";
}

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const onHome = isHomePath(pathname);

  return (
    <footer className="border-t border-white/[0.06] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold text-white/80">{t("nav.wathba")}</h2>
          <p className="text-[#5C5A56] text-sm mt-2">{t("footer.tagline")}</p>
        </div>
        <nav className="flex gap-8 text-[#A09D96] text-sm" aria-label="Footer navigation">
          {footerNav.map((item) =>
            onHome ? (
              <a
                key={item.key}
                href={`#${item.sectionId}`}
                className="hover:text-[#C9A84C] transition"
              >
                {t(`nav.${item.key}`)}
              </a>
            ) : (
              <Link
                key={item.key}
                href={`/#${item.sectionId}`}
                className="hover:text-[#C9A84C] transition"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ),
          )}
        </nav>
        <p className="text-[#5C5A56] text-xs">
          {t("footer.copyright")} {new Date().getFullYear()}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
