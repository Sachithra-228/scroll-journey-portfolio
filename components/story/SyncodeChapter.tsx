"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Globe, Layers } from "lucide-react";
import { syncode, type SyncodeSite } from "@/lib/content";

export default function SyncodeChapter() {
  const [hovered, setHovered] = useState<SyncodeSite | null>(syncode.sites[0]);

  return (
    <section
      id="syncode"
      className="relative z-20 min-h-screen px-5 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Header Row */}
        <div className="mb-14 grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="hud-label text-volt mb-3">
              03 / 07 — FOUNDER &amp; CEO · {syncode.period}
            </p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-bone sm:text-6xl md:text-7xl">
              TEAM SYN<span className="text-volt">&lt;&lt;</span>ODE
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone/75 md:text-lg">
              {syncode.blurb}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:col-span-5">
            {syncode.stats.map((st) => (
              <div
                key={st.label}
                className="glass-panel rounded-2xl p-4 text-center"
              >
                <p className="font-display text-2xl font-extrabold text-volt sm:text-3xl">
                  {st.value}
                </p>
                <p className="mt-1 font-mono text-[9px] tracking-[0.18em] text-muted">
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Split: Left Sticky Preview Card + Right Kinetic Index Rows */}
        <div className="grid items-start gap-10 lg:grid-cols-12">
          {/* Sticky Live Preview Monitor */}
          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <div className="glass-panel overflow-hidden rounded-3xl p-4 shadow-[0_24px_70px_rgba(0,0,0,0.6)]">
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-broadcast/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-volt/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cyber/80" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
                  LIVE PREVIEW // {hovered?.tag}
                </span>
              </div>

              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-surface-2">
                <AnimatePresence mode="wait">
                  {hovered?.img ? (
                    <motion.img
                      key={hovered.name}
                      src={hovered.img}
                      alt={hovered.name}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35 }}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <motion.div
                      key={hovered?.name ?? "fallback"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full w-full flex-col items-center justify-center gap-3 bg-sync-grid p-6 text-center"
                    >
                      <Layers className="h-10 w-10 text-volt" />
                      <p className="font-display text-2xl font-bold text-bone">
                        {hovered?.name}
                      </p>
                      <p className="max-w-xs text-xs text-muted">
                        {hovered?.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {hovered && (
                <div className="mt-4 flex items-center justify-between gap-4 px-1">
                  <div>
                    <h3 className="font-display text-lg font-bold text-bone">
                      {hovered.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted">{hovered.desc}</p>
                  </div>
                  {hovered.url && (
                    <a
                      href={hovered.url}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor-label="VISIT"
                      className="shrink-0 rounded-full bg-volt p-3 text-void transition-transform hover:scale-110"
                      aria-label={`Visit ${hovered.name}`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </div>

            <a
              href={syncode.url}
              target="_blank"
              rel="noreferrer"
              data-cursor-label="AGENCY"
              className="mt-4 flex w-full items-center justify-between rounded-2xl border border-volt/35 bg-volt/10 px-5 py-4 font-mono text-xs font-bold tracking-[0.18em] text-volt transition-colors hover:bg-volt hover:text-void"
            >
              <span className="flex items-center gap-2.5">
                <Globe className="h-4 w-4" />
                VISIT TEAMSYNCODE.COM
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Kinetic Project Index List */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {syncode.sites.map((site, idx) => {
                const isActive = hovered?.name === site.name;
                const inner = (
                  <div
                    onMouseEnter={() => setHovered(site)}
                    onFocus={() => setHovered(site)}
                    className={`group flex flex-col gap-3 py-5 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between ${
                      isActive ? "pl-3" : "pl-0"
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`font-mono text-xs ${
                          isActive ? "text-volt" : "text-muted"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3
                          className={`font-display text-2xl font-extrabold tracking-tight transition-colors sm:text-3xl ${
                            isActive
                              ? "text-volt"
                              : "text-bone group-hover:text-volt"
                          }`}
                        >
                          {site.name}
                        </h3>
                        <p className="mt-1 text-xs text-muted sm:hidden">
                          {site.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pl-8 sm:pl-0">
                      <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-bone/75">
                        {site.tag}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {site.year}
                      </span>
                      {site.url ? (
                        <ArrowUpRight
                          className={`h-4 w-4 transition-transform ${
                            isActive
                              ? "translate-x-0.5 -translate-y-0.5 text-volt"
                              : "text-muted"
                          }`}
                        />
                      ) : (
                        <span className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                );

                return site.url ? (
                  <a
                    key={site.name}
                    href={site.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor-label="OPEN"
                    className="block"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={site.name} onClick={() => setHovered(site)}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
