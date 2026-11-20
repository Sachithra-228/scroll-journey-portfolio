// Central content store for Sachithra Wijesinghe — Portfolio v2 (Lusion x Lando Edition)

export const identity = {
  firstName: "SACHITHRA",
  lastName: "WIJESINGHE",
  fullName: "Sachithra Wijesinghe",
  handle: "@sachithra228",
  email: "wijesinghesachithra@gmail.com",
  phone: "+94 77 921 4221",
  location: "Colombo, Sri Lanka",
  coords: "6.9271° N, 79.8612° E",
  portrait: "/images/sachithra-portrait.jpg",
  portraitCutout: "/images/sachithra-cutout.png",
  robotCutout: "/images/sync-robot-cutout.png",
  roles: [
    "CEO @ TEAM SYNCODE",
    "FULL-STACK ENGINEER",
    "YOUTUBE CREATOR",
    "SLBC RADIO PRESENTER",
  ],
  tagline:
    "Engineering award-grade digital products, leading Team SYNCODE, and telling stories on code, YouTube & radio.",
  bio: "Driven BSc (Hons) IT undergraduate at SLIIT, Founder & CEO of Team SYNCODE, and Full-Stack Software Engineer. I combine high-craft engineering, creative direction, content creation, and stage presence to turn ambitious ideas into memorable digital experiences.",
};

export const links = {
  email: "mailto:wijesinghesachithra@gmail.com",
  whatsapp: "https://wa.me/94779214221",
  whatsappChannel: "https://whatsapp.com/channel/0029VbAOUZj6hENiKN0n9K2y",
  linkedin: "https://www.linkedin.com/in/sachithra-wijesinghe-5496a5270/",
  github: "https://github.com/Sachithra-228",
  youtube: "https://www.youtube.com/@sachithra228",
  tiktok: "https://www.tiktok.com/@sachithra228",
  facebook: "https://www.facebook.com/sachithra.wijesinghe.77",
  instagram: "https://www.instagram.com/sachithra_228/",
  syncode: "https://www.teamsyncode.com/",
  location: "https://share.google/InGNgMW0bzNBDfKBX",
};

export const chapters = [
  { id: "hero", num: "01", label: "INITIATE" },
  { id: "clone", num: "02", label: "THE CLONE" },
  { id: "syncode", num: "03", label: "SYNCODE" },
  { id: "engineering", num: "04", label: "ENGINEERING" },
  { id: "arsenal", num: "05", label: "ARSENAL" },
  { id: "creator", num: "06", label: "ON AIR" },
  { id: "contact", num: "07", label: "TRANSMIT" },
] as const;

export const education = [
  {
    degree: "BSc (Hons) in Information Technology",
    institution: "SLIIT — Malabe, Sri Lanka",
    period: "Jun 2023 — Present",
    detail: "Specializing in Information Technology",
  },
  {
    degree: "G.C.E. Advanced Level — Bio Science",
    institution: "Dharmapala College, Pannipitiya",
    period: "2021",
    detail: "Science Stream",
  },
  {
    degree: "G.C.E. Ordinary Level",
    institution: "Dharmapala College, Pannipitiya",
    period: "2016",
    detail: "Foundation",
  },
];

export const experience = {
  company: "Liveroom Technologies",
  role: "Software Engineer Intern",
  period: "Jun 2025 — Jun 2026 · 1 Year",
  projects: [
    {
      title: "Agriculture Prediction System",
      role: "Full-Stack Developer",
      summary:
        "Digital agriculture prediction platform connecting farmers, drivers, sellers, and government stakeholders — streamlining workflows and enabling data-driven crop & logistics decisions.",
      tags: ["Multi-Stakeholder", "Data Platform", "Full-Stack"],
    },
    {
      title: "StrideLanka Travel-Tech Platform",
      role: "Key Full-Stack Developer",
      summary:
        "Next-gen travel-tech platform empowering travel agencies and global explorers to discover Sri Lanka and generate personalized, story-driven itineraries.",
      tags: ["Travel-Tech", "Itinerary Engine", "Full-Stack"],
    },
  ],
};

export type SyncodeSite = {
  name: string;
  tag: string;
  year: string;
  desc: string;
  url?: string;
  img?: string;
};

