import { ArrowUpRightIcon } from "@/components/icons";
import Link from "next/link";

export function SectionIntro({ number, label, title, href, linkText }: { number: string; label: string; title?: string; href?: string; linkText?: string }) {
  return <div className="section-intro">
    <div className="section-intro-label"><span className="mono">{number}</span><span className="eyebrow">{label}</span></div>
    {title && <h2>{title}</h2>}
    {href && linkText && <Link className="text-link" href={href}>{linkText}<span aria-hidden="true"><ArrowUpRightIcon /></span></Link>}
  </div>;
}
