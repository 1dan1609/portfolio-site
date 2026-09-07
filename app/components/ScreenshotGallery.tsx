"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Screenshot {
  src: string;
  alt: string;
  caption: string;
}

interface ScreenshotGalleryProps {
  images: Screenshot[];
  className?: string;
  gridClassName?: string;
  imageAspectClassName?: string;
  thumbVariant?: "plain" | "collage" | "headline" | "gradient-frame";
  layout?: "thumbs" | "masonry" | "carousel";
}

export default function ScreenshotGallery({
  images,
  className = "",
  gridClassName = "grid-cols-2 sm:grid-cols-3",
  imageAspectClassName = "aspect-video",
  thumbVariant = "plain",
  layout = "thumbs",
}: ScreenshotGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, close, prev, next]);

  return (
    <>
      {layout === "masonry" && (
        <div className={`relative overflow-hidden ${className}`}>
          <span
            className="pointer-events-none select-none absolute top-0 left-0 stencil-display text-[13vw] sm:text-7xl uppercase leading-none whitespace-nowrap z-0"
            style={{ color: "rgba(255, 90, 17, 0.1)" }}
            aria-hidden="true"
          >
            Exhibit
          </span>
          <div className="relative z-10 flex flex-wrap items-start gap-4 pt-10 sm:pt-14">
            {images.map((img, i) => {
              const fig = String(i + 1).padStart(2, "0");
              return (
                <button
                  key={img.src}
                  onClick={() => setOpenIndex(i)}
                  className="block text-left group"
                  aria-label={`Open ${img.caption}`}
                >
                  <div
                    className="relative inline-block rounded-sm p-[3px]"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-cherry) 0%, var(--color-orange) 55%, var(--color-heat) 100%)",
                    }}
                  >
                    <div className="relative inline-block rounded-sm overflow-hidden bg-board-black leading-none">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="h-[160px] sm:h-[200px] w-auto block"
                      />
                      <span
                        className="absolute top-0 left-0 bg-accent-orange text-board-black font-mono text-[10px] font-bold px-2.5 py-1"
                        style={{ clipPath: "polygon(0 0, 100% 0, 82% 100%, 0% 100%)" }}
                      >
                        {fig}
                      </span>
                    </div>
                  </div>
                  <span className="block font-mono text-[10px] text-ink-subtle mt-2 leading-snug">
                    {img.caption}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {layout === "carousel" && (
        <div className={className}>
          <button
            onClick={() => setOpenIndex(activeIndex)}
            className="relative w-full bg-board-black border border-board-line rounded-sm overflow-hidden flex items-center justify-center"
            style={{ height: "min(60vh, 480px)" }}
            aria-label={`Open ${images[activeIndex].caption}`}
          >
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              className="max-w-full max-h-full object-contain"
            />
          </button>

          {images.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-3">
              <button
                onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
                className="text-ink-muted hover:text-accent-orange transition-colors"
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-1.5">
                {images.map((img, i) => (
                  <button
                    key={img.src}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Show ${img.caption}`}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === activeIndex ? "bg-accent-orange" : "bg-board-line"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
                className="text-ink-muted hover:text-accent-orange transition-colors"
                aria-label="Next screenshot"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          <span className="block font-mono text-[10px] text-ink-subtle mt-2 text-center leading-snug">
            {images[activeIndex].caption}
          </span>
        </div>
      )}

      {layout === "thumbs" && thumbVariant === "collage" && (
        <div className={className}>
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setOpenIndex(i)}
              className={`block text-left group w-[85%] relative ${
                i % 2 === 1 ? "z-10 ml-auto -mt-12" : `z-0 ${i > 0 ? "mt-6" : ""}`
              }`}
              aria-label={`Open ${img.caption}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={`w-full ${imageAspectClassName} object-cover rounded-sm border-2 border-accent-orange/50 shadow-panel group-hover:border-accent-orange transition-colors`}
              />
              <span className="block font-mono text-[10px] text-ink-subtle mt-1.5 leading-snug">
                {img.caption}
              </span>
            </button>
          ))}
        </div>
      )}

      {layout === "thumbs" && thumbVariant === "headline" && (
        <div className={`relative overflow-hidden ${className}`}>
          <span
            className="pointer-events-none select-none absolute top-0 left-0 stencil-display text-[13vw] sm:text-7xl uppercase leading-none whitespace-nowrap z-0"
            style={{ color: "rgba(255, 90, 17, 0.1)" }}
            aria-hidden="true"
          >
            Exhibit
          </span>
          <div className={`relative z-10 grid ${gridClassName} gap-3 pt-10 sm:pt-14`}>
            {images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setOpenIndex(i)}
                className="text-left group"
                aria-label={`Open ${img.caption}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full ${imageAspectClassName} object-cover rounded-sm border border-board-line group-hover:border-accent-orange/50 transition-colors`}
                />
                <span className="block font-mono text-[10px] text-ink-subtle mt-1.5 leading-snug">
                  {img.caption}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {layout === "thumbs" && thumbVariant === "gradient-frame" && (
        <div className={`grid ${gridClassName} gap-3 ${className}`}>
          {images.map((img, i) => {
            const fig = String(i + 1).padStart(2, "0");
            return (
              <button
                key={img.src}
                onClick={() => setOpenIndex(i)}
                className="text-left group block"
                aria-label={`Open ${img.caption}`}
              >
                <div
                  className="relative p-[3px] rounded-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-cherry) 0%, var(--color-orange) 55%, var(--color-heat) 100%)",
                  }}
                >
                  <div className="relative rounded-sm overflow-hidden bg-board-black">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className={`w-full ${imageAspectClassName} object-cover`}
                    />
                    <span
                      className="absolute top-0 left-0 bg-accent-orange text-board-black font-mono text-[10px] font-bold px-2.5 py-1"
                      style={{ clipPath: "polygon(0 0, 100% 0, 82% 100%, 0% 100%)" }}
                    >
                      {fig}
                    </span>
                  </div>
                </div>
                <span className="block font-mono text-[10px] text-ink-subtle mt-2 leading-snug">
                  {img.caption}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {layout === "thumbs" && thumbVariant === "plain" && (
        <div className={`grid ${gridClassName} gap-3 ${className}`}>
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setOpenIndex(i)}
              className="text-left group"
              aria-label={`Open ${img.caption}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={`w-full ${imageAspectClassName} object-cover rounded-sm border border-board-line group-hover:border-accent-orange/50 transition-colors`}
              />
              <span className="block font-mono text-[10px] text-ink-subtle mt-1.5 leading-snug">
                {img.caption}
              </span>
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-5 right-5 text-ink-muted hover:text-accent-orange transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-3 sm:left-6 text-ink-muted hover:text-accent-orange transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-3 sm:right-6 text-ink-muted hover:text-accent-orange transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-3 max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[openIndex].src}
                alt={images[openIndex].alt}
                className="max-h-[80vh] max-w-[90vw] object-contain rounded-sm border border-board-line"
              />
              <span className="font-mono text-xs text-ink-muted">{images[openIndex].caption}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
