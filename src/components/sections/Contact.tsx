"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const WHATSAPP_URL =
  "https://wa.me/201273383387?text=مرحباً،%20أريد%20الاستفسار%20عن%20خدمات%20وثبة";

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: easeOut },
  viewport: { once: true, margin: "-100px" },
};

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden border-t border-white/[0.06] px-6 py-28 md:px-10 md:py-36"
      style={{ backgroundColor: "var(--bg-secondary)" }}
      aria-labelledby="contact-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-[32%] h-[min(85vw,560px)] w-[min(140vw,960px)] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(201, 168, 76, 0.26) 0%, rgba(201, 168, 76, 0.09) 42%, transparent 68%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div {...fadeUp}>
          <h2
            id="contact-heading"
            className="font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-tight tracking-tight text-[#F0EDE6]"
          >
            {t("headline")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#A09D96] md:text-xl">
            {t("subheadline")}
          </p>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-col items-stretch justify-center gap-4 sm:mt-14 sm:flex-row sm:items-center sm:gap-5"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: easeOut }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("whatsapp_cta")} (opens in new tab)`}
            className="inline-flex min-h-[3.25rem] items-center justify-center rounded-full bg-[#C9A84C] px-8 py-3.5 text-center text-sm font-bold text-black transition hover:bg-[#E2C06A] sm:min-w-[14rem] sm:text-base"
          >
            {t("whatsapp_cta")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
