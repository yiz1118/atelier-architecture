import { ArrowUpRightIcon } from "@/components/icons";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export function SectionIntro({ number, label, title, href, linkText }: { number: string; label: string; title?: string; href?: string; linkText?: string }) {
  return <div className="section-intro">
    <div className="section-intro-label"><span className="mono">{number}</span><span className="eyebrow">{label}</span></div>
    {title && <Reveal as="h2" delay={80}>{title}</Reveal>}
    {href && linkText && <Link className="text-link" href={href}>{linkText}<span aria-hidden="true"><ArrowUpRightIcon /></span></Link>}
  </div>;
}
