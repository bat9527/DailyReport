import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

const ROOT = process.cwd();
const CHECK_MODE = process.argv.includes("--check");
const WRITE_MODE = process.argv.includes("--write");

if (CHECK_MODE === WRITE_MODE) {
  console.error("Usage: node scripts/history-index.mjs --write | --check");
  process.exit(2);
}

const errors = [];
const warnings = [];

function readText(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function readYaml(relativePath) {
  return YAML.parse(readText(relativePath));
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function listMarkdownFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listMarkdownFiles(fullPath));
    if (entry.isFile() && /^20\d{2}-\d{2}-\d{2}\.md$/.test(entry.name)) files.push(fullPath);
  }
  return files.sort();
}

function parseMarkdown(relativePath) {
  const raw = readText(relativePath);
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) {
    return { raw, body: raw, frontmatter: null };
  }

  try {
    return {
      raw,
      body: raw.slice(match[0].length),
      frontmatter: YAML.parse(match[1])
    };
  } catch (error) {
    errors.push(`${relativePath}: YAML frontmatter 无法解析（${error.message}）`);
    return { raw, body: raw.slice(match[0].length), frontmatter: null };
  }
}

function asStringArray(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map((item) => String(item).trim()).filter(Boolean))];
}

function normalizeKey(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLocaleLowerCase("en-US")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function hash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function normalizeContent(body) {
  return body
    .replace(/^#\s+.*$/m, "")
    .replace(/20\d{2}[-/.年]\s*\d{1,2}[-/.月]\s*\d{1,2}日?/g, "<date>")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("en-US");
}

function canonicalizeUrl(rawUrl) {
  const cleaned = rawUrl.replace(/[.,;:!?，。；：！？'"”’]+$/u, "");
  try {
    const url = new URL(cleaned);
    url.hash = "";
    url.hostname = url.hostname.toLowerCase();
    for (const key of [...url.searchParams.keys()]) {
      if (/^(utm_.+|fbclid|gclid|mc_cid|mc_eid)$/i.test(key)) url.searchParams.delete(key);
    }
    url.searchParams.sort();
    if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
    return url.toString();
  } catch {
    return cleaned;
  }
}

function extractSourceUrls(body) {
  const matches = body.match(/https?:\/\/[^\s<>)\]]+/g) ?? [];
  return [...new Set(matches.map(canonicalizeUrl))].sort();
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^\|.*\|$/gm, " ")
    .replace(/[*_`~]/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getDateFromPath(relativePath) {
  return path.basename(relativePath, ".md");
}

function getTitle(body, moduleName, date) {
  return body.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? `${moduleName}｜${date}`;
}

function dedupWindowDays(config) {
  return Number(config.lookback?.dedup_days ?? config.rotation?.archive_dedup_days ?? 7);
}

function entityCooldownDays(config) {
  return Number(config.rotation?.same_source_cooldown_days ?? 0);
}

function differenceInDays(first, second) {
  const firstTime = Date.parse(`${first}T00:00:00Z`);
  const secondTime = Date.parse(`${second}T00:00:00Z`);
  return Math.abs(firstTime - secondTime) / 86_400_000;
}

function intersection(first, second) {
  const right = new Set(second.map(normalizeKey));
  return first.filter((value) => right.has(normalizeKey(value)));
}

function validateMetadata(relativePath, dedup) {
  if (!dedup || typeof dedup !== "object") {
    errors.push(`${relativePath}: 缺少 dedup YAML 元数据`);
    return false;
  }

  if (!String(dedup.primary_topic ?? "").trim()) {
    errors.push(`${relativePath}: dedup.primary_topic 不能为空`);
  }
  for (const field of ["topic_tags", "entities", "content_keys"]) {
    if (asStringArray(dedup[field]).length === 0) {
      errors.push(`${relativePath}: dedup.${field} 至少需要一项`);
    }
  }
  for (const contentKey of asStringArray(dedup.content_keys)) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(contentKey)) {
      errors.push(`${relativePath}: content_key 必须使用小写英文、数字和连字符（${contentKey}）`);
    }
  }
  if (dedup.allow_repeat === true && !String(dedup.repeat_reason ?? "").trim()) {
    errors.push(`${relativePath}: allow_repeat 为 true 时必须填写 repeat_reason`);
  }
  return true;
}

function createEntry(modulePath, moduleName, absolutePath) {
  const relativePath = toPosix(path.relative(ROOT, absolutePath));
  const moduleRelativePath = toPosix(path.relative(path.join(ROOT, modulePath), absolutePath));
  const { body, frontmatter } = parseMarkdown(relativePath);
  const dedup = frontmatter?.dedup;
  validateMetadata(relativePath, dedup);

  const date = getDateFromPath(relativePath);
  const primaryTopic = String(dedup?.primary_topic ?? "").trim();
  const quote = String(dedup?.quote ?? "").trim();
  const sourceUrls = extractSourceUrls(body);

  if (sourceUrls.length === 0) {
    errors.push(`${relativePath}: 正文中没有可索引的来源 URL`);
  }

  return {
    date,
    path: moduleRelativePath,
    title: getTitle(body, moduleName, date),
    primary_topic: primaryTopic,
    topic_tags: asStringArray(dedup?.topic_tags),
    entities: asStringArray(dedup?.entities),
    works: asStringArray(dedup?.works),
    content_keys: asStringArray(dedup?.content_keys),
    source_type: String(dedup?.source_type ?? "").trim() || null,
    quote: quote || null,
    allow_repeat: dedup?.allow_repeat === true,
    repeat_reason: String(dedup?.repeat_reason ?? "").trim() || null,
    summary: stripMarkdown(body).slice(0, 240).replace(/\s+\S*$/, "") + "…",
    source_urls: sourceUrls,
    fingerprints: {
      content_sha256: hash(normalizeContent(body)),
      topic_sha256: hash(normalizeKey(primaryTopic)),
      quote_sha256: quote ? hash(normalizeKey(quote)) : null,
      source_sha256: sourceUrls.map((url) => hash(url))
    }
  };
}

function validateCollisions(moduleId, entries, topicWindow, entityWindow) {
  const contentHashes = new Map();
  const contentKeys = new Map();
  const quoteHashes = new Map();

  for (const entry of entries) {
    const existingContentDate = contentHashes.get(entry.fingerprints.content_sha256);
    if (existingContentDate) {
      errors.push(`${moduleId}: ${entry.date} 与 ${existingContentDate} 的正文内容指纹相同`);
    } else {
      contentHashes.set(entry.fingerprints.content_sha256, entry.date);
    }

    for (const contentKey of entry.content_keys) {
      const existingKeyDate = contentKeys.get(contentKey);
      if (existingKeyDate) {
        errors.push(`${moduleId}: ${entry.date} 与 ${existingKeyDate} 重复 content_key：${contentKey}`);
      } else {
        contentKeys.set(contentKey, entry.date);
      }
    }

    if (entry.fingerprints.quote_sha256) {
      const existingQuoteDate = quoteHashes.get(entry.fingerprints.quote_sha256);
      if (existingQuoteDate) {
        errors.push(`${moduleId}: ${entry.date} 与 ${existingQuoteDate} 重复使用同一句原文`);
      } else {
        quoteHashes.set(entry.fingerprints.quote_sha256, entry.date);
      }
    }
  }

  const maximumWindow = Math.max(topicWindow, entityWindow);
  for (let leftIndex = 0; leftIndex < entries.length; leftIndex += 1) {
    const newer = entries[leftIndex];
    for (let rightIndex = leftIndex + 1; rightIndex < entries.length; rightIndex += 1) {
      const older = entries[rightIndex];
      const days = differenceInDays(newer.date, older.date);
      const prefix = `${moduleId}: ${newer.date} 与 ${older.date}`;
      if (days > maximumWindow) break;

      if (
        days <= topicWindow &&
        newer.fingerprints.topic_sha256 === older.fingerprints.topic_sha256 &&
        !newer.allow_repeat
      ) {
        errors.push(`${prefix} 在 ${topicWindow} 天窗口内重复 primary_topic`);
      }

      if (entityWindow > 0 && days <= entityWindow) {
        const repeatedEntities = intersection(newer.entities, older.entities);
        const repeatedWorks = intersection(newer.works, older.works);
        if (repeatedEntities.length > 0) {
          errors.push(`${prefix} 在 ${entityWindow} 天冷却期内重复人物/主体：${repeatedEntities.join("、")}`);
        }
        if (repeatedWorks.length > 0) {
          errors.push(`${prefix} 在 ${entityWindow} 天冷却期内重复作品：${repeatedWorks.join("、")}`);
        }
      }

      if (days <= topicWindow) {
        const repeatedTags = intersection(newer.topic_tags, older.topic_tags);
        if (repeatedTags.length >= 2) {
          warnings.push(`${prefix} 在去重窗口内共享多个主题标签：${repeatedTags.join("、")}`);
        }

        if (entityWindow === 0) {
          const repeatedEntities = intersection(newer.entities, older.entities);
          if (repeatedEntities.length > 0) {
            warnings.push(`${prefix} 在去重窗口内重复主体：${repeatedEntities.join("、")}，请确认属于新增进展`);
          }
        }

        const repeatedSources = intersection(newer.source_urls, older.source_urls);
        if (repeatedSources.length > 0) {
          warnings.push(`${prefix} 重复引用 ${repeatedSources.length} 个来源 URL，请确认只写了新增信息`);
        }
      }
    }
  }
}

function buildModuleIndex(module) {
  const modulePath = module.path;
  const config = readYaml(`${modulePath}/config.yml`);
  const archiveDirectory = path.join(ROOT, modulePath, "archive");
  const entries = listMarkdownFiles(archiveDirectory)
    .map((absolutePath) => createEntry(modulePath, module.name, absolutePath))
    .sort((first, second) => second.date.localeCompare(first.date));

  const topicWindow = dedupWindowDays(config);
  const entityWindow = entityCooldownDays(config);
  validateCollisions(module.id, entries, topicWindow, entityWindow);

  if (entries.length > 0) {
    const latestPath = `${modulePath}/latest.md`;
    const newestArchivePath = `${modulePath}/${entries[0].path}`;
    if (!fs.existsSync(path.join(ROOT, latestPath))) {
      errors.push(`${latestPath}: 文件不存在`);
    } else if (readText(latestPath) !== readText(newestArchivePath)) {
      errors.push(`${latestPath}: 必须与最新归档 ${newestArchivePath} 完全一致`);
    }
  }

  return {
    schema_version: 1,
    module_id: module.id,
    module_name: module.name,
    dedup_window_days: topicWindow,
    entity_cooldown_days: entityWindow,
    latest_archive_date: entries[0]?.date ?? null,
    entry_count: entries.length,
    entries
  };
}

const registry = readYaml("reports/registry.yml");
const modules = registry.reports.filter((module) => module.status === "active");
const indexes = modules.map((module) => ({
  module,
  index: buildModuleIndex(module),
  indexPath: module.output?.history_index ?? `${module.path}/history-index.json`
}));

const serializedIndexes = indexes.map((item) => ({
  ...item,
  serialized: `${JSON.stringify(item.index, null, 2)}\n`
}));

if (CHECK_MODE) {
  for (const { indexPath, serialized } of serializedIndexes) {
    const absolutePath = path.join(ROOT, indexPath);
    if (!fs.existsSync(absolutePath)) {
      errors.push(`${indexPath}: 索引不存在，请运行 npm run index:write`);
    } else if (fs.readFileSync(absolutePath, "utf8") !== serialized) {
      errors.push(`${indexPath}: 索引已过期，请运行 npm run index:write`);
    }
  }
}

for (const warning of warnings) console.warn(`[history-index] WARN ${warning}`);

if (errors.length > 0) {
  for (const error of errors) console.error(`[history-index] ERROR ${error}`);
  console.error(`[history-index] 校验失败：${errors.length} 个错误，${warnings.length} 个警告`);
  process.exit(1);
}

if (WRITE_MODE) {
  for (const { indexPath, serialized } of serializedIndexes) {
    fs.writeFileSync(path.join(ROOT, indexPath), serialized);
  }
}

const entryCount = indexes.reduce((total, item) => total + item.index.entry_count, 0);
console.log(
  `[history-index] ${CHECK_MODE ? "校验通过" : "索引已更新"}：${indexes.length} 个模块，${entryCount} 期归档，${warnings.length} 个警告`
);
