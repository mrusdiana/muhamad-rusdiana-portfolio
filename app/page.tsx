"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  GraduationCap,
  MapPin,
  Menu,
  Play,
  Send,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  FaAws,
  FaCreditCard,
  FaFlask,
  FaGithub,
  FaImage,
  FaInstagram,
  FaLinkedinIn,
  FaLock,
  FaRobot,
} from "react-icons/fa6";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import ThemeToggle from "@/components/ThemeToggle";
import { projects } from "@/data/projects";
import {
  SiAxios,
  SiBootstrap,
  SiCloudflare,
  SiCss,
  SiDaisyui,
  SiEjs,
  SiExpress,
  SiExpo,
  SiFramer,
  SiGit,
  SiGithub,
  SiGoogle,
  SiGooglemaps,
  SiGraphql,
  SiHtml5,
  SiJest,
  SiJavascript,
  SiApollographql,
  SiJsonwebtokens,
  SiMongodb,
  SiLeaflet,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiRedux,
  SiSequelize,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThemoviedatabase,
  SiTypescript,
  SiVercel,
  SiVite,
  SiZod,
} from "react-icons/si";

const navigation = [
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Certificates",
  "Contact",
];
const contactEmail = "muhamadrusdiana452@gmail.com";

const aboutFacts = [
  {
    icon: GraduationCap,
    value: "480 Hours",
    label: "AI Fullstack JavaScript Bootcamp",
  },
  { icon: Code2, value: "5 Projects", label: "Web and mobile applications" },
  {
    icon: BriefcaseBusiness,
    value: "Nearly 3 Years",
    label: "Technical internship in Japan",
    badge: "JLPT N2",
  },
];

const experiencePhases = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Vessel Operations",
    description:
      "Supported vessel hauling, positioning, maintenance, and exterior repainting through disciplined shipyard procedures.",
  },
  {
    icon: Wrench,
    number: "02",
    title: "FRP Fabrication",
    description:
      "Fabricated and assembled FRP upper structures while working closely with a Japanese senior technician.",
  },
  {
    icon: CheckCircle2,
    number: "03",
    title: "Trusted Repairs",
    description:
      "Earned responsibility for complex vessel repairs and fabrication work from preparation through final installation.",
  },
];
const experienceSkills = [
  "Discipline",
  "Precision",
  "Problem Solving",
  "Adaptability",
  "Cross-cultural Teamwork",
];

