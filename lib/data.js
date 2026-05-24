export const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const heroRotatingTitles = [
  "Full Stack Developer",
  "Next.js Developer",
  "UI/UX Enthusiast",
];

export const overviewStats = [
  { label: "Projects Completed", value: 15 },
  { label: "Years Experience", value: 1 },
  { label: "Technologies Used", value: 22 },
];

export const educationTimeline = [
  {
    title: "BSc in Computer Science",
    meta: "2024 - Present",
    detail: "Currently pursuing a B.Sc. in Computer Science and Engineering at Northern University Bangladesh.",
  },
  {
    title: "Diploma in Computer Technology",
    meta: "2018 - 2023",
    detail: "Completed Diploma in Computer Technology from Faridpur Polytechnic Institute, establishing a strong technical foundation.",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      { name: "HTML", percent: 96 },
      { name: "CSS", percent: 94 },
      { name: "JavaScript", percent: 95 },
      { name: "React", percent: 92 },
      { name: "Next.js", percent: 90 },
      { name: "Tailwind CSS", percent: 97 },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", percent: 91 },
      { name: "Express.js", percent: 90 },
      { name: "MongoDB", percent: 88 },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", percent: 94 },
      { name: "GitHub", percent: 95 },
      { name: "Better Auth", percent: 89 },
      { name: "Vercel", percent: 90 },
    ],
  },
];

export const packageCards = [
  {
    title: "Basic",
    price: "$299",
    accent: "from-neon to-magenta",
    features: ["Simple website", "Responsive design", "Basic SEO"],
  },
  {
    title: "Standard",
    price: "$799",
    accent: "from-magenta to-ember",
    features: ["Full-stack website", "Authentication system", "MongoDB integration"],
  },
  {
    title: "Premium",
    price: "$1499",
    accent: "from-glow to-magenta",
    features: ["Advanced dashboard", "API integration", "Admin panel", "Deployment support"],
  },
];

export const portfolioProjects = [
  {
    title: "Creative Commerce",
    category: "E-Commerce UI",
    thumbnail: "/portfolio-1.svg",
    livePreview: "https://example.com/creative-commerce",
    shortDescription: "A polished product storefront with premium visuals, smooth browsing, and a clear conversion path.",
    longDescription: "Designed to feel high-end while still keeping product discovery fast and focused. The layout highlights featured products, trust signals, and streamlined shopping actions.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    highlights: ["Featured product hero", "Responsive product layout", "Fast call-to-action flow"],
  },
  {
    title: "Dashboard Flow",
    category: "Admin Dashboard",
    thumbnail: "/portfolio-2.svg",
    livePreview: "https://example.com/dashboard-flow",
    shortDescription: "A data-rich dashboard that keeps analytics, workflows, and quick actions easy to scan.",
    longDescription: "Built to present operational data in a calm, readable interface. The layout balances charts, summary cards, and task surfaces so users can move quickly.",
    techStack: ["React", "Node.js", "Chart UI"],
    highlights: ["Summary panels", "Workflow controls", "Readable metric layout"],
  },
  {
    title: "Analytics Hub",
    category: "SaaS Analytics",
    thumbnail: "/portfolio-3.svg",
    livePreview: "https://example.com/analytics-hub",
    shortDescription: "A clean analytics product page with simple reporting blocks and a business-first story.",
    longDescription: "Focuses on clarity over clutter. This concept uses bold metric lines and a restrained content hierarchy to make the core insights immediately visible.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: ["Insight-first content", "Minimal chart language", "Business-friendly hierarchy"],
  },
  {
    title: "Booking Suite",
    category: "Service Platform",
    thumbnail: "/portfolio-4.svg",
    livePreview: "https://example.com/booking-suite",
    shortDescription: "A service-booking flow with clear scheduling, package browsing, and a polished conversion path.",
    longDescription: "Designed for appointment-based businesses that need a smooth way to show services, capture interest, and help users complete a booking flow without friction.",
    techStack: ["React", "UI Motion", "Forms"],
    highlights: ["Scheduling-first UI", "Service cards", "Clear booking calls to action"],
  },
  {
    title: "Growth Engine",
    category: "Marketing Site",
    thumbnail: "/portfolio-5.svg",
    livePreview: "https://example.com/growth-engine",
    shortDescription: "A conversion-focused marketing layout built around momentum, trust, and strong storytelling.",
    longDescription: "Uses an upward visual rhythm to communicate growth while keeping the message concise. The design is suited for startups and product launches.",
    techStack: ["Next.js", "SEO", "Motion Design"],
    highlights: ["Growth narrative", "CTA-led structure", "Launch-ready styling"],
  },
  {
    title: "Admin Studio",
    category: "Management UI",
    thumbnail: "/portfolio-6.svg",
    livePreview: "https://example.com/admin-studio",
    shortDescription: "A clean internal admin layout with quick actions and a tidy operational overview.",
    longDescription: "Built for teams that need to review, manage, and move through system tasks quickly. It emphasizes control panels and clear state indicators.",
    techStack: ["Dashboard UI", "System Design", "Operations"],
    highlights: ["Action-first layout", "Workflow cards", "Operations overview"],
  },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/jubayer2019", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pro-jubayer/", icon: "linkedin" },
  { label: "Facebook", href: "https://www.facebook.com/jubayer.info360", icon: "facebook" },
  { label: "Email", href: "mailto:jubayer.prodesigner@gmail.com", icon: "mail" },
];

export const dashboardStatuses = ["Pending", "In Progress", "Completed"];

export const defaultServices = packageCards.map((service, index) => ({
  _id: `service-${index + 1}`,
  title: service.title,
  description: service.features.join(" • "),
  price: Number(service.price.replace("$", "")),
  features: service.features,
}));

export const defaultOrders = [
  {
    _id: "order-1",
    serviceId: defaultServices[0],
    status: "Pending",
    paymentStatus: "Unpaid",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "order-2",
    serviceId: defaultServices[1],
    status: "In Progress",
    paymentStatus: "Paid",
    createdAt: new Date().toISOString(),
  },
];
