import { getCollection } from "astro:content";

export const postUrl = (id: string) => `/posts/${id}/`;
export const tagUrl = (tag: string) => `/tags/${slugify(tag)}/`;

export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const formatDate = (date: Date, month: "long" | "short" = "long") =>
  date.toLocaleDateString("en-US", { year: "numeric", month, day: "numeric", timeZone: "UTC" });

export async function getPosts() {
  return (await getCollection("posts", ({ data }) => import.meta.env.DEV || !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}
