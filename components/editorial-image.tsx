"use client";

import Image from "next/image";
import { useState } from "react";

type EditorialImageProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function EditorialImage({ src, alt, caption, className = "", sizes = "(max-width: 768px) 100vw, 92vw", priority = false }: EditorialImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <figure className={`editorial-figure ${className}`}>
      <div className={`editorial-media ${loaded ? "editorial-media-loaded" : ""}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} fetchPriority={priority ? "high" : undefined} onLoad={() => setLoaded(true)} />
      </div>
      {caption && <figcaption className="image-caption mono">{caption}</figcaption>}
    </figure>
  );
}
