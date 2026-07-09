"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { useTrack } from "@/components/providers/TrackProvider";
import { experience } from "@/lib/content";

export default function Experience() {
  const reducedMotion = useReducedMotion();
  const { track } = useTrack();

  return (
    <section
      id="experience"
      aria-label="Experience"
      data-waypoint
      data-trail-x="0.8"
      className="relative z-10 mx-auto max-w-5xl px-6 py-28 md:py-40"
    >
      <Reveal>
        <div data-reveal>
          <p className="eyebrow text-signal">waypoint 02 — experience</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl">
            {experience.company}
          </h2>
          <p className="mt-2 font-mono text-xs text-slate">{experience.period}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {experience.roles.map((role) => (
            <motion.article
              key={role.title}
              data-reveal
              whileHover={reducedMotion ? undefined : { y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="rounded-2xl border border-fog bg-fog/50 p-7 transition-colors hover:border-signal/50"
            >
              <p className="font-mono text-xs text-signal">{role.role}</p>
              <h3 className="mt-2 font-display text-2xl">{role.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {track === "design" ? role.short : role.summary}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Keywords">
                {role.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-fog px-3 py-1 font-mono text-[11px] text-slate"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
