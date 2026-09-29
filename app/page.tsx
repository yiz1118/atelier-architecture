import { ArrowUpRightIcon } from "@/components/icons";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { ProjectCard } from "@/components/project-card";
import { SectionIntro } from "@/components/section-intro";
import { projects } from "@/content/projects";
import { articles } from "@/content/journal";
import { services } from "@/content/services";

export default function Home() {
  const selected = [projects[0], projects[1], projects[2]];
  return <>
    <section className="page-shell home-opening">
      <div className="opening-top"><span className="eyebrow">Independent architecture & interiors studio</span><span className="mono">01 / 05 — Selected work</span></div>
      <div className="opening-title"><h1>Spaces shaped by<br /><em>light, material</em><br />and place<span className="period">.</span></h1><p>Architecture for the way we live, gather and belong. An original studio concept in measured form.</p></div>
      <EditorialImage src={projects[0].images[0].src} alt={projects[0].images[0].alt} className="home-hero-image" caption="Featured study / Coastal House — Northumberland coast" priority sizes="(max-width: 768px) 100vw, 92vw" />
    </section>

    <section className="page-shell section-block home-selected" id="selected-work">
      <SectionIntro number="01 /" label="Selected work" title="Places with a point of view." href="/projects" linkText="All projects" />
      <div className="home-project-grid">{selected.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} className={index === 0 ? "home-project-first" : ""} imageIndex={index === 0 ? 1 : 0} fullWidth={index === 0} />)}</div>
    </section>

    <section className="page-shell section-block philosophy-section">
      <div className="philosophy-label"><span className="mono">02 /</span><span className="eyebrow">The studio</span></div>
      <div className="philosophy-body"><h2>We believe the best spaces are felt before they are explained.</h2><div><p>Our work begins with attention: to a site, a way of living, a particular quality of light. We translate these observations into architecture of lasting clarity.</p><Link className="text-link" href="/studio">Our approach <span aria-hidden="true"><ArrowUpRightIcon /></span></Link></div></div>
    </section>

    <section className="page-shell section-block home-services">
      <SectionIntro number="03 /" label="Capabilities" title="From first thought to final detail." href="/services" linkText="Explore services" />
      <div className="service-rows">{services.map((service) => <Link key={service.number} href={`/contact?type=${encodeURIComponent(service.type)}`} className="service-row"><span className="mono">{service.number}</span><h3>{service.title}</h3><p>{service.introduction}</p><span className="row-arrow" aria-hidden="true"><ArrowUpRightIcon /></span></Link>)}</div>
    </section>

    <section className="home-feature section-block">
      <div className="page-shell"><SectionIntro number="04 /" label="A closer look" title="A quieter kind of hospitality." /></div>
      <Link href="/projects/gallery-hotel" className="feature-link"><EditorialImage src={projects[2].images[1].src} alt={projects[2].images[1].alt} className="feature-image" sizes="100vw" /><span className="page-shell feature-caption"><span className="mono">Gallery Hotel / Porto concept</span><span className="text-link">Explore the project <span aria-hidden="true"><ArrowUpRightIcon /></span></span></span></Link>
    </section>

    <section className="page-shell section-block home-journal">
      <SectionIntro number="05 /" label="Journal" title="Notes on the spaces between." href="/journal" linkText="Read the journal" />
      <div className="journal-preview-grid">{articles.slice(0, 2).map((article) => <Link href={`/journal/${article.slug}`} className="journal-preview" key={article.slug}><EditorialImage src={article.image} alt={article.imageAlt} sizes="(max-width: 768px) 100vw, 45vw" /><div className="journal-preview-meta mono">{article.category} / {article.date}</div><h3>{article.title}</h3><p>{article.excerpt}</p><span className="text-link">Read the note <span aria-hidden="true"><ArrowUpRightIcon /></span></span></Link>)}</div>
    </section>
  </>;
}
