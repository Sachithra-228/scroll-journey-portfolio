"use client";

import type Lenis from "lenis";

// Module-level handle so any component (fork lock, nav links) can reach the
// active Lenis instance without prop-drilling. Null when smooth scroll is
// disabled (reduced motion) — callers must handle both cases.
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

/** Hard-lock scrolling (fork section). Works with or without Lenis. */
export function lockScroll() {
  lenis?.stop();
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  document.documentElement.style.overflow = "";
  lenis?.start();
}

export function scrollToTarget(target: string | HTMLElement) {
  if (lenis) {
    lenis.scrollTo(target, { offset: 0 });
  } else {
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
}
