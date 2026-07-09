"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/content";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="top"
      aria-label="Introduction"
      data-waypoint
      data-trail-x="0.32"
      data-trail-y="0.7"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={reducedMotion ? false : "hidden"}
        animate="show"
        transition={{ staggerChildren: 0.14, delayChildren: 0.2 }}
        className="flex flex-col items-center"
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="eyebrow text-signal"
        >
          {hero.eyebrow}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-6 font-display text-[13vw] leading-[0.95] tracking-tight text-paper md:text-8xl lg:text-9xl"
        >
          {hero.name}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-8 max-w-xl text-balance text-base text-slate md:text-lg"
        >
          {hero.statement}
        </motion.p>
      </motion.div>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-hidden="true"
        className="absolute bottom-10 flex flex-col items-center gap-2 font-mono text-xs tracking-[0.2em] text-stage"
      >
        <span>{hero.scrollCue}</span>
        <motion.span
          animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
