// All site copy lives here so it can be edited without touching components.

export const links = {
  whatsapp: "https://wa.me/94779214221",
  whatsappChannel: "https://whatsapp.com/channel/0029VbAOUZj6hENiKN0n9K2y",
  linkedin: "https://www.linkedin.com/in/sachithra-wijesinghe-5496a5270/",
  github: "https://github.com/Sachithra-228",
  youtube: "https://www.youtube.com/@sachithra228",
  tiktok: "https://www.tiktok.com/@sachithra228",
  facebook: "https://www.facebook.com/sachithra.wijesinghe.77",
  instagram: "https://www.instagram.com/sachithra_228/",
  location: "https://share.google/InGNgMW0bzNBDfKBX",
  phoneDisplay: "+94 77 921 4221",
};

export const hero = {
  eyebrow: "software engineer — ui/ux — presenter",
  name: "Sachithra Wijesinghe",
  statement:
    "I build full-stack products end to end — and I care as much about how they feel as how they run.",
  scrollCue: "scroll to begin",
};

export const education = [
  {
    title: "BSc (Hons) Information Technology",
    place: "SLIIT",
    period: "2023 — present",
    note: "Sri Lanka Institute of Information Technology",
  },
  {
    title: "G.C.E. Advanced Level — bio science stream",
    place: "Dharmapala College",
    period: "2021",
    note: "",
  },
  {
    title: "G.C.E. Ordinary Level",
    place: "Dharmapala College",
    period: "2016",
    note: "",
  },
];

export const experience = {
  company: "Liveroom Technologies",
  period: "Jun 2025 — Jun 2026",
  roles: [
    {
      title: "Agriculture Prediction System",
      role: "Full-stack developer",
      summary:
        "A multi-stakeholder platform connecting farmers, drivers, sellers and government users around crop predictions — one product, four very different audiences.",
      short: "One platform, four audiences — farmers to government.",
      tags: ["multi-stakeholder", "platform", "full-stack"],
    },
    {
      title: "StrideLanka",
      role: "Full-stack developer",
      summary:
        "A travel-tech platform for building itineraries across Sri Lanka — turning trip planning into something closer to storytelling than spreadsheets.",
      short: "Trip planning that feels like storytelling.",
      tags: ["travel-tech", "itineraries", "full-stack"],
    },
  ],
};

export type SyncodeSite = {
  name: string;
  tag: string;
  desc: string;
  url?: string;
  img?: string; // screenshot in /public/sites
};

export const syncode = {
  role: "Founder & lead web developer",
  period: "2024 — present",
  blurb:
    "A software engineering studio I founded to ship real sites for real clients — design, build and launch, end to end.",
  url: "https://www.teamsyncode.com/",
  sites: [
    {
      name: "Team SYNCODE",
      tag: "studio",
      desc: "The studio's own home — we build software that scales.",
      url: "https://www.teamsyncode.com/",
      img: "/sites/syncode.jpg",
    },
    {
      name: "ChinaLanka Motors",
      tag: "automotive",
      desc: "EV showcase with model pages and test-drive booking.",
      url: "https://www.chinalankamotors.com/",
      img: "/sites/chinalanka.jpg",
    },
    {
      name: "JayasVictory Travels",
      tag: "travel",
      desc: "Curated island adventures, crafted by local experts.",
      url: "https://www.jayasvictorytravels.com/",
      img: "/sites/jayasvictory.jpg",
    },
    {
      name: "UnicareConnect",
      tag: "education",
      desc: "Financial aid, wellness and mentorship for students, in one place.",
      url: "https://www.unicareconnect.com/",
      img: "/sites/unicare.jpg",
    },
    {
      name: "Wasantha Construction",
      tag: "construction",
      desc: "Steel fabrication with quotes, projects and 24/7 support.",
      url: "https://wasantha-construction.vercel.app/",
      img: "/sites/wasantha.jpg",
    },
    {
      name: "ITSC — SLIIT",
      tag: "community",
      desc: "The IT student community's events, committee and gallery.",
      url: "https://itsc-website-design.vercel.app/",
      img: "/sites/itsc.jpg",
    },
    {
      name: "REHOB",
      tag: "music",
      desc: "The home of Sri Lankan electronic dance music.",
      url: "https://rehob-edm-platform.vercel.app/",
      img: "/sites/rehob.jpg",
    },
    {
      name: "Maison Ashri",
      tag: "décor",
      desc: "Handcrafted fabric décor — warm, soft and personal.",
      url: "https://maisonashri.vercel.app/",
      img: "/sites/maisonashri.jpg",
    },
    {
      name: "Global Campus",
      tag: "education",
      desc: "International education platform for Sri Lankan students.",
    },
  ] satisfies SyncodeSite[],
};

