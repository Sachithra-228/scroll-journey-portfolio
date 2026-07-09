"use client";

import { useTrack } from "@/components/providers/TrackProvider";
import { scrollToTarget } from "@/lib/scroll";

/**
 * Fixed top nav: wordmark, the persistent track pill (appears once a track
 * has been chosen at the fork) and a contact shortcut.
 */
export default function Nav() {
  const { track, chosen, choose } = useTrack();

  return (
    <nav
      aria-label="Site"
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-10"
    >
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          scrollToTarget("#top");
        }}
        className="eyebrow text-paper/80 transition-colors hover:text-signal"
      >
        sachithra.w
      </a>

      <div className="flex items-center gap-3 md:gap-5">
        {chosen && (
          <div
            role="group"
            aria-label="Switch track"
            className="flex items-center rounded-full border border-fog bg-ink/80 p-1 font-mono text-xs backdrop-blur"
          >
            <button
              type="button"
              onClick={() => choose("design")}
              aria-pressed={track === "design"}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                track === "design"
                  ? "bg-signal text-ink"
                  : "text-slate hover:text-paper"
              }`}
            >
              ◐ design
            </button>
            <button
              type="button"
              onClick={() => choose("backend")}
              aria-pressed={track === "backend"}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                track === "backend"
                  ? "bg-signal text-ink"
                  : "text-slate hover:text-paper"
              }`}
            >
              ⚙ backend
            </button>
          </div>
        )}

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget("#contact");
          }}
          className="eyebrow hidden text-stage transition-colors hover:text-paper sm:block"
        >
          let&apos;s talk
        </a>
      </div>
    </nav>
  );
}
