"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Folder,
  FolderOpen,
  ExternalLink,
  GitFork,
  FileText,
  ChevronRight,
} from "lucide-react";
import portfolioData from "@/content/portfolio-data.json";

const TECH_COLORS: Record<string, string> = {
  Python: "text-terminal-blue border-terminal-blue/40 bg-terminal-blue/10",
  "Unity 3D": "text-terminal-green border-terminal-green/40 bg-terminal-green/10",
  "C#": "text-terminal-purple border-terminal-purple/40 bg-terminal-purple/10",
  MySQL: "text-terminal-orange border-terminal-orange/40 bg-terminal-orange/10",
  Blender: "text-terminal-orange border-terminal-orange/40 bg-terminal-orange/10",
  RBAC: "text-terminal-red border-terminal-red/40 bg-terminal-red/10",
  Tkinter: "text-terminal-cyan border-terminal-cyan/40 bg-terminal-cyan/10",
  default: "text-terminal-muted border-bg-border bg-bg-elevated",
};

function getTechColor(tech: string) {
  return TECH_COLORS[tech] || TECH_COLORS.default;
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<string | null>(null);

  const { projects } = portfolioData;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="projects" ref={ref} className="py-24 px-6 bg-bg-surface/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading mb-12"
        >
          <span className="text-terminal-green">$</span> ls -la ./projects/
        </motion.div>

        {/* Directory listing header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs text-terminal-muted mb-6 grid grid-cols-[auto_1fr] gap-x-4 border border-bg-border rounded px-4 py-2 bg-bg-elevated"
        >
          <span className="text-terminal-green">total {projects.length}</span>
          <span>drwxr-xr-x — vandan — projects/</span>
        </motion.div>

        {/* Project cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              id={`project-card-${project.id}`}
              className="terminal-card flex flex-col"
            >
              {/* Card header */}
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between mb-3">
                  <button
                    id={`project-toggle-${project.id}`}
                    onClick={() =>
                      setExpanded(expanded === project.id ? null : project.id)
                    }
                    className="flex items-center gap-2 text-terminal-yellow hover:text-terminal-green transition-colors group"
                  >
                    {expanded === project.id ? (
                      <FolderOpen size={18} />
                    ) : (
                      <Folder size={18} />
                    )}
                    <span className="font-semibold text-terminal-white text-sm group-hover:text-terminal-green transition-colors">
                      {project.name}
                    </span>
                    <ChevronRight
                      size={12}
                      className={`text-terminal-muted transition-transform duration-200 ${
                        expanded === project.id ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terminal-muted hover:text-terminal-white transition-colors"
                        aria-label="GitHub"
                      >
                        <GitFork size={14} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terminal-muted hover:text-terminal-green transition-colors"
                        aria-label="Live demo"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-terminal-muted text-xs mb-1 font-mono">
                  # {project.tagline}
                </p>

                <p className="text-terminal-white/80 text-sm leading-relaxed mt-2">
                  {project.description}
                </p>

                {/* Expandable bullet details */}
                <AnimatePresence>
                  {expanded === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 border-t border-bg-border pt-4">
                        <div className="font-mono text-xs text-terminal-muted mb-2">
                          $ cat {project.id}/README.md
                        </div>
                        <ul className="space-y-2">
                          {project.bullets.map((b, i) => (
                            <li key={i} className="flex gap-2 text-xs">
                              <span className="text-terminal-green font-mono flex-shrink-0">
                                →
                              </span>
                              <span className="text-terminal-white/80">{b}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Attached files */}
                        {project.files && project.files.length > 0 && (
                          <div className="mt-3">
                            <div className="font-mono text-xs text-terminal-muted mb-1">
                              $ ls {project.id}/assets/
                            </div>
                            {(project.files as string[]).map((file) => (
                              <a
                                key={file}
                                href={`/projects/${project.id}/${file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs text-terminal-blue hover:text-terminal-green transition-colors mt-1"
                              >
                                <FileText size={11} />
                                {file}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card footer — tech stack */}
              <div className="px-5 pb-4 border-t border-bg-border pt-3 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className={`font-mono text-xs px-2 py-0.5 rounded border ${getTechColor(t)}`}
                  >
                    {t}
                  </span>
                ))}
                <span
                  className={`ml-auto font-mono text-xs px-2 py-0.5 rounded border ${
                    project.status === "completed"
                      ? "border-terminal-green/40 text-terminal-green bg-terminal-green/5"
                      : "border-terminal-yellow/40 text-terminal-yellow bg-terminal-yellow/5"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add project hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 font-mono text-xs text-terminal-subtle text-center"
        >
          <span className="text-terminal-green">$</span> More projects loading...
        </motion.div>
      </div>
    </section>
  );
}
