import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import ProjectGallery from "@/components/ProjectGallery";
import ThemeToggle from "@/components/ThemeToggle";
import { getProject, projects } from "@/data/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

const projectThemes: Record<string, string> = {
  dolan:
    "[--case-bg:#eef5ff] [--case-ink:#142a46] [--case-accent:#4f8fdc] dark:[--case-bg:#142235] dark:[--case-ink:#f4f8ff] dark:[--case-accent:#83b6ff]",
  berybox:
    "[--case-bg:#fff1f4] [--case-ink:#501932] [--case-accent:#dc4e89] dark:[--case-bg:#2b1b2b] dark:[--case-ink:#fff3f8] dark:[--case-accent:#f48eb7]",
  renaiflix:
    "[--case-bg:#111113] [--case-ink:#fffbea] [--case-accent:#f4d349]",
  mimoo:
    "[--case-bg:#e9fbfc] [--case-ink:#163a43] [--case-accent:#06a9bc] dark:[--case-bg:#123138] dark:[--case-ink:#effdff] dark:[--case-accent:#71d4e0]",
  hacktivo:
    "[--case-bg:#f3e8dd] [--case-ink:#37251b] [--case-accent:#ea7147] dark:[--case-bg:#262329] dark:[--case-ink:#fff6f0] dark:[--case-accent:#ffa474]",
};

const sectionClass =
  "mx-auto grid w-[min(calc(100%-48px),1120px)] grid-cols-[minmax(120px,0.26fr)_minmax(0,1fr)] gap-[clamp(24px,5vw,80px)] border-t border-[color-mix(in_srgb,var(--case-ink)_17%,transparent)] py-[clamp(28px,4vw,48px)] max-[767px]:w-[calc(100%-32px)] max-[767px]:grid-cols-1 max-[767px]:gap-[15px] max-[767px]:py-[30px]";

const sectionLabelClass =
  "flex items-start gap-[10px] text-[0.68rem] font-[780] tracking-[0.06em] text-[var(--case-accent)] uppercase [&>span]:text-[var(--case-ink)] [&>span]:opacity-50";

