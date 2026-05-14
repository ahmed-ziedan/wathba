"use client";

import { motion } from "framer-motion";

/**
 * Slow aurora-style wash behind hero content. Motion is CSS keyframes;
 * Framer Motion handles a soft mount fade so the blobs do not pop in.
 */
export function AuroraBackground() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="aurora-hero-blob aurora-hero-blob--1 absolute -start-[8%] top-[5%]"
        style={{
          width: "72vw",
          height: "48vh",
          borderRadius: "50%",
          background: "rgba(201, 168, 76, 0.12)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="aurora-hero-blob aurora-hero-blob--2 absolute start-[15%] bottom-[10%]"
        style={{
          width: "64vw",
          height: "56vh",
          borderRadius: "50%",
          background: "rgba(180, 120, 30, 0.08)",
          filter: "blur(80px)",
        }}
      />
      <div className="absolute start-1/2 top-[18%] -translate-x-1/2">
        <div
          className="aurora-hero-blob aurora-hero-blob--3"
          style={{
            width: "68vw",
            height: "44vh",
            borderRadius: "50%",
            background: "rgba(255, 240, 200, 0.05)",
            filter: "blur(80px)",
          }}
        />
      </div>
    </motion.div>
  );
}
