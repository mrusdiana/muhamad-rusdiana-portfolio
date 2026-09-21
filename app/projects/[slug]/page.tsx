import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import ProjectGallery from "@/components/ProjectGallery";
import ThemeToggle from "@/components/ThemeToggle";
import { getProject, projects } from "@/data/projects";
import "./project.css";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} | Muhamad Rusdiana`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next =
    projects[
      (projects.findIndex(({ slug }) => slug === project.slug) + 1) %
        projects.length
    ];

  return (
    <main className={`case-study case-study--${project.slug}`} id="top">
      <header className="case-header">
        <Link href="/#projects" className="case-back">
          <ArrowLeft size={17} aria-hidden="true" /> All projects
        </Link>
        <Link href="/" className="case-brand">
          MR<span>.</span>
        </Link>
        <div className="case-header-actions">
          <span className="case-header-index">
            Case study / {project.number}
          </span>
          <ThemeToggle />
        </div>
      </header>

      <section className="case-hero" aria-labelledby="case-title">
        <div className="case-hero-meta">
          <span>Selected work / 2026</span>
          <span>{project.type}</span>
        </div>
        <h1 id="case-title">
          {project.name}
          <span>.</span>
        </h1>
        <div className="case-hero-bottom">
          <p>{project.description}</p>
          <div className="case-hero-actions">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="case-live"
              >
                Visit live project <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            )}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="case-github"
                aria-label={`Open ${project.name} GitHub repository`}
              >
                <FaGithub size={17} aria-hidden="true" /> GitHub
              </a>
            ) : (
              <span
                className="case-github is-disabled"
                aria-disabled="true"
                title="GitHub link coming soon"
              >
                <FaGithub size={17} aria-hidden="true" /> GitHub
              </span>
            )}
          </div>
        </div>
      </section>

      {project.gallery.length > 0 && (
        <ProjectGallery name={project.name} images={project.gallery} />
      )}

      <section className="case-overview" aria-labelledby="overview-title">
        <div className="case-section-label">
          <span>01</span> Overview
        </div>
        <div className="case-overview-copy">
          <h2 id="overview-title">
            From concept
            <br />
            to product.
          </h2>
          {project.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="case-highlights" aria-labelledby="highlights-title">
        <div className="case-section-label">
          <span>02</span> What it does
        </div>
        <div className="case-highlights-content">
          <h2 id="highlights-title">The work, in detail.</h2>
          <div className="case-highlight-grid">
            {project.highlights.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-stack" aria-labelledby="stack-title">
        <div className="case-section-label">
          <span>03</span> Technology
        </div>
        <div className="case-stack-content">
          <h2 id="stack-title">Built with.</h2>
          <div className="case-stack-list">
            {project.stack.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      <footer className="case-footer">
        <div>
          <span>Next project / {next.number}</span>
          <Link href={`/projects/${next.slug}`}>
            {next.name}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <Link href="/#projects" className="case-footer-back">
          Back to all projects <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </footer>
    </main>
  );
}
