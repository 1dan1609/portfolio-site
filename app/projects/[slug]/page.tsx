import { notFound } from "next/navigation";
import type { Metadata } from "next";
import portfolioData from "@/content/portfolio-data.json";
import ProjectDetail from "@/app/components/ProjectDetail";

export function generateStaticParams() {
  return portfolioData.projects.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = portfolioData.projects.find((p) => p.id === params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — Vandan Agrawal`,
    description: project.tagline,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const index = portfolioData.projects.findIndex((p) => p.id === params.slug);
  if (index === -1) notFound();

  return (
    <ProjectDetail
      project={portfolioData.projects[index]}
      index={index}
      total={portfolioData.projects.length}
    />
  );
}
