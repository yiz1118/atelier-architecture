import { ArrowUpRightIcon } from "@/components/icons";
import Link from "next/link";
import { CreatorSection } from "@/components/creator-section";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-top">
        <div>
          <p className="eyebrow">The next conversation</p>
          <h2>Let&apos;s give your<br />idea a place.</h2>
        </div>
        <Link className="footer-cta arrow-link" href="/contact">Discuss a project <span aria-hidden="true"><ArrowUpRightIcon /></span></Link>
      </div>
      <div className="page-shell footer-bottom">
        <Link className="footer-brand" href="/">ATELIER NORTH<span>.</span></Link>
        <div className="footer-nav"><Link href="/projects">Projects</Link><Link href="/studio">Studio</Link><Link href="/services">Services</Link><Link href="/journal">Journal</Link><Link href="/contact">Contact</Link></div>
        <p>Concept Project — ATELIER NORTH, its commissions, locations and AI-generated imagery are fictional design work.</p>
        <span className="mono">© 2026 / Portfolio concept</span>
      </div>
      <CreatorSection />
    </footer>
  );
}
