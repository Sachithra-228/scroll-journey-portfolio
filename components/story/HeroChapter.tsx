"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { identity } from "@/lib/content";

export default function HeroChapter() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) setRevealed(true);

    const onReveal = () => setRevealed(true);
    window.addEventListener("hero:reveal", onReveal);

    const safety = window.setTimeout(() => setRevealed(true), 2200);

    return () => {
      window.removeEventListener("hero:reveal", onReveal);
      window.clearTimeout(safety);
    };
  }, []);

  const openMenu = () => {
    window.dispatchEvent(new CustomEvent("hud:toggleMenu"));
  };

  return (
    <section
      id="hero"
      className="relative z-30 flex min-h-screen flex-col justify-between overflow-hidden bg-[#f6f6f2] px-5 pb-6 pt-5 text-[#0a0b0d] md:px-10 md:pb-8 md:pt-7"
    >
      {/* Subtle Pale Topographic Contour Lines */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 900"
        fill="none"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      >
        <path
          d="M-60 220 C 160 110, 320 340, 560 200 C 820 40, 1020 290, 1480 140"
          stroke="#dcdcd3"
          strokeWidth="1.2"
        />
        <path
          d="M-80 480 C 190 360, 390 610, 680 420 C 960 240, 1140 520, 1500 350"
          stroke="#e0e0d7"
          strokeWidth="1.1"
        />
        <path
          d="M-40 740 C 240 610, 440 820, 740 660 C 1020 510, 1210 760, 1520 590"
          stroke="#e5e5dc"
          strokeWidth="1"
        />
        <path
          d="M210 -40 C 310 220, 140 480, 340 940"
          stroke="#e2e2d9"
          strokeWidth="1"
        />
        <path
          d="M1160 -40 C 1060 260, 1240 540, 1080 940"
          stroke="#e2e2d9"
          strokeWidth="1"
        />
      </svg>

      {/* Subtle Studio Backdrop Light Radial behind Sachithra */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[48%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-[90px]"
      />

      {/* ================================================================= */}
      {/* TOP BAR — ULTRA-CLEAN NAME TOP-LEFT & MENU BUTTON TOP-RIGHT       */}
      {/* ================================================================= */}
      <header className="relative z-30 mx-auto flex w-full max-w-[1480px] items-start justify-between">
        {/* Top-Left Stacked Signature Name */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="leading-[0.86] tracking-[-0.04em] text-[#0a0b0d]">
            <span className="block font-body text-[clamp(1.75rem,3.4vw,3.1rem)] font-medium tracking-[-0.02em]">
              {identity.firstName}
            </span>
            <span className="block font-display text-[clamp(1.85rem,3.6vw,3.25rem)] font-extrabold">
              {identity.lastName}
            </span>
          </h1>
          <p className="mt-2 font-mono text-[10px] font-bold tracking-[0.22em] text-[#0a0b0d]/55">
            CEO @ TEAM SYNCODE · FULL-STACK · YOUTUBE
          </p>
        </motion.div>

        {/* Top-Right: Clean Minimal Menu Button Only */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={openMenu}
            aria-label="Open Navigation Menu"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#0a0b0d]/25 bg-white/85 text-[#0a0b0d] backdrop-blur-md transition-colors hover:border-[#0a0b0d] hover:bg-[#0a0b0d] hover:text-[#d2ff00]"
          >
            <Menu className="h-5 w-5" />
          </button>
        </motion.div>
      </header>

      {/* ================================================================= */}
      {/* CENTER-STAGE STATIC GROUNDED STUDIO PORTRAIT OF SACHITHRA         */}
      {/* ================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={
          revealed
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 30, scale: 0.98 }
        }
        transition={{ duration: 0.95, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-center"
      >
        <div className="relative h-[84vh] w-[min(94vw,680px)] select-none sm:h-[88vh] md:h-[91vh] md:w-[740px]">
          {/* Soft Studio Contact Shadow on Backdrop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 h-[65%] w-[62%] -translate-x-1/2 rounded-full bg-black/[0.11] blur-[55px]"
          />

          {/* Grounded Studio Cutout Portrait */}
          <img
            src={identity.portraitCutout}
            alt="Sachithra Wijesinghe — Founder & CEO of Team SYNCODE"
            style={{
              filter:
                "drop-shadow(0px 24px 32px rgba(10, 12, 18, 0.22)) drop-shadow(0px 6px 12px rgba(10, 12, 18, 0.12))",
            }}
            className="relative z-10 h-full w-full select-none object-contain object-bottom contrast-[1.03]"
            draggable={false}
          />
        </div>
      </motion.div>
    </section>
  );
}
