import { ArrowUpRightIcon, ArrowLeftIcon } from "@/components/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, articleBySlug } from "@/content/journal";
import { projectBySlug } from "@/content/projects";
import { EditorialImage } from "@/components/editorial-image";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  return article ? { title: article.title, description: article.excerpt, openGraph: { images: [article.image] } } : { title: "Article not found" };
}

export default async function JournalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();
  const project = projectBySlug(article.relatedProject);
  const next = articles[(articles.findIndex((item) => item.slug === article.slug) + 1) % articles.length];
  return <article className="journal-article page-shell inner-page"><div className="back-row"><Link href="/journal" className="text-link"><span aria-hidden="true"><ArrowLeftIcon /></span> Journal</Link><span className="mono">Article {article.number} / 03</span></div><header className="article-opening"><p className="eyebrow">{article.category} / {article.date}</p><h1>{article.title}<span className="period">.</span></h1><p>{article.excerpt}</p></header><EditorialImage src={article.image} alt={article.imageAlt} className="article-hero" caption={`Image from the ${project?.title ?? "studio"} concept study`} priority sizes="(max-width: 768px) 100vw, 92vw" /><div className="article-body"><aside><span className="mono">ATELIER NORTH / Journal</span><p>Concept Project<br />Editorial reflection</p></aside><div className="article-prose">{article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</div></div><div className="article-related"><span className="eyebrow">Continue exploring</span>{project && <Link className="text-link" href={`/projects/${project.slug}`}>See {project.title} <span aria-hidden="true"><ArrowUpRightIcon /></span></Link>}<Link className="text-link" href={`/journal/${next.slug}`}>Next note: {next.title} <span aria-hidden="true"><ArrowUpRightIcon /></span></Link></div></article>;
}
