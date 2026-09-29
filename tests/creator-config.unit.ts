import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CreatorSection } from "@/components/creator-section";
import { creator, creatorContactLinks } from "@/config/creator";

test("the real creator component hides an absent portfolio and renders a configured destination", () => {
  const absent = renderToStaticMarkup(createElement(CreatorSection, { profile: { ...creator, portfolioUrl: null } }));
  assert.doesNotMatch(absent, /View Portfolio/);
  const configured = renderToStaticMarkup(createElement(CreatorSection, { profile: { ...creator, portfolioUrl: "https://portfolio.example/alson" } }));
  assert.match(configured, /href="https:\/\/portfolio\.example\/alson"/);
  assert.match(configured, /data-analytics-event="creator_portfolio"/);
  assert.match(configured, /View Portfolio/);
});

test("contact destinations and encoded project context follow changes in configuration", () => {
  const updated = creatorContactLinks({ ...creator, name: "Alex Rowan", email: "alex@example.com", whatsappUrl: "https://wa.me/60123456789" }, "Stone & Light / Residence");
  assert.equal(new URL(updated.whatsapp).pathname, "/60123456789");
  assert.match(new URL(updated.whatsapp).searchParams.get("text") ?? "", /Hi Alex, I came across your Stone & Light \/ Residence concept project/);
  assert.equal(new URL(updated.email).pathname, "alex@example.com");
  assert.equal(new URL(updated.email).searchParams.get("subject"), "Project Inquiry — Stone & Light / Residence");
});