const skillGroups = {
  "Frontend & Mobile": [
    { name: "React", icon: SiReact, color: "#087ea4" },
    { name: "Next.js", icon: SiNextdotjs, color: "#111111" },
    { name: "React Native", icon: SiReact, color: "#087ea4" },
    { name: "Expo", icon: SiExpo, color: "#111111" },
    { name: "JavaScript", icon: SiJavascript, color: "#f0c52e" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
    { name: "HTML", icon: SiHtml5, color: "#e34f26" },
    { name: "CSS", icon: SiCss, color: "#1572b6" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#0786a0" },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952b3" },
    { name: "DaisyUI", icon: SiDaisyui, color: "#6b57ba" },
    { name: "EJS", icon: SiEjs, color: "#a91e50" },
    { name: "Redux Toolkit", icon: SiRedux, color: "#764abc" },
    { name: "Motion", icon: SiFramer, color: "#7b3fe4" },
  ],
  "Backend & APIs": [
    { name: "Node.js", icon: SiNodedotjs, color: "#3c873a" },
    { name: "Express", icon: SiExpress, color: "#111111" },
    { name: "GraphQL", icon: SiGraphql, color: "#e10098" },
    { name: "Apollo Server", icon: SiApollographql, color: "#311c87" },
    { name: "REST API", icon: SiExpress, color: "#34495e" },
    { name: "Socket.IO", icon: SiSocketdotio, color: "#111111" },
    { name: "Sequelize", icon: SiSequelize, color: "#52b0e7" },
    { name: "JWT", icon: SiJsonwebtokens, color: "#a339c6" },
    { name: "bcryptjs", icon: FaLock, color: "#596b7a" },
    { name: "Zod", icon: SiZod, color: "#3068b7" },
  ],
  "Data & Storage": [
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
    { name: "Redis", icon: SiRedis, color: "#ff4438" },
    { name: "Supabase", icon: SiSupabase, color: "#16875d" },
  ],
  "Client & Integrations": [
    { name: "Apollo Client", icon: SiApollographql, color: "#311c87" },
    { name: "Axios", icon: SiAxios, color: "#5a29e4" },
    { name: "Gemini API", icon: SiGoogle, color: "#4285f4" },
    { name: "Google OAuth", icon: SiGoogle, color: "#4285f4" },
    { name: "Google Places API", icon: SiGooglemaps, color: "#34a853" },
    { name: "Groq", icon: FaRobot, color: "#f55036" },
    { name: "TMDB API", icon: SiThemoviedatabase, color: "#01b4e4" },
    { name: "Leaflet", icon: SiLeaflet, color: "#199900" },
    { name: "ImageKit", icon: FaImage, color: "#2e77cf" },
    { name: "Midtrans", icon: FaCreditCard, color: "#1684c7" },
  ],
  "Cloud & Deployment": [
    { name: "AWS EC2", icon: FaAws, color: "#ff9900" },
    { name: "Cloudflare", icon: SiCloudflare, color: "#f38020" },
    { name: "Vercel", icon: SiVercel, color: "#111111" },
  ],
  "Workflow & Testing": [
    { name: "Vite", icon: SiVite, color: "#646cff" },
    { name: "Jest", icon: SiJest, color: "#c21325" },
    { name: "Supertest", icon: FaFlask, color: "#3f8a69" },
    { name: "Git", icon: SiGit, color: "#f05032" },
    { name: "GitHub", icon: SiGithub, color: "#181717" },
  ],
};

type SkillGroup = "All" | keyof typeof skillGroups;
const allSkills = Object.entries(skillGroups).flatMap(([group, skills]) =>
  skills.map((skill) => ({ ...skill, group }))
);
const featuredSkillOrder = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Express",
  "Tailwind CSS",
  "REST API",
  "Git",
  "AWS EC2",
  "MongoDB",
  "HTML",
  "CSS",
  "Vite",
  "Zod",
  "Redis",
  "React Native",
  "Expo",
  "GraphQL",
  "Socket.IO",
  "GitHub",
  "Vercel",
  "Gemini API",
  "Supabase",
  "Redux Toolkit",
  "Cloudflare",
  "Jest",
  "Sequelize",
  "JWT",
  "Apollo Client",
  "Apollo Server",
  "Axios",
  "Google OAuth",
  "Google Places API",
  "Groq",
  "Motion",
  "Bootstrap",
  "DaisyUI",
  "EJS",
  "bcryptjs",
  "TMDB API",
  "Leaflet",
  "ImageKit",
  "Midtrans",
  "Supertest",
];
const skillPriority = new Map(
  featuredSkillOrder.map((name, index) => [name, index])
);
const darkSkillColors: Record<string, string> = {
  "Next.js": "#f4f7ff",
  Expo: "#f4f7ff",
  Express: "#f4f7ff",
  "REST API": "#8ecbff",
  "Socket.IO": "#f4f7ff",
  "Apollo Client": "#a99cff",
  "Apollo Server": "#a99cff",
  bcryptjs: "#b9d8ee",
  GitHub: "#f4f7ff",
  Vercel: "#f4f7ff",
};

const certificates = [
  {
    title: "Fullstack JavaScript Immersive Certificate",
    issuer: "HACKTIV8 Indonesia",
    date: "Sep 2026",
    category: "Fullstack development",
    logo: "/logos/hacktiv8.png",
    logoAlt: "Hacktiv8 logo",
    url: "https://track.pstmrk.it/3s/students.hacktiv8.com%2Fcertificates%2F5f75b136-8d93-4c97-8805-8a7e54a869ce/KSBV/USLIAQ/AQ/bc1bd466-6669-44b0-8d5f-4baa89d202f5/6/zP55bs82U3",
  },
  {
    title: "JLPT N2 Certificate",
    issuer: "The Japan Foundation / JEES",
    date: "Jul 2025",
    category: "Japanese proficiency",
    logo: "/logos/japan-foundation.svg",
    logoAlt: "The Japan Foundation logo",
    url: "https://drive.google.com/file/d/1w5gi9mvQXemj45_GoWtPZYlOMOG77Cy9/view?usp=sharing",
  },
  {
    title: "Software Engineer Intern Certificate",
    issuer: "HackerRank",
    date: "Sep 2026",
    category: "Software engineering",
    logo: "/logos/hackerrank.svg",
    logoAlt: "HackerRank logo",
    url: "https://www.hackerrank.com/certificates/a1c026e03635",
  },
  {
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    date: "Sep 2026",
    category: "Problem solving",
    logo: "/logos/hackerrank.svg",
    logoAlt: "HackerRank logo",
    url: "https://www.hackerrank.com/certificates/e0084917e238",
  },
  {
    title: "JavaScript (Basic)",
    issuer: "HackerRank",
    date: "Sep 2026",
    category: "JavaScript",
    logo: "/logos/hackerrank.svg",
    logoAlt: "HackerRank logo",
    url: "https://www.hackerrank.com/certificates/d3003df0cd6c",
  },
  {
    title: "React (Basic)",
    issuer: "HackerRank",
    date: "Sep 2026",
    category: "React",
    logo: "/logos/hackerrank.svg",
    logoAlt: "HackerRank logo",
    url: "https://www.hackerrank.com/certificates/6ac782f54ff0",
  },
  {
    title: "CSS",
    issuer: "HackerRank",
    date: "Sep 2026",
    category: "Styling",
    logo: "/logos/hackerrank.svg",
    logoAlt: "HackerRank logo",
    url: "https://www.hackerrank.com/certificates/6f359f4ed50e",
  },
  {
    title: "Certificate of Passing the Skill Evaluation Test",
    issuer: "Kanagawa Prefectural Government",
    date: "Jan 2026",
    category: "Technical skills",
    logo: null,
    logoAlt: "",
    url: "https://drive.google.com/file/d/18DEVUNCjqcgvF-7bHF5ExCKFAd0d2FOx/view?usp=share_link",
  },
];

const projectTechIcons: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  Express: SiExpress,
  PostgreSQL: SiPostgresql,
  "Socket.IO": SiSocketdotio,
  React: SiReact,
  "Gemini API": SiGoogle,
  Midtrans: FaCreditCard,
  MongoDB: SiMongodb,
  Zod: SiZod,
  Motion: SiFramer,
  "React Native": SiReact,
  Expo: SiExpo,
  "Apollo Client": SiApollographql,
  GraphQL: SiGraphql,
  Redis: SiRedis,
};

