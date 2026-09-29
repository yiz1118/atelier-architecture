import type { Metadata } from "next";
import { ProjectIndex } from "@/components/project-index";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Projects", description: "Five original architectural design studies in residential, hospitality, interiors and commercial space." };

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category = "All" } = await searchParams;
  return <div className="page-shell inner-page projects-page"><div className="page-intro"><div className="page-intro-kicker"><span className="mono">01 / Index</span><span className="eyebrow">Selected design studies</span></div><h1>Built on an idea<span className="period">.</span></h1><p>Five fictional explorations of context, use and enduring material character.</p></div><ProjectIndex projects={projects} initialCategory={category} /></div>;
}
