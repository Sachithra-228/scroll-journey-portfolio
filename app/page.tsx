import SmoothScroll from "@/components/providers/SmoothScroll";
import ChevronPreloader from "@/components/ChevronPreloader";
import MagneticCursor from "@/components/MagneticCursor";
import StoryHud from "@/components/StoryHud";
import SyncBotStage from "@/components/three/SyncBotStage";
import HeroChapter from "@/components/story/HeroChapter";
import CloneChapter from "@/components/story/CloneChapter";
import SyncodeChapter from "@/components/story/SyncodeChapter";
import EngineeringChapter from "@/components/story/EngineeringChapter";
import ArsenalChapter from "@/components/story/ArsenalChapter";
import CreatorChapter from "@/components/story/CreatorChapter";
import ContactChapter from "@/components/story/ContactChapter";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-void bg-sync-grid text-bone">
      {/* Smooth Scroll & Chrome */}
      <SmoothScroll />
      <ChevronPreloader />
      <MagneticCursor />
      <StoryHud />

      {/* Ambient Atmospheric Studio Glows (Chapters 02 - 07) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-volt/[0.06] blur-[140px]" />
        <div className="absolute -right-32 top-[35%] h-[540px] w-[540px] rounded-full bg-cyber/[0.07] blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-broadcast/[0.05] blur-[140px]" />
      </div>

      {/* Persistent Interactive 3D Humanoid Exosuit Stage (Chapters 02 - 07) */}
      <SyncBotStage />

      {/* Subtle Cinema Grain */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* 7-Chapter Scroll Story */}
      <main className="relative z-20">
        <HeroChapter />
        <CloneChapter />
        <SyncodeChapter />
        <EngineeringChapter />
        <ArsenalChapter />
        <CreatorChapter />
        <ContactChapter />
      </main>
    </div>
  );
}
