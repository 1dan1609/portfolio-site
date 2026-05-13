"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { GitCommit, GitBranch, ChevronDown, ChevronUp } from "lucide-react";
import portfolioData from "@/content/portfolio-data.json";

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<string | null>(
    portfolioData.experience[0]?.id ?? null
  );

  const { experience, competitions } = portfolioData;

  return (
    <section id="experience" ref={ref} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading mb-12"
        >
          <span className="text-terminal-green">$</span> git log --experience
        </motion.div>

        {/* Git log header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="font-mono text-xs text-terminal-muted mb-6 border border-bg-border rounded px-4 py-2 bg-bg-elevated"
        >
          <span className="text-terminal-green">$</span> git log --oneline --graph --decorate
        </motion.div>

        {/* Commit history */}
        <div className="relative">
          {experience.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * idx }}
              className="git-line mb-6"
            >
              {/* Commit node */}
              <div className="absolute left-0 top-3 w-[15px] h-[15px] rounded-full bg-bg-base border-2 border-terminal-green flex items-center justify-center z-10">
                <div className="w-[5px] h-[5px] rounded-full bg-terminal-green" />
              </div>

              {/* Commit card */}
              <div
                className={`terminal-card cursor-pointer transition-all duration-300 ${
                  expanded === job.id ? "border-terminal-green/50" : ""
                }`}
                onClick={() =>
                  setExpanded(expanded === job.id ? null : job.id)
                }
              >
                {/* Commit header */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {/* Commit hash + branch */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <GitCommit size={12} className="text-terminal-yellow flex-shrink-0" />
                          <span className="font-mono text-xs text-terminal-yellow">
                            {job.commitHash}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <GitBranch size={11} className="text-terminal-purple flex-shrink-0" />
                          <span className="font-mono text-xs text-terminal-purple">
                            {job.branch}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-terminal-muted ml-auto">
                          {job.dates}
                        </span>
                      </div>

                      {/* Role & company */}
                      <div className="font-semibold text-terminal-white">
                        {job.role}
                      </div>
                      <div className="text-sm text-terminal-muted mt-0.5">
                        @ {job.company}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-xs px-2 py-0.5 rounded border border-bg-border text-terminal-muted hover:border-terminal-green/40 hover:text-terminal-green transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expand toggle */}
                    <button
                      id={`exp-toggle-${job.id}`}
                      className="text-terminal-muted hover:text-terminal-green transition-colors flex-shrink-0 mt-1"
                      aria-label={expanded === job.id ? "Collapse" : "Expand"}
                    >
                      {expanded === job.id ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Diff content (expanded) */}
                <AnimatePresence>
                  {expanded === job.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-bg-border px-4 py-4 bg-bg-elevated/50">
                        <div className="font-mono text-xs text-terminal-muted mb-2">
                          diff --git a/experience/{job.id}.txt
                        </div>
                        <ul className="space-y-2">
                          {job.bullets.map((bullet, i) => (
                            <li key={i} className="flex gap-2 text-sm">
                              <span className="text-terminal-green flex-shrink-0 font-mono">
                                +
                              </span>
                              <span className="text-terminal-white/90">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Competitions sub-section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className="section-heading mb-6 text-terminal-muted">
            <span className="text-terminal-blue">$</span> cat competitions.log
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {competitions.map((comp) => (
              <div key={comp.id} className="terminal-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-terminal-white text-sm">
                      {comp.name}
                    </div>
                    <div className="text-terminal-muted text-xs mt-1">
                      {comp.description}
                    </div>
                  </div>
                  <div className="font-mono text-xs text-terminal-yellow border border-terminal-yellow/30 px-2 py-0.5 rounded flex-shrink-0">
                    {comp.result}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
