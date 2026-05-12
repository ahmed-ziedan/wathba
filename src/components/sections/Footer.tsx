"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const navItems = [
  { href: "#packages", key: "packages" as const },
  { href: "#why", key: "why" as const },
  { href: "#contact", key: "contact" as const },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");

  return (
    <motion.footer
      className="border-t border-[color:var(--gold-border)]/40"
      style={{ backgroundColor: "var(--bg-secondary)" }}
      role="contentinfo"
      aria-label="Site footer"
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={fadeUp.transition}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 pb-14 pt-16 md:pb-16 md:pt-20">
        {/* Top: wordmark + tagline */}
        <div className="flex flex-col items-center text-center">
          <span
            className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold uppercase tracking-[0.2em]"
            style={{
              fontFamily: "var(--font-display-en)",
              color: "var(--gold)",
              textShadow: "var(--shadow-gold)",
            }}
          >
            WATHBA
          </span>
          <p
            className="mt-3 max-w-md text-base font-medium md:text-lg"
            style={{ color: "var(--footer-text-muted)" }}
          >
            {tFooter("tagline")}
          </p>
        </div>

        {/* Middle: nav */}
        <nav
          className="mt-10 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-sm md:text-[0.9375rem]"
          aria-label="Footer"
        >
          {navItems.map((item, i) => (
            <span key={item.key} className="contents">
              {i > 0 ? (
                <span
                  className="mx-2 select-none md:mx-3"
                  style={{ color: "var(--footer-text-muted)" }}
                  aria-hidden
                >
                  ·
                </span>
              ) : null}
              <a
                href={item.href}
                className="transition-colors duration-300 ease-out hover:text-[color:var(--gold)]"
                style={{ color: "var(--footer-text-muted)" }}
              >
                {tNav(item.key)}
              </a>
            </span>
          ))}
        </nav>

        {/* Divider + diamond */}
        <div className="relative mt-12 w-full max-w-3xl" role="presentation">
          <div
            className="h-0 w-full border-0 border-t"
            style={{ borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: "var(--gold-border)" }}
          />
          <span
            className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 px-3 text-xs leading-none md:text-sm"
            style={{
              color: "var(--gold)",
              backgroundColor: "var(--bg-secondary)",
            }}
            aria-hidden
          >
            ◆
          </span>
        </div>

        {/* Bottom row: email · phone · copyright (grid = RTL-safe) */}
        <div className="mt-10 grid w-full max-w-4xl grid-cols-1 items-center gap-6 text-sm md:grid-cols-[1fr_auto_1fr] md:gap-4 md:text-[0.9375rem]">
          <a
            href="mailto:contact@wathba.tech"
            className="justify-self-center transition-colors duration-300 ease-out hover:text-[color:var(--gold)] md:justify-self-start"
            style={{ color: "var(--footer-text-muted)" }}
          >
            contact@wathba.tech
          </a>
          <a
            href="tel:+201273383387"
            className="justify-self-center tabular-nums transition-colors duration-300 ease-out hover:text-[color:var(--gold)]"
            style={{ color: "var(--footer-text)" }}
          >
            +201273383387
          </a>
          <p
            className="justify-self-center text-center md:justify-self-end md:text-end"
            style={{ color: "var(--footer-text-muted)" }}
          >
            <span style={{ color: "var(--footer-text)" }}>
              {tFooter("copyright")}
            </span>{" "}
            {tFooter("rights")}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
