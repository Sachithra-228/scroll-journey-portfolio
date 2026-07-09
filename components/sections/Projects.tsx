"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useTrack } from "@/components/providers/TrackProvider";
import { mobileApps, projects } from "@/lib/content";

/**
 * Projects re-frame themselves per track: the design track tells the ui/ux
 * story, the backend track talks architecture and stack. Same projects,
 * different lens — switching the nav pill crossfades the copy in place.
 */
export default function Projects() {
  const { track } = useTrack();
  const reducedMotion = useReducedMotion();
  const isDesign = track === "design";

  return (
    <section
      id="projects"
      aria-label="Projects"
      data-waypoint
      data-trail-x="0.82"
      className="relative z-10 mx-auto max-w-5xl px-6 py-28 md:py-40"
    >
      <Reveal>
        <div data-reveal>
          <p className="eyebrow text-signal">
            waypoint 04 — projects · {isDesign ? "through the design lens" : "through the systems lens"}
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl">
            {isDesign ? "How they feel" : "How they run"}
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-6">
          {projects.map((project) => (
            <article
              key={project.name}
              data-reveal
              className={`rounded-2xl border p-7 transition-colors md:p-9 ${
                isDesign
                  ? "border-fog bg-fog/50 hover:border-bloom/50"
                  : "border-fog bg-ink hover:border-signal/50"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3
                  className={`font-display text-2xl md:text-3xl ${
                    isDesign ? "text-paper" : "text-paper"
                  }`}
                >
                  {project.name}
                </h3>
                <ul className="flex flex-wrap gap-2" aria-label="Stack">
                  {project.stack.map((tech, i) => (
                    <li
                      key={tech}
                      className={`rounded-full border px-3 py-1 font-mono text-[11px] ${
                        isDesign
                          ? i % 2 === 0
                            ? "border-bloom/40 text-bloom"
                            : "border-citrus/40 text-citrus"
                          : "border-signal/30 text-signal"
                      }`}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={track}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className={`mt-4 max-w-3xl leading-relaxed ${
                    isDesign ? "text-slate" : "font-mono text-sm text-slate"
                  }`}
                >
                  {isDesign ? project.design : project.backend}
                </motion.p>
              </AnimatePresence>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-14">
          <p className="eyebrow text-slate">also shipped — mobile</p>
          <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {mobileApps.map((app) => (
              <li
                key={app.name}
                className="rounded-xl border border-fog bg-fog/40 p-4 transition-colors hover:border-slate/60"
              >
                <p className="text-sm text-paper">{app.name}</p>
                <p className="mt-1 font-mono text-[11px] text-slate">{app.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
