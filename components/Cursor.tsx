"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Custom cursor: a small signal-colored dot with a trailing glow that lerps
 * behind it. Desktop (fine pointer) only; disabled under reduced motion.
 * Interactive elements grow the glow ring slightly.
 */
export default function Cursor() {
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      delete document.body.dataset.cursor;
      return;
    }
    document.body.dataset.cursor = "on";

    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    let x = -100;
    let y = -100;
    let gx = -100;
    let gy = -100;
    let hovering = false;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = e.target as Element | null;
      hovering = !!target?.closest?.(
        "a, button, [role='button'], input, textarea, [data-interactive]"
      );
    };

    const loop = () => {
      gx += (x - gx) * 0.16;
      gy += (y - gy) * 0.16;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      const scale = hovering ? 2.2 : 1;
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      delete document.body.dataset.cursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 size-8 rounded-full bg-signal/20 blur-[6px] transition-transform duration-150"
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 size-[6px] rounded-full bg-signal"
      />
    </div>
  );
}
