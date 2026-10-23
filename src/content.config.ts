import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    kind: z.enum(["post", "note"]).default("post"),
    tags: z.array(z.string()).default([]),
    // Posts carried over from the 2014–2017 Hugo site.
    archive: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    role: z.string(),
    timeframe: z.string(),
    areas: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Standalone pages (about, now, cv, colophon) so they're editable in the CMS.
const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    // Short name for the browser tab, e.g. "About".
    label: z.string().optional(),
    description: z.string().default(""),
    updatedDate: z.coerce.date().optional(),
  }),
});

// Lab: small apps and experiments. Each app lives at /lab/<slug>/ (drop a static
// build into public/lab/<slug>/ or add an Astro page) and gets a card from this entry.
const lab = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lab" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["live", "building", "idea"]).default("idea"),
    // Where the card links. Defaults to /lab/<slug>/ for live apps.
    url: z.string().optional(),
    image: z.string().optional(),
    thumb: z.enum(["rings", "table", "line", "bars"]).default("line"),
    order: z.number().default(100),
  }),
});

export const collections = { posts, research, pages, lab };
