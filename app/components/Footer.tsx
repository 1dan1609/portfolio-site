"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Link2, Send } from "lucide-react";
import portfolioData from "@/content/portfolio-data.json";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { personal } = portfolioData;

  const openAssistant = () => {
    window.dispatchEvent(new Event("open-assistant"));
  };

  return (
    <footer id="contact" ref={ref} className="py-20 px-6 md:pl-28 border-t border-board-line">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="section-heading justify-center">Deploy</div>
          <div className="font-mono text-[10px] text-ink-subtle tracking-wide mt-1 mb-8 text-left">
            Contact
          </div>

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-sm forge-panel mb-5">
            <Send size={24} className="text-accent-orange" strokeWidth={1.75} />
          </div>

          <h2 className="stencil-display text-3xl uppercase mb-3">
            Ready to ship.
          </h2>
          <p className="text-ink-muted text-sm max-w-md mx-auto mb-10">
            Open to the right next opportunity. Reach out directly, or
            query the assistant for anything not on this page.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              id="footer-email"
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 bg-accent-orange text-board-black font-sans font-bold text-sm px-5 py-2.5 rounded-sm hover:bg-accent-heat transition-colors"
            >
              <Mail size={15} />
              {personal.email}
            </a>
            <a
              id="footer-linkedin"
              href={`https://${personal.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-sm px-5 py-2.5 rounded-sm border border-board-line text-ink-body hover:border-accent-orange hover:text-accent-orange transition-colors"
            >
              <Link2 size={15} />
              LinkedIn
            </a>
            <button
              id="footer-assistant"
              onClick={openAssistant}
              className="flex items-center gap-2 font-sans text-sm px-5 py-2.5 rounded-sm border border-board-line text-ink-body hover:border-accent-orange hover:text-accent-orange transition-colors"
            >
              <Send size={15} />
              Query Assistant
            </button>
          </div>

          <div className="mt-16 pt-8 border-t border-board-line flex items-center justify-center gap-2 text-ink-subtle font-mono text-xs">
            <span>vandan.dev</span>
            <span className="mx-2">·</span>
            <span>built under load</span>
            <span className="mx-2">·</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
