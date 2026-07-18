import type { APIRoute } from "astro";
import { getArchiveEntries, metaForEntry, stripMarkdown, withBase } from "../lib/reports";

export const GET: APIRoute = async () => {
  const entries = await getArchiveEntries();
  const index = entries.map((entry) => {
    const meta = metaForEntry(entry);
    const body = "body" in entry && typeof entry.body === "string" ? entry.body : "";
    return {
      title: meta.title,
      category: meta.module.name,
      date: meta.date,
      url: withBase(meta.url),
      summary: meta.summary,
      searchText: `${meta.title} ${meta.module.name} ${stripMarkdown(body)}`.toLocaleLowerCase("zh-CN")
    };
  });

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
};
