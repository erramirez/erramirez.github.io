// Sätteri hast plugin: adds width/height (read from the file in public/), lazy
// loading and async decoding to Markdown images, so posts don't shift as images
// load and don't download every image up front.
import sharp from "sharp";
import { existsSync } from "node:fs";
import { join } from "node:path";

const sizes = new Map();

function sizeOf(src) {
  if (!sizes.has(src)) {
    const file = join(process.cwd(), "public", decodeURIComponent(src));
    sizes.set(src, existsSync(file) ? sharp(file).metadata().catch(() => null) : Promise.resolve(null));
  }
  return sizes.get(src);
}

export const imageAttrs = {
  name: "image-attrs",
  element: {
    filter: ["img"],
    async visit(node, ctx) {
      const p = node.properties ?? {};
      if (p.loading == null) ctx.setProperty(node, "loading", "lazy");
      if (p.decoding == null) ctx.setProperty(node, "decoding", "async");
      if (typeof p.src !== "string" || !p.src.startsWith("/") || p.width) return;
      const meta = await sizeOf(p.src);
      if (meta?.width && meta?.height) {
        ctx.setProperty(node, "width", meta.width);
        ctx.setProperty(node, "height", meta.height);
      }
    },
  },
};
