"use client";

import { ArrowUpRightIcon, MenuIcon } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/studio", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header-inner page-shell">
        <Link className="brand" href="/" onClick={() => setOpen(false)} aria-label="Atelier North, homepage">
          <span className="brand-mark">ATELIER<br />NORTH<span className="brand-period">.</span></span>
          <span className="brand-descriptor">Architecture<br />& interiors</span>
        </Link>
        <div className="header-right">
          <span className="concept-label">Concept Project</span>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined}>{link.label}</Link>
            ))}
          </nav>
          <button ref={menuButton} className="menu-toggle" type="button" aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <span>{open ? "Close" : "Menu"}</span><MenuIcon open={open} />
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${open ? "mobile-nav-open" : ""}`} aria-label="Mobile navigation" inert={!open}>
        <div className="page-shell mobile-nav-inner">
          {links.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined}>
              <span className="mono">0{index + 1}</span>{link.label}<span aria-hidden="true"><ArrowUpRightIcon /></span>
            </Link>
          ))}
          <p>Spaces shaped by light, material and place.</p>
        </div>
      </nav>
    </header>
  );
}
