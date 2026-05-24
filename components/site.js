"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiArrowUpRight, FiDownload, FiSend, FiUser, FiShield } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api, { fetchServices, submitContactMessage, createOrder } from "@/lib/api";
import {
  navigationLinks,
  heroRotatingTitles,
  overviewStats,
  educationTimeline,
  skillGroups,
  portfolioProjects,
  packageCards,
  socialLinks,
  defaultServices,
} from "@/lib/data";

function useCountUp(target) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / 1200, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return value;
}

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 z-40 rounded-full border border-white/10 bg-white/10 p-4 text-white shadow-glow backdrop-blur-xl transition hover:bg-white/20"
        >
          <FiArrowUpRight />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

export function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  

  useEffect(() => {
    setMounted(true);
  }, []);

  

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0616]/85 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-14 w-14 sm:h-16 sm:w-16">
            <Image src="/logo.png" alt="Jubayer Khan logo" fill priority className="object-contain p-1" />
          </div>
          <div>
            
            <h1 className="text-lg font-semibold text-white">Jubayer Khan</h1>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navigationLinks.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-white/70 transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button onClick={() => router.push('/#contact')} className="rounded-full bg-button-gradient px-5 py-2 text-sm font-medium text-white shadow-glow transition hover:scale-[1.02]">
            Hire Me
          </button>
        </div>

        <button className="rounded-full border border-white/10 p-3 text-white lg:hidden" onClick={() => setMobileOpen((current) => !current)}>
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t border-white/10 bg-[#0B0616] lg:hidden">
            <div className="section-shell flex flex-col gap-4 py-4">
              {navigationLinks.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="rounded-2xl border border-white/10 px-4 py-3 text-white/75">
                  {item.label}
                </a>
              ))}
              <Link href="/#contact" onClick={() => setMobileOpen(false)} className="rounded-2xl bg-button-gradient px-4 py-3 text-white">Hire Me</Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export function HeroSection() {
  const router = useRouter();
  const [titleIndex, setTitleIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [resumePreviewOpen, setResumePreviewOpen] = useState(false);
  const resumePdfUrl = "/Jubayer%20Khan%20Resume.pdf";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((current) => (current + 1) % heroRotatingTitles.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!resumePreviewOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setResumePreviewOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resumePreviewOpen]);

  return (
    <>
      <section id="home" className="hero-glow relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 grid-glow opacity-20" />
      <div className="section-shell relative grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-4 py-2 text-sm text-white/85 shadow-glow">
            <FiShield /> Available for freelance and full-time work
          </span>

          <div className="space-y-5">
    
            <h2 className="max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
              Hi, I&apos;m <span className="text-gradient">Jubayer Khan Akash</span>
            </h2>

            <div className="h-14 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <AnimatePresence mode="wait">
                <motion.p
                  key={titleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="text-lg font-medium text-white/85"
                >
                  {heroRotatingTitles[titleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-white/65">
            I build premium digital products with immersive motion, strong architecture, and polished interfaces that help modern brands stand out.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => router.push("/#contact")} className="rounded-full bg-button-gradient px-8 py-3 font-medium text-white shadow-glow transition hover:scale-[1.02]">
              Hire Me
            </button>
            <button type="button" onClick={() => setResumePreviewOpen(true)} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3 font-medium text-white/80 transition hover:bg-white/10">
              <FiDownload /> Download Resume
            </button>
            
          </div>

          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            {overviewStats.map((stat) => (
              <CounterStat key={stat.label} stat={stat} />
            ))}
          </div>
        </div>

        <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-neon/25 blur-3xl" />
          <div className="absolute -right-6 top-32 h-40 w-40 rounded-full bg-ember/25 blur-3xl" />
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            <div className="rounded-[1.6rem] border border-white/10 bg-[#13091f] p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
                <Image
                  src="/Jubayer%20P.png"
                  alt="Jubayer Khan"
                  fill
                  priority
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0616] via-transparent to-transparent" />
                <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute left-5 top-5 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-xl">
                  Premium builder
                </motion.div>
                <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-5 right-5 rounded-2xl border border-white/10 bg-[#0B0616]/70 px-4 py-3 text-sm text-white/80 backdrop-blur-xl">
                  Available for select projects
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </section>

      <AnimatePresence>
        {resumePreviewOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
            onClick={() => setResumePreviewOpen(false)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#12091f] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button onClick={() => setResumePreviewOpen(false)} className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/20" aria-label="Close resume preview">
                <FiX />
              </button>

              <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="bg-black/20 p-4 sm:p-6">
                  <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white">
                    <iframe title="Resume preview" src={resumePdfUrl} className="h-[72vh] w-full" />
                  </div>
                </div>

                <div className="space-y-5 p-6 sm:p-8">
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-white/40">Resume</p>
                    <h3 className="mt-3 text-3xl font-semibold text-white">Preview and download the PDF</h3>
                    <p className="mt-3 text-white/65 leading-8">Open the file in the browser preview, then use the download button to save a copy locally.</p>
                  </div>

                  <div className="space-y-3">
                    <a href={resumePdfUrl} download className="block rounded-full bg-button-gradient px-5 py-3 text-center font-medium text-white shadow-glow transition hover:scale-[1.02]">
                      Download PDF
                    </a>
                    <a href={resumePdfUrl} target="_blank" rel="noreferrer" className="block rounded-full border border-white/15 bg-white/5 px-5 py-3 text-center font-medium text-white/80 transition hover:bg-white/10">
                      Open in New Tab
                    </a>
                    <button type="button" onClick={() => setResumePreviewOpen(false)} className="w-full rounded-full border border-white/15 px-5 py-3 font-medium text-white/70 transition hover:bg-white/5">
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function CounterStat({ stat }) {
  const count = useCountUp(stat.value);

  return (
    <motion.div whileHover={{ y: -6 }} className="glass-panel rounded-3xl p-5">
      <p className="text-3xl font-semibold text-white">{count}+</p>
      <p className="mt-1 text-sm text-white/60">{stat.label}</p>
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.45em] text-white/45">About Me</p>
          <h3 className="text-4xl font-semibold text-white">A modern developer with an eye for motion, structure, and clean systems.</h3>
          <p className="text-white/65 leading-8">
            I design and build full-stack experiences that feel polished from the first scroll. My work blends strategic UX, responsive interfaces, and durable backend architecture.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {educationTimeline.map((item) => (
              <div key={item.title} className="glass-panel rounded-3xl p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-white/40">{item.meta}</p>
                <h4 className="mt-2 text-xl font-semibold text-white">{item.title}</h4>
                <p className="mt-3 text-sm leading-7 text-white/65">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Developer Bio",
              body: "I am a full-stack developer blending clean code with professional design to build powerful digital products.From intuitive UI/UX to scalable architecture, I create high-performance web experiences that drive results.",
            },
            {
              title: "Experience",
              body: "I develop custom digital platforms and e-commerce solutions by bridging clean code with professional UI/UX design.Leveraging React and Tailwind CSS, I create seamless, user-centric products that deliver exceptional performance.",
            },
            {
              title: "Career Goals",
              body: "To build and launch comprehensive digital platforms from initial concept to final deployment.To merge my creative expertise with advanced engineering to create visually engaging, functional products.To grow into a technical leader who delivers complete, performance-driven solutions for modern businesses.",
            },
            {
              title: "Personal Intro",
              body: "A web developer and CSE student building structurally sound, visually engaging digital platforms. I combine modern tech stacks with creative design to deliver seamless user experiences.",
            },
          ].map((item) => (
            <motion.div key={item.title} whileHover={{ y: -8 }} className="glass-panel rounded-[1.75rem] p-5">
              <p className="text-lg font-semibold text-white">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-white/65">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-24">
      <div className="section-shell space-y-10">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm uppercase tracking-[0.45em] text-white/45">Skills</p>
          <h3 className="text-4xl font-semibold text-white">Modern stack, sharp execution, and animated interfaces.</h3>
          <p className="text-white/65 leading-8">The toolkit below reflects the technologies I use to ship reliable, elegant products across the stack.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <motion.div key={group.title} whileHover={{ y: -8 }} className="glass-panel rounded-[1.75rem] p-6">
              <h4 className="text-2xl font-semibold text-white">{group.title}</h4>
              <div className="mt-6 space-y-5">
                {group.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between text-sm text-white/70">
                      <span>{skill.name}</span>
                      <span>{skill.percent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.percent}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-2 rounded-full bg-accent-gradient shadow-glow" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!selectedProject) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  return (
    <>
      <section id="portfolio" className="py-24">
        <div className="section-shell space-y-10">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.45em] text-white/45">Portfolio</p>
            <h3 className="text-4xl font-semibold text-white">Selected projects designed to feel polished, usable, and conversion-focused.</h3>
            <p className="text-white/65 leading-8">A mix of product, dashboard, marketing, and admin concepts with live preview access and deeper project details.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {portfolioProjects.map((project) => (
              <motion.article key={project.title} whileHover={{ y: -8 }} className="glass-panel overflow-hidden rounded-[2rem] border border-white/10">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={project.thumbnail} alt={`${project.title} thumbnail`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0616] via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/75 backdrop-blur-xl">
                    {project.category}
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div>
                    <h4 className="text-2xl font-semibold text-white">{project.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-white/65">{project.shortDescription}</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a href={project.livePreview} target="_blank" rel="noreferrer" className="rounded-full bg-button-gradient px-4 py-2 text-sm font-medium text-white shadow-glow transition hover:scale-[1.02]">
                      Live Preview
                    </a>
                    <button onClick={() => setSelectedProject(project)} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10">
                      Details
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#12091f] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button onClick={() => setSelectedProject(null)} className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/10 p-2 text-white transition hover:bg-white/20" aria-label="Close project details">
                <FiX />
              </button>

              <div className="grid gap-6 p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] border border-white/10">
                  <Image src={selectedProject.thumbnail} alt={`${selectedProject.title} thumbnail`} fill className="object-cover" />
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-white/40">Project Details</p>
                    <h4 className="mt-3 text-3xl font-semibold text-white">{selectedProject.title}</h4>
                    <p className="mt-2 text-sm text-white/50">{selectedProject.category}</p>
                  </div>

                  <p className="text-white/70 leading-8">{selectedProject.longDescription}</p>

                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-white/40">Tech Stack</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/75">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-white/40">Highlights</p>
                    <ul className="mt-3 space-y-3 text-white/70">
                      {selectedProject.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-magenta shadow-glow" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <a href={selectedProject.livePreview} target="_blank" rel="noreferrer" className="rounded-full bg-button-gradient px-5 py-3 font-medium text-white shadow-glow transition hover:scale-[1.02]">
                      Open Live Preview
                    </a>
                    <button onClick={() => setSelectedProject(null)} className="rounded-full border border-white/15 bg-white/5 px-5 py-3 font-medium text-white/80 transition hover:bg-white/10">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export function ServicesSection() {
  const [services, setServices] = useState(defaultServices);
  const router = useRouter();

  useEffect(() => {
    fetchServices().then((items) => {
      if (items.length) {
        setServices(items);
      }
    }).catch(() => undefined);
  }, []);

  const handleOrder = async (service) => {
    toast("Please contact to place an order");
    router.push("/#contact");
  };

  return (
    <section id="services" className="py-24">
      <div className="section-shell space-y-10">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm uppercase tracking-[0.45em] text-white/45">Services</p>
          <h3 className="text-4xl font-semibold text-white">Professional packages for modern brands and product teams.</h3>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {packageCards.map((card, index) => (
            <motion.div key={card.title} whileHover={{ y: -10, scale: 1.01 }} className="glass-panel rounded-[2rem] p-6">
              <div className={`mb-6 h-2 rounded-full bg-gradient-to-r ${card.accent}`} />
              <div className="flex items-end justify-between">
                <div>
                  <h4 className="text-2xl font-semibold text-white">{card.title}</h4>
                  <p className="mt-2 text-4xl font-bold text-white">{card.price}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/55">0{index + 1}</span>
              </div>
              <ul className="mt-6 space-y-3 text-white/70">
                {card.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-magenta shadow-glow" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleOrder({ ...card, _id: services[index]?._id || card.title })} className="mt-8 w-full rounded-full bg-button-gradient px-5 py-3 font-medium text-white shadow-glow transition hover:scale-[1.02]">
                Order Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const onSubmit = async (formData) => {
    try {
      await submitContactMessage(formData);
      toast.success("Message sent successfully");
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to send message");
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.45em] text-white/45">Contact</p>
          <h3 className="text-4xl font-semibold text-white">Let&apos;s build something premium together.</h3>
          <p className="text-white/65 leading-8">Send a message, connect on social platforms, or use the form to start a new project conversation.</p>

          <div className="grid gap-4 sm:grid-cols-2">
            {socialLinks.map((item) => {
              const Icon = item.icon === "github" ? FaGithub : item.icon === "linkedin" ? FaLinkedin : item.icon === "facebook" ? FaFacebook : FaEnvelope;
              return (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="glass-panel flex items-center gap-4 rounded-3xl px-5 py-4 transition hover:bg-white/10">
                  <span className="rounded-2xl bg-white/10 p-3 text-lg text-white"><Icon /></span>
                  <span>
                    <span className="block text-sm text-white/45">{item.label}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <motion.form onSubmit={handleSubmit(onSubmit)} className="glass-panel space-y-4 rounded-[2rem] p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <input {...register("name", { required: true })} placeholder="Your name" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35" />
              {errors.name ? <p className="mt-2 text-sm text-ember">Name is required</p> : null}
            </div>
            <div>
              <input {...register("email", { required: true })} placeholder="Email address" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35" />
              {errors.email ? <p className="mt-2 text-sm text-ember">Email is required</p> : null}
            </div>
          </div>
          <input {...register("subject", { required: true })} placeholder="Subject" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35" />
          <textarea {...register("message", { required: true })} rows={6} placeholder="Message" className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35" />
          <button disabled={isSubmitting} className="flex items-center justify-center gap-2 rounded-full bg-button-gradient px-6 py-3 font-medium text-white shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60">
            <FiSend /> {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

export function FooterSection() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="section-shell flex flex-col gap-4 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Jubayer Khan. Crafted with premium motion and clean systems.</p>
        <p>Built for Vercel, Render, and MongoDB Atlas.</p>
      </div>
    </footer>
  );
}

export function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <PortfolioSection />
      <ServicesSection />
      <ContactSection />
      <FooterSection />
      <ScrollToTopButton />
    </main>
  );
}
