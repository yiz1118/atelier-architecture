import type { ReactNode } from "react";

function Icon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <svg className={`ui-icon ${className}`} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="butt" strokeLinejoin="miter" aria-hidden="true" focusable="false">{children}</svg>;
}

export function ArrowUpRightIcon() {
  return <Icon><path d="M3 13 13 3M7 3h6v6" /></Icon>;
}

export function ArrowLeftIcon() {
  return <Icon className="ui-icon-arrow-left"><path d="M15 8H1m5-4L1 8l5 4" /></Icon>;
}

export function ChevronDownIcon() {
  return <Icon><path d="m3 6 5 5 5-5" /></Icon>;
}

// The same two rules rotate into the existing close state; no glyph/font fallback.
export function MenuIcon({ open }: { open: boolean }) {
  return <svg className={`menu-glyph ${open ? "menu-glyph-open" : ""}`} width="22" height="7" viewBox="0 0 22 7" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" focusable="false"><line x1="0" y1="0.5" x2="22" y2="0.5" /><line x1="0" y1="6.5" x2="22" y2="6.5" /></svg>;
}
