#!/usr/bin/env python3
"""Build MkDocs input from the report registry and Markdown archives."""

from __future__ import annotations

import copy
import re
import shutil
from collections import defaultdict
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
SITE_DOCS = ROOT / "site_docs"
BASE_CONFIG = ROOT / "mkdocs.yml"
GENERATED_CONFIG = ROOT / "mkdocs.generated.yml"

CATEGORY_LABELS = {
    "fintech": "金融科技",
    "language": "语言学习",
    "technology": "科技",
    "humanities": "人文",
}

MODULE_ICONS = {
    "fintech-expansion": "material-bank-outline",
    "english-shadowing": "material-account-voice",
}


def load_yaml(path: Path) -> dict:
    with path.open("r", encoding="utf-8") as handle:
        return yaml.safe_load(handle) or {}


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content.rstrip() + "\n", encoding="utf-8")


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def report_date(content: str) -> str:
    match = re.search(r"\b(20\d{2}-\d{2}-\d{2})\b", content)
    return match.group(1) if match else "尚未生成"


def with_search_excluded(content: str) -> str:
    return "---\nsearch:\n  exclude: true\n---\n\n" + content.lstrip()


def archive_nav_and_index(module_id: str, archive_root: Path) -> tuple[list, str]:
    files = sorted(
        (path for path in archive_root.rglob("*.md") if path.name != "README.md"),
        reverse=True,
    )
    grouped: dict[str, dict[str, list[Path]]] = defaultdict(lambda: defaultdict(list))

    for source in files:
        relative = source.relative_to(archive_root)
        if len(relative.parts) < 3:
            continue
        year, month = relative.parts[0], relative.parts[1]
        grouped[year][month].append(source)

        destination = SITE_DOCS / module_id / "archive" / relative
        write_text(destination, read_text(source))

    nav: list = [{"归档索引": f"{module_id}/archive/index.md"}]
    index_lines = [
        "# 历史归档",
        "",
        "按北京时间归档。最新日期排列在前，点击日期即可阅读完整日报。",
        "",
    ]

    if not grouped:
        index_lines.append("> 暂无历史归档。")
        return nav, "\n".join(index_lines)

    for year in sorted(grouped, reverse=True):
        year_nav: list = []
        index_lines.extend([f"## {year} 年", ""])
        for month in sorted(grouped[year], reverse=True):
            month_nav: list = []
            index_lines.extend([f"### {int(month)} 月", ""])
            for source in sorted(grouped[year][month], reverse=True):
                date = source.stem
                relative = source.relative_to(archive_root).as_posix()
                target = f"{module_id}/archive/{relative}"
                month_nav.append({date: target})
                index_lines.append(f"- [{date}]({year}/{month}/{source.name})")
            index_lines.append("")
            year_nav.append({f"{int(month)} 月": month_nav})
        nav.append({f"{year} 年": year_nav})

    return nav, "\n".join(index_lines)


def module_card(report: dict, module_config: dict, latest_date: str) -> str:
    module_id = report["id"]
    icon = MODULE_ICONS.get(module_id, "material-file-document-outline")
    category = CATEGORY_LABELS.get(report.get("category", ""), report.get("category", "日报"))
    schedule = report.get("schedule", {})
    time = schedule.get("time", module_config.get("schedule", {}).get("time", "--:--"))
    timezone = schedule.get("timezone", module_config.get("timezone", "Asia/Shanghai"))
    return "\n".join(
        [
            f"- :{icon}:{{ .lg .middle }} __{report['name']}__",
            "",
            f"    {category} · 每日 {time} · {timezone}",
            "",
            f"    最新一期：{latest_date}",
            "",
            f"    [:octicons-arrow-right-24: 阅读最新一期]({module_id}/latest.md)",
        ]
    )


def build_site() -> None:
    registry = load_yaml(ROOT / "reports" / "registry.yml")
    reports = [report for report in registry.get("reports", []) if report.get("status") == "active"]

    if SITE_DOCS.exists():
        shutil.rmtree(SITE_DOCS)
    SITE_DOCS.mkdir(parents=True)

    nav: list = [{"首页": "index.md"}]
    cards: list[str] = []
    newest_dates: list[str] = []

    for report in reports:
        module_id = report["id"]
        module_root = ROOT / report["path"]
        module_config = load_yaml(module_root / "config.yml")
        latest_content = read_text(module_root / "latest.md")
        latest_date = report_date(latest_content)
        if latest_date != "尚未生成":
            newest_dates.append(latest_date)

        overview = read_text(module_root / "README.md")
        overview += "\n\n## 快速入口\n\n"
        overview += "- [阅读最新一期](latest.md)\n"
        overview += "- [浏览历史归档](archive/index.md)\n"
        write_text(SITE_DOCS / module_id / "index.md", overview)
        write_text(SITE_DOCS / module_id / "latest.md", with_search_excluded(latest_content))

        archive_nav, archive_index = archive_nav_and_index(module_id, module_root / "archive")
        write_text(SITE_DOCS / module_id / "archive" / "index.md", archive_index)

        nav.append(
            {
                report["name"]: [
                    {"模块说明": f"{module_id}/index.md"},
                    {"最新一期": f"{module_id}/latest.md"},
                    {"历史归档": archive_nav},
                ]
            }
        )
        cards.append(module_card(report, module_config, latest_date))

    updated_date = max(newest_dates) if newest_dates else "等待首期日报"
    homepage = "\n".join(
        [
            "# DailyReport",
            "",
            "<div class=\"hero-copy\" markdown>",
            "",
            "## 把每日关注，沉淀为长期认知",
            "",
            "独立、可追溯、持续更新的个人兴趣日报平台。选择一个方向，直接开始今天的阅读。",
            "",
            "</div>",
            "",
            f"<p class=\"site-updated\">内容最新日期：{updated_date} · 北京时间</p>",
            "",
            "## 今日入口",
            "",
            "<div class=\"grid cards\" markdown>",
            "",
            "\n\n".join(cards),
            "",
            "</div>",
            "",
            "## 阅读方式",
            "",
            "- **快速进入**：从上方卡片打开每个模块的最新一期。",
            "- **长期回看**：在历史归档中按年月查找过去内容。",
            "- **全文检索**：使用顶部搜索，跨日报查找公司、人物和主题。",
            "- **移动阅读**：页面针对手机和桌面自适应，并支持深色模式。",
            "",
            "!!! info \"内容说明\"",
            "    日报以 Markdown 作为唯一内容源。网站由 GitHub Pages 自动构建，每次归档提交后同步更新。",
        ]
    )
    write_text(SITE_DOCS / "index.md", homepage)
    write_text(SITE_DOCS / "about.md", read_text(ROOT / "PROJECT_PLAN.md"))
    nav.append({"项目说明": "about.md"})

    stylesheet = ROOT / "site_overrides" / "stylesheets" / "extra.css"
    stylesheet_destination = SITE_DOCS / "stylesheets" / "extra.css"
    stylesheet_destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(stylesheet, stylesheet_destination)

    nav_yaml = yaml.safe_dump(
        {"nav": nav},
        allow_unicode=True,
        sort_keys=False,
        width=1000,
    )
    write_text(GENERATED_CONFIG, read_text(BASE_CONFIG) + "\n\n" + nav_yaml)


if __name__ == "__main__":
    build_site()
