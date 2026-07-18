import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://bat9527.github.io",
  base: "/DailyReport",
  output: "static",
  trailingSlash: "always",
  markdown: {
    shikiConfig: {
      theme: "github-dark-default",
      wrap: true
    }
  },
  vite: {
    build: {
      cssMinify: "lightningcss"
    }
  }
});
