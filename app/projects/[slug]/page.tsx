import { ArrowUpRightIcon, ArrowLeftIcon } from "@/components/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, projectBySlug } from "@/content/projects";
import { EditorialImage } from "@/components/editorial-image";
import { PlanDiagram } from "@/components/plan-diagram";

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  return project ? { title: `${project.title} — Concept Study`, description: project.summary, openGraph: { images: [project.images[0].src] } } : { title: "Project not found" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();
  const next = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];
  const enquiry = `/contact?type=${encodeURIComponent(project.category)}&project=${encodeURIComponent(project.title)}`;
  return <article className="project-detail">
    <div className="page-shell project-detail-opening">
      <div className="back-row"><Link href="/projects" className="text-link"><span aria-hidden="true"><ArrowLeftIcon /></span> All projects</Link><span className="mono">Study {project.number} / 05</span></div>
      <div className="detail-heading"><div><span className="eyebrow">{project.type} / Concept Project</span><h1>{project.title}<span className="period">.</span></h1></div><p>{project.summary}</p></div>
      <div className="project-facts-head"><div><span className="mono">Location concept</span><strong>{project.location}</strong></div><div><span className="mono">Year concept</span><strong>{project.year}</strong></div><div><span className="mono">Discipline</span><strong>{project.category}</strong></div></div>
      <EditorialImage src={project.images[0].src} alt={project.images[0].alt} className="detail-hero-image" caption={project.images[0].caption} priority sizes="(max-width: 768px) 100vw, 92vw" />
    </div>
    <section className="page-shell detail-introduction section-block"><div className="section-intro-label"><span className="mono">01 /</span><span className="eyebrow">The idea</span></div><div><h2>{project.conceptTitle}</h2><div className="concept-prose"><p>{project.detail}</p><p>{project.concept}</p></div></div></section>
    <section className="page-shell detail-gallery" aria-label={`${project.title} image sequence`}>
      <EditorialImage src={project.images[1].src} alt={project.images[1].alt} className="gallery-image-one" caption={project.images[1].caption} sizes="(max-width: 768px) 100vw, 72vw" />
      <EditorialImage src={project.images[2].src} alt={project.images[2].alt} className="gallery-image-two" caption={project.images[2].caption} sizes="(max-width: 768px) 100vw, 48vw" />
    </section>
    <section className="page-shell detail-materials section-block"><div className="section-intro-label"><span className="mono">02 /</span><span className="eyebrow">Material palette</span></div><div className="material-list">{project.materials.map((material, index) => <div key={material}><span className="mono">0{index + 1}</span><h3>{material}</h3></div>)}</div></section>
    <section className="page-shell detail-plan section-block"><div className="plan-copy"><span className="eyebrow">03 / Spatial arrangement</span><h2>A plan of relationships.</h2><p>The drawing suggests how places meet and separate. It is an atmospheric study of movement and proportion, not a technical architectural drawing.</p></div><PlanDiagram project={project} /></section>
    <section className="page-shell detail-final section-block"><div><span className="eyebrow">Project details</span><h2>{project.title}</h2></div><dl><div><dt>Place</dt><dd>{project.location}</dd></div><div><dt>Study year</dt><dd>{project.year}</dd></div><div><dt>Project type</dt><dd>{project.type}</dd></div><div><dt>Status</dt><dd>Fictional design concept</dd></div></dl><Link className="text-link" href={enquiry}>Discuss a similar project <span aria-hidden="true"><ArrowUpRightIcon /></span></Link></section>
    <Link className="next-project" href={`/projects/${next.slug}`}><div className="page-shell"><span className="eyebrow">Next project / {next.number}</span><h2>{next.title}<span aria-hidden="true"> <ArrowUpRightIcon /></span></h2></div></Link>
  </article>;
}
