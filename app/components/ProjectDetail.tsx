import Link from "next/link";
import { ArrowLeft, GitFork, ExternalLink } from "lucide-react";
import portfolioData from "@/content/portfolio-data.json";
import ProjectVideo, { type VideoMedia } from "./ProjectVideo";
import PdfViewer from "./PdfViewerLazy";
import ScreenshotGallery from "./ScreenshotGallery";
import HeatDelta from "./HeatDelta";

type Project = (typeof portfolioData.projects)[number];

interface ProjectDetailProps {
  project: Project;
  index: number;
  total: number;
}

export default function ProjectDetail({ project, index, total }: ProjectDetailProps) {
  const version = `v${total - index}.0`;
  const media = "media" in project ? project.media : undefined;
  const delta = "delta" in project ? project.delta : undefined;
  const partTwoResults = "partTwoResults" in project ? project.partTwoResults : undefined;

  return (
    <section className="py-16 px-6 md:pl-28">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-ink-muted hover:text-accent-orange transition-colors mb-8"
        >
          <ArrowLeft size={13} />
          Back to Releases
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 flex-wrap mb-3">
            <span className="font-mono text-xs text-ink-subtle">{version}</span>
            <span
              className={`font-mono text-[10px] px-2 py-0.5 rounded-sm border uppercase ${
                project.status === "completed"
                  ? "border-accent-orange/40 text-accent-orange"
                  : "border-board-line text-ink-subtle"
              }`}
            >
              {project.status}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <h1 className="stencil-display text-4xl sm:text-5xl uppercase">{project.name}</h1>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live demo"
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-sm border border-board-line text-ink-muted hover:text-accent-orange hover:border-accent-orange/40 transition-colors"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
          <p className="font-sans text-base text-ink-muted mb-5">{project.tagline}</p>

          <div className="flex items-center gap-3 flex-wrap">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-sm border border-board-line text-ink-muted hover:text-accent-orange hover:border-accent-orange/40 transition-colors"
              >
                <GitFork size={13} />
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Media zone */}
        {media?.video && (
          <div className="mb-10">
            <ProjectVideo video={media.video as VideoMedia} />
          </div>
        )}

        {media?.papers && media.papers.length > 0 && (
          <div className="mb-10 flex flex-col gap-8">
            {media.papers.map((paper) => (
              <div key={paper.src}>
                <PdfViewer src={paper.src} downloadName={paper.downloadName} title={paper.title} />
                {paper.note && (
                  <p className="font-mono text-xs text-ink-subtle mt-3">{paper.note}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {delta && (
          <div className="mb-10">
            <div className="section-heading mb-4">Impact</div>
            <div className="max-w-sm">
              <HeatDelta label={delta.label} before={delta.before} after={delta.after} />
            </div>
          </div>
        )}

        {partTwoResults && (
          <div className="mb-10">
            <div className="section-heading mb-4">{partTwoResults.label}</div>
            <div className="grid gap-3 sm:grid-cols-3">
              {partTwoResults.metrics.map((m) => (
                <HeatDelta key={m.label} label={m.label} before={m.before} after={m.after} />
              ))}
            </div>
            <p className="font-sans text-sm text-ink-muted mt-4 leading-relaxed">
              {partTwoResults.note}
            </p>
          </div>
        )}

        {media?.screenshots && (
          <div className="mb-10">
            <div className="section-heading mb-4">Screens</div>
            {"screenshotLayout" in media && media.screenshotLayout ? (
              <ScreenshotGallery
                images={media.screenshots}
                layout={media.screenshotLayout as "masonry" | "carousel"}
              />
            ) : (
              <ScreenshotGallery images={media.screenshots} gridClassName="grid-cols-1" thumbVariant="gradient-frame" />
            )}
          </div>
        )}

        {/* Body */}
        <div className="mb-8">
          <p className="font-sans text-base text-ink-body/85 leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="font-mono text-[10px] text-ink-subtle uppercase tracking-wide mb-3">
            release notes
          </div>
          <ul className="space-y-2.5 mb-8">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-ink-body/85 leading-relaxed">
                <span className="text-accent-orange font-mono flex-shrink-0">»</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-xs px-2.5 py-1 rounded-sm border border-board-line text-ink-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
