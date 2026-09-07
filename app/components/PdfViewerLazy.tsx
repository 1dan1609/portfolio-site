"use client";

import dynamic from "next/dynamic";

// pdfjs-dist relies on browser-only APIs (canvas, and on some Node versions
// a Promise.withResolvers call that isn't universally available server-side)
// — it must never execute during SSR. next/dynamic's ssr:false guarantees
// PdfViewer only ever loads and runs in the browser, after hydration.
const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="forge-panel rounded-sm p-10 flex items-center justify-center">
      <span className="font-mono text-xs text-ink-subtle">loading viewer…</span>
    </div>
  ),
});

export default PdfViewer;