export const syncode = {
  role: "Founder, CEO & Lead Developer",
  period: "2024 — Present",
  url: "https://www.teamsyncode.com/",
  blurb:
    "I founded Team SYNCODE to engineer bold, high-converting websites and custom digital products for ambitious brands — owning strategy, UI/UX, full-stack architecture, and launch.",
  stats: [
    { value: "09+", label: "SHIPPED PLATFORMS" },
    { value: "100%", label: "END-TO-END DELIVERY" },
    { value: "24/7", label: "STUDIO VELOCITY" },
  ],
  sites: [
    {
      name: "Team SYNCODE",
      tag: "AGENCY STUDIO",
      year: "2025",
      desc: "Our flagship creative engineering studio — building software & brands that scale.",
      url: "https://www.teamsyncode.com/",
      img: "/sites/syncode.jpg",
    },
    {
      name: "ChinaLanka Motors",
      tag: "AUTOMOTIVE EV",
      year: "2025",
      desc: "Next-gen EV showroom with interactive vehicle pages and test-drive booking.",
      url: "https://www.chinalankamotors.com/",
      img: "/sites/chinalanka.jpg",
    },
    {
      name: "JayasVictory Travels",
      tag: "TRAVEL & TOURS",
      year: "2025",
      desc: "Curated Sri Lankan island adventures engineered for high-conversion discovery.",
      url: "https://www.jayasvictorytravels.com/",
      img: "/sites/jayasvictory.jpg",
    },
    {
      name: "UnicareConnect",
      tag: "EDTECH PLATFORM",
      year: "2025",
      desc: "Student-support ecosystem uniting career pathways, mentorship, and financial aid.",
      url: "https://www.unicareconnect.com/",
      img: "/sites/unicare.jpg",
    },
    {
      name: "Wasantha Construction",
      tag: "INDUSTRIAL",
      year: "2025",
      desc: "Steel fabrication showcase featuring project portfolios, quotes, and 24/7 support.",
      url: "https://wasantha-construction.vercel.app/",
      img: "/sites/wasantha.jpg",
    },
    {
      name: "ITSC — SLIIT",
      tag: "COMMUNITY",
      year: "2025",
      desc: "Official digital home for the IT Student Community — events, committee & gallery.",
      url: "https://itsc-website-design.vercel.app/",
      img: "/sites/itsc.jpg",
    },
    {
      name: "REHOB",
      tag: "EDM & MUSIC",
      year: "2025",
      desc: "High-voltage home of Sri Lankan electronic dance music culture and live releases.",
      url: "https://rehob-edm-platform.vercel.app/",
      img: "/sites/rehob.jpg",
    },
    {
      name: "Maison Ashri",
      tag: "FASHION & DÉCOR",
      year: "2024",
      desc: "Handcrafted fabric & fashion brand experience — tactile, minimal, and warm.",
      url: "https://maisonashri.vercel.app/",
      img: "/sites/maisonashri.jpg",
    },
    {
      name: "Global Campus",
      tag: "EDUCATION",
      year: "2024",
      desc: "International academic programs, institution details, and student enquiry pathways.",
    },
  ] satisfies SyncodeSite[],
};

export type FeaturedProject = {
  id: string;
  name: string;
  category: string;
  stack: string[];
  designPitch: string;
  archPitch: string;
  metric: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: "uniflow",
    name: "UniFlow",
    category: "SMART CAMPUS HUB",
    stack: ["Java 17", "Spring Boot", "PostgreSQL", "React", "Google OAuth2"],
    designPitch:
      "Role-adaptive campus operations hub where students, lecturers, and admins land on a clean command view tailored to their day.",
    archPitch:
      "Layered Spring Boot + Spring Security microservices backed by relational PostgreSQL, React/Vite frontend, and role-based Google OAuth2 SSO.",
    metric: "FULL-STACK ENTERPRISE",
  },
  {
    id: "phishing-ai",
    name: "Phishing Detection AI",
    category: "CYBERSECURITY & ML",
    stack: ["Python", "FastAPI", "MongoDB", "Machine Learning", "Chrome Ext"],
    designPitch:
      "Human-readable security intelligence — a real-time dashboard & browser extension that explains exactly why an email is risky.",
    archPitch:
      "Hybrid ML + rule-based email parser served over async FastAPI with MongoDB telemetry, powering both a live dashboard and Chrome extension.",
    metric: "HYBRID ML ENGINE",
  },
  {
    id: "rasamenu",
    name: "RasaMenu",
    category: "MULTI-TENANT SAAS",
    stack: ["Next.js", "TypeScript", "SaaS", "QR Menus"],
    designPitch:
      "Scan, browse, order — tactile QR digital menus that carry a restaurant's true brand atmosphere instead of a static PDF.",
    archPitch:
      "Multi-tenant Next.js SaaS architecture serving fast, mobile-first digital menus for restaurants, cafés, and boutique hotels across Sri Lanka.",
    metric: "HOSPITALITY SAAS",
  },
  {
    id: "singlish-qa",
    name: "Singlish → Sinhala QA",
    category: "TEST AUTOMATION",
    stack: ["Python", "Playwright", "OpenPyXL"],
    designPitch:
      "Invisible UX craftsmanship — verifying that Singlish-to-Sinhala transliteration behaves naturally for everyday Sri Lankan speakers.",
    archPitch:
      "Automated Playwright regression suite executing 50+ transliteration test cases with automated OpenPyXL Excel diff reporting.",
    metric: "50+ AUTOMATED CASES",
  },
];

