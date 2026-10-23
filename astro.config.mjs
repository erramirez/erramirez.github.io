import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://ernestoramirez.com",
  trailingSlash: "ignore",
  integrations: [sitemap()],
});
