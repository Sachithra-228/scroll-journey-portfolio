"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award, Play, Radio, Tv, Users } from "lucide-react";
import { affiliations, links, references, videos } from "@/lib/content";

export default function CreatorChapter() {
  return (
    <section
      id="creator"
      className="relative z-20 min-h-screen px-5 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Header with ON-AIR Equalizer */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-broadcast/40 bg-broadcast/15 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.22em] text-broadcast">
                <span className="h-2 w-2 rounded-full bg-broadcast animate-pulse" />
                ON AIR · 06 / 07
              </span>
              {/* Animated Audio Equalizer */}
              <div className="flex h-4 items-end gap-[3px]" aria-hidden="true">
                {[0, 0.2, 0.4, 0.15, 0.35].map((delay, i) => (
                  <span
                    key={i}
                    className="eq-bar w-[3px] rounded-full bg-broadcast"
                    style={{ height: "100%", animationDelay: `${delay}s` }}
                  />
                ))}
              </div>
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-bone sm:text-6xl md:text-7xl">
              YOUTUBE &amp; RADIO<span className="text-broadcast">.</span>
            </h2>
          </div>

          <a
            href={links.youtube}
            target="_blank"
            rel="noreferrer"
            data-cursor-label="WATCH"
            className="inline-flex items-center gap-2.5 rounded-full bg-broadcast px-6 py-3 font-mono text-xs font-bold tracking-[0.16em] text-white transition-transform hover:scale-105"
          >
            <Tv className="h-4 w-4" />
            <span>@SACHITHRA228</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* YouTube Video Grid */}
        <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v, idx) => (
            <motion.a
              key={v.id}
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noreferrer"
              data-cursor-label="PLAY"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              className="glass-panel group overflow-hidden rounded-3xl transition-all hover:border-broadcast/60 hover:-translate-y-1"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-surface-2">
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-void/35 transition-colors group-hover:bg-void/15">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-broadcast text-white shadow-[0_0_25px_rgba(255,59,92,0.65)] transition-transform group-hover:scale-110">
                    <Play className="ml-0.5 h-5 w-5 fill-current" />
                  </span>
                </div>
                <span className="absolute left-3 top-3 rounded-full bg-void/80 px-2.5 py-1 font-mono text-[9px] tracking-[0.2em] text-bone backdrop-blur-md">
                  {v.tag}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-display text-base font-bold leading-snug text-bone group-hover:text-volt transition-colors">
                  {v.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom Split: Affiliations & Leadership + References */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Leadership & SLBC */}
          <div className="glass-panel rounded-3xl p-7 lg:col-span-7">
            <div className="mb-6 flex items-center gap-2.5 text-broadcast">
              <Radio className="h-4 w-4" />
              <span className="hud-label">BROADCASTING &amp; LEADERSHIP</span>
            </div>

            <div className="divide-y divide-white/10">
              {affiliations.map((aff) => (
                <div
                  key={aff.org}
                  className="flex flex-col justify-between gap-1 py-3.5 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-3">
                    {aff.highlight && (
                      <span className="h-2 w-2 rounded-full bg-broadcast" />
                    )}
                    <span className="font-display text-base font-bold text-bone">
                      {aff.org}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs ${
                      aff.highlight ? "text-broadcast font-bold" : "text-muted"
                    }`}
                  >
                    {aff.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic & Industry Mentors */}
          <div className="glass-panel flex flex-col justify-between rounded-3xl p-7 lg:col-span-5">
            <div>
              <div className="mb-6 flex items-center gap-2.5 text-volt">
                <Award className="h-4 w-4" />
                <span className="hud-label">MENTORS &amp; REFERENCES</span>
              </div>

              <div className="space-y-5">
                {references.map((ref) => (
                  <div
                    key={ref.name}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="font-mono text-[10px] tracking-[0.2em] text-volt">
                      {ref.note.toUpperCase()}
                    </p>
                    <h4 className="mt-1 font-display text-lg font-bold text-bone">
                      {ref.name}
                    </h4>
                    <p className="mt-0.5 text-xs text-bone/75">{ref.title}</p>
                    <p className="text-xs text-muted">{ref.org}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 font-mono text-[11px] text-muted">
              <Users className="h-3.5 w-3.5 text-volt" />
              <span>OFFICIAL CONTACT DETAILS AVAILABLE ON REQUEST</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
