"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GrainOverlay } from "@/components/shared/GrainOverlay";

const proofKeys = [
  "proof_1",
  "proof_2",
  "proof_3",
  "proof_4",
  "proof_5",
  "proof_6",
] as const;

const fadeContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const fadeItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/** One loop unit: proof ✦ proof ✦ proof ✦ — tiles edge-to-edge with duplicate for seamless marquee */
function ProofStrip({ t }: { t: (key: (typeof proofKeys)[number]) => string }) {
  return (
    <>
      {proofKeys.map((key, i) => (
        <Fragment key={key}>
          {i > 0 ? (
            <span className="text-gold shrink-0 select-none" aria-hidden>
              ✦
            </span>
          ) : null}
          <span className="text-[#A09D96] text-sm md:text-base whitespace-nowrap font-sans">
            {t(key)}
          </span>
        </Fragment>
      ))}
      <span className="text-gold shrink-0 select-none pr-4" aria-hidden>
        ✦
      </span>
    </>
  );
}

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#08080D] text-[#F0EDE6]">
      <GrainOverlay className="absolute inset-0 z-[1] h-full min-h-full w-full" />

      {/* Soft gold glow (Spotlight-style, no extra dependency) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute start-1/2 top-[-18%] h-[min(85vw,520px)] w-[min(85vw,520px)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(201,168,76,0.22)_0%,transparent_72%)] blur-3xl" />
        <div className="absolute start-[18%] bottom-[-25%] h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full bg-[radial-gradient(closest-side,rgba(201,168,76,0.08)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col pt-24 md:pt-28">
        <motion.div
          className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-16 text-center"
          variants={fadeContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeItem}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-1.5 text-sm text-[#C9A84C]">
              {t("badge")}
            </div>
          </motion.div>

          <motion.h1
            variants={fadeItem}
            className="font-display font-bold leading-[1.05] tracking-[-0.03em] text-[clamp(2.5rem,6vw,5.5rem)]"
          >
            {t("headline_1")}
            <br />
            <span className="text-[#C9A84C]">{t("headline_2")}</span>
          </motion.h1>

          <motion.p
            variants={fadeItem}
            className="mt-6 max-w-xl text-lg text-[#A09D96] md:text-xl"
          >
            {t("sub")}
          </motion.p>

          <motion.div
            variants={fadeItem}
            className="mt-10 flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#packages"
              className="inline-flex items-center justify-center rounded-full bg-[#C9A84C] px-8 py-3.5 font-bold text-black transition hover:bg-[#E2C06A]"
            >
              {t("cta_primary")}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-[#C9A84C]/40 px-8 py-3.5 font-bold text-[#C9A84C] transition hover:bg-[#C9A84C]/10"
            >
              {t("cta_secondary")}
            </a>
          </motion.div>
        </motion.div>

        {/* Social proof ticker — dir=ltr keeps transform math identical in all locales */}
        <div className="relative z-10 mt-auto w-full border-t border-white/[0.06] py-4">
          <div
            className="overflow-x-clip overflow-y-visible px-3 sm:px-5 md:px-8"
            dir="ltr"
          >
            <div className="hero-marquee-track">
              <div className="flex shrink-0 items-center gap-8 md:gap-10">
                <ProofStrip t={t} />
              </div>
              <div
                className="flex shrink-0 items-center gap-8 md:gap-10"
                aria-hidden
              >
                <ProofStrip t={t} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
