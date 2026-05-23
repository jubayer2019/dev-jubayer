export const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
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
