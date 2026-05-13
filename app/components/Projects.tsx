"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  GitFork,
  ChevronDown,
  FileText,
} from "lucide-react";
import portfolioData from "@/content/portfolio-data.json";

const TECH_COLORS: Record<string, string> = {
  Python: "text-terminal-blue border-terminal-blue/40 bg-terminal-blue/10",
  "Next.js 14": "text-terminal-white border-terminal-white/30 bg-terminal-white/5",
  TypeScript: "text-terminal-blue border-terminal-blue/40 bg-terminal-blue/10",
  "Tailwind CSS": "text-terminal-cyan border-terminal-cyan/40 bg-terminal-cyan/10",
  "Framer Motion": "text-terminal-purple border-terminal-purple/40 bg-terminal-purple/10",
  "Gemini AI": "text-terminal-green border-terminal-green/40 bg-terminal-green/10",
  Vercel: "text-terminal-white border-terminal-white/30 bg-terminal-white/5",
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

  return (
    <section id="projects" ref={ref} className="py-24 px-6 bg-bg-surface/30">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading mb-10"
        >
          <span className="text-terminal-green">$</span> ls -la ./projects/
        </motion.div>

        {/* Directory listing header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs text-terminal-muted mb-4 flex gap-4 border border-bg-border rounded px-4 py-2 bg-bg-elevated"
        >
          <span className="text-terminal-green">total {projects.length}</span>
          <span>drwxr-xr-x — vandan — projects/</span>
        </motion.div>

        {/* Project rows */}
        <div className="flex flex-col divide-y divide-bg-border border border-bg-border rounded-lg overflow-hidden">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              id={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
            >
              {/* Row header — always visible */}
              <button
                id={`project-toggle-${project.id}`}
                onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-bg-elevated/60 transition-colors group"
              >
                {/* Index */}
                <span className="font-mono text-xs text-terminal-subtle w-5 flex-shrink-0">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Name + tagline */}
                <div className="flex-1 min-w-0 flex items-baseline gap-3">
                  <span className="font-semibold text-terminal-white text-sm group-hover:text-terminal-green transition-colors truncate">
                    {project.name}
                  </span>
                  <span className="font-mono text-xs text-terminal-muted truncate hidden sm:block">
                    # {project.tagline}
                  </span>
                </div>

                {/* Tech badges — top 3 only to keep compact */}
                <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className={`font-mono text-xs px-1.5 py-0.5 rounded border ${getTechColor(t)}`}
                    >
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="font-mono text-xs text-terminal-subtle">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
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

                {/* Chevron */}
                <ChevronDown
                  size={14}
                  className={`text-terminal-muted transition-transform duration-200 flex-shrink-0 ${
                    expanded === project.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expandable detail panel */}
              <AnimatePresence>
                {expanded === project.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-3 bg-bg-elevated/40 border-t border-bg-border">
                      {/* All tech tags on mobile */}
                      <div className="flex flex-wrap gap-1.5 mb-4 md:hidden">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className={`font-mono text-xs px-1.5 py-0.5 rounded border ${getTechColor(t)}`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="grid md:grid-cols-[1fr_auto] gap-6">
                        {/* Bullets */}
                        <div>
                          <div className="font-mono text-xs text-terminal-muted mb-3">
                            $ cat {project.id}/README.md
                          </div>
                          <ul className="space-y-2">
                            {project.bullets.map((b, i) => (
                              <li key={i} className="flex gap-2 text-sm">
                                <span className="text-terminal-green font-mono flex-shrink-0 mt-px">→</span>
                                <span className="text-terminal-white/80 leading-snug">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Right: all tech + status */}
                        <div className="hidden md:flex flex-col items-end gap-3 flex-shrink-0">
                          <div className="flex flex-wrap justify-end gap-1.5 max-w-[200px]">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className={`font-mono text-xs px-1.5 py-0.5 rounded border ${getTechColor(t)}`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <span
                            className={`font-mono text-xs px-2 py-0.5 rounded border ${
                              project.status === "completed"
                                ? "border-terminal-green/40 text-terminal-green bg-terminal-green/5"
                                : "border-terminal-yellow/40 text-terminal-yellow bg-terminal-yellow/5"
                            }`}
                          >
                            {project.status}
                          </span>
                          {/* Files */}
                          {project.files && project.files.length > 0 && (
                            <div className="mt-1">
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
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Footer hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-6 font-mono text-xs text-terminal-subtle text-center"
        >
          <span className="text-terminal-green">$</span> More projects loading...
        </motion.div>
      </div>
    </section>
  );
}
