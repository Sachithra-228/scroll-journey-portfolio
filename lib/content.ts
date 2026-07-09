// All site copy lives here so it can be edited without touching components.

// TODO: replace these placeholder links/handles with Sachithra's real ones
// before deploying. They are best guesses, not verified profiles.
export const links = {
  email: "sachithra.wijesinghe@outlook.com",
  linkedin: "https://www.linkedin.com/in/sachithra-wijesinghe",
  github: "https://github.com/sachithra-wijesinghe",
  youtube: "https://www.youtube.com/@sachithrawijesinghe",
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
      tags: ["multi-stakeholder", "platform", "full-stack"],
    },
    {
      title: "StrideLanka",
      role: "Full-stack developer",
      summary:
        "A travel-tech platform for building itineraries across Sri Lanka — turning trip planning into something closer to storytelling than spreadsheets.",
      tags: ["travel-tech", "itineraries", "full-stack"],
    },
  ],
};

export const syncode = {
  role: "Founder & lead web developer",
  period: "2024 — present",
  blurb:
    "A small dev team I founded to ship real sites for real clients — design, build and launch, end to end.",
  sites: [
    { name: "ChinaLanka Motors", tag: "automotive" },
    { name: "JayasVictory Travel", tag: "travel" },
    { name: "UnicareConnect", tag: "healthcare" },
    { name: "Maison Ashri Clothing", tag: "fashion" },
    { name: "Global Campus", tag: "education" },
  ],
};

export type Project = {
  name: string;
  stack: string[];
  design: string; // ui/ux-track framing
  backend: string; // backend-track framing
};

export const projects: Project[] = [
  {
    name: "UniFlow",
    stack: ["Java", "Spring Boot", "React", "PostgreSQL", "Google OAuth2"],
    design:
      "A campus operations hub where students, lecturers and admins each land on a view shaped around their day — the design work was mostly about hierarchy: what does each role need first, and what can wait?",
    backend:
      "Layered Spring Boot services behind a React front end, with a relational PostgreSQL schema modelling campus resources and Google OAuth2 handling sign-in across roles.",
  },
  {
    name: "Phishing detection AI",
    stack: ["Python", "FastAPI", "MongoDB", "ML", "Chrome extension"],
    design:
      "Security tooling people actually read: a dashboard that explains why a link looks suspicious in plain language, and a Chrome extension that warns without shouting.",
    backend:
      "An ML classifier served over FastAPI with MongoDB storage, consumed by both a reporting dashboard and a Chrome extension calling the same prediction API.",
  },
  {
    name: "Singlish → Sinhala test suite",
    stack: ["Python", "Playwright", "OpenPyXL"],
    design:
      "The invisible kind of UX work — 50+ automated checks that make sure transliteration behaves the way a Sinhala speaker expects, every time.",
    backend:
      "A Playwright-driven suite of 50+ transliteration cases with OpenPyXL reporting, so regressions show up as a spreadsheet diff instead of a user complaint.",
  },
];

export const mobileApps = [
  { name: "SafeAura", note: "personal safety" },
  { name: "HabitMate", note: "habit tracking" },
  { name: "Luna PetCare", note: "pet care" },
  { name: "EcoStay Retreat", note: "eco-resort booking" },
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

export const contact = {
  eyebrow: "the trail ends here",
  heading: "Let's make something worth presenting.",
  sub: "Whether it's a product, a platform or a late-night idea — I'd love to hear about it.",
  cta: "let's talk",
};
