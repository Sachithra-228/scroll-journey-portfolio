"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useTrack } from "@/components/providers/TrackProvider";
import { extras, projects } from "@/lib/content";

// per-project cover accents for the design view (no screenshots exist for
// these apps, so each gets its own gradient identity instead)
const COVERS = [
  "radial-gradient(120% 120% at 20% 0%, rgba(232,93,138,0.5), transparent 60%), radial-gradient(120% 120% at 90% 100%, rgba(53,201,176,0.35), transparent 60%)",
  "radial-gradient(120% 120% at 80% 0%, rgba(242,169,59,0.45), transparent 60%), radial-gradient(120% 120% at 10% 100%, rgba(242,115,74,0.4), transparent 60%)",
  "radial-gradient(120% 120% at 15% 10%, rgba(53,201,176,0.45), transparent 60%), radial-gradient(120% 120% at 85% 90%, rgba(232,93,138,0.35), transparent 60%)",
  "radial-gradient(120% 120% at 85% 10%, rgba(242,115,74,0.45), transparent 60%), radial-gradient(120% 120% at 15% 95%, rgba(242,169,59,0.3), transparent 60%)",
];

/**
 * Projects re-frame themselves per track: the design track is visual and
 * brief — gradient covers, one-line stories; the backend track talks
 * architecture and stack in full. The nav pill crossfades between them.
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
      className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-40"
    >
      <Reveal>
        <div data-reveal>
          <p className="eyebrow text-signal">
            waypoint 04 — projects ·{" "}
            {isDesign ? "through the design lens" : "through the systems lens"}
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl">
            {isDesign ? "How they feel" : "How they run"}
          </h2>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {isDesign ? (
            <motion.div
              key="design"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="mt-12 grid gap-5 md:grid-cols-2"
            >
              {projects.map((project, i) => (
                <motion.article
                  key={project.name}
                  data-reveal
                  whileHover={reducedMotion ? undefined : { y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group overflow-hidden rounded-2xl border border-fog bg-fog/50 transition-colors hover:border-bloom/50"
                >
                  <div
                    aria-hidden="true"
                    className="h-28 transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ background: COVERS[i % COVERS.length] }}
                  />
                  <div className="p-6">
                    <h3 className="font-display text-2xl">{project.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate">
                      {project.design}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
                      {project.stack.map((tech, j) => (
                        <li
                          key={tech}
                          className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] ${
                            j % 2 === 0
                              ? "border-bloom/40 text-bloom"
                              : "border-citrus/40 text-citrus"
                          }`}
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="backend"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="mt-12 flex flex-col gap-6"
            >
              {projects.map((project) => (
                <article
                  key={project.name}
                  data-reveal
                  className="rounded-2xl border border-fog bg-ink p-7 transition-colors hover:border-signal/50 md:p-9"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl md:text-3xl">
                      {project.name}
                    </h3>
                    <ul className="flex flex-wrap gap-2" aria-label="Stack">
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-signal/30 px-3 py-1 font-mono text-[11px] text-signal"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-4 max-w-3xl font-mono text-sm leading-relaxed text-slate">
                    {project.backend}
                  </p>
                </article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div data-reveal className="mt-14">
          <p className="eyebrow text-slate">also shipped — web & mobile</p>
          <ul className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {extras.map((item) => {
              const body = (
                <>
                  <p className="text-sm text-paper">
                    {item.name}
                    {item.url && (
                      <span className="ml-1 text-signal" aria-hidden="true">
                        ↗
                      </span>
                    )}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-slate">
                    {item.note} · {item.kind}
                  </p>
                </>
              );
              return (
                <li
                  key={item.name}
                  className="rounded-xl border border-fog bg-fog/40 transition-colors hover:border-slate/60"
                >
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4"
                      aria-label={`Visit ${item.name}`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="p-4">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
