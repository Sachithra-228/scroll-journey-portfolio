"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import { chapters, links } from "@/lib/content";
import { scrollToTarget } from "@/lib/scroll";

const DRAWER_SOCIALS = [
  {
    name: "Team SYNCODE",
    href: links.syncode,
    hoverClass:
      "hover:bg-white hover:text-[#08090d] hover:border-white",
  },
  {
    name: "YouTube",
    href: links.youtube,
    hoverClass:
      "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
  },
  {
    name: "GitHub",
    href: links.github,
    hoverClass:
      "hover:bg-[#f0f6fc] hover:text-[#0d1117] hover:border-[#f0f6fc]",
  },
  {
    name: "LinkedIn",
    href: links.linkedin,
    hoverClass:
      "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
  },
];

export default function StoryHud() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hudVisible, setHudVisible] = useState(false);

  useEffect(() => {
    const onToggle = () => setMenuOpen((o) => !o);
    window.addEventListener("hud:toggleMenu", onToggle);
    return () => window.removeEventListener("hud:toggleMenu", onToggle);
  }, []);

  useEffect(() => {
    setHudVisible(activeIndex > 0);
  }, [activeIndex]);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(p);

      const mid = window.innerHeight * 0.42;
      let found = 0;
      chapters.forEach((ch, idx) => {
        const el = document.getElementById(ch.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= mid) found = idx;
        }
      });
      setActiveIndex(found);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentChapter = chapters[activeIndex] ?? chapters[0];

  const handleNav = (id: string) => {
    setMenuOpen(false);
    scrollToTarget(`#${id}`);
  };

  const handleBotBoost = () => {
    window.dispatchEvent(new CustomEvent("syncbot:boost"));
  };

  return (
    <>
      {/* TOP FIXED HUD (Appears smoothly once scrolled into Chapters 02 - 07) */}
      <header
        className={`fixed inset-x-0 top-0 z-50 px-5 py-4 transition-all duration-500 md:px-10 md:py-6 ${
          hudVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <button
            type="button"
            onClick={() => handleNav("hero")}
            className="glass-panel group flex items-center gap-3 rounded-full px-4 py-2 text-left transition-colors hover:border-volt/50"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-volt font-mono text-[11px] font-bold text-void">
              &lt;&lt;
            </span>
            <span className="font-display text-xs font-bold tracking-[0.14em] text-bone sm:text-sm">
              SACHITHRA
              <span className="text-volt">.W</span>
            </span>
          </button>

          <div className="glass-panel hidden items-center gap-4 rounded-full px-5 py-2 md:flex">
            <span className="font-mono text-xs font-bold text-volt">
              {currentChapter.num} / 0{chapters.length}
            </span>
            <div className="flex items-center gap-1.5">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => handleNav(ch.id)}
                  aria-label={`Jump to ${ch.label}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-7 bg-volt"
                      : idx < activeIndex
                      ? "w-3 bg-bone/50"
                      : "w-2 bg-white/15 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-bone/80">
              {currentChapter.label}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleBotBoost}
              className="glass-panel hidden items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.16em] text-bone/90 transition-all hover:border-cyber/60 hover:text-cyber sm:flex"
            >
              <Sparkles className="h-3.5 w-3.5 text-volt" />
              <span>PING BOT</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full bg-volt px-4 py-2 font-mono text-xs font-bold tracking-[0.16em] text-void transition-transform hover:scale-105 active:scale-95"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              <span>{menuOpen ? "CLOSE" : "MENU"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* VERTICAL RIGHT PROGRESS BAR */}
      <div
        aria-hidden="true"
        className="fixed right-4 top-1/2 z-40 hidden h-36 w-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/10 lg:block"
      >
        <div
          className="w-full bg-volt transition-all duration-150"
          style={{ height: `${Math.max(8, progress * 100)}%` }}
        />
      </div>

      {/* RIGHT-SIDE WIDE SLIDE-IN DRAWER MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Subtle click-away backdrop */}
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-[3px]"
            />

            {/* Right-Side Wider Drawer Panel */}
            <motion.aside
              key="right-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[80] flex w-[92vw] max-w-[520px] flex-col justify-between border-l border-white/10 bg-[#08090d]/96 px-7 py-8 text-bone shadow-[-24px_0_80px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:px-10"
            >
              {/* Drawer Header — SACHITHRA */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-volt font-mono text-xs font-bold text-void">
                    &lt;&lt;
                  </span>
                  <span className="font-display text-lg font-extrabold tracking-[0.14em] text-bone">
                    SACHITHRA
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close Menu"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-bone/80 transition-colors hover:border-volt hover:text-volt"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Chapter Links */}
              <nav className="my-auto flex flex-col gap-1.5 py-6">
                {chapters.map((ch, idx) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => handleNav(ch.id)}
                    className="group flex items-center justify-between rounded-xl px-4 py-3 text-left transition-colors hover:bg-white/[0.06]"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="font-mono text-xs text-volt">
                        {ch.num}
                      </span>
                      <span
                        className={`font-display text-2xl font-extrabold tracking-tight transition-transform duration-200 group-hover:translate-x-2 sm:text-3xl ${
                          idx === activeIndex
                            ? "text-volt"
                            : "text-bone group-hover:text-volt"
                        }`}
                      >
                        {ch.label}
                      </span>
                    </div>
                    {idx === activeIndex && (
                      <span className="h-2.5 w-2.5 rounded-full bg-volt" />
                    )}
                  </button>
                ))}
              </nav>

              {/* Drawer Footer: 4 Brand-Matched Hover Buttons Only */}
              <div className="border-t border-white/10 pt-6">
                <div className="grid grid-cols-2 gap-3">
                  {DRAWER_SOCIALS.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`group flex items-center justify-between rounded-xl border border-white/15 bg-[#0e1017] px-4 py-3.5 font-mono text-xs font-bold tracking-[0.1em] text-white transition-all duration-300 ${s.hoverClass}`}
                    >
                      <span>{s.name}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
