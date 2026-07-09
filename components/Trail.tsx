"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsNarrow, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * The site's signature: one continuous SVG path running the full page height,
 * drawn in via stroke-dashoffset scrubbed to scroll progress. A glowing
 * avatar node travels the path via getPointAtLength() on the same progress
 * value. The route is generated from every [data-waypoint] section, so it
 * survives layout changes (fork pin-spacer, resizes) by rebuilding on
 * ScrollTrigger refresh.
 *
 * Below 768px this is replaced by a plain vertical progress line down the
 * left edge — no path-following math on mobile.
 */
export default function Trail() {
  const narrow = useIsNarrow();
  const reducedMotion = usePrefersReducedMotion();

  if (narrow) return <MobileProgressLine reducedMotion={reducedMotion} />;
  return <DesktopTrail reducedMotion={reducedMotion} />;
}

function DesktopTrail({ reducedMotion }: { reducedMotion: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const avatarRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const route = routeRef.current;
    const draw = drawRef.current;
    const avatar = avatarRef.current;
    if (!svg || !route || !draw || !avatar) return;

    const container = svg.parentElement as HTMLElement;
    let pathLength = 0;
    let progress = 0;

    const buildPath = () => {
      const cRect = container.getBoundingClientRect();
      const cTop = cRect.top + window.scrollY;
      const w = container.offsetWidth;
      // offsetHeight, not scrollHeight: the svg itself must never feed back
      // into the measurement once a pin-spacer has come and gone.
      const h = container.offsetHeight;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.setAttribute("width", `${w}`);
      svg.setAttribute("height", `${h}`);

      const waypoints = Array.from(
        document.querySelectorAll<HTMLElement>("[data-waypoint]")
      );
      if (waypoints.length < 2) return;

      const pts = waypoints.map((el) => {
        const r = el.getBoundingClientRect();
        const top = r.top + window.scrollY - cTop;
        const xf = parseFloat(el.dataset.trailX ?? "0.5");
        const yf = parseFloat(el.dataset.trailY ?? "0.5");
        return { x: w * xf, y: top + r.height * yf };
      });

      // Smooth vertical S-curves between waypoints.
      let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        const dy = (p1.y - p0.y) * 0.5;
        d += ` C ${p0.x.toFixed(1)} ${(p0.y + dy).toFixed(1)}, ${p1.x.toFixed(
          1
        )} ${(p1.y - dy).toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
      }
      route.setAttribute("d", d);
      draw.setAttribute("d", d);

      pathLength = draw.getTotalLength();
      draw.style.strokeDasharray = `${pathLength}`;
      render();
    };

    const render = () => {
      if (!pathLength) return;
      const p = reducedMotion ? 1 : progress;
      draw.style.strokeDashoffset = `${pathLength * (1 - p)}`;
      const pt = draw.getPointAtLength(pathLength * p);
      avatar.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
    };

    buildPath();

    const proxy = { p: 0 };
    let tween: gsap.core.Tween | undefined;
    if (!reducedMotion) {
      tween = gsap.to(proxy, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
        onUpdate: () => {
          progress = proxy.p;
          render();
        },
      });
    }

    const onRefresh = () => buildPath();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    const ro = new ResizeObserver(() => buildPath());
    ro.observe(container);

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      ro.disconnect();
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [reducedMotion]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* faint full route, always visible */}
      <path
        ref={routeRef}
        fill="none"
        stroke="var(--signal)"
        strokeOpacity="0.1"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      {/* the drawn-in portion, scrubbed to scroll */}
      <path
        ref={drawRef}
        fill="none"
        stroke="var(--signal)"
        strokeOpacity="0.85"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {/* travelling avatar node */}
      <g ref={avatarRef}>
        <circle r="14" fill="var(--stage)" opacity="0.25"
          style={{ filter: "blur(6px)" }} />
        <circle r="5" fill="var(--stage)" />
        <circle r="8" fill="none" stroke="var(--stage)" strokeOpacity="0.5" strokeWidth="1" />
      </g>
    </svg>
  );
}

function MobileProgressLine({ reducedMotion }: { reducedMotion: boolean }) {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const fill = fillRef.current;
    const dot = dotRef.current;
    if (!fill || !dot) return;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      fill.style.transform = `scaleY(${p})`;
      dot.style.top = `${p * 100}%`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-[10px] top-0 z-0 h-full w-[2px]"
    >
      <div className="absolute inset-0 bg-signal/10" />
      <div
        ref={fillRef}
        className="absolute inset-0 origin-top bg-signal/80"
        style={{ transform: reducedMotion ? "scaleY(1)" : "scaleY(0)" }}
      />
      {!reducedMotion && (
        <div
          ref={dotRef}
          className="absolute -left-[3px] size-2 rounded-full bg-stage shadow-[0_0_10px_2px_rgba(242,169,59,0.5)]"
        />
      )}
    </div>
  );
}
