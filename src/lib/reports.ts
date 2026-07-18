import { getCollection, type CollectionEntry } from "astro:content";
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

export type ReportEntry = CollectionEntry<"reports">;

export interface ModuleInfo {
  id: string;
  category: string;
  categoryLabel: string;
  name: string;
  description: string;
  path: string;
  schedule: string;
  readingTime: string;
  tone: "blue" | "orange" | "violet" | "green";
  icon: "globe" | "voice" | "book";
}

export interface ReportMeta {
  module: ModuleInfo;
  title: string;
  date: string;
  displayDate: string;
  url: string;
  isLatest: boolean;
  readingTime: string;
  summary: string;
}

const ROOT = process.cwd();

const categoryLabels: Record<string, string> = {
  fintech: "金融科技",
  language: "语言学习",
  technology: "科技",
  humanities: "人文"
};

const moduleVisuals: Record<string, Pick<ModuleInfo, "tone" | "icon">> = {
  "fintech-expansion": { tone: "blue", icon: "globe" },
  "english-shadowing": { tone: "orange", icon: "voice" }
};

function readYaml(relativePath: string): any {
  return YAML.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
}

function readText(relativePath: string): string {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function extractSection(markdown: string, heading: string): string {
  const pattern = new RegExp(`## ${heading}\\s+([\\s\\S]*?)(?=\\n## |$)`);
  const match = markdown.match(pattern);
  return match ? stripMarkdown(match[1]).split("。", 1)[0] + "。" : "持续更新的个人兴趣日报。";
}

export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/^---[\s\S]*?---/m, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^\|.*\|$/gm, " ")
    .replace(/^[-*:]{3,}$/gm, " ")
    .replace(/[*_`~]/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getReadingTime(config: any): string {
  if (config.reading_time?.archive_minutes_max) {
    return `${config.reading_time.archive_minutes_min}–${config.reading_time.archive_minutes_max} 分钟`;
  }
  if (config.reading_and_practice?.archive_minutes) {
    return `约 ${config.reading_and_practice.archive_minutes} 分钟`;
  }
  return "约 10 分钟";
}

export function getModules(): ModuleInfo[] {
  const registry = readYaml("reports/registry.yml");
  return registry.reports
    .filter((report: any) => report.status === "active")
    .map((report: any, index: number) => {
      const config = readYaml(`${report.path}/config.yml`);
      const readme = readText(`${report.path}/README.md`);
      const visual = moduleVisuals[report.id] ?? {
        tone: (["blue", "orange", "violet", "green"] as const)[index % 4],
        icon: "book" as const
      };
      return {
        id: report.id,
        category: report.category,
        categoryLabel: categoryLabels[report.category] ?? report.category,
        name: report.name,
        description: extractSection(readme, "定位"),
        path: report.path,
        schedule: `每日 ${report.schedule.time} · 北京时间`,
        readingTime: getReadingTime(config),
        ...visual
      };
    });
}

export function moduleById(id: string): ModuleInfo | undefined {
  return getModules().find((module) => module.id === id);
}

function entryModuleId(entry: ReportEntry): string {
  return entry.id.split("/")[0];
}

function entryBody(entry: ReportEntry): string {
  return "body" in entry && typeof entry.body === "string" ? entry.body : "";
}

function entryDate(entry: ReportEntry): string {
  const idDate = entry.id.match(/(20\d{2}-\d{2}-\d{2})/);
  const bodyDate = entryBody(entry).match(/(20\d{2}-\d{2}-\d{2})/);
  return idDate?.[1] ?? bodyDate?.[1] ?? "1970-01-01";
}

function entryTitle(entry: ReportEntry, module: ModuleInfo): string {
  const match = entryBody(entry).match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() ?? `${module.name}｜${entryDate(entry)}`;
}

export function formatDate(date: string): string {
  if (date === "1970-01-01") return "等待更新";
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Shanghai"
  }).format(new Date(`${date}T00:00:00+08:00`));
}

export function pathForEntry(entry: ReportEntry): string {
  return `/${entry.id.replace(/\.md$/, "")}/`;
}

export function withBase(pathname = "/"): string {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}${pathname.replace(/^\//, "")}`;
}

export function metaForEntry(entry: ReportEntry): ReportMeta {
  const module = moduleById(entryModuleId(entry));
  if (!module) throw new Error(`Unregistered report module: ${entryModuleId(entry)}`);
  const body = stripMarkdown(entryBody(entry));
  const date = entryDate(entry);
  return {
    module,
    title: entryTitle(entry, module),
    date,
    displayDate: formatDate(date),
    url: pathForEntry(entry),
    isLatest: entry.id.endsWith("/latest") || entry.id.endsWith("latest"),
    readingTime: module.readingTime,
    summary: body.slice(0, 150).replace(/\s+\S*$/, "") + (body.length > 150 ? "…" : "")
  };
}

export async function getReportEntries(): Promise<ReportEntry[]> {
  return getCollection("reports");
}

export async function getArchiveEntries(moduleId?: string): Promise<ReportEntry[]> {
  const entries = await getReportEntries();
  return entries
    .filter((entry) => entry.id.includes("/archive/"))
    .filter((entry) => !moduleId || entryModuleId(entry) === moduleId)
    .sort((a, b) => entryDate(b).localeCompare(entryDate(a)));
}

export async function getLatestEntry(moduleId: string): Promise<ReportEntry | undefined> {
  const entries = await getReportEntries();
  return entries.find(
    (entry) => entryModuleId(entry) === moduleId &&
      (entry.id.endsWith("/latest") || entry.id.endsWith("latest"))
  );
}
