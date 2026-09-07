"use client";

import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Download, FileText, Loader2 } from "lucide-react";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// Pin the worker to the exact installed pdfjs-dist version via CDN — this
// sidesteps webpack asset-copy configuration entirely and self-corrects if
// the package version ever bumps.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  src: string;
  downloadName?: string;
  title?: string;
  className?: string;
  continuous?: boolean;
}

function PageNav({
  pageNumber,
  numPages,
  onPrev,
  onNext,
}: {
  pageNumber: number;
  numPages: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <button
        onClick={onPrev}
        disabled={pageNumber <= 1}
        className="text-ink-muted hover:text-accent-orange disabled:opacity-30 disabled:hover:text-ink-muted transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      <span className="font-mono text-[11px] text-ink-subtle whitespace-nowrap">
        {pageNumber} / {numPages}
      </span>
      <button
        onClick={onNext}
        disabled={pageNumber >= numPages}
        className="text-ink-muted hover:text-accent-orange disabled:opacity-30 disabled:hover:text-ink-muted transition-colors"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default function PdfViewer({
  src,
  downloadName,
  title,
  className = "",
  continuous = false,
}: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [failed, setFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`forge-panel rounded-sm overflow-hidden ${className}`}>
      {/* Header — title, pagination, and a persistent download button */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-board-line flex-wrap">
        <FileText size={14} className="text-accent-orange flex-shrink-0" />
        <span className="font-sans text-xs text-ink-body uppercase tracking-wide flex-1 min-w-0 truncate">
          {title || "Document"}
        </span>

        {numPages && !continuous && (
          <PageNav
            pageNumber={pageNumber}
            numPages={numPages}
            onPrev={() => setPageNumber((p) => Math.max(1, p - 1))}
            onNext={() => setPageNumber((p) => Math.min(numPages, p + 1))}
          />
        )}

        <a
          href={src}
          download={downloadName}
          className="flex items-center gap-1.5 bg-accent-orange text-board-black font-sans font-bold text-xs px-3 py-1.5 rounded-sm hover:bg-accent-heat transition-colors flex-shrink-0"
        >
          <Download size={13} />
          Download
        </a>
      </div>

      {/* Body — the PDF page itself; theme the chrome around it, never the
          rendered page pixels (the document is authored on white, and stays
          that way — a padded neutral frame keeps it legible). */}
      <div ref={containerRef} className="bg-board-black p-3 sm:p-6 flex justify-center">
        {failed ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <FileText size={28} className="text-ink-subtle" />
            <p className="font-sans text-sm text-ink-muted max-w-xs">
              This document couldn&apos;t be previewed here — you can still download it directly.
            </p>
            <a
              href={src}
              download={downloadName}
              className="flex items-center gap-1.5 bg-accent-orange text-board-black font-sans font-bold text-xs px-3 py-1.5 rounded-sm hover:bg-accent-heat transition-colors"
            >
              <Download size={13} />
              Download
            </a>
          </div>
        ) : (
          <Document
            file={src}
            onLoadSuccess={({ numPages: n }) => setNumPages(n)}
            onLoadError={() => setFailed(true)}
            loading={
              <div className="flex items-center gap-2 py-16 text-ink-subtle">
                <Loader2 size={18} className="animate-spin" />
                <span className="font-mono text-xs">loading document…</span>
              </div>
            }
          >
            {containerWidth > 0 && continuous && numPages && (
              <div className="flex flex-col gap-4 items-center w-full">
                {Array.from({ length: numPages }, (_, i) => (
                  <Page
                    key={i + 1}
                    pageNumber={i + 1}
                    width={Math.min(containerWidth - 8, 760)}
                    className="shadow-panel"
                  />
                ))}
              </div>
            )}
            {containerWidth > 0 && !continuous && (
              <Page
                pageNumber={pageNumber}
                width={Math.min(containerWidth - 8, 760)}
                className="shadow-panel"
              />
            )}
          </Document>
        )}
      </div>

      {/* Footer — page nav repeated below the document so long PDFs don't
          force a scroll back to the top just to advance a page. */}
      {numPages && !continuous && !failed && (
        <div className="flex items-center justify-center px-4 py-3 border-t border-board-line">
          <PageNav
            pageNumber={pageNumber}
            numPages={numPages}
            onPrev={() => setPageNumber((p) => Math.max(1, p - 1))}
            onNext={() => setPageNumber((p) => Math.min(numPages, p + 1))}
          />
        </div>
      )}
    </div>
  );
}