const sectionTitleClass =
  "mb-5 text-[clamp(2rem,3.3vw,3rem)] leading-none font-[710] tracking-[-0.065em] max-[767px]:mb-[18px]";

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
    <main
      className={`min-h-screen bg-[var(--case-bg)] font-[Inter,Arial,Helvetica,sans-serif] text-[var(--case-ink)] ${projectThemes[project.slug]}`}
      id="top"
    >
      <header className="mx-auto grid h-[65px] w-[min(calc(100%-48px),1120px)] grid-cols-[1fr_auto_1fr] items-center border-b border-[color-mix(in_srgb,var(--case-ink)_16%,transparent)] max-[767px]:h-[58px] max-[767px]:w-[calc(100%-32px)] max-[767px]:grid-cols-[1fr_auto_auto] max-[767px]:gap-3">
        <Link
          href="/#projects"
          className="inline-flex w-max items-center gap-2 text-[0.76rem] font-bold hover:text-[var(--case-accent)]"
        >
          <ArrowLeft size={17} aria-hidden="true" /> All projects
        </Link>
        <Link href="/" className="text-[1.2rem] font-black tracking-[-0.1em]">
          MR<span className="text-[var(--case-accent)]">.</span>
        </Link>
        <div className="flex items-center justify-self-end gap-[14px]">
          <span className="text-[0.62rem] font-[750] tracking-[0.12em] uppercase max-[767px]:hidden">
            Case study / {project.number}
          </span>
          <ThemeToggle variant="case" />
        </div>
      </header>

      <section
        className="mx-auto w-[min(calc(100%-48px),1120px)] pt-[clamp(34px,5vw,64px)] pb-[25px] max-[767px]:w-[calc(100%-32px)] max-[767px]:pt-[30px] max-[767px]:pb-5"
        aria-labelledby="case-title"
      >
        <div className="flex justify-between gap-[15px] text-[0.68rem] font-[780] tracking-[0.08em] text-[var(--case-accent)] uppercase max-[767px]:flex-col max-[767px]:gap-[5px]">
          <span>Selected work / 2026</span>
          <span>{project.type}</span>
        </div>
        <h1
          id="case-title"
          className="mt-6 mb-[18px] text-[clamp(3.3rem,7vw,5.5rem)] leading-[0.9] font-[760] tracking-[-0.09em] max-[767px]:mt-[22px] max-[767px]:mb-4 max-[767px]:text-[clamp(3.3rem,13vw,4.7rem)]"
        >
          {project.name}
          <span className="text-[var(--case-accent)]">.</span>
        </h1>
        <div className="flex items-end justify-between gap-7 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-4">
          <p className="max-w-[680px] text-[clamp(1rem,1.55vw,1.3rem)] leading-[1.45] font-[530] tracking-[-0.025em]">
            {project.description}
          </p>
          <div className="flex shrink-0 flex-wrap gap-2">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-[9px] rounded-full bg-[var(--case-accent)] px-[15px] py-[11px] text-[0.72rem] font-extrabold text-[var(--case-bg)] transition-transform duration-180 hover:-translate-y-[3px] dark:text-[#111318]"
              >
                Visit live project <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            )}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--case-ink)_26%,transparent)] bg-[color-mix(in_srgb,var(--case-bg)_88%,var(--case-ink))] px-[14px] py-[10px] text-[0.72rem] font-extrabold text-[var(--case-ink)] transition-[transform,background] duration-180 hover:-translate-y-[3px] hover:bg-[color-mix(in_srgb,var(--case-bg)_78%,var(--case-ink))] focus-visible:-translate-y-[3px] focus-visible:bg-[color-mix(in_srgb,var(--case-bg)_78%,var(--case-ink))]"
                aria-label={`Open ${project.name} GitHub repository`}
              >
                <FaGithub size={17} aria-hidden="true" /> GitHub
              </a>
            ) : (
              <span
                className="inline-flex shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--case-ink)_26%,transparent)] bg-[color-mix(in_srgb,var(--case-bg)_88%,var(--case-ink))] px-[14px] py-[10px] text-[0.72rem] font-extrabold text-[var(--case-ink)] opacity-48"
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

      <section className={sectionClass} aria-labelledby="overview-title">
        <div className={sectionLabelClass}>
          <span>01</span> Overview
        </div>
        <div className="[&>p]:mt-[13px] [&>p]:max-w-[790px] [&>p]:text-[0.94rem] [&>p]:leading-[1.68] [&>p]:text-[color-mix(in_srgb,var(--case-ink)_82%,transparent)] [&>p:first-of-type]:text-[1.05rem] [&>p:first-of-type]:leading-[1.55] [&>p:first-of-type]:font-semibold">
          <h2 id="overview-title" className={sectionTitleClass}>
            From concept
            <br />
            to product.
          </h2>
          {project.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="highlights-title">
        <div className={sectionLabelClass}>
          <span>02</span> What it does
        </div>
        <div>
          <h2 id="highlights-title" className={sectionTitleClass}>
            The work, in detail.
          </h2>
          <div className="grid grid-cols-3 gap-[10px] max-[767px]:grid-cols-1">
            {project.highlights.map((item, index) => (
              <article
                className={`min-h-[180px] rounded-[13px] border border-[color-mix(in_srgb,var(--case-ink)_14%,transparent)] bg-[color-mix(in_srgb,var(--case-bg)_92%,white)] p-[17px] max-[767px]:min-h-0 dark:bg-[color-mix(in_srgb,var(--case-bg)_90%,white)] ${
                  project.slug === "renaiflix" ? "bg-[#1b1b1e]" : ""
                }`}
                key={item.title}
              >
                <span className="text-[0.66rem] font-extrabold text-[var(--case-accent)]">
                  0{index + 1}
                </span>
                <h3 className="mt-[23px] mb-[7px] text-[1.12rem] font-[760] tracking-[-0.04em] max-[767px]:mt-[14px]">
                  {item.title}
                </h3>
                <p className="text-[0.79rem] leading-[1.55] text-[color-mix(in_srgb,var(--case-ink)_75%,transparent)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass} aria-labelledby="stack-title">
        <div className={sectionLabelClass}>
          <span>03</span> Technology
        </div>
        <div>
          <h2 id="stack-title" className={sectionTitleClass}>
            Built with.
          </h2>
          <div className="flex flex-wrap gap-[7px]">
            {project.stack.map((tech) => (
              <span
                className="inline-flex min-h-[34px] items-center rounded-full border border-[color-mix(in_srgb,var(--case-ink)_20%,transparent)] px-3 py-[7px] text-[0.74rem] font-bold"
                key={tech}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-5 flex min-h-[180px] items-end justify-between gap-6 bg-[var(--case-ink)] px-[max(24px,calc((100vw-1120px)/2))] py-[35px] text-[var(--case-bg)] dark:border-t dark:border-[color-mix(in_srgb,var(--case-ink)_14%,transparent)] dark:bg-[color-mix(in_srgb,var(--case-bg)_80%,black)] dark:text-[var(--case-ink)] max-[767px]:min-h-[190px] max-[767px]:flex-col max-[767px]:items-start max-[767px]:justify-between max-[767px]:px-4 max-[767px]:pt-[30px] max-[767px]:pb-[75px]">
        <div className="flex flex-col gap-[9px]">
          <span className="text-[0.66rem] font-extrabold tracking-[0.08em] text-[var(--case-accent)] uppercase">
            Next project / {next.number}
          </span>
          <Link
            href={`/projects/${next.slug}`}
            className="inline-flex items-center gap-3 text-[clamp(2rem,3.5vw,3rem)] leading-none font-[750] tracking-[-0.075em] [&>svg]:h-auto [&>svg]:w-[clamp(26px,3vw,40px)]"
          >
            {next.name}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <Link
          href="/#projects"
          className="inline-flex shrink-0 items-center gap-2 pb-[7px] text-[0.72rem] font-[760]"
        >
          Back to all projects <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </footer>
    </main>
  );
}
