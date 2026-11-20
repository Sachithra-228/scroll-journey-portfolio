"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ChevronPreloader() {
  const [pct, setPct] = useState(0);
  const [splitting, setSplitting] = useState(false);
  const [done, setDone] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDone(true);
      window.dispatchEvent(new CustomEvent("hero:reveal"));
      return;
    }

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setTilt({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let current = 0;
    const timer = window.setInterval(() => {
      current += Math.floor(Math.random() * 14) + 10;
      if (current >= 100) {
        current = 100;
        setPct(100);
        window.clearInterval(timer);
        // Trigger the interactive "<<" chevron split reveal!
        window.setTimeout(() => {
          setSplitting(true);
          window.dispatchEvent(new CustomEvent("hero:reveal"));
        }, 180);
        window.setTimeout(() => {
          setDone(true);
        }, 900);
      } else {
        setPct(current);
      }
    }, 42);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="chevron-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          className="fixed inset-0 z-[95] flex items-center justify-center overflow-hidden"
        >
          {/* Left Curtain Panel */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: splitting ? "-100%" : 0 }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 bg-[#07080b]"
          />

          {/* Right Curtain Panel */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: splitting ? "100%" : 0 }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 bg-[#07080b]"
          />

          {/* Interactive SYNCODE "<<" Double Chevron Centerpiece */}
          <motion.div
            animate={
              splitting
                ? { scale: 1.35, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            style={{
              transform: `perspective(900px) rotateY(${tilt.x * 16}deg) rotateX(${tilt.y * -14}deg)`,
            }}
            className="relative z-10 flex flex-col items-center gap-7 transition-transform duration-150 ease-out"
          >
            <svg
              width="160"
              height="112"
              viewBox="0 0 160 112"
              fill="none"
              aria-hidden="true"
              className="overflow-visible"
            >
              {/* Left Chevron "<" — Acid Volt */}
              <motion.path
                d="M74 14 L26 56 L74 98"
                stroke="#d2ff00"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, x: -34, opacity: 0 }}
                animate={
                  splitting
                    ? { pathLength: 1, x: -85, opacity: 0 }
                    : { pathLength: 1, x: 0, opacity: 1 }
                }
                transition={{
                  duration: splitting ? 0.5 : 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  filter: "drop-shadow(0 0 18px rgba(210, 255, 0, 0.55))",
                }}
              />

              {/* Right Chevron "<" — Crisp White */}
              <motion.path
                d="M124 14 L76 56 L124 98"
                stroke="#f6f6f2"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, x: 34, opacity: 0 }}
                animate={
                  splitting
                    ? { pathLength: 1, x: 85, opacity: 0 }
                    : { pathLength: 1, x: 0, opacity: 1 }
                }
                transition={{
                  duration: splitting ? 0.5 : 0.65,
                  delay: splitting ? 0 : 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </svg>

            {/* Minimal Counter & Line */}
            <div className="flex flex-col items-center gap-2.5">
              <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full bg-[#d2ff00] transition-all duration-100 ease-out"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.26em] text-white/75">
                <span>SYNCODE</span>
                <span className="text-[#d2ff00] font-bold tabular-nums">
                  {String(pct).padStart(2, "0")}%
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
