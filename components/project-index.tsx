"use client";

import { useState } from "react";
import { Project, ProjectCategory } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";

const filters: ("All" | ProjectCategory)[] = ["All", "Residential", "Hospitality", "Interiors", "Commercial"];

export function ProjectIndex({ projects, initialCategory }: { projects: Project[]; initialCategory: string }) {
  const [category, setCategory] = useState<(typeof filters)[number]>(filters.includes(initialCategory as (typeof filters)[number]) ? initialCategory as (typeof filters)[number] : "All");
  const visible = category === "All" ? projects : projects.filter((project) => project.category === category);
  return <>
    <div className="project-filters" aria-label="Filter projects by category">
      {filters.map((filter) => <button type="button" key={filter} aria-pressed={category === filter} onClick={() => setCategory(filter)}>{filter}<span className="mono">{filter === "All" ? projects.length.toString().padStart(2, "0") : projects.filter((project) => project.category === filter).length.toString().padStart(2, "0")}</span></button>)}
    </div>
    <p className="sr-only" aria-live="polite">Showing {visible.length} {category === "All" ? "projects" : `${category.toLowerCase()} ${visible.length === 1 ? "project" : "projects"}`}</p>
    <div className="projects-grid">{visible.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} headingLevel={2} />)}</div>
  </>;
}
