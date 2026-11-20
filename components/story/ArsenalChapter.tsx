"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/content";

const MARQUEE_TOP = [
  "NEXT.JS",
  "THREE.JS",
  "SPRING BOOT",
  "REACT",
  "TYPESCRIPT",
  "PYTHON",
  "FASTAPI",
  "KOTLIN",
  "POSTGRESQL",
];

const MARQUEE_BOTTOM = [
  "TAILWIND CSS",
  "GSAP",
  "MONGODB",
  "JAVA 17",
  "NODE.JS",
  "ANDROID STUDIO",
  "PLAYWRIGHT",
  "FIGMA",
  "POWER BI",
];

export default function ArsenalChapter() {
  return (
    <section
      id="arsenal"
      className="relative z-20 overflow-hidden py-24 md:py-32"
    >
      {/* Kinetic Dual Marquee */}
      <div className="mb-20 space-y-3 border-y border-white/10 bg-surface/50 py-6 backdrop-blur-md">
        <div className="animate-marquee-left flex items-center gap-8">
          {[...MARQUEE_TOP, ...MARQUEE_TOP].map((word, idx) => (
            <span
              key={`top-${idx}`}
              className="flex items-center gap-8 font-display text-4xl font-extrabold tracking-tight text-bone/90 sm:text-6xl"
            >
              <span>{word}</span>
              <span className="text-volt">✦</span>
            </span>
          ))}
        </div>

        <div className="animate-marquee-right flex items-center gap-8">
          {[...MARQUEE_BOTTOM, ...MARQUEE_BOTTOM].map((word, idx) => (
            <span
              key={`bot-${idx}`}
              className="flex items-center gap-8 font-display text-4xl font-extrabold tracking-tight text-outline sm:text-6xl"
            >
              <span>{word}</span>
              <span className="text-cyber">//</span>
            </span>
          ))}
        </div>
      </div>

      {/* Structured Technical Matrix */}
      <div className="mx-auto max-w-[1440px] px-5 md:px-12">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="hud-label text-volt mb-3">05 / 07 — TECHNICAL ARSENAL</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-bone sm:text-6xl">
              FULL-STACK MATRIX<span className="text-volt">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted">
            From Spring Boot enterprise APIs and FastAPI ML backends to WebGL
            frontends and native Android apps.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.06 }}
              className="glass-panel flex flex-col justify-between rounded-3xl p-6 transition-colors hover:border-volt/45"
            >
              <div>
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs font-bold text-volt">
                    {group.code}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
                    {group.category}
                  </span>
                </div>

                <ul className="space-y-2.5">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-2.5 text-sm font-medium text-bone/90"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-volt/70" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
