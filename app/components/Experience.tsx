"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, GitCommitVertical } from "lucide-react";
import portfolioData from "@/content/portfolio-data.json";
import HeatBar from "./HeatBar";
import PdfGallery from "./PdfGallery";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<string | null>(
    portfolioData.experience[0]?.id ?? null
  );

  const { experience, competitions } = portfolioData;

  return (
    <section id="experience" className="py-16 px-6 md:pl-28">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="section-heading">Build Log</div>
          <div className="font-mono text-[10px] text-ink-subtle tracking-wide mt-1">
            Experience
          </div>
        </motion.div>

        <div className="flex flex-col gap-3">
          {experience.map((job, idx) => {
            const isOpen = expanded === job.id;
            const isCurrent = idx === 0;
            const metrics = job.metrics;
            const reports = "reports" in job ? job.reports : undefined;
            const buildNum = String(experience.length - idx).padStart(3, "0");
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className={`forge-panel rounded-sm overflow-hidden transition-colors ${
                  isOpen ? "border-accent-orange/40" : ""
                }`}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : job.id)}
                  className="w-full text-left p-5 flex flex-col sm:flex-row sm:items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-sm bg-board-black border border-board-line flex items-center justify-center flex-shrink-0">
                    <GitCommitVertical size={15} className="text-accent-orange" strokeWidth={1.75} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[11px] text-ink-subtle">
                          BUILD #{buildNum}
                        </span>
                        <span
                          className={`font-mono text-[10px] px-2 py-0.5 rounded-sm border uppercase ${
                            isCurrent
                              ? "border-accent-orange/40 text-accent-orange"
                              : "border-board-line text-ink-subtle"
                          }`}
                        >
                          {isCurrent ? "deployed" : "archived"}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-ink-muted">{job.dates}</span>
                    </div>

                    <div className="font-sans font-bold text-sm text-ink-display uppercase tracking-wide mt-2">
                      {job.role}
                    </div>
                    <div className="font-sans text-xs text-ink-muted mt-0.5">{job.company}</div>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 rounded-sm border border-board-line text-ink-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0 self-center text-ink-subtle">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-board-line px-5 pb-5 pt-4">
                        <div className="grid md:grid-cols-[1fr_260px] gap-6">
                          <div>
                            <div className="font-mono text-[10px] text-ink-subtle uppercase tracking-wide mb-2">
                              build log
                            </div>
                            <ul className="space-y-2">
                              {job.bullets.map((bullet, i) => (
                                <li key={i} className="flex gap-2 text-sm text-ink-body/85">
                                  <span className="text-accent-orange flex-shrink-0 font-mono">
                                    »
                                  </span>
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {(metrics && metrics.length > 0) || (reports && reports.length > 0) ? (
                            <div className="flex flex-col gap-5 flex-shrink-0 pt-1">
                              {metrics && metrics.length > 0 && (
                                <div className="flex flex-col gap-5">
                                  {metrics.map((m, i) => (
                                    <HeatBar
                                      key={m.label}
                                      label={m.label}
                                      value={m.value}
                                      max={m.max}
                                      unit={m.unit}
                                      active={isOpen}
                                      delay={0.15 + i * 0.2}
                                    />
                                  ))}
                                </div>
                              )}

                              {reports && reports.length > 0 && (
                                <div>
                                  <div className="font-mono text-[10px] text-ink-subtle uppercase tracking-wide mb-2">
                                    reports
                                  </div>
                                  <PdfGallery docs={reports} />
                                </div>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Competitions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <div className="section-heading">Field Deployments</div>
          <div className="font-mono text-[10px] text-ink-subtle tracking-wide mt-1 mb-5">
            Competitions
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {competitions.map((comp) => (
              <div key={comp.id} className="forge-panel rounded-sm p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="font-sans font-bold text-xs text-ink-display uppercase tracking-wide">
                    {comp.name}
                  </div>
                  <div className="font-mono text-[10px] text-accent-orange border border-accent-orange/30 px-2 py-0.5 rounded-sm flex-shrink-0">
                    {comp.result}
                  </div>
                </div>
                <div className="text-ink-muted text-xs">{comp.description}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
