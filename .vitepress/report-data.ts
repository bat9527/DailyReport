import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));

const modulePresentation: Record<string, {
  shortName: string;
  eyebrow: string;
  description: string;
  readingTime: string;
  accent: string;
  symbol: string;
}> = {
  "fintech-expansion": {
    shortName: "金融科技",
    eyebrow: "FINTECH",
    description: "追踪非洲金融科技、中国企业出海与全球行业标杆。",
    readingTime: "7–10 分钟",
    accent: "blue",
    symbol: "F"
  },
  "web3-market": {
    shortName: "Web3 行情",
    eyebrow: "WEB3",
    description: "覆盖 BTC、ETH 行情、头部项目进展与行业观点。",
    readingTime: "12–15 分钟",
    accent: "purple",
    symbol: "W"
  },
  "english-shadowing": {
    shortName: "英文跟读",
    eyebrow: "ENGLISH",
    description: "用演讲、书籍与电影材料完成每日影子跟读训练。",
    readingTime: "12–15 分钟",
    accent: "orange",
    symbol: "E"
  }
};

interface RegistryReport {
  id: string;
  name: string;
  status: string;
  path: string;
}

interface Registry {
  reports: RegistryReport[];
}

interface HistoryEntry {
  date: string;
  path: string;
  title: string;
  primary_topic?: string;
  topic_tags?: string[];
  summary?: string;
}

interface HistoryIndex {
  latest_archive_date?: string;
  entries: HistoryEntry[];
}

export interface ReportModule {
  id: string;
  name: string;
  shortName: string;
  eyebrow: string;
  description: string;
  readingTime: string;
  accent: string;
  symbol: string;
  latestDate: string;
  latestUrl: string;
  entryCount: number;
}

export interface ReportArchiveEntry {
  moduleId: string;
  moduleName: string;
  moduleShortName: string;
  accent: string;
  symbol: string;
  readingTime: string;
  date: string;
  title: string;
  summary: string;
  primaryTopic: string;
  tags: string[];
  url: string;
}

export interface ReportData {
  modules: ReportModule[];
  entries: ReportArchiveEntry[];
  latestDate: string;
}

function readYaml<T>(path: string): T {
  return parse(readFileSync(path, "utf8")) as T;
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function toPublicUrl(moduleId: string, entryPath: string): string {
  return `/${moduleId}/${entryPath.replace(/\.md$/, "")}`;
}

export function loadReportData(): ReportData {
  const registry = readYaml<Registry>(resolve(ROOT, "reports/registry.yml"));
  const modules: ReportModule[] = [];
  const entries: ReportArchiveEntry[] = [];

  for (const report of registry.reports.filter((item) => item.status === "active")) {
    const presentation = modulePresentation[report.id] ?? {
      shortName: report.name,
      eyebrow: "REPORT",
      description: "持续更新的日报栏目。",
      readingTime: "约 10 分钟",
      accent: "blue",
      symbol: report.name.slice(0, 1)
    };
    const history = readJson<HistoryIndex>(resolve(ROOT, report.path, "history-index.json"));
    const sortedEntries = [...history.entries].sort((a, b) => b.date.localeCompare(a.date));

    modules.push({
      id: report.id,
      name: report.name,
      ...presentation,
      latestDate: history.latest_archive_date ?? sortedEntries[0]?.date ?? "",
      latestUrl: `/${report.id}/latest`,
      entryCount: sortedEntries.length
    });

    for (const entry of sortedEntries) {
      entries.push({
        moduleId: report.id,
        moduleName: report.name,
        moduleShortName: presentation.shortName,
        accent: presentation.accent,
        symbol: presentation.symbol,
        readingTime: presentation.readingTime,
        date: entry.date,
        title: entry.title,
        summary: entry.summary ?? entry.primary_topic ?? "",
        primaryTopic: entry.primary_topic ?? "",
        tags: entry.topic_tags ?? [],
        url: toPublicUrl(report.id, entry.path)
      });
    }
  }

  entries.sort((a, b) => b.date.localeCompare(a.date) || a.moduleId.localeCompare(b.moduleId));

  return {
    modules,
    entries,
    latestDate: entries[0]?.date ?? ""
  };
}
