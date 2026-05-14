"use client";

import { useEffect, useState } from "react";

const STAR_COUNT = 120;

type Star = {
  id: number;
  leftPct: number;
  topPct: number;
  sizePx: 1 | 2;
  durationSec: number;
  delaySec: number;
  lightGold: boolean;
};

function buildStars(): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      id: i,
      leftPct: Math.random() * 100,
      topPct: Math.random() * 100,
      sizePx: Math.random() < 0.5 ? 1 : 2,
      durationSec: 3 + Math.random() * 5,
      delaySec: Math.random() * 8,
      lightGold: Math.random() < 0.5,
    });
  }
  return stars;
}

export function Starfield() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    setStars(buildStars());
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      aria-hidden
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className="starfield-star absolute rounded-full"
          style={{
            left: `${s.leftPct}%`,
            top: `${s.topPct}%`,
            width: s.sizePx,
            height: s.sizePx,
            backgroundColor: s.lightGold
              ? "rgba(232, 216, 175, 0.92)"
              : "rgba(255, 255, 255, 0.88)",
            animation: `starfield-twinkle ${s.durationSec}s ease-in-out infinite`,
            animationDelay: `${s.delaySec}s`,
          }}
        />
      ))}
    </div>
  );
}

