import { copyFile, mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";

const outputDir = new URL("../.vitepress/dist/", import.meta.url);

async function findHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findHtmlFiles(path));
    } else if (entry.name.endsWith(".html") && entry.name !== "index.html" && entry.name !== "404.html") {
      files.push(path);
    }
  }

  return files;
}

const files = await findHtmlFiles(outputDir.pathname);

for (const source of files) {
  const targetDirectory = source.slice(0, -".html".length);
  await mkdir(targetDirectory, { recursive: true });
  await copyFile(source, join(targetDirectory, "index.html"));
}

console.log(`Created ${files.length} compatibility pages for trailing-slash URLs.`);
