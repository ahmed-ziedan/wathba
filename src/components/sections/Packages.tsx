"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import {
  Check,
  Globe,
  MapPin,
  ShieldCheck,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { MovingBorder } from "@/components/ui/moving-border";
import { cn } from "@/lib/utils";

const PKG_KEYS = ["starter", "business", "pro"] as const;
type PkgKey = (typeof PKG_KEYS)[number];

const INCLUDED_ICON_MAP = {
  globe: Globe,
  shieldCheck: ShieldCheck,
  mapPin: MapPin,
  smartphone: Smartphone,
  trendingUp: TrendingUp,
} as const satisfies Record<string, LucideIcon>;

type IncludedIconId = keyof typeof INCLUDED_ICON_MAP;

type IncludedBarItem = { icon: IncludedIconId; text: string };

const easeScroll = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeScroll },
  },
};

/** Softer surface, more padding — premium SaaS, not border-heavy */
const cardGlass =
  "bg-[color:rgba(19,19,31,0.5)] backdrop-blur-[16px] ring-1 ring-white/[0.06]";

const cardPad = "px-8 py-10 md:px-10 md:py-12 lg:px-12 lg:py-14";

function AnimatedPrice({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, {
      duration: 1.15,
      ease: easeScroll,
      onUpdate: (latest) => setN(Math.round(latest)),
    });
    return () => c.stop();
  }, [inView, value]);

  return (
    <span
      ref={ref}
      className="inline-flex items-baseline justify-center gap-1.5"
    >
      <span
        className="num font-mono text-lg font-semibold leading-none md:text-xl"
        style={{ color: "var(--gold)" }}
        aria-hidden
      >
        $
      </span>
      <span
        className="num font-mono text-[clamp(2.85rem,5.8vw,4.35rem)] font-semibold leading-none tabular-nums tracking-tight"
        style={{ color: "var(--gold)" }}
      >
        {n}
      </span>
    </span>
  );
}

function SharedIncludedBar({ items }: { items: IncludedBarItem[] }) {
  const t = useTranslations("packages");
  return (
    <motion.div
      variants={fadeUp}
      className="mx-auto mt-14 flex max-w-5xl flex-wrap items-center justify-center gap-y-3"
      role="group"
      aria-label={t("included_all_label")}
    >
      {items.map((item, i) => {
        const Icon = INCLUDED_ICON_MAP[item.icon];
        return (
          <Fragment key={item.text}>
            {i > 0 ? (
              <span
                className="select-none px-1 text-xs sm:px-2"
                style={{ color: "rgba(201, 168, 76, 0.35)" }}
                aria-hidden
              >
                ·
              </span>
            ) : null}
            <span
              className="inline-flex max-w-[100%] items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[11px] leading-tight sm:text-xs md:px-3.5 md:py-2 md:text-[0.8125rem]"
              style={{ color: "var(--text-secondary)" }}
            >
              {Icon ? (
                <Icon
                  className="size-3.5 shrink-0 md:size-4"
                  strokeWidth={2.25}
                  style={{ color: "var(--gold)" }}
                  aria-hidden
                />
              ) : null}
              <span className="whitespace-normal text-start sm:whitespace-nowrap">
                {item.text}
              </span>
            </span>
          </Fragment>
        );
      })}
    </motion.div>
  );
}