export type Project = {
  name: string;
  stack: string[];
  design: string; // ui/ux-track framing — short and visual
  backend: string; // backend-track framing — architecture and stack
};

export const projects: Project[] = [
  {
    name: "UniFlow",
    stack: ["Java", "Spring Boot", "React", "PostgreSQL", "Google OAuth2"],
    design:
      "A campus operations hub where every role — student, lecturer, admin — lands on a view shaped around their day.",
    backend:
      "Layered Spring Boot services behind a React front end, with a relational PostgreSQL schema modelling campus resources and Google OAuth2 handling sign-in across roles.",
  },
  {
    name: "RasaMenu",
    stack: ["Next.js", "SaaS", "QR menus"],
    design:
      "Scan, browse, order — QR digital menus that feel like the restaurant they belong to, not a PDF.",
    backend:
      "A multi-tenant SaaS platform serving QR-linked digital menus for restaurants, cafés and hotels in Sri Lanka.",
  },
  {
    name: "Phishing detection AI",
    stack: ["Python", "FastAPI", "MongoDB", "ML", "Chrome extension"],
    design:
      "Security tooling people actually read — a dashboard that explains why a link looks suspicious, in plain language.",
    backend:
      "An ML classifier served over FastAPI with MongoDB storage, consumed by both a reporting dashboard and a Chrome extension calling the same prediction API.",
  },
  {
    name: "Singlish → Sinhala test suite",
    stack: ["Python", "Playwright", "OpenPyXL"],
    design:
      "The invisible kind of UX work — 50+ automated checks that transliteration behaves the way a Sinhala speaker expects.",
    backend:
      "A Playwright-driven suite of 50+ transliteration cases with OpenPyXL reporting, so regressions show up as a spreadsheet diff instead of a user complaint.",
  },
];

export type Extra = {
  name: string;
  note: string;
  kind: "mobile" | "web";
  url?: string;
};

export const extras: Extra[] = [
  { name: "SafeAura", note: "personal safety", kind: "mobile" },
  { name: "HabitMate", note: "habit tracking", kind: "mobile" },
  { name: "Luna PetCare", note: "pet care", kind: "mobile" },
  { name: "EcoStay Retreat", note: "eco-resort booking", kind: "mobile" },
  {
    name: "Hotel Seven Way",
    note: "hotel website",
    kind: "web",
    url: "https://hotel-seven-way.vercel.app",
  },
  { name: "Falcon Holidays", note: "travel website", kind: "web" },
  { name: "GatherUp", note: "events web app", kind: "web" },
  {
    name: "Travel portal",
    note: "interactive registration portal",
    kind: "web",
    url: "https://travel-dom-interactive-porta.vercel.app",
  },
];

// Reconstructed from the technologies named across projects and coursework —
// the original CV skill list should replace this if it differs.
export const skills: { category: string; items: string[] }[] = [
  {
    category: "languages",
    items: ["Java", "Python", "JavaScript", "TypeScript", "Kotlin", "SQL"],
  },
  {
    category: "frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML & CSS", "Framer Motion"],
  },
  {
    category: "backend",
    items: ["Spring Boot", "FastAPI", "Node.js", "REST APIs", "OAuth2"],
  },
  {
    category: "databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Firebase"],
  },
  {
    category: "tools",
    items: ["Git & GitHub", "Figma", "Playwright", "Postman", "Android Studio"],
  },
];

export const affiliations = [
  "ITSC",
  "AIESEC in SLIIT",
  "SLIIT Showcasing Team",
  "Rotaract Club of SLIIT",
  "SLBC radio presenter",
];

// Recent uploads from youtube.com/@sachithra228 — thumbnails come from
// i.ytimg.com at render time, so no assets to maintain here.
export type Video = { id: string; title: string };

export const videos: Video[] = [
  {
    id: "U4XVTPnwGCU",
    title: "Power BI for beginners — install & setup (Sinhala)",
  },
  {
    id: "672ZJsgpHQ0",
    title: "Power BI labsheet 08 — dashboard design",
  },
  {
    id: "hra3su3Y4Mk",
    title: "IT year 3 semester 2 overview",
  },
  {
    id: "GubQpNzPEm8",
    title: "IT3040 automation — complete guide (Sinhala)",
  },
];

export const contact = {
  eyebrow: "the trail ends here",
  heading: "Let's make something worth presenting.",
  sub: "Whether it's a product, a platform or a late-night idea — I'd love to hear about it.",
  cta: "let's talk",
};
