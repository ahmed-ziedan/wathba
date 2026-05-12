"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const navLinks = [
  { key: "packages", href: "#packages" },
  { key: "why", href: "#why" },
  { key: "contact", href: "#contact" },
] as const;

const ctaClassName =
  "bg-[#C9A84C] text-black font-bold text-sm px-6 py-2.5 rounded-full hover:bg-[#E8C97A] transition";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* ── Logo ── */}
        {/* <img src="/logo.png" alt="WATHBA" className="h-8 w-auto" /> */}
        <div className="flex items-center gap-2">
          {/* اللوجو */}
          <img src="/logo.png" alt="WATHBA" className="h-8 w-auto" />

          {/* اسم الشركة */}
          <span className="text-xl font-bold text-white tracking-wide">
            {t("wathba")}
          </span>
        </div>
        {/* ------------------------- */}
        {/* ── Center nav links (desktop only) ── */}
        <div className="hidden md:flex items-center border border-white/10 bg-white/[0.03] rounded-full px-6 py-2 gap-6">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-sans text-white/70 hover:text-white transition"
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        {/* ── Right side: Language toggle + CTA + mobile hamburger ── */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex items-center gap-1 text-sm font-sans">
            <Link
              href={pathname}
              locale="en"
              className={`px-2 py-1 rounded transition ${
                locale === "en"
                  ? "text-gold font-bold"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              EN
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href={pathname}
              locale="ar"
              className={`px-2 py-1 rounded transition ${
                locale === "ar"
                  ? "text-gold font-bold"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              AR
            </Link>
          </div>

          {/* CTA — desktop only; mobile uses drawer */}
          <a
            href="#contact"
            className={`hidden md:inline-flex items-center justify-center ${ctaClassName}`}
          >
            {t("cta")}
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden text-white/80 hover:text-white transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/[0.06]"
          >
            <div className="flex flex-col items-center gap-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-sans text-white/70 hover:text-white transition"
                >
                  {t(link.key)}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className={`inline-flex items-center justify-center ${ctaClassName}`}
              >
                {t("cta")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
