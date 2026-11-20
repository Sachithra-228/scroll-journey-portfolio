"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, MessageCircle, Sparkles } from "lucide-react";
import { identity, links } from "@/lib/content";

const SOCIALS = [
  { label: "TEAM SYNCODE", href: links.syncode },
  { label: "YOUTUBE", href: links.youtube },
  { label: "GITHUB", href: links.github },
  { label: "LINKEDIN", href: links.linkedin },
  { label: "INSTAGRAM", href: links.instagram },
  { label: "TIKTOK", href: links.tiktok },
  { label: "FACEBOOK", href: links.facebook },
  { label: "WHATSAPP CHANNEL", href: links.whatsappChannel },
];

export default function ContactChapter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      window.dispatchEvent(new CustomEvent("syncbot:boost"));
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = links.email;
    }
  };

  return (
    <section
      id="contact"
      className="relative z-20 flex min-h-screen flex-col justify-between px-5 pb-10 pt-24 md:px-12 md:pb-12 md:pt-32"
    >
      <div className="mx-auto my-auto w-full max-w-[1440px]">
        <p className="hud-label text-volt mb-4">07 / 07 — TRANSMIT SIGNAL</p>

        <h2 className="max-w-4xl font-display text-[clamp(2.8rem,8vw,7.4rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-bone">
          LET&apos;S BUILD SOMETHING{" "}
          <span className="text-volt">UNREAL</span>
          <span className="text-cyber">.</span>
        </h2>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-bone/75 md:text-lg">
          Need an award-level website from Team SYNCODE, a full-stack engineer
          for your product, or a creator &amp; presenter for your next stage?
          Let&apos;s make it happen.
        </p>

        {/* Primary Contact Actions */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noreferrer"
            data-cursor-label="CHAT"
            className="group inline-flex items-center gap-3 rounded-full bg-volt px-8 py-4 font-mono text-xs font-bold tracking-[0.18em] text-void transition-all hover:scale-[1.03] hover:shadow-[0_0_36px_rgba(210,255,0,0.5)]"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WHATSAPP DIRECT</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <a
            href={links.email}
            data-cursor-label="MAIL"
            className="glass-panel inline-flex items-center gap-3 rounded-full px-7 py-4 font-mono text-xs tracking-[0.14em] text-bone transition-colors hover:border-volt/60 hover:text-volt"
          >
            <Mail className="h-4 w-4 text-volt" />
            <span>{identity.email}</span>
          </a>

          <button
            type="button"
            onClick={copyEmail}
            data-cursor-label="COPY"
            className="glass-panel inline-flex items-center gap-2 rounded-full px-5 py-4 font-mono text-xs tracking-[0.16em] text-muted transition-colors hover:border-cyber/60 hover:text-cyber"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-volt" />
                <span className="text-volt">COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>COPY EMAIL</span>
              </>
            )}
          </button>
        </div>

        {/* Social Links Grid */}
        <div className="mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              data-cursor-label="GO"
              className="glass-panel group flex items-center justify-between rounded-2xl px-4 py-3.5 font-mono text-[11px] tracking-[0.14em] text-bone/85 transition-all hover:border-volt/60 hover:text-volt"
            >
              <span>{s.label}</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </div>

      {/* Footer Strip */}
      <footer className="mx-auto mt-16 flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[11px] tracking-[0.16em] text-muted">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-volt" />
          <span>
            © {new Date().getFullYear()} SACHITHRA WIJESINGHE · TEAM SYNCODE
          </span>
        </div>
        <span>DESIGNED &amp; ENGINEERED IN SRI LANKA</span>
      </footer>
    </section>
  );
}
