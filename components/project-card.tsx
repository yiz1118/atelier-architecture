import { ArrowUpRightIcon } from "@/components/icons";
import Link from "next/link";
import { Project } from "@/content/projects";
import { EditorialImage } from "@/components/editorial-image";

export function ProjectCard({ project, index = 0, className = "", headingLevel = 3, imageIndex = 0, fullWidth = false }: { project: Project; index?: number; className?: string; headingLevel?: 2 | 3; imageIndex?: 0 | 1 | 2; fullWidth?: boolean }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const image = project.images[imageIndex];
  const sizes = fullWidth
    ? "(max-width: 700px) calc(100vw - 40px), (max-width: 1200px) calc(100vw - 64px), (max-width: 1728px) calc(100vw - 128px), 1600px"
    : "(max-width: 700px) calc(100vw - 40px), (max-width: 1200px) calc(50vw - 47px), (max-width: 1728px) calc(50vw - 79px), 785px";
  return (
    <article className={`project-card ${className}`}>
      <Link href={`/projects/${project.slug}`} aria-label={`View ${project.title} project`}>
        <EditorialImage src={image.src} alt={image.alt} className="project-card-image" sizes={sizes} />
        <div className="project-card-meta">
          <span className="mono project-card-number">{project.number} / 0{index + 1}</span>
          <div><Heading>{project.title}</Heading><p>{project.location} · {project.category}</p></div>
          <span className="project-card-arrow" aria-hidden="true"><ArrowUpRightIcon /></span>
        </div>
      </Link>
    </article>
  );
}
