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
import { authClient } from "@/lib/auth-client";
import {
  navigationLinks,
  heroRotatingTitles,
  overviewStats,
  educationTimeline,
  skillGroups,
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
  const { data: session } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0616]/85 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-11 w-11">
            <Image src="/logo.png" alt="Jubayer Khan logo" fill priority className="object-cover" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/45">Portfolio</p>
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
          {mounted && session?.user ? (
            <>
              <Link href="/dashboard" className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/80 transition hover:bg-white/10">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="rounded-full bg-button-gradient px-5 py-2 text-sm font-medium text-white shadow-glow transition hover:scale-[1.02]">
                Logout
              </button>
            </>
          ) : mounted ? (
            <>
              <Link href="/auth" className="rounded-full border border-white/10 px-5 py-2 text-sm text-white/80 transition hover:bg-white/10">
                Login
              </Link>
              <Link href="/auth?mode=signup" className="rounded-full bg-button-gradient px-5 py-2 text-sm font-medium text-white shadow-glow transition hover:scale-[1.02]">
                Signup
              </Link>
            </>
          ) : null}
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
              {mounted && session?.user ? (
                <>
                  <Link href="/dashboard" className="rounded-2xl bg-white/10 px-4 py-3 text-white">Dashboard</Link>
                  <button onClick={handleLogout} className="rounded-2xl bg-button-gradient px-4 py-3 text-left text-white">Logout</button>
                </>
              ) : mounted ? (
                <>
                  <Link href="/auth" className="rounded-2xl bg-white/10 px-4 py-3 text-white">Login</Link>
                  <Link href="/auth?mode=signup" className="rounded-2xl bg-button-gradient px-4 py-3 text-white">Signup</Link>
                </>
              ) : null}
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
  const { data: session } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((current) => (current + 1) % heroRotatingTitles.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const handleResume = () => {
    toast.success("Resume download started");
  };

  return (
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
            <button onClick={() => router.push("/auth?mode=signup")} className="rounded-full bg-button-gradient px-8 py-3 font-medium text-white shadow-glow transition hover:scale-[1.02]">
              Hire Me
            </button>
            <button onClick={handleResume} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3 font-medium text-white/80 transition hover:bg-white/10">
              <FiDownload /> Download Resume
            </button>
            {mounted && session?.user ? (
              <Link href="/dashboard" className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3 font-medium text-white/80 transition hover:bg-white/10">
                <FiUser /> Dashboard
              </Link>
            ) : null}
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

export function ServicesSection() {
  const [services, setServices] = useState(defaultServices);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    fetchServices().then((items) => {
      if (items.length) {
        setServices(items);
      }
    }).catch(() => undefined);
  }, []);

  const handleOrder = async (service) => {
    if (!session?.user) {
      toast("Sign in to place an order");
      router.push("/auth");
      return;
    }

    await createOrder({ serviceId: service._id });
    toast.success(`${service.title} order created`);
    router.push("/dashboard/user");
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
      <ServicesSection />
      <ContactSection />
      <FooterSection />
      <ScrollToTopButton />
    </main>
  );
}
