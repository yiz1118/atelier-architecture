"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// One observer for deliberately marked elements. The server renders everything
// visible; only content below the viewport is prepared for a one-time reveal.
export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = new Set<HTMLElement>();
    const main = document.querySelector("main");
    if (!main) return;

    function show(element: HTMLElement) {
      element.dataset.motionState = "shown";
      observer.unobserve(element);
    }

    function reveal(element: HTMLElement) {
      if (preference.matches) { show(element); return; }
      if (element.dataset.motionState !== "waiting") return;
      if (element.dataset.motion?.startsWith("image") && element.dataset.imageReady !== "true") return;
      element.dataset.motionState = "entering";
      observer.unobserve(element);
    }

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        if (entry.isIntersecting) reveal(element);
        // Jump links or a fast scroll must not leave already-passed content hidden.
        else if (entry.boundingClientRect.bottom <= 0) show(element);
      }
    }, { threshold: .08, rootMargin: "0px 0px -40px 0px" });

    function register(element: HTMLElement) {
      if (elements.has(element)) return;
      elements.add(element);
      if (preference.matches || element.dataset.motionState === "shown" || element.getBoundingClientRect().top < innerHeight - 40) {
        show(element);
        return;
      }
      element.dataset.motionState = "waiting";
      observer.observe(element);
    }

    function scan(root: Element) {
      if (root.matches("[data-motion]")) register(root as HTMLElement);
      root.querySelectorAll<HTMLElement>("[data-motion]").forEach(register);
    }
    scan(main);

    const changes = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === "attributes") {
          const element = record.target as HTMLElement;
          const rect = element.getBoundingClientRect();
          if (rect.bottom <= 0) show(element);
          else if (rect.top < innerHeight - 40) reveal(element);
        } else {
          record.addedNodes.forEach(node => { if (node instanceof Element) scan(node); });
        }
      }
      // Filtered projects are removed and may be inserted again later.
      for (const element of elements) {
        if (!element.isConnected) { observer.unobserve(element); elements.delete(element); }
      }
    });
    changes.observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-image-ready"] });

    function onAnimationEnd(event: AnimationEvent) {
      if (!["atelier-text-reveal", "atelier-image-settle", "atelier-image-mask"].includes(event.animationName)) return;
      const element = (event.target as Element).closest<HTMLElement>("[data-motion]");
      if (element && elements.has(element)) show(element);
    }
    function onPreferenceChange() {
      if (preference.matches) elements.forEach(show);
    }
    function onScrollEnd() {
      for (const element of elements) {
        if (element.dataset.motionState === "waiting" && element.getBoundingClientRect().bottom <= 0) show(element);
      }
    }
    main.addEventListener("animationend", onAnimationEnd as EventListener);
    preference.addEventListener("change", onPreferenceChange);
    window.addEventListener("scrollend", onScrollEnd);
    return () => {
      observer.disconnect();
      changes.disconnect();
      elements.forEach(element => { element.dataset.motionState = "shown"; });
      main.removeEventListener("animationend", onAnimationEnd as EventListener);
      preference.removeEventListener("change", onPreferenceChange);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [pathname]);

  return null;
}
