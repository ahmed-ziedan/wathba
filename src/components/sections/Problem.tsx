"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

const painKeys = ["pain_1", "pain_2", "pain_3", "pain_4"] as const;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  viewport: { once: true, margin: "-80px" },
};

export default function Problem() {
  const t = useTranslations("problem");
  const locale = useLocale();
  const slideX = locale === "ar" ? -20 : 20;

  return (
    <section
      className="relative border-t border-white/[0.06] bg-[#08080D] px-6 py-24 text-[#F0EDE6] md:py-32"
      aria-labelledby="problem-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:gap-16 lg:items-start">
        {/* Headline + lead: first in DOM → inline-start (left in LTR, right in RTL) */}
        <motion.div className="flex-1 min-w-0" {...fadeUp}>
          <h2
            id="problem-heading"
            className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight"
          >
            {t("headline_1")}
            <br />
            <span className="text-[#C9A84C]">{t("headline_2")}</span>
          </h2>
          <p className="mt-4 max-w-md text-lg text-[#A09D96]">{t("lead")}</p>
        </motion.div>

        {/* Pain list: second in DOM → inline-end column */}
        <div className="flex-1 min-w-0">
          {painKeys.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: slideX }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: i * 0.1,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              viewport={{ once: true, margin: "-40px" }}
              className="flex items-start gap-3 border-b border-white/[0.06] py-4 last:border-b-0"
            >
              <XCircle
                size={20}
                className="mt-0.5 shrink-0 text-[#ef4444]"
                aria-hidden
                strokeWidth={2}
              />
              <span className="text-[#F0EDE6]">{t(key)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
