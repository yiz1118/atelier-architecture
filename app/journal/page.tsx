import { ArrowUpRightIcon } from "@/components/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { articles } from "@/content/journal";

export const metadata: Metadata = { title: "Journal", description: "Original reflections on daylight, materials and the experience of moving through architecture." };

export default function JournalPage() {
  return <div className="page-shell inner-page journal-page"><section className="page-intro"><div className="page-intro-kicker"><span className="mono">04 / Journal</span><span className="eyebrow">Observations</span></div><h1>Notes on<br />space & feeling<span className="period">.</span></h1><p>Short reflections on the decisions that shape how a place is experienced.</p></section><div className="journal-list">{articles.map((article) => <Link href={`/journal/${article.slug}`} className="journal-list-item" key={article.slug}><EditorialImage src={article.image} alt={article.imageAlt} sizes="(max-width: 768px) 100vw, 44vw" /><div className="journal-list-content"><span className="mono">{article.number} / {article.category} · {article.date}</span><h2>{article.title}</h2><p>{article.excerpt}</p><span className="text-link">Read article <span aria-hidden="true"><ArrowUpRightIcon /></span></span></div></Link>)}</div></div>;
}
