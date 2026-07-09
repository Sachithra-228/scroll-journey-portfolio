"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Scroll-reveal wrapper: children marked with [data-reveal] slide/fade in
 * with a stagger when the wrapper enters the viewport. Under reduced motion
 * nothing is hidden or animated.
 */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.from(items, {
        y: 42,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: root,
          start: "top 76%",
          once: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