export const mobileAndExtraProjects = [
  { name: "SafeAura", kind: "ANDROID", note: "Women & child safety SOS alerts, live GPS & trusted contacts" },
  { name: "HabitMate", kind: "MOBILE", note: "Daily routines, habit streaks & personal productivity" },
  { name: "Luna PetCare", kind: "MOBILE", note: "Pet care schedules, health logs & activity tracker" },
  { name: "EcoStay Retreat", kind: "MOBILE", note: "Eco-resort discovery, stays & booking user flows" },
  {
    name: "Hotel Seven Way",
    kind: "WEB",
    note: "Boutique hospitality web experience",
    url: "https://hotel-seven-way.vercel.app",
  },
  {
    name: "Travel Portal",
    kind: "WEB",
    note: "Interactive registration & travel portal",
    url: "https://travel-dom-interactive-porta.vercel.app",
  },
  { name: "Falcon Holidays", kind: "WEB", note: "Travel agency showcase" },
  { name: "GatherUp", kind: "WEB", note: "Community events web application" },
];

export const skillGroups = [
  {
    category: "LANGUAGES",
    code: "01",
    items: ["Java", "Kotlin", "TypeScript", "JavaScript", "Python", "C / C++", "PHP", "R", "SQL"],
  },
  {
    category: "FRONTEND & 3D",
    code: "02",
    items: ["Next.js", "React.js", "Tailwind CSS", "Three.js / WebGL", "GSAP", "Framer Motion", "UI/UX Systems"],
  },
  {
    category: "BACKEND & API",
    code: "03",
    items: ["Spring Boot", "Node.js", "Express.js", "FastAPI", "REST APIs", "Google OAuth2", "Authentication"],
  },
  {
    category: "DATABASES",
    code: "04",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Firebase Realtime DB", "SQLite"],
  },
  {
    category: "MOBILE & TOOLS",
    code: "05",
    items: ["Android Studio", "Figma", "Git & GitHub", "GitLab", "Playwright", "Power BI", "Trello"],
  },
];

export type Video = { id: string; title: string; tag: string };

export const videos: Video[] = [
  {
    id: "U4XVTPnwGCU",
    title: "Power BI for Beginners — Install & Setup (Sinhala)",
    tag: "TUTORIAL",
  },
  {
    id: "672ZJsgpHQ0",
    title: "Power BI Labsheet 08 — Dashboard Design",
    tag: "DATA VIZ",
  },
  {
    id: "hra3su3Y4Mk",
    title: "IT Year 3 Semester 2 — Complete Roadmap",
    tag: "SLIIT GUIDE",
  },
  {
    id: "GubQpNzPEm8",
    title: "IT3040 Automation — Complete Guide (Sinhala)",
    tag: "AUTOMATION",
  },
];

export const affiliations = [
  { org: "SLBC — Sri Lanka Broadcasting Corporation", role: "Radio Presenter", highlight: true },
  { org: "ITSC — SLIIT", role: "Assistant Secretary", highlight: false },
  { org: "AIESEC in SLIIT", role: "Team Leader", highlight: false },
  { org: "SLIIT Showcasing Team", role: "Active Leader", highlight: false },
  { org: "Rotaract Club of SLIIT", role: "Active Member", highlight: false },
];

export const references = [
  {
    name: "Dr. L. L. Ekanayake",
    title: "Senior Lecturer, Dept. of Civil Engineering",
    org: "University of Moratuwa",
    note: "Academic Reference & Mentor",
  },
  {
    name: "Prof. Chandana Jayalath",
    title: "Chairman, CIDA · Chartered Quantity Surveyor",
    org: "Construction Industry Development Authority",
    note: "Industry Reference & Mentor",
  },
];
