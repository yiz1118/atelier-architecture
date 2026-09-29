import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Contact", description: "Explore the ATELIER NORTH enquiry experience. This concept form validates locally and does not send or save information." };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string; project?: string }> }) {
  const { type = "", project = "" } = await searchParams;
  const knownProject = projects.find((item) => item.title === project);
  return <div className="page-shell inner-page contact-page"><section className="page-intro"><div className="page-intro-kicker"><span className="mono">05 / Contact</span><span className="eyebrow">Begin a conversation</span></div><h1>Tell us what<br />you imagine<span className="period">.</span></h1><p>A thoughtful project begins with a good conversation. Share what you know so far about the place, its purpose and its possibilities.</p></section><div className="contact-layout"><aside className="contact-aside"><span className="eyebrow">Enquiry notes</span><h2>The first details are enough.</h2><p>A location, an ambition and a sense of scale help us understand the idea. You can leave open what has not yet been decided.</p><div className="contact-index mono"><span>Residential</span><span>Hospitality</span><span>Interior architecture</span><span>Commercial spaces</span></div></aside><ContactForm initialType={type} initialProject={knownProject?.title ?? ""} /></div></div>;
}
