import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { imageAttrs } from "./src/lib/image-attrs.mjs";

export default defineConfig({
  site: "https://ernestoramirez.com",
  trailingSlash: "ignore",
  integrations: [sitemap()],
  // The stylesheet is small, so inline it and skip a render-blocking request.
  build: { inlineStylesheets: "always" },
  markdown: {
    processor: satteri({ hastPlugins: [imageAttrs] }),
  },
});
