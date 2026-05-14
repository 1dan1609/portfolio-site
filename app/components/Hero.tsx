"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitFork, Link2, Mail, ChevronDown, FileDown, MapPin } from "lucide-react";
import portfolioData from "@/content/portfolio-data.json";

const BOOT_LINES = [
  { text: "BIOS v2.4.1 — System Check OK", delay: 0, color: "text-terminal-muted" },
  { text: "Loading kernel modules... [OK]", delay: 200, color: "text-terminal-muted" },
  { text: "Mounting /home/vandan... [OK]", delay: 400, color: "text-terminal-muted" },
  { text: "Starting portfolio daemon... [OK]", delay: 600, color: "text-terminal-green" },
  { text: "", delay: 800, color: "" },
];

const TYPEWRITER_PHRASES = [
  "Software Engineer",
  "Full-Stack Developer",
  "Systems Programmer",
  "CS Graduate @ University of Florida",
  "Building things that matter.",
];

export default function Hero() {
  const [bootDone, setBootDone] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { personal } = portfolioData;

  // Boot sequence
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
          if (i === BOOT_LINES.length - 1) {
            setTimeout(() => setBootDone(true), 400);
          }
        }, BOOT_LINES[i].delay + 300)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!bootDone) return;
    const phrase = TYPEWRITER_PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === phrase) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? phrase.substring(0, displayText.length - 1)
              : phrase.substring(0, displayText.length + 1)
          );
        },
        isDeleting ? 40 : 70
      );
    }
    return () => clearTimeout(timeout);
  }, [bootDone, displayText, isDeleting, phraseIndex]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-terminal-grid px-6 pt-14 overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-terminal-green/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="terminal-window shadow-terminal"
        >
          {/* Title bar */}
          <div className="terminal-titlebar">
            <span className="terminal-dot bg-[#FF5F57]" />
            <span className="terminal-dot bg-[#FEBC2E]" />
            <span className="terminal-dot bg-[#28C840]" />
            <span className="font-mono text-xs text-terminal-muted ml-3">
              vandan@portfolio ~ bash
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-6 font-mono text-sm min-h-[240px]">
            {/* Boot lines */}
            {BOOT_LINES.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={
                  visibleLines > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                }
                transition={{ duration: 0.2 }}
                className={`${line.color} text-xs mb-0.5`}
              >
                {line.text}
              </motion.div>
            ))}

            {/* Main prompt after boot */}
            {bootDone && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2"
                >
                  <span className="text-terminal-green">vandan@portfolio</span>
                  <span className="text-terminal-muted">:</span>
                  <span className="text-terminal-blue">~</span>
                  <span className="text-terminal-muted">$ </span>
                  <span className="text-terminal-white">whoami</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-1 ml-2 flex items-center gap-3 flex-wrap"
                >
                  <span className="text-terminal-white text-base font-bold">{personal.name}</span>
                  <span className="flex items-center gap-1 font-mono text-xs text-terminal-muted">
                    <MapPin size={11} className="text-terminal-green" />
                    {personal.location}
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-3"
                >
                  <span className="text-terminal-green">vandan@portfolio</span>
                  <span className="text-terminal-muted">:</span>
                  <span className="text-terminal-blue">~</span>
                  <span className="text-terminal-muted">$ </span>
                  <span className="text-terminal-white">cat role.txt</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-1 ml-2 text-terminal-green text-lg font-semibold glow-green min-h-[1.8rem]"
                >
                  {displayText}
                  <span className="cursor-blink" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-3"
                >
                  <span className="text-terminal-green">vandan@portfolio</span>
                  <span className="text-terminal-muted">:</span>
                  <span className="text-terminal-blue">~</span>
                  <span className="text-terminal-muted">$ </span>
                  <span className="text-terminal-white">cat bio.txt</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="mt-1 ml-2 text-terminal-muted text-xs leading-relaxed max-w-2xl"
                >
                  {personal.bio}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.0 }}
                  className="mt-6 flex items-center gap-2 text-terminal-muted/60"
                >
                  <span className="text-terminal-green text-[10px]">›</span>
                  <span className="text-[10px] font-mono italic">
                    Hint: Use the AI chatbot (bottom right) for specific queries.
                  </span>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>

        {/* Social links */}
        {bootDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex items-center gap-4 mt-8 justify-center"
          >
            <a
              id="hero-github-link"
              href={`https://${personal.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs text-terminal-muted hover:text-terminal-green border border-bg-border hover:border-terminal-green/50 px-4 py-2 rounded transition-all duration-200 hover:bg-terminal-green/5"
            >
              <GitFork size={14} />
              GitHub
            </a>
            <a
              id="hero-linkedin-link"
              href={`https://${personal.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs text-terminal-muted hover:text-terminal-blue border border-bg-border hover:border-terminal-blue/50 px-4 py-2 rounded transition-all duration-200 hover:bg-terminal-blue/5"
            >
              <Link2 size={14} />
              LinkedIn
            </a>
            <a
              id="hero-email-link"
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 font-mono text-xs text-terminal-muted hover:text-terminal-yellow border border-bg-border hover:border-terminal-yellow/50 px-4 py-2 rounded transition-all duration-200 hover:bg-terminal-yellow/5"
            >
              <Mail size={14} />
              Email
            </a>
            <a
              id="hero-resume-link"
              href="/resume/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs text-terminal-green hover:text-bg-base border border-terminal-green/50 hover:border-terminal-green px-4 py-2 rounded transition-all duration-200 hover:bg-terminal-green shadow-glow-green"
            >
              <FileDown size={14} />
              Resume
            </a>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      {bootDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-terminal-muted"
        >
          <span className="font-mono text-xs">scroll --down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
