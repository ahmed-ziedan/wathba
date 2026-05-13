"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  Home,
  MessageCircle,
  Smartphone,
  Target,
  UserCheck,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const WHY_ICON_MAP = {
  zap: Zap,
  calendarClock: CalendarClock,
  messageCircle: MessageCircle,
  home: Home,
  smartphone: Smartphone,
  userCheck: UserCheck,
  target: Target,
} as const satisfies Record<string, LucideIcon>;

type WhyIconId = keyof typeof WHY_ICON_MAP;

type WhyFeature = {
  icon: WhyIconId;
  title: string;
  desc: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  viewport: { once: true, margin: "-80px" },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function FeatureIcon({ id }: { id: string }) {
  const Cmp = WHY_ICON_MAP[id as WhyIconId] ?? Zap;
  return (
    <Cmp
      className="size-6 shrink-0 text-[#C9A84C]"
      strokeWidth={1.75}
      aria-hidden
    />
  );
}

export default function WhyWathba() {
  const t = useTranslations("why");
  const features = t.raw("features") as WhyFeature[];

  return (
    <section
      id="why"
      className="relative border-t border-white/[0.06] bg-[#08080D] px-6 py-24 text-[#F0EDE6] md:py-32"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div {...fadeUp}>
          <h2
            id="why-heading"
            className="font-display text-center text-[clamp(2rem,4vw,3rem)] font-bold leading-tight"
          >
            {t("headline")}
          </h2>
        </motion.div>

        <motion.ul
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((item, index) => (
            <motion.li key={`${item.title}-${index}`} variants={staggerItem}>
              <motion.article
                whileHover={{ y: -2 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="group h-full rounded-2xl border border-white/[0.06] bg-[#13131F] p-6 shadow-none transition-[border-color,box-shadow] duration-300 hover:border-[#C9A84C]/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.08)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9A84C]/10">
                  <FeatureIcon id={item.icon} />
                </div>
                <h3 className="font-display text-lg font-bold text-[#F0EDE6]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A09D96]">
                  {item.desc}
                </p>
              </motion.article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
