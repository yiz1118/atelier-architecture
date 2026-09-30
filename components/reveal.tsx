import type { CSSProperties, ReactNode } from "react";

// Render the original semantic element so the grid and reading order stay intact.
export function Reveal({ as: Element = "div", children, className, delay = 0 }: { as?: "div" | "h2" | "h3" | "span"; children: ReactNode; className?: string; delay?: number }) {
  return <Element className={className} data-motion="text" style={{ "--reveal-delay": `${Math.min(160, Math.max(0, delay))}ms` } as CSSProperties}>{children}</Element>;
}
