import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MotionController } from "@/components/motion-controller";
import { creator, conceptProject } from "@/config/creator";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "ATELIER NORTH — Architecture & Interiors | Independent Concept Project", template: "%s — ATELIER NORTH" },
  description: `${conceptProject.name} — an independent architecture concept website designed and developed by ${creator.name}. Spaces shaped by light, material and place.`,
  authors: [{ name: creator.name }],
  creator: creator.name,
  openGraph: { title: "ATELIER NORTH — Independent Concept Project", description: `An independent concept website designed and developed by ${creator.name}. Spaces shaped by light, material and place.`, images: [{ url: "/images/coastal-house-01.webp", width: 1774, height: 887, alt: "Coastal House concept by ATELIER NORTH" }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <a className="skip-link" href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main">{children}</main>
    <MotionController />
    <SiteFooter />
  </body></html>;
}
