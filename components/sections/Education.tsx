import Reveal from "@/components/Reveal";
import { education } from "@/lib/content";

/** A stylized gate/waypoint marker sitting on the trail. */
function GateMarker() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className="size-12 text-signal"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M14 56 V26 a18 18 0 0 1 36 0 V56" />
      <path d="M24 56 V32 a8 8 0 0 1 16 0 V56" opacity="0.5" />
      <circle cx="32" cy="14" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Education() {
  return (
    <section
      id="education"
      aria-label="Education"
      data-waypoint
      data-trail-x="0.18"
      className="relative z-10 mx-auto max-w-5xl px-6 py-28 md:py-40"
    >
      <Reveal>
        <div data-reveal className="mb-10 flex items-center gap-4">
          <GateMarker />
          <div>
            <p className="eyebrow text-signal">waypoint 01</p>
            <h2 className="mt-1 font-display text-3xl md:text-5xl">Education</h2>
          </div>
        </div>

        <ol className="relative ml-2 border-l border-fog pl-8">
          {education.map((item) => (
            <li key={item.title} data-reveal className="relative pb-10 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[37px] top-1.5 size-2.5 rounded-full bg-signal"
              />
              <p className="font-mono text-xs text-slate">{item.period}</p>
              <h3 className="mt-1 text-lg text-paper md:text-xl">{item.title}</h3>
              <p className="text-sm text-slate">
                {item.place}
                {item.note ? ` — ${item.note}` : ""}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
