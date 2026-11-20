"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, GraduationCap, ScanFace, Sparkles } from "lucide-react";
import { education, identity } from "@/lib/content";

export default function CloneChapter() {
  const [scanMode, setScanMode] = useState(true);

  const toggleCloneSync = () => {
    setScanMode((prev) => !prev);
    window.dispatchEvent(new CustomEvent("syncbot:boost"));
  };

  return (
    <section
      id="clone"
      className="relative z-20 min-h-screen px-5 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Chapter Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <p className="hud-label text-cyber mb-3">02 / 07 — HUMAN × 3D CLONE</p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-bone sm:text-6xl md:text-7xl">
              THE CREATOR
              <span className="text-cyber"> &amp; </span>
              THE BOT<span className="text-volt">.</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={toggleCloneSync}
            data-cursor-label="SYNC"
            className={`inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 font-mono text-xs font-bold tracking-[0.18em] transition-all ${
              scanMode
                ? "border-cyber bg-cyber/15 text-cyber shadow-[0_0_24px_rgba(0,229,255,0.25)]"
                : "border-white/20 bg-white/5 text-bone hover:border-volt hover:text-volt"
            }`}
          >
            <ScanFace className="h-4 w-4" />
            <span>{scanMode ? "CLONE SCAN: ACTIVE" : "ENABLE CLONE SCAN"}</span>
          </button>
        </div>

        {/* Main Split: Left = Portrait + Bio, Right = Open Stage for 3D SYNC-BOT Digital Twin */}
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Portrait Frame with Biometric Clone Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div
              onClick={toggleCloneSync}
              data-cursor-label="CLONE"
              className="group relative aspect-[3/4] w-full max-w-[440px] cursor-pointer overflow-hidden rounded-3xl border border-white/15 bg-surface shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
            >
              {/* Real Portrait Photo */}
              <img
                src={identity.portrait}
                alt="Sachithra Wijesinghe — Founder & CEO of Team SYNCODE"
                className={`h-full w-full object-cover object-top transition-all duration-700 ${
                  scanMode
                    ? "scale-[1.02] contrast-[1.06] saturate-[0.95]"
                    : "scale-100"
                }`}
              />

              {/* Subtle gradient vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/90 via-void/15 to-transparent" />

              {/* Holographic Clone Scan Overlay */}
              {scanMode && (
                <>
                  {/* Cyber Grid Tint */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(0,229,255,0.28) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,229,255,0.28) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                  {/* Sweeping Laser Scanline */}
                  <div className="clone-scanline pointer-events-none absolute inset-x-0 h-[2px] bg-cyber shadow-[0_0_24px_4px_rgba(0,229,255,0.85)]" />
                </>
              )}

              {/* Corner Brackets */}
              <div className="pointer-events-none absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-cyber/80" />
              <div className="pointer-events-none absolute right-4 top-4 h-6 w-6 border-r-2 border-t-2 border-cyber/80" />
              <div className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-volt/80" />
              <div className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-volt/80" />

              {/* Top Biometric Badge */}
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                <span className="rounded-full bg-void/75 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-cyber backdrop-blur-md">
                  ID // SW-228
                </span>
                <span className="rounded-full bg-void/75 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-volt backdrop-blur-md">
                  SYNC 99.8%
                </span>
              </div>

              {/* Bottom Identity Strip */}
              <div className="absolute inset-x-5 bottom-5">
                <p className="font-mono text-[10px] tracking-[0.24em] text-cyber">
                  ORIGINAL HOST // DIGITAL TWIN LINKED →
                </p>
                <p className="mt-1 font-display text-2xl font-extrabold text-bone">
                  SACHITHRA WIJESINGHE
                </p>
                <p className="font-mono text-xs text-bone/70">
                  CEO @ Team SYNCODE · SLIIT IT · YouTube &amp; SLBC
                </p>
              </div>
            </div>
          </motion.div>

          {/* Center-Right Bio & Clone Telemetry — leaves breathing room for the 3D SYNC-BOT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="flex flex-col gap-6 lg:col-span-5"
          >
            <div className="glass-panel rounded-3xl p-7 md:p-8">
              <div className="mb-4 flex items-center gap-2.5 text-cyber">
                <Cpu className="h-4 w-4" />
                <span className="hud-label">DIGITAL TWIN PROTOCOL</span>
              </div>
              <p className="text-lg leading-relaxed text-bone/90 md:text-xl">
                {identity.bio}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-muted">
                    PRIMARY STUDIO
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-volt">
                    Team SYNCODE
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-muted">
                    CONTENT &amp; VOICE
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-bone">
                    @sachithra228 · SLBC
                  </p>
                </div>
              </div>
            </div>

            {/* Education Milestones */}
            <div className="glass-panel rounded-3xl p-7">
              <div className="mb-5 flex items-center gap-2.5 text-volt">
                <GraduationCap className="h-4 w-4" />
                <span className="hud-label">ACADEMIC FOUNDATION</span>
              </div>
              <div className="space-y-4">
                {education.map((ed) => (
                  <div
                    key={ed.degree}
                    className="flex flex-col justify-between gap-1 border-b border-white/10 pb-3.5 last:border-none last:pb-0 sm:flex-row sm:items-baseline"
                  >
                    <div>
                      <h3 className="font-display text-base font-bold text-bone">
                        {ed.degree}
                      </h3>
                      <p className="text-xs text-muted">{ed.institution}</p>
                    </div>
                    <span className="font-mono text-[11px] tracking-[0.14em] text-volt">
                      {ed.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-cyber/85">
              <Sparkles className="h-3.5 w-3.5" />
              <span>3D SYNC-BOT IS MIRRORING THIS CHAPTER IN REAL TIME</span>
            </div>
          </motion.div>

          {/* Dedicated 2-col visual stage on desktop for the 3D SYNC-BOT */}
          <div className="hidden lg:col-span-2 lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
