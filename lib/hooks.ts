"use client";

import { useCallback, useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false // SSR: assume false (mobile-safe defaults handled per call site)
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True below the 768px breakpoint where choreography is simplified. */
export function useIsNarrow() {
  return useMediaQuery("(max-width: 767px)");
}

/** True on devices with a fine pointer (mouse) — custom cursor territory. */
export function useFinePointer() {
  return useMediaQuery("(pointer: fine) and (hover: hover)");
}
