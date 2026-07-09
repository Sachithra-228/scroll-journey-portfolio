import Reveal from "@/components/Reveal";
import { affiliations } from "@/lib/content";

export default function Affiliations() {
  return (
    <section
      id="affiliations"
      aria-label="Affiliations"
      data-waypoint
      data-trail-x="0.3"
      className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:py-28"
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
      </Reveal>
    </section>
  );
}
