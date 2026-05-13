"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { SectionLabel } from "@/components/shared/SectionLabel";

type Project = {
  title: string;
  industry: string;
  src: string;
  url: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  viewport: { once: true, margin: "-80px" },
};

const btnClass =
  "hidden size-12 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/40 bg-[#13131F] text-[#C9A84C] transition hover:border-[#C9A84C] hover:bg-[#C9A84C]/10 disabled:pointer-events-none disabled:opacity-30 lg:inline-flex";

const AUTO_ADVANCE_MS = 4000;

export default function Portfolio() {
  const t = useTranslations("portfolio");
  const locale = useLocale();
  const projects = t.raw("projects") as Project[];
  const isRtl = locale === "ar";
  const totalCards = projects.length;
  const singleCard = totalCards <= 1;

  const slides = useMemo(
    () => (singleCard ? projects : [...projects, ...projects]),
    [projects, singleCard],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    direction: locale === "ar" ? "rtl" : "ltr",
  });

  const [hoverPaused, setHoverPaused] = useState(false);

  /** When viewport is on the duplicated half, jump to the matching real slide (no animation). */
  const normalizeDuplicateToReal = useCallback(() => {
    if (!emblaApi || singleCard) return;
    const snap = emblaApi.selectedScrollSnap();
    if (snap >= totalCards) {
      emblaApi.scrollTo(snap - totalCards, true);
    }
  }, [emblaApi, singleCard, totalCards]);

  const goNext = useCallback(() => {
    if (!emblaApi || singleCard) return;
    const snap = emblaApi.selectedScrollSnap();
    const lastSlide = 2 * totalCards - 1;
    if (snap >= lastSlide) {
      emblaApi.scrollTo(0, true);
      return;
    }
    emblaApi.scrollTo(snap + 1, false);
  }, [emblaApi, singleCard, totalCards]);

  const goPrev = useCallback(() => {
    if (!emblaApi || singleCard) return;
    const snap = emblaApi.selectedScrollSnap();
    if (snap <= 0) {
      emblaApi.scrollTo(totalCards - 1, false);
      return;
    }
    emblaApi.scrollTo(snap - 1, false);
  }, [emblaApi, singleCard, totalCards]);

  useEffect(() => {
    if (!emblaApi || singleCard) return;
    normalizeDuplicateToReal();
    emblaApi.on("settle", normalizeDuplicateToReal);
    return () => {
      emblaApi.off("settle", normalizeDuplicateToReal);
    };
  }, [emblaApi, normalizeDuplicateToReal, singleCard]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, locale, slides.length]);

  useEffect(() => {
    if (!emblaApi || singleCard || hoverPaused) return;
    const id = window.setInterval(() => {
      goNext();
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [emblaApi, goNext, hoverPaused, singleCard]);

  return (
    <section
      id="portfolio"
      className="relative border-t border-white/[0.06] bg-[#0F0F18] px-6 py-24 text-[#F0EDE6] md:py-32"
      aria-labelledby="portfolio-heading"
      role="region"
      aria-label={t("label")}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp} className="text-center">
          <SectionLabel label={t("label")} centered />
          <h2
            id="portfolio-heading"
            className="font-display text-[clamp(1.85rem,3.8vw,2.75rem)] font-bold leading-tight tracking-tight"
          >
            {t("headline")}
          </h2>
        </motion.div>

        <motion.div
          className="mt-14 flex items-center gap-4 lg:gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          viewport={{ once: true, margin: "-40px" }}
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
        >
          <button
            type="button"
            className={btnClass}
            onClick={isRtl ? goNext : goPrev}
            disabled={singleCard}
            aria-label={isRtl ? t("next") : t("prev")}
          >
            {isRtl ? (
              <ChevronRight className="size-6" strokeWidth={1.75} aria-hidden />
            ) : (
              <ChevronLeft className="size-6" strokeWidth={1.75} aria-hidden />
            )}
          </button>

          <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y gap-5">
              {slides.map((project, index) => {
                const external =
                  project.url.startsWith("http://") ||
                  project.url.startsWith("https://");
                const isLcpSlide = index === 0;
                return (
                  <div
                    key={`portfolio-slide-${index}-${project.title}-${project.src}`}
                    className="min-w-0 shrink-0 grow-0 basis-[82%] sm:basis-[48%] lg:basis-[calc((100%-2.5rem)/3)]"
                  >
                    <a
                      href={project.url}
                      {...(external
                        ? {
                            target: "_blank" as const,
                            rel: "noopener noreferrer",
                          }
                        : {})}
                      className="group relative block aspect-video overflow-hidden rounded-2xl bg-[#13131F] ring-1 ring-white/[0.06] outline-none transition-[box-shadow,ring-color] duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.12)] hover:ring-[#C9A84C]/25 focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F18]"
                    >
                      <Image
                        src={project.src}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 48vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        unoptimized={project.src.endsWith(".svg")}
                        priority={isLcpSlide}
                        loading={isLcpSlide ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 flex flex-col justify-end bg-black/60 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 md:p-6">
                        <span className="text-sm text-[#A09D96]">
                          {project.industry}
                        </span>
                        <h3 className="mt-1 font-display text-lg font-bold text-white md:text-xl">
                          {project.title}
                        </h3>
                        <span className="mt-2 text-sm text-[#C9A84C]">
                          {t("view")}
                        </span>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className={btnClass}
            onClick={isRtl ? goPrev : goNext}
            disabled={singleCard}
            aria-label={isRtl ? t("prev") : t("next")}
          >
            {isRtl ? (
              <ChevronLeft className="size-6" strokeWidth={1.75} aria-hidden />
            ) : (
              <ChevronRight className="size-6" strokeWidth={1.75} aria-hidden />
            )}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
