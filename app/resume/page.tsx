import type { Metadata } from "next";
import PdfViewer from "@/app/components/PdfViewerLazy";
import portfolioData from "@/content/portfolio-data.json";

export const metadata: Metadata = {
  title: "Resume — Vandan Agrawal",
  description: `${portfolioData.personal.name}'s resume — view or download.`,
};

export default function ResumePage() {
  return (
    <section className="py-16 px-6 md:pl-28">
      <div className="max-w-3xl mx-auto">
        <div className="section-heading mb-8">Resume</div>
        <PdfViewer
          src="/media/resume/resume.pdf"
          downloadName="Vandan_Agrawal_Resume.pdf"
          title={`${portfolioData.personal.name} — Resume`}
        />
      </div>
    </section>
  );
}
