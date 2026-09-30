import { ArrowUpRightIcon } from "@/components/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { Reveal } from "@/components/reveal";
import { services } from "@/content/services";

export const metadata: Metadata = { title: "Studio", description: "The philosophy, approach and process behind the ATELIER NORTH architecture studio concept." };

const process = [
  { number: "01", title: "Listen", text: "We begin with the people, the brief and the place. What already exists can reveal the most useful direction." },
  { number: "02", title: "Frame", text: "We shape the central idea through plans, references and material studies, making choices clear before detail takes over." },
  { number: "03", title: "Develop", text: "Space, structure, light and use are resolved together through a disciplined cycle of drawing and review." },
  { number: "04", title: "Resolve", text: "We carry the concept into proportion, junctions and atmosphere so the whole remains coherent at every scale." },
];

export default function StudioPage() {
  return <div className="studio-page inner-page">
    <section className="page-shell page-intro studio-intro"><div className="page-intro-kicker"><span className="mono">02 / Studio</span><span className="eyebrow">A considered practice</span></div><h1>Architecture begins<br />with attention<span className="period">.</span></h1><p>We work from observation toward form, making spaces that feel precise, generous and deeply connected to their setting.</p></section>
    <div className="page-shell studio-image-row"><EditorialImage src="/images/courtyard-residence-01.webp" alt="Planted garden court enclosed by dark brick and oak-glazed rooms" caption="A place of focus / Courtyard Residence" sizes="(max-width: 768px) 100vw, 75vw" reveal="mask" /></div>
    <section className="page-shell section-block studio-belief"><div className="section-intro-label"><span className="mono">01 /</span><span className="eyebrow">Philosophy</span></div><Reveal as="h2">To make less, mean more.</Reveal><div><p>We are drawn to places with a clear idea at their center. The character of a project emerges through light, movement, proportion and the honest presence of materials.</p><p>Restraint is not an absence of feeling. It is the space that allows texture, weather and life to leave their mark.</p></div></section>
    <section className="studio-approach"><div className="page-shell studio-approach-grid"><div><span className="eyebrow">02 / Approach</span><Reveal as="h2">Every project starts with what is already there.</Reveal><p>We study how a site is approached, when it receives light, how it is used and what it might become. The design grows from these conditions rather than from a predetermined style.</p><Link className="text-link" href="/projects">See the studies <span aria-hidden="true"><ArrowUpRightIcon /></span></Link></div><EditorialImage src="/images/coastal-house-03.webp" alt="Pale stone and oak detail looking toward a grey sea" caption="Material study / Coastal House" sizes="(max-width: 768px) 100vw, 48vw" /></div></section>
    <section className="page-shell section-block studio-capabilities"><div className="section-intro-label"><span className="mono">03 /</span><span className="eyebrow">What we explore</span></div><div className="studio-capabilities-body"><h2>One way of thinking.<br />Many kinds of space.</h2><div className="capability-list">{services.map((service) => <Link key={service.number} href="/services"><span className="mono">{service.number}</span><span>{service.title}</span><span aria-hidden="true"><ArrowUpRightIcon /></span></Link>)}</div></div></section>
    <section className="page-shell section-block studio-process"><div className="section-intro-label"><span className="mono">04 /</span><span className="eyebrow">Process</span></div><div className="studio-process-body"><h2>Clarity at every stage.</h2><div className="process-grid">{process.map((step) => <div key={step.number}><span className="mono">{step.number} / 04</span><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></div></section>
  </div>;
}
