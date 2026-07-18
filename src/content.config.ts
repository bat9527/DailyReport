import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const reports = defineCollection({
  loader: glob({
    pattern: "**/{latest.md,archive/**/20??-??-??.md}",
    base: "./reports"
  })
});

export const collections = { reports };
