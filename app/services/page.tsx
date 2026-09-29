import { ArrowUpRightIcon } from "@/components/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { services } from "@/content/services";
import { projectBySlug } from "@/content/projects";

export const metadata: Metadata = { title: "Services", description: "Explore residential, hospitality, interior architecture and commercial space concepts by ATELIER NORTH." };

export default function ServicesPage() {
  return <div className="services-page inner-page page-shell">
    <section className="page-intro"><div className="page-intro-kicker"><span className="mono">03 / Services</span><span className="eyebrow">What we do</span></div><h1>Considered at<br />every scale<span className="period">.</span></h1><p>From the first spatial idea to the point where material meets hand, we make each decision part of a coherent whole.</p></section>
    <div className="service-detail-list">{services.map((service) => { const project = projectBySlug(service.project); return <section className="service-detail" key={service.number} id={service.type.toLowerCase()}><div className="service-detail-header"><span className="mono">{service.number} / 04</span><h2>{service.title}</h2></div><div className="service-detail-body"><p className="service-lead">{service.introduction}</p><div className="service-detail-facts"><div><h3>Typical scope</h3><p>{service.scope}</p></div><div><h3>Intent</h3><p>{service.outcome}</p></div><div className="service-links"><Link className="text-link" href={`/contact?type=${encodeURIComponent(service.type)}`}>Discuss this kind of project <span aria-hidden="true"><ArrowUpRightIcon /></span></Link><Link className="text-link" href={service.href}>View related work <span aria-hidden="true"><ArrowUpRightIcon /></span></Link></div></div></div>{project && <EditorialImage src={project.images[0].src} alt={project.images[0].alt} caption={`Related study / ${project.title}`} sizes="(max-width: 768px) 100vw, 80vw" />}</section>; })}</div>
  </div>;
}
