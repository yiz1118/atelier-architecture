"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

type EditorialImageProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  reveal?: "settle" | "mask" | "none";
  revealDelay?: number;
};

export function EditorialImage({ src, alt, caption, className = "", sizes = "(max-width: 768px) 100vw, 92vw", priority = false, reveal = priority ? "none" : "settle", revealDelay = 0 }: EditorialImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <figure className={`editorial-figure ${className}`}>
      <div className={`editorial-media ${loaded ? "editorial-media-loaded" : ""}`} data-motion={reveal === "none" ? undefined : `image-${reveal}`} data-image-ready={loaded} style={{ "--reveal-delay": `${Math.min(160, Math.max(0, revealDelay))}ms` } as CSSProperties}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} fetchPriority={priority ? "high" : undefined} onLoad={() => setLoaded(true)} />
      </div>
      {caption && <figcaption className="image-caption mono">{caption}</figcaption>}
    </figure>
  );
}