function PackageCard({ pkg, featured }: { pkg: PkgKey; featured: boolean }) {
  const t = useTranslations("packages");
  const locale = useLocale();
  const isAr = locale === "ar";
  const price = Number.parseInt(t(`${pkg}.price`), 10);
  const features = t.raw(`${pkg}.features`) as string[];

  const inner = (
    <div
      className={cn(
        "flex h-full min-h-[36rem] flex-col md:min-h-[38rem]",
        cardPad,
        featured && "lg:min-h-[40rem]",
      )}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="flex w-full shrink-0 justify-center pb-6">
        {featured ? (
          <span
            className="rounded-full px-4 py-1.5 text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(201,168,76,0.08)]"
            style={{
              backgroundColor: "var(--gold)",
              color: "#0a0a0a",
            }}
          >
            {t("badge")}
          </span>
        ) : (
          <span className="h-[1.875rem]" aria-hidden />
        )}
      </div>

      <div className="flex flex-col items-center text-center">
        <h3
          className="text-2xl font-extrabold tracking-tight md:text-3xl lg:text-[2rem]"
          style={{
            fontFamily: "var(--font-display-en)",
            color: "var(--white)",
          }}
        >
          {t(`${pkg}.name`)}
        </h3>

        <div className="mt-10 flex flex-col items-center">
          <AnimatedPrice value={Number.isFinite(price) ? price : 0} />
          <p
            className="mt-4 max-w-[16rem] text-xs leading-relaxed md:text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {t(`${pkg}.best_for`)}
          </p>
          <span
            className="num mt-4 inline-flex rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider md:text-xs"
            style={{
              borderColor: "var(--gold-border)",
              color: "var(--text-secondary)",
            }}
          >
            {t(`${pkg}.delivery`)}
          </span>
        </div>
      </div>

      <div
        className="my-10 w-full shrink-0 border-t border-solid"
        style={{ borderColor: "var(--gold-border)" }}
        role="presentation"
      />

      <ul className="flex w-full flex-1 flex-col gap-3.5 text-start" dir="ltr">
        {features.map((line, i) => (
          <li
            key={`${pkg}-${i}`}
            className="flex flex-row items-start gap-3 text-sm leading-relaxed md:text-[0.9375rem]"
          >
            <Check
              className="mt-0.5 size-4 shrink-0"
              style={{ color: "var(--gold)" }}
              strokeWidth={2.5}
              aria-hidden
            />
            <span
              className="min-w-0 flex-1"
              style={{ color: "rgba(240, 237, 230, 0.9)" }}
              dir={isAr ? "rtl" : "ltr"}
            >
              {line}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={`/start?package=${pkg}`}
        className={cn(
          "mt-10  inline-flex w-full items-center justify-center rounded-full py-3.5 text-sm font-bold transition-opacity duration-300 ease-out md:py-4",
          featured
            ? "text-black hover:opacity-90"
            : "bg-white/[0.04] text-[color:var(--gold)] ring-1 ring-[color:rgba(201,168,76,0.2)] hover:bg-[color:rgba(201,168,76,0.08)]",
        )}
        style={featured ? { backgroundColor: "var(--gold)" } : undefined}
      >
        {t("cta_for_package", { package: t(`${pkg}.name`) })}
      </Link>
    </div>
  );

  const defaultLiftShadow = featured
    ? "0 0 0 1px rgba(201,168,76,0.15), 0 28px 56px -8px rgba(0,0,0,0.5), 0 0 40px rgba(201,168,76,0.08)"
    : "0 24px 48px -12px rgba(0,0,0,0.45)";

  const hoverLiftShadow = featured
    ? "0 0 0 1px rgba(201,168,76,0.2), 0 32px 64px -8px rgba(0,0,0,0.55), 0 0 36px rgba(201,168,76,0.08)"
    : "0 28px 56px -8px rgba(0,0,0,0.55), 0 0 32px rgba(201,168,76,0.08)";

  const cardBody = (
    <div
      className={cn(
        cardGlass,
        featured ? "rounded-[15px]" : "rounded-2xl",
        "relative h-full",
      )}
    >
      {inner}
    </div>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        delay: pkg === "starter" ? 0 : pkg === "business" ? 0.08 : 0.16,
        ease: easeScroll,
      }}
      className={cn(
        "h-full",
        featured && "lg:z-[2] lg:scale-105 lg:origin-center",
      )}
    >
      <motion.div
        className="relative h-full overflow-hidden rounded-2xl"
        initial={{ boxShadow: defaultLiftShadow }}
        whileHover={{
          y: -6,
          boxShadow: hoverLiftShadow,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {featured ? (
          <MovingBorder className="h-full rounded-2xl shadow-[0_0_48px_rgba(201,168,76,0.08)]">
            {cardBody}
          </MovingBorder>
        ) : (
          cardBody
        )}
      </motion.div>
    </motion.article>
  );
}

export default function Packages() {
  const t = useTranslations("packages");
  const includedAll = t.raw("included_all") as IncludedBarItem[];

  return (
    <section
      id="packages"
      className="scroll-mt-28 border-t border-[color:var(--border-subtle)] px-6 py-24 md:py-32"
      style={{ backgroundColor: "var(--bg-primary, #08080d)" }}
      aria-labelledby="packages-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div variants={fadeUp} className="text-center">
            <SectionLabel label={t("label")} centered />
            <h2
              id="packages-heading"
              className="font-display mx-auto max-w-4xl text-[clamp(2rem,4vw,3.25rem)] font-bold leading-tight"
              style={{ color: "var(--white)" }}
            >
              {t("headline_1")}{" "}
              <span style={{ color: "var(--gold)" }}>{t("headline_2")}</span>
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed"
              style={{ color: "var(--text-secondary, #a09d96)" }}
            >
              {t("sub")}
            </p>
          </motion.div>

          <SharedIncludedBar items={includedAll} />

          {/* LTR grid so desktop order is always Starter | Business | Pro left → right */}
          <div
            className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-3 lg:items-stretch lg:gap-8 lg:py-10"
            dir="ltr"
          >
            {PKG_KEYS.map((pkg) => (
              <PackageCard key={pkg} pkg={pkg} featured={pkg === "business"} />
            ))}
          </div>

          <motion.p
            className="mx-auto mt-14 max-w-3xl text-center text-sm leading-relaxed"
            style={{ color: "var(--text-muted, #5c5a56)" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: easeScroll }}
            dir="auto"
          ></motion.p>
        </motion.div>
      </div>
    </section>
  );
}
