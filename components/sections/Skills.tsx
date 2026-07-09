"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { skills } from "@/lib/content";
import { useTrack } from "@/components/providers/TrackProvider";
import { useIsNarrow, usePrefersReducedMotion } from "@/lib/hooks";

// ---------- constellation layout (deterministic, precomputed) ----------

const HUBS: Record<string, { x: number; y: number }> = {
  languages: { x: 180, y: 150 },
  frontend: { x: 705, y: 130 },
  backend: { x: 450, y: 320 },
  databases: { x: 175, y: 460 },
  tools: { x: 715, y: 470 },
};

const HUB_LINKS: [string, string][] = [
  ["languages", "frontend"],
  ["languages", "backend"],
  ["frontend", "backend"],
  ["backend", "databases"],
  ["backend", "tools"],
];

type Node = { label: string; x: number; y: number; category: string };

function buildNodes(): Node[] {
  const nodes: Node[] = [];
  for (const group of skills) {
    const hub = HUBS[group.category];
    const n = group.items.length;
    group.items.forEach((label, i) => {
      const angle = (i / n) * Math.PI * 2 + (group.category.length % 5) * 0.55;
      const radius = 86 + (i % 3) * 24;
      // rounded so server- and client-side float precision can't diverge
      // (Math.sin/cos last digits differ across engines → hydration mismatch)
      nodes.push({
        label,
        category: group.category,
        x: Math.round((hub.x + Math.cos(angle) * radius) * 100) / 100,
        y: Math.round((hub.y + Math.sin(angle) * radius * 0.74) * 100) / 100,
      });
    });
  }
  return nodes;
}

const NODES = buildNodes();

/**
 * Skills as a constellation: category hubs joined to each other, skill nodes
 * orbiting their hub. Clusters light up on scroll (staggered) and on hover.
 * Narrow viewports get grouped chip lists instead of the node graph.
 */
export default function Skills() {
  const narrow = useIsNarrow();

  return (
    <section
      id="skills"
      aria-label="Skills"
      data-waypoint
      data-trail-x="0.5"
      className="relative z-10 mx-auto max-w-5xl px-6 py-28 md:py-40"
    >
      <p className="eyebrow text-signal">waypoint 05 — skills</p>
      <h2 className="mt-2 font-display text-3xl md:text-5xl">The constellation</h2>
      <p className="mt-3 max-w-lg text-sm text-slate">
        Grouped by orbit: languages, frontend, backend, databases and tools.
      </p>

      {narrow ? <ChipLists /> : <Constellation />}
    </section>
  );
}

function ChipLists() {
  return (
    <div className="mt-10 flex flex-col gap-8">
      {skills.map((group) => (
        <div key={group.category}>
          <h3 className="eyebrow mb-3 text-stage">{group.category}</h3>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-fog bg-fog/50 px-3.5 py-1.5 font-mono text-xs text-paper/90"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Constellation() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { track } = useTrack();

  useEffect(() => {
    if (reducedMotion) return;
    const svg = svgRef.current;
    if (!svg) return;
    const ctx = gsap.context(() => {
      gsap.from(svg.querySelectorAll("[data-node]"), {
        scale: 0,
        transformOrigin: "center",
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.045,
        ease: "back.out(2)",
        scrollTrigger: { trigger: svg, start: "top 75%", once: true },
      });
      gsap.from(svg.querySelectorAll("[data-edge]"), {
        autoAlpha: 0,
        duration: 1.1,
        stagger: 0.03,
        ease: "power2.out",
        scrollTrigger: { trigger: svg, start: "top 75%", once: true },
      });
    }, svg);
    return () => ctx.revert();
  }, [reducedMotion]);

  // frontend cluster blooms pink on the design track only
  const clusterColor = (category: string) =>
    track === "design" && category === "frontend"
      ? "var(--bloom)"
      : "var(--signal)";

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 900 600"
      role="img"
      aria-label="Skill constellation grouped by languages, frontend, backend, databases and tools"
      className="mt-10 w-full"
    >
      {/* hub-to-hub spine */}
      {HUB_LINKS.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          data-edge
          x1={HUBS[a].x}
          y1={HUBS[a].y}
          x2={HUBS[b].x}
          y2={HUBS[b].y}
          stroke="var(--signal)"
          strokeOpacity="0.18"
          strokeDasharray="4 6"
        />
      ))}

      {/* node-to-hub edges */}
      {NODES.map((node) => {
        const hub = HUBS[node.category];
        const lit = active === node.category;
        return (
          <line
            key={`e-${node.label}`}
            data-edge
            x1={hub.x}
            y1={hub.y}
            x2={node.x}
            y2={node.y}
            stroke={clusterColor(node.category)}
            strokeOpacity={lit ? 0.55 : 0.16}
            style={{ transition: "stroke-opacity 0.25s" }}
          />
        );
      })}

      {/* category hubs */}
      {Object.entries(HUBS).map(([category, hub]) => {
        const lit = active === category;
        return (
          <g
            key={category}
            data-node
            onMouseEnter={() => setActive(category)}
            onMouseLeave={() => setActive(null)}
            style={{ cursor: "default" }}
          >
            <circle
              cx={hub.x}
              cy={hub.y}
              r={lit ? 13 : 10}
              fill={clusterColor(category)}
              fillOpacity={lit ? 0.9 : 0.65}
              style={{ transition: "all 0.25s" }}
            />
            <circle
              cx={hub.x}
              cy={hub.y}
              r={18}
              fill="none"
              stroke={clusterColor(category)}
              strokeOpacity={lit ? 0.5 : 0.2}
              style={{ transition: "stroke-opacity 0.25s" }}
            />
            <text
              x={hub.x}
              y={hub.y - 34}
              textAnchor="middle"
              fill="var(--paper)"
              fillOpacity={lit ? 1 : 0.75}
              style={{
                font: "600 13px var(--font-jetbrains), monospace",
                letterSpacing: "0.15em",
                transition: "fill-opacity 0.25s",
              }}
            >
              {category}
            </text>
          </g>
        );
      })}

      {/* skill nodes */}
      {NODES.map((node) => {
        const lit = active === node.category;
        return (
          <g
            key={node.label}
            data-node
            onMouseEnter={() => setActive(node.category)}
            onMouseLeave={() => setActive(null)}
            style={{ cursor: "default" }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={lit ? 5.5 : 4}
              fill={lit ? clusterColor(node.category) : "var(--paper)"}
              fillOpacity={lit ? 1 : 0.55}
              style={{ transition: "all 0.25s" }}
            />
            <text
              x={node.x}
              // labels flip above the node when it orbits above its hub,
              // so they never collide with the hub's own label
              y={node.y + (node.y < HUBS[node.category].y - 24 ? -12 : 18)}
              textAnchor="middle"
              fill={lit ? "var(--paper)" : "var(--slate)"}
              style={{
                font: "11px var(--font-jetbrains), monospace",
                transition: "fill 0.25s",
              }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
