"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { affiliations, links, videos } from "@/lib/content";

export default function Affiliations() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="affiliations"
      aria-label="Affiliations and presenting"
      data-waypoint
      data-trail-x="0.3"
      className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28"
    >
      <Reveal>
        <p data-reveal className="eyebrow text-signal">
          along the way
        </p>
        <ul
          data-reveal
          className="mt-6 flex flex-wrap items-center gap-3"
          aria-label="Clubs and roles"
        >
          {affiliations.map((name) => (
            <li
              key={name}
              className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
                name.includes("SLBC")
                  ? "border-stage/50 text-stage hover:border-stage"
                  : "border-fog text-slate hover:border-slate hover:text-paper"
              }`}
            >
              {name}
            </li>
          ))}
        </ul>

        {/* presenter moment: recent uploads from the YouTube channel */}
        <div data-reveal className="mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <p className="eyebrow text-stage">on air — youtube</p>
              <h3 className="mt-2 font-display text-2xl md:text-3xl">
                Teaching tech, in Sinhala
              </h3>
            </div>
            <a
              href={links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest text-slate transition-colors hover:text-stage"
            >
              all videos ↗
            </a>
          </div>

          <ul
            className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4"
            aria-label="Recent videos"
          >
            {videos.map((video) => (
              <motion.li
                key={video.id}
                whileHover={reducedMotion ? undefined : { y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group overflow-hidden rounded-2xl border border-fog bg-fog/50 transition-colors hover:border-stage/60"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Watch on YouTube: ${video.title}`}
                  className="block"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                      alt=""
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-ink/30 opacity-0 transition-opacity group-hover:opacity-100">
                      <span
                        aria-hidden="true"
                        className="flex size-11 items-center justify-center rounded-full bg-stage pl-0.5 text-ink"
                      >
                        ▶
                      </span>
                    </div>
                  </div>
                  <p className="p-3.5 text-xs leading-relaxed text-paper/90">
                    {video.title}
                  </p>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
