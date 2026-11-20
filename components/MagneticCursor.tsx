"use client";

import { useEffect, useRef, useState } from "react";

// Minimal subtle trailing cursor ring — keeps native pointer crisp & NEVER covers buttons!
export default function MagneticCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [hiddenOnControl, setHiddenOnControl] = useState(false);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduced) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as HTMLElement | null;
      setHiddenOnControl(Boolean(target?.closest("a, button")));
    };

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[89] hidden h-7 w-7 rounded-full border border-volt/50 transition-opacity duration-200 md:block ${
        hiddenOnControl ? "opacity-0" : "opacity-60"
      }`}
    />
  );
}