function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let frame = 0;
    const draw = () => {
      if (video.readyState >= 2) {
        if (!canvas.width || canvas.width === 300) {
          const scale = Math.min(1, 720 / video.videoWidth);
          canvas.width = Math.round(video.videoWidth * scale);
          canvas.height = Math.round(video.videoHeight * scale);
        }
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frameData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const pixels = frameData.data;

        for (let index = 0; index < pixels.length; index += 4) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const lowestChannel = Math.min(red, green, blue);

          if (lowestChannel > 248) {
            pixels[index + 3] = 0;
          } else if (lowestChannel > 238) {
            pixels[index + 3] = Math.round(((248 - lowestChannel) / 10) * 255);
          }
        }

        context.putImageData(frameData, 0, 0);
      }
      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="source-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260713_234424_b1332b69-2e69-4302-8dbc-40f86846afbd.mp4"
          type="video/mp4"
        />
      </video>
      <canvas ref={canvasRef} className="hero-canvas" />
    </>
  );
}

function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const photo = photoRef.current;
    if (!section || !photo) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && section.classList.add("is-visible"),
      { threshold: 0.18 }
    );
    observer.observe(section);

    let frame = 0;
    const updateParallax = () => {
      if (reduceMotion.matches) {
        photo.style.setProperty("--photo-shift", "0px");
        return;
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = section.getBoundingClientRect();
        const progress =
          (window.innerHeight - bounds.top) /
          (window.innerHeight + bounds.height);
        const shift = Math.max(-18, Math.min(18, (progress - 0.5) * 36));
        photo.style.setProperty("--photo-shift", `${shift}px`);
      });
    };

    updateParallax();
    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about-section"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="about-glow" aria-hidden="true" />
      <div className="about-inner">
        <div ref={photoRef} className="about-photo reveal-item">
          <div className="about-photo-image">
            <Image
              src="/Informal.PNG"
              alt="Muhamad Rusdiana in a casual half-body portrait"
              fill
              priority={false}
              sizes="(max-width: 767px) 88vw, 43vw"
            />
          </div>
          <div className="about-photo-rail" aria-hidden="true">
            <span>MR / 01</span>
            <strong>ABOUT</strong>
          </div>
          <div className="about-photo-panel-frame">
            <div className="about-photo-panel">
              <div className="about-photo-panel-heading">
                <strong>Fullstack Developer</strong>
                <span>Muhamad Rusdiana</span>
              </div>
              <div className="about-photo-panel-details">
                <div>
                  <span>I BUILD</span>
                  <strong>Interfaces &amp; APIs</strong>
                </div>
                <div>
                  <span>MY APPROACH</span>
                  <strong>Reliable, user-focused work</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-content">
          <p className="section-eyebrow reveal-item">About me</p>
          <h2 id="about-title" className="reveal-item">
            I Build Reliable, User-Focused Applications.
            <br />
            <em>From Intuitive Interfaces to Dependable Backends.</em>
          </h2>
          <p className="about-summary reveal-item">
            I&apos;m a Fullstack JavaScript Developer experienced in building
            modern web applications, from responsive interfaces and APIs to
            databases and AI integrations. My internship in Japan strengthened
            my discipline, adaptability, and problem-solving skills.
          </p>

          <div className="about-facts" aria-label="Personal highlights">
            {aboutFacts.map(({ icon: Icon, value, label, badge }, index) => (
              <article
                className="fact-card reveal-item"
                key={label}
                style={
                  { "--delay": `${360 + index * 90}ms` } as React.CSSProperties
                }
              >
                <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
                <div>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
                {badge && <small>{badge}</small>}
              </article>
            ))}
          </div>
          <a
            href="/CV-MUHAMAD- RUSDIANA.pdf"
            download="CV-MUHAMAD- RUSDIANA.pdf"
            className="cv-button reveal-item"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeGroup, setActiveGroup] = useState<SkillGroup>("All");
  const [showAllSkills, setShowAllSkills] = useState(false);
  const filteredSkills =
    activeGroup === "All"
      ? [...allSkills].sort(
          (a, b) =>
            (skillPriority.get(a.name) ?? Infinity) -
            (skillPriority.get(b.name) ?? Infinity)
        )
      : allSkills.filter((skill) => skill.group === activeGroup);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && section.classList.add("is-visible"),
      { threshold: 0.16 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="skills-section"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="skills-orbit orbit-one" aria-hidden="true" />
      <div className="skills-orbit orbit-two" aria-hidden="true" />
      <div className="skills-inner">
        <header className="skills-heading skills-reveal">
          <div className="skills-label">
            <span>02</span> TECHNICAL SKILLS
          </div>
          <h2 id="skills-title">
            The tools behind
            <br />
            <em>the work.</em>
          </h2>
          <p>
            From the interface to the database, these are the technologies I use
            across my projects.
          </p>
        </header>

        <div
          className="skills-workspace skills-reveal"
          style={{ "--delay": "120ms" } as React.CSSProperties}
        >
          <div
            className="skill-tabs"
            role="group"
            aria-label="Filter technologies"
          >
            <p className="skill-tabs-title">
              Tech index <span>{allSkills.length} technologies</span>
            </p>
            {(["All", ...Object.keys(skillGroups)] as SkillGroup[]).map(
              (group) => (
                <button
                  type="button"
                  aria-pressed={activeGroup === group}
                  aria-controls="skill-panel"
                  className={activeGroup === group ? "is-active" : ""}
                  onClick={() => {
                    setActiveGroup(group);
                    setShowAllSkills(false);
                  }}
                  key={group}
                >
                  {group}
                </button>
              )
            )}
          </div>

          <div className="skill-panel" id="skill-panel" aria-live="polite">
            <div
              className={`skill-grid ${showAllSkills ? "is-expanded" : ""}`}
              id="skill-grid"
              key={activeGroup}
            >
              {filteredSkills.map(
                ({ name, icon: Icon, color, group }, index) => (
                  <article
                    className="skill-tile"
                    key={name}
                    style={
                      {
                        "--skill-color": color,
                        "--skill-dark-color": darkSkillColors[name] ?? color,
                        "--tile-delay": `${index * 60}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <span className="skill-icon">
                      <Icon aria-hidden="true" size={32} />
                    </span>
                    <strong>{name}</strong>
                    <span className="skill-status">{group}</span>
                  </article>
                )
              )}
            </div>
            {filteredSkills.length > 12 && (
              <button
                type="button"
                className={`skill-show-more ${
                  filteredSkills.length <= 24 ? "mobile-only" : ""
                }`}
                aria-controls="skill-grid"
                aria-expanded={showAllSkills}
                onClick={() => setShowAllSkills((current) => !current)}
              >
                {showAllSkills ? "Show less" : "Show more"}
                <ArrowDownRight aria-hidden="true" size={17} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const velocityTrackRef = useRef<HTMLDivElement>(null);
  const demoDialogRef = useRef<HTMLDialogElement>(null);
  const [showSkip, setShowSkip] = useState(false);
  const [activeDemo, setActiveDemo] = useState<{
    name: string;
    videoId: string;
  } | null>(null);

  const jumpToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    window.scrollTo({
      top: window.scrollY + target.getBoundingClientRect().top,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
    window.history.replaceState(null, "", `#${id}`);
  };

  useEffect(() => {
    if (activeDemo && !demoDialogRef.current?.open)
      demoDialogRef.current?.showModal();
  }, [activeDemo]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = velocityTrackRef.current;
    if (!section || !track) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isInView = false;
    let frame = 0;
    let position = 0;
    let velocity = 0;
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      velocity = Math.max(
        -36,
        Math.min(36, velocity + (window.scrollY - lastScrollY) * 0.22)
      );
      lastScrollY = window.scrollY;
    };
    const animate = () => {
      if (isInView && !reduceMotion.matches) {
        const loopWidth = track.scrollWidth / 2;
        velocity *= 0.91;
        position = (position + 0.45 + velocity * 0.12 + loopWidth) % loopWidth;
        track.style.transform = `translate3d(${-position}px, 0, 0)`;
      }
      frame = requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        setShowSkip(isInView);
        if (isInView) section.classList.add("is-visible");
      },
      { threshold: 0 }
    );
    observer.observe(section);
    window.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(animate);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="projects-section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="project-velocity" aria-hidden="true">
        <div ref={velocityTrackRef} className="project-velocity-track">
          {[0, 1].map((copy) => (
            <div className="project-velocity-set" key={copy}>
              <span>SELECTED WORK</span>
              <i /> <span>DESIGN, CODE & SHIP</span>
              <i /> <span>SELECTED WORK</span>
              <i /> <span>DESIGN, CODE & SHIP</span>
              <i />
            </div>
          ))}
        </div>
      </div>
      <div className="projects-inner">
        <header className="projects-heading project-reveal">
          <div>
            <div className="projects-label">
              <span>03</span> Selected Projects
            </div>
            <p className="section-eyebrow">Featured fullstack projects</p>
            <h2 id="projects-title">
              Projects I have built.
              <br />
              <em>Explore them live.</em>
            </h2>
          </div>
          <p>
            Five web and mobile applications covering travel, community reuse,
            entertainment, commerce, and social media.
          </p>
        </header>
      </div>
      <nav
        className={`projects-rail ${showSkip ? "is-visible" : ""}`}
        aria-label="Project shortcuts"
        aria-hidden={!showSkip}
      >
        <a
          className="projects-back"
          href="#skills"
          onClick={(event) => jumpToSection(event, "skills")}
          aria-label="Back to tech stack"
          tabIndex={showSkip ? 0 : -1}
        >
          <ArrowUpRight aria-hidden="true" size={17} />
          <span>Tech stack</span>
        </a>
        <a
          className="projects-skip"
          href="#experience"
          onClick={(event) => jumpToSection(event, "experience")}
          aria-label="Skip projects and go to experience"
          tabIndex={showSkip ? 0 : -1}
        >
          <span>Skip to experience</span>
          <ArrowDownRight aria-hidden="true" size={18} />
        </a>
      </nav>
      <div className="projects-inner">
        <ScrollStack
          className="project-list"
          itemDistance={88}
          itemStackDistance={22}
          baseScale={0.89}
        >
          {projects.map((project, index) => (
            <ScrollStackItem key={project.slug} index={index}>
              <article
                className={`project-card project-card--${project.slug} project-reveal`}
                style={{ "--delay": `${index * 75}ms` } as React.CSSProperties}
              >
                {project.slug === "hacktivo" &&
                project.image &&
                project.href ? (
                  <div className="project-card-visual project-visual hacktivo-visual">
                    <div className="mobile-preview">
                      <Image
                        src={project.image}
                        alt="Hacktivo login screen"
                        fill
                        sizes="190px"
                      />
                      <span className="mobile-preview-bar" aria-hidden="true" />
                    </div>
                    <span className="project-visual-index">
                      Project {project.number} / 05
                    </span>
                    <div className="project-visual-actions">
                      <button
                        type="button"
                        className="demo-preview"
                        onClick={() =>
                          setActiveDemo({
                            name: project.name,
                            videoId: project.demoId!,
                          })
                        }
                        aria-label={`Play ${project.name} demo video`}
                      >
                        <Play
                          aria-hidden="true"
                          size={15}
                          fill="currentColor"
                        />{" "}
                        View demo
                      </button>
                      <a
                        className="live-preview"
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.name} live project`}
                      >
                        View live <ArrowUpRight aria-hidden="true" size={16} />
                      </a>
                    </div>
                  </div>
                ) : project.image && project.href ? (
                  <div className="project-card-visual project-visual">
                    <Image
                      src={project.image}
                      alt={`${project.name} application homepage`}
                      fill
                      sizes="(max-width: 767px) 94vw, 55vw"
                    />
                    <span className="project-visual-index">
                      Project {project.number} / 05
                    </span>
                    <div className="project-visual-actions">
                      {project.demoId && (
                        <button
                          type="button"
                          className="demo-preview"
                          onClick={() =>
                            setActiveDemo({
                              name: project.name,
                              videoId: project.demoId!,
                            })
                          }
                          aria-label={`Play ${project.name} demo video`}
                        >
                          <Play
                            aria-hidden="true"
                            size={15}
                            fill="currentColor"
                          />{" "}
                          View demo
                        </button>
                      )}
                      <a
                        className="live-preview"
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.name} live project`}
                      >
                        View live <ArrowUpRight aria-hidden="true" size={16} />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div
                    className="project-card-visual project-visual hacktivo-visual"
                    role="img"
                    aria-label="Hacktivo mobile application preview"
                  >
                    <div className="mobile-preview">
                      <span className="mobile-preview-bar" />
                      <strong>Hacktivo</strong>
                      <div className="mobile-stories">
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                      <div className="mobile-post">
                        <span />
                        <b />
                      </div>
                    </div>
                    <span className="project-visual-index">
                      Project {project.number} / 05
                    </span>
                    <span className="mobile-project-label">
                      React Native · Expo
                    </span>
                  </div>
                )}
                <div className="project-card-content">
                  <div className="project-card-topline">
                    <span>Selected work / {project.number}</span>
                    <span>2026</span>
                  </div>
                  <div className="project-meta">{project.type}</div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-card-footer">
                    <div
                      className="project-stack"
                      aria-label={`${project.name} technology stack`}
                    >
                      {project.cardStack.map((tech) => {
                        const Icon = projectTechIcons[tech];
                        return (
                          <span
                            className="project-tech-icon"
                            key={tech}
                            role="img"
                            aria-label={tech}
                            title={tech}
                          >
                            <Icon aria-hidden="true" size={19} />
                          </span>
                        );
                      })}
                    </div>
                    <div className="project-card-actions">
                      <Link
                        className="project-card-link"
                        href={`/projects/${project.slug}`}
                        aria-label={`View ${project.name} detail`}
                      >
                        View detail{" "}
                        <ArrowUpRight aria-hidden="true" size={16} />
                      </Link>
                      {project.github ? (
                        <a
                          className="project-github-link"
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${project.name} GitHub repository`}
                        >
                          <FaGithub aria-hidden="true" size={16} /> GitHub
                        </a>
                      ) : (
                        <span
                          className="project-github-link is-disabled"
                          aria-disabled="true"
                          title="GitHub link coming soon"
                        >
                          <FaGithub aria-hidden="true" size={16} /> GitHub
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
      <dialog
        ref={demoDialogRef}
        className="project-demo-dialog"
        aria-label={
          activeDemo ? `${activeDemo.name} project demo` : "Project demo"
        }
        onClose={() => setActiveDemo(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget)
            demoDialogRef.current?.close();
        }}
      >
        {activeDemo && (
          <div className="project-demo-content">
            <div className="project-demo-top">
              <span>{activeDemo.name} / Video demo</span>
              <button
                type="button"
                onClick={() => demoDialogRef.current?.close()}
                aria-label="Close video demo"
              >
                <X size={19} aria-hidden="true" />
              </button>
            </div>
            <iframe
              src={`https://www.youtube.com/embed/${activeDemo.videoId}?autoplay=1&mute=1&playsinline=1&rel=0`}
              title={`${activeDemo.name} video demo`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        )}
      </dialog>
    </section>
  );
}

function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [activeSkillCount, setActiveSkillCount] = useState(0);
  const skillResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let phaseTimer: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          if (!reduceMotion.matches && !phaseTimer) {
            phaseTimer = setInterval(() => {
              setActivePhase(
                (current) => (current + 1) % experiencePhases.length
              );
            }, 2200);
          }
          if (reduceMotion.matches) {
            setActiveSkillCount(experienceSkills.length);
          } else if (!skillResetTimer.current) {
            setActiveSkillCount((current) => current || 1);
          }
        } else {
          if (phaseTimer) clearInterval(phaseTimer);
          if (skillResetTimer.current) clearTimeout(skillResetTimer.current);
          phaseTimer = undefined;
          skillResetTimer.current = null;
          setActiveSkillCount(0);
        }
      },
      { threshold: 0.16 }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      if (phaseTimer) clearInterval(phaseTimer);
      if (skillResetTimer.current) clearTimeout(skillResetTimer.current);
    };
  }, []);

  const advanceSkill = (index: number) => {
    if (index !== activeSkillCount - 1) return;
    if (activeSkillCount < experienceSkills.length) {
      setActiveSkillCount(activeSkillCount + 1);
    } else {
      setActiveSkillCount(0);
      skillResetTimer.current = setTimeout(() => {
        skillResetTimer.current = null;
        setActiveSkillCount(1);
      }, 250);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="experience-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="experience-grid" aria-hidden="true" />
      <div className="experience-inner">
        <header className="experience-heading experience-reveal">
          <div className="experience-label">
            <span>04</span> Experience <small>経験</small>
          </div>
          <p className="section-eyebrow">Internship experience</p>
          <h2 id="experience-title">
            Technical internship
            <br />
            <em>in Japan.</em>
          </h2>
          <p className="experience-intro">
            My technical internship in Japan strengthened the discipline,
            adaptability, and practical problem-solving I now bring to software
            development.
          </p>
        </header>

        <div className="experience-content">
          <article className="role-overview experience-reveal">
            <div>
              <span className="role-period">Jun 2023 — Apr 2026</span>
              <h3>Shipbuilding Technical Intern</h3>
              <p>Technical Intern · Wakino Zousensho</p>
            </div>
            <span className="japan-location">
              <span aria-hidden="true">●</span> Kanagawa, Japan
            </span>
          </article>

          <div className="experience-timeline">
            {experiencePhases.map(
              ({ icon: Icon, number, title, description }, index) => (
                <article
                  className={`timeline-item experience-reveal ${
                    activePhase === index ? "is-active" : ""
                  }`}
                  key={title}
                  style={
                    {
                      "--delay": `${180 + index * 100}ms`,
                    } as React.CSSProperties
                  }
                  onMouseEnter={() => setActivePhase(index)}
                >
                  <span className="timeline-number">{number}</span>
                  <span className="timeline-icon">
                    <Icon aria-hidden="true" size={19} strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              )
            )}
          </div>

          <div
            className="experience-skills experience-reveal"
            style={{ "--delay": "520ms" } as React.CSSProperties}
            aria-label="Skills developed during the internship"
          >
            {experienceSkills.map((skill, index) => (
              <span
                className={index < activeSkillCount ? "is-active" : ""}
                key={skill}
                onAnimationEnd={() => advanceSkill(index)}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && section.classList.add("is-visible"),
      { threshold: 0.14 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="education-section"
      id="education"
      aria-labelledby="education-title"
    >
      <div className="education-inner">
        <header className="education-heading education-reveal">
          <div className="education-label">
            <span>05</span> Education
          </div>
          <div className="education-heading-row">
            <div>
              <p className="section-eyebrow">My education &amp; training</p>
              <h2 id="education-title">
                Learning in class.
                <br />
                <em>Building in practice.</em>
              </h2>
            </div>
            <p>
              Formal study and intensive hands-on training shape the way I solve
              problems and build complete applications.
            </p>
          </div>
        </header>

        <div className="education-path">
          <article
            className="education-card education-reveal"
            style={{ "--delay": "100ms" } as React.CSSProperties}
          >
            <div className="education-card-top">
              <span>01 / Immersive training</span>
              <time>Jun 2026 — Sep 2026</time>
            </div>
            <div className="education-logo">
              <Image
                src="/logos/hacktiv8.png"
                alt="Hacktiv8 logo"
                width={198}
                height={60}
              />
            </div>
            <p className="education-institution">Hacktiv8 Indonesia</p>
            <h3>
              Full Stack JavaScript
              <br />
              Immersive Program
            </h3>
            <p className="education-card-summary">
              480 hours of project-based work across interfaces, APIs,
              databases, and AI integrations.
            </p>
            <div className="education-card-bottom">
              <div>
                <strong>480</strong>
                <span>hours of training</span>
              </div>
              <span>Fullstack · AI</span>
            </div>
          </article>

          <article
            className="education-card education-card--current education-reveal"
            style={{ "--delay": "200ms" } as React.CSSProperties}
          >
            <span className="education-current-badge">
              <i aria-hidden="true" />
              In progress
            </span>
            <div className="education-card-top">
              <span>02 / University</span>
              <time>Aug 2024 — Aug 2028</time>
            </div>
            <div className="education-logo education-logo-udinus">
              <Image
                src="/logos/udinus.png"
                alt="Dian Nuswantoro University logo"
                width={76}
                height={78}
              />
            </div>
            <p className="education-institution">
              Dian Nuswantoro University · Online
            </p>
            <h3>
              Bachelor of
              <br />
              Information Technology
            </h3>
            <p className="education-card-summary">
              Continuing my degree online while applying what I learn to
              practical software projects.
            </p>
            <div className="education-card-bottom">
              <div>
                <strong>3.73</strong>
                <span>GPA / 4.00</span>
              </div>
              <span>Online program</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function CertificatesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && section.classList.add("is-visible"),
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="certificates-section"
      id="certificates"
      aria-labelledby="certificates-title"
    >
      <div className="certificates-inner">
        <header className="certificates-heading certificates-reveal">
          <div className="certificates-label">
            <span>06</span> Certificates
          </div>
          <div className="certificates-heading-row">
            <div>
              <p className="section-eyebrow">Credentials & milestones</p>
              <h2 id="certificates-title">
                Proof of
                <br />
                <em>progress.</em>
              </h2>
            </div>
            <div className="certificates-intro">
              <strong>08</strong>
              <p>
                Certificates across fullstack development, problem solving, and
                professional work in Japan.
              </p>
            </div>
          </div>
        </header>

        <div className="certificates-featured">
          {certificates.slice(0, 2).map((certificate, index) => (
            <article
              className="certificate-feature certificates-reveal"
              key={certificate.title}
              style={
                { "--delay": `${120 + index * 100}ms` } as React.CSSProperties
              }
            >
              <div className="certificate-feature-top">
                <span>
                  <Award aria-hidden="true" size={17} /> Featured credential
                </span>
                <time>{certificate.date}</time>
              </div>
              <div className="certificate-feature-logo">
                <Image
                  src={certificate.logo!}
                  alt={certificate.logoAlt}
                  width={198}
                  height={66}
                />
              </div>
              <div className="certificate-feature-copy">
                <p>{certificate.issuer}</p>
                <h3>{certificate.title}</h3>
              </div>
              <div className="certificate-feature-bottom">
                <span>{certificate.category}</span>
                <a
                  className="credential-button"
                  href={certificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Show ${certificate.title} credential`}
                >
                  Show credential <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="certificates-list-heading certificates-reveal">
          <span>More credentials</span>
          <span>06 / 08</span>
        </div>
        <div className="certificates-grid">
          {certificates.slice(2).map((certificate, index) => (
            <article
              className="certificate-item certificates-reveal"
              key={certificate.title}
              style={
                {
                  "--delay": `${80 + (index % 3) * 90}ms`,
                } as React.CSSProperties
              }
            >
              <div className="certificate-item-top">
                {certificate.logo ? (
                  <Image
                    src={certificate.logo}
                    alt={certificate.logoAlt}
                    width={152}
                    height={36}
                  />
                ) : (
                  <span className="kanagawa-name" lang="ja">
                    神奈川県
                  </span>
                )}
                <time>{certificate.date}</time>
              </div>
              <p>{certificate.issuer}</p>
              <h3>{certificate.title}</h3>
              <div className="certificate-item-bottom">
                <span>{certificate.category}</span>
                <a
                  className="credential-button"
                  href={certificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Show ${certificate.title} credential`}
                >
                  Show credential <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );
  const [sendStatus, setSendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [sendMessage, setSendMessage] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  };

  const sendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setSendStatus("sending");
    setSendMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fields)),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Message could not be sent.");
      form.reset();
      setSendStatus("sent");
      setSendMessage("Message sent. Thank you — I’ll get back to you soon.");
    } catch (error) {
      setSendStatus("error");
      setSendMessage(
        error instanceof Error
          ? error.message
          : "Message could not be sent. Please try again."
      );
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && section.classList.add("is-visible"),
      { threshold: 0.18 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-word" aria-hidden="true">
        CONTACT
      </div>
      <div className="contact-halo" aria-hidden="true" />
      <div className="contact-inner">
        <header className="contact-heading contact-reveal">
          <div className="contact-label">
            <span>07</span> Contact
          </div>
          <p className="section-eyebrow">Available for opportunities</p>
          <h2 id="contact-title">
            Have something
            <br />
            <em>in mind?</em>
          </h2>
          <p>
            I&apos;m open to full-stack opportunities, collaborations, and
            thoughtful product ideas—whether in Indonesia or with remote teams.
          </p>
        </header>

        <div
          className="contact-stage contact-reveal"
          style={{ "--delay": "120ms" } as React.CSSProperties}
        >
          <div className="contact-stage-top">
            <span>
              <Sparkles aria-hidden="true" size={17} /> Let&apos;s start a
              conversation
            </span>
            <span>01 / DIRECT MESSAGE</span>
          </div>
          <div className="contact-stage-grid">
            <div className="contact-stage-intro">
              <div className="contact-portrait">
                <Image
                  src="/Foto Formal.PNG"
                  alt="Muhamad Rusdiana in a formal portrait"
                  width={1122}
                  height={1402}
                  sizes="(max-width: 767px) 85vw, 32vw"
                />
              </div>
              <span className="contact-stage-index">
                Have a project or an opportunity?
              </span>
              <h3>
                Let&apos;s make
                <br />
                <em>it happen.</em>
              </h3>
              <p>
                I&apos;m Rusdi, a Full-Stack Developer open to new opportunities
                and collaborations. Feel free to reach out—I&apos;d be happy to
                connect and discuss how I can contribute.
              </p>
              <button
                className="contact-copy"
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                {copyStatus === "copied" ? (
                  <Check aria-hidden="true" size={17} />
                ) : (
                  <Copy aria-hidden="true" size={17} />
                )}
                <span aria-live="polite">
                  {copyStatus === "copied"
                    ? "Email copied"
                    : copyStatus === "failed"
                    ? "Copy failed"
                    : "Copy email instead"}
                </span>
              </button>
            </div>
            <form className="contact-form" onSubmit={sendEmail}>
              <label className="contact-field contact-field-wide">
                To
                <input name="to" type="email" value={contactEmail} readOnly />
              </label>
              <div className="contact-form-row">
                <label className="contact-field">
                  Your name
                  <input
                    name="fromName"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    maxLength={100}
                    required
                  />
                </label>
                <label className="contact-field">
                  From
                  <input
                    name="fromEmail"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </label>
              </div>
              <label className="contact-field">
                Subject
                <input
                  name="subject"
                  type="text"
                  placeholder="Let’s work together"
                  maxLength={160}
                  required
                />
              </label>
              <label className="contact-field">
                Message
                <textarea
                  name="message"
                  placeholder="Tell me a little about what you have in mind…"
                  rows={5}
                  maxLength={5000}
                  required
                />
              </label>
              <label className="contact-honeypot" aria-hidden="true">
                Company
                <input
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
              <div className="contact-form-footer">
                <p
                  role="status"
                  aria-live="polite"
                  className={`contact-form-status ${
                    sendStatus === "error" ? "is-error" : ""
                  }`}
                >
                  {sendMessage}
                </p>
                <button
                  className="contact-send"
                  type="submit"
                  disabled={sendStatus === "sending"}
                >
                  <Send aria-hidden="true" size={17} />{" "}
                  {sendStatus === "sending" ? "Sending…" : "Send message"}{" "}
                  <ArrowUpRight aria-hidden="true" size={17} />
                </button>
              </div>
            </form>
          </div>
        </div>

        <div
          className="contact-links contact-reveal"
          style={{ "--delay": "210ms" } as React.CSSProperties}
        >
          <a
            href="https://github.com/mrusdiana"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub aria-hidden="true" size={23} />
            <span>
              <strong>GitHub</strong>
              <small>Projects & code</small>
            </span>
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
          <a
            href="https://linkedin.com/in/muhamad-rusdiana-99054b428"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn aria-hidden="true" size={22} />
            <span>
              <strong>LinkedIn</strong>
              <small>Professional profile</small>
            </span>
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
          <a
            href="https://www.instagram.com/rusdi.an2?stkn=dXYxNnhxZTcwNzZs&utm_source=qr"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram aria-hidden="true" size={22} />
            <span>
              <strong>Instagram</strong>
              <small>Personal profile</small>
            </span>
            <ArrowUpRight aria-hidden="true" size={17} />
          </a>
          <a href="mailto:muhamadrusdiana452@gmail.com">
            <Mail aria-hidden="true" size={23} />
            <span>
              <strong>Email me</strong>
              <small>muhamadrusdiana452@gmail.com</small>
            </span>
          </a>
        </div>

        <footer
          className="contact-footer contact-reveal"
          style={{ "--delay": "220ms" } as React.CSSProperties}
        >
          <span>© 2026 Muhamad Rusdiana</span>
          <a href="#top">
            Back to top <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </footer>
      </div>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scaleY, setScaleY] = useState(1);
  const backgroundText = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeBackground = () => {
      const height = backgroundText.current?.offsetHeight ?? window.innerHeight;
      setScaleY(window.innerHeight / height);
    };
    resizeBackground();
    window.addEventListener("resize", resizeBackground);
    return () => window.removeEventListener("resize", resizeBackground);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        if (progressRef.current)
          progressRef.current.style.transform = `scaleX(${progress})`;
        setIsScrolled(window.scrollY > 48);
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <main className="site-shell">
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="Muhamad Rusdiana home">
          <Mark />
          <span>Muhamad Rusdiana.</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <button
            className="menu-trigger"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu aria-hidden="true" size={17} />
            <span>Menu</span>
          </button>
        </div>
      </header>
      <div className="landing-shell" id="top">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />

        <div className="backdrop-type" aria-hidden="true">
          <div
            ref={backgroundText}
            className="backdrop-word"
            style={{ transform: `scale(1.15, ${scaleY * 1.4})` }}
          >
            DEV
          </div>
          <div
            className="backdrop-oval"
            style={{ transform: `scaleY(${scaleY})` }}
          />
        </div>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-kicker">
            <span className="status-dot" />
            Available for opportunities
          </div>

          <div className="hero-visual" aria-hidden="true">
            <HeroVideo />
          </div>

          <div className="identity-copy">
            <p>
              <MapPin aria-hidden="true" size={15} />
              Bekasi, Indonesia
            </p>
            <h1 id="hero-title">
              Muhamad
              <br />
              Rusdiana
            </h1>
          </div>

          <div className="role-card">
            <span className="role-label">Specializing in</span>
            <strong>Fullstack</strong>
            <strong>Developer</strong>
            <span className="role-index">02 / 05</span>
          </div>

          <div className="hero-actions">
            <a
              className="social-link social-link--label"
              href="https://github.com/mrusdiana"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <FaGithub aria-hidden="true" size={17} />
              <span>GitHub</span>
            </a>
            <a
              className="social-link"
              href="https://linkedin.com/in/muhamad-rusdiana-99054b428"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <FaLinkedinIn aria-hidden="true" size={17} />
            </a>
            <a
              className="social-link"
              href="https://www.instagram.com/rusdi.an2?stkn=dXYxNnhxZTcwNzZs&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram profile"
            >
              <FaInstagram aria-hidden="true" size={18} />
            </a>
            <a className="primary-action" href="#contact">
              Let&apos;s connect <ArrowDownRight aria-hidden="true" size={18} />
            </a>
          </div>
        </section>
      </div>

      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <CertificatesSection />
      <ContactSection />

      <div
        id="mobile-menu"
        className={`menu-overlay ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          className="menu-backdrop"
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          tabIndex={menuOpen ? 0 : -1}
        />
        <aside className="menu-panel" aria-label="Menu panel">
          <div className="panel-header">
            <span className="brand">
              <Mark />
              <span>Muhamad Rusdiana.</span>
            </span>
            <button
              type="button"
              className="close-menu"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              <X aria-hidden="true" size={20} />
            </button>
          </div>
          <nav className="panel-links" aria-label="Mobile navigation">
            {navigation.map((item, index) => (
              <a
                href={`#${item.toLowerCase()}`}
                key={item}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
                style={{
                  transitionDelay: menuOpen ? `${150 + index * 60}ms` : "0ms",
                }}
              >
                <span>0{index + 1}</span>
                {item}
              </a>
            ))}
          </nav>
          <a
            className="panel-cta"
            href="#contact"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? 0 : -1}
          >
            Start a conversation <ArrowDownRight aria-hidden="true" size={19} />
          </a>
        </aside>
      </div>
    </main>
  );
}
