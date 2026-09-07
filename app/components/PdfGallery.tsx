"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText } from "lucide-react";
import PdfViewer from "./PdfViewerLazy";

interface PdfDoc {
  label: string;
  src: string;
  downloadName?: string;
}

interface PdfGalleryProps {
  docs: PdfDoc[];
  className?: string;
}

export default function PdfGallery({ docs, className = "" }: PdfGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, close]);

  return (
    <>
      <div className={`flex flex-col gap-1.5 ${className}`}>
        {docs.map((doc, i) => (
          <button
            key={doc.src}
            onClick={() => setOpenIndex(i)}
            className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-accent-orange transition-colors text-left"
          >
            <FileText size={11} className="flex-shrink-0" />
            <span className="truncate">{doc.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-5 right-5 text-ink-muted hover:text-accent-orange transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <PdfViewer
                src={docs[openIndex].src}
                downloadName={docs[openIndex].downloadName}
                title={docs[openIndex].label}
                continuous
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
