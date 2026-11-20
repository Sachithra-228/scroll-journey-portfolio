"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Code2, Palette, Smartphone } from "lucide-react";
import {
  experience,
  featuredProjects,
  mobileAndExtraProjects,
} from "@/lib/content";

export default function EngineeringChapter() {
  const [lens, setLens] = useState<"design" | "arch">("arch");

  return (
    <section
      id="engineering"
      className="relative z-20 min-h-screen px-5 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        {/* Header */}
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <p className="hud-label text-cyber mb-3">
              04 / 07 — INDUSTRY &amp; SYSTEMS
            </p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-bone sm:text-6xl md:text-7xl">
              ENGINEERING<span className="text-cyber">.</span>
            </h2>
          </div>

          {/* Interactive Lens Switch */}
          <div className="glass-panel inline-flex rounded-full p-1">
            <button
              type="button"
              onClick={() => setLens("arch")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] font-bold tracking-[0.16em] transition-all ${
                lens === "arch"
                  ? "bg-cyber text-void"
                  : "text-bone/70 hover:text-bone"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>ARCHITECTURE</span>
            </button>
            <button
              type="button"
              onClick={() => setLens("design")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] font-bold tracking-[0.16em] transition-all ${
                lens === "design"
                  ? "bg-volt text-void"
                  : "text-bone/70 hover:text-bone"
              }`}
            >
              <Palette className="h-3.5 w-3.5" />
              <span>PRODUCT &amp; UX</span>
            </button>
          </div>
        </div>

        {/* Industry Experience — Liveroom Technologies */}
        <div className="mb-16">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyber/15 text-cyber">
                <Briefcase className="h-4 w-4" />
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold text-bone">
                  {experience.company}
                </h3>
                <p className="font-mono text-xs text-muted">{experience.role}</p>
              </div>
            </div>
            <span className="rounded-full border border-cyber/30 bg-cyber/10 px-4 py-1.5 font-mono text-xs text-cyber">
              {experience.period}
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {experience.projects.map((proj, idx) => (
              <motion.article
                key={proj.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-panel group relative overflow-hidden rounded-3xl p-7 transition-colors hover:border-cyber/50"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-xs text-cyber">
                    EXP // 0{idx + 1}
                  </span>
                  <span className="font-mono text-[11px] text-muted">
                    {proj.role}
                  </span>
                </div>
                <h4 className="font-display text-2xl font-extrabold text-bone group-hover:text-cyber transition-colors">
                  {proj.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-bone/75 md:text-base">
                  {proj.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-bone/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Featured Systems Grid */}
        <div className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <p className="hud-label text-volt">SELECTED SYSTEMS &amp; AI BUILDS</p>
            <p className="font-mono text-[11px] text-muted">
              SHOWING:{" "}
              <span className={lens === "arch" ? "text-cyber" : "text-volt"}>
                {lens === "arch" ? "SYSTEM ARCHITECTURE" : "UX & PRODUCT CRAFT"}
              </span>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="glass-panel flex flex-col justify-between rounded-3xl p-7 transition-all hover:border-volt/45"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
                      {project.category}
                    </span>
                    <span className="rounded-full bg-volt/15 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.16em] text-volt">
                      {project.metric}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-extrabold text-bone sm:text-3xl">
                    {project.name}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-bone/80 md:text-base">
                    {lens === "arch" ? project.archPitch : project.designPitch}
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] text-bone/85"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Mobile Apps & Extra Lab */}
        <div>
          <div className="mb-5 flex items-center gap-2.5">
            <Smartphone className="h-4 w-4 text-volt" />
            <p className="hud-label text-bone/85">
              MOBILE APPS &amp; EXPERIMENTAL BUILDS
            </p>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {mobileAndExtraProjects.map((item) => {
              const card = (
                <div className="glass-panel group flex h-full flex-col justify-between rounded-2xl p-5 transition-all hover:border-volt/50 hover:-translate-y-0.5">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.18em] text-cyber">
                        {item.kind}
                      </span>
                      {item.url && (
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-volt" />
                      )}
                    </div>
                    <h4 className="font-display text-lg font-bold text-bone group-hover:text-volt transition-colors">
                      {item.name}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {item.note}
                    </p>
                  </div>
                </div>
              );

              return item.url ? (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-label="OPEN"
                >
                  {card}
                </a>
              ) : (
                <div key={item.name}>{card}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
