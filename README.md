# Sachithra Wijesinghe — scroll journey portfolio

A single-page, scroll-driven portfolio built as a journey along one continuous teal trail — with a fork where visitors choose to see the **ui/ux side** or the **backend side** of the same work.

**Live sites, real work:** [teamsyncode.com](https://www.teamsyncode.com/) · [YouTube @sachithra228](https://www.youtube.com/@sachithra228)

## Stack

- Next.js (App Router) + TypeScript, static export
- Tailwind CSS v4
- GSAP + ScrollTrigger (scroll-scrubbed trail, pinned fork, reveals)
- Lenis (smooth scroll) + Framer Motion (micro-interactions)

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static export
npm run capture  # refresh client-site screenshots in public/sites/
                 # (first: npx playwright install chromium)
```

All copy and links live in [`lib/content.ts`](lib/content.ts).

## Notes

- The trail (`components/Trail.tsx`) is one SVG path generated from every section's `data-waypoint`, drawn by scroll progress, with an avatar node following via `getPointAtLength()`. Below 768px it becomes a simple progress line.
- The fork pins and locks scrolling until a track is chosen; the chosen track re-frames experience, SYNCODE and projects — visual on the design side, architecture-first on the backend side.
- Respects `prefers-reduced-motion` throughout.
