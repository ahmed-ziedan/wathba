"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Aceternity-style animated conic border (no extra deps).
 * Gold stops: fill ≤0.08, accent spine ≤0.2 — subtle premium glow.
 */
export function MovingBorder({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl p-px", className)}>
      <div
        className="pointer-events-none absolute flex items-center justify-center overflow-hidden rounded-2xl"
        style={{ inset: 0 }}
      >
        <motion.div
          className="aspect-square w-[min(200%,48rem)] shrink-0 opacity-55"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(201,168,76,0.04) 70deg, rgba(201,168,76,0.2) 130deg, rgba(201,168,76,0.04) 190deg, transparent 270deg)",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="relative z-10 h-full min-h-0 overflow-hidden rounded-[15px]">
        {children}
      </div>
    </div>
  );
}
