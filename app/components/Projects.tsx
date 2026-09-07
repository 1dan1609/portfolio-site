"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, GitFork, ChevronDown, FileText, Package, ArrowRight } from "lucide-react";
import portfolioData from "@/content/portfolio-data.json";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<string | null>(null);

  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-16 px-6 md:pl-28">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading mb-8"
        >
          Releases
        </motion.div>

        <div className="flex flex-col gap-3">
          {projects.map((project, idx) => {
            const isOpen = expanded === project.id;
            const version = `v${projects.length - idx}.0`;
            return (
              <motion.div
                key={project.id}
                id={`project-card-${project.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.06 * idx }}
                className={`forge-panel rounded-sm overflow-hidden transition-colors ${
                  isOpen ? "border-accent-orange/40" : ""
                }`}
              >
                <button
                  id={`project-toggle-${project.id}`}
                  onClick={() => setExpanded(isOpen ? null : project.id)}
                  className="w-full text-left px-5 py-4 flex items-center gap-4 group"
                >
                  <div className="w-9 h-9 rounded-sm bg-board-black border border-board-line flex items-center justify-center flex-shrink-0">
                    <Package size={15} className="text-accent-orange" strokeWidth={1.75} />
                  </div>

                  <div className="flex-1 min-w-0 flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-ink-subtle flex-shrink-0">
                      {version}
                    </span>
                    <span className="font-sans font-bold text-sm text-ink-display uppercase tracking-wide truncate">
                      {project.name}
                    </span>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0 text-ink-muted hover:text-accent-orange transition-colors"
                        aria-label="Live demo"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <span className="font-mono text-xs text-ink-muted truncate hidden sm:block">
                      {project.tagline}
                    </span>
                  </div>

                  <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm border border-board-line text-ink-muted"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="font-mono text-[10px] text-ink-subtle">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  <div
                    className="flex items-center gap-2 flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink-muted hover:text-accent-orange transition-colors"
                        aria-label="GitHub"
                      >
                        <GitFork size={14} />
                      </a>
                    )}
                  </div>

                  <ChevronDown
                    size={14}
                    className={`text-ink-subtle transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-board-line">
                        <div className="flex flex-wrap gap-1.5 my-3 md:hidden">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm border border-board-line text-ink-muted"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="grid md:grid-cols-[1fr_auto] gap-6 mt-3">
                          <div>
                            <div className="font-mono text-[10px] text-ink-subtle uppercase tracking-wide mb-2">
                              release notes
                            </div>
                            <ul className="space-y-2">
                              {project.bullets.map((b, i) => (
                                <li key={i} className="flex gap-2 text-sm text-ink-body/85">
                                  <span className="text-accent-orange font-mono flex-shrink-0 mt-px">
                                    »
                                  </span>
                                  <span className="leading-snug">{b}</span>
                                </li>
                              ))}
                            </ul>

                            <Link
                              href={`/projects/${project.id}`}
                              className="inline-flex items-center gap-1.5 font-mono text-xs text-accent-orange hover:text-accent-heat transition-colors mt-4"
                            >
                              View full case study
                              <ArrowRight size={12} />
                            </Link>
                          </div>

                          <div className="hidden md:flex flex-col items-end gap-3 flex-shrink-0">
                            <div className="flex flex-wrap justify-end gap-1.5 max-w-[200px]">
                              {project.tech.map((t) => (
                                <span
                                  key={t}
                                  className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm border border-board-line text-ink-muted"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            <span
                              className={`font-mono text-[10px] px-2 py-0.5 rounded-sm border uppercase ${
                                project.status === "completed"
                                  ? "border-accent-orange/40 text-accent-orange"
                                  : "border-board-line text-ink-subtle"
                              }`}
                            >
                              {project.status}
                            </span>
                            {project.files && project.files.length > 0 && (
                              <div className="mt-1">
                                {(project.files as string[]).map((file) => (
                                  <a
                                    key={file}
                                    href={`/projects/${project.id}/${file}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-accent-orange transition-colors mt-1"
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
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-6 font-mono text-xs text-ink-subtle text-center"
        >
          more releases building
        </motion.div>
      </div>
    </section>
  );
}
