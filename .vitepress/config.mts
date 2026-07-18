import { defineConfig, type DefaultTheme } from "vitepress";
import { loadReportData, type ReportArchiveEntry } from "./report-data";
import { normalizeSearchTerm, tokenizeSearchText } from "./search";

const reportData = loadReportData();

function archiveGroups(entries: ReportArchiveEntry[]): DefaultTheme.SidebarItem[] {
  const years = new Map<string, Map<string, ReportArchiveEntry[]>>();

  for (const entry of entries) {
    const [year, month] = entry.date.split("-");
    const months = years.get(year) ?? new Map<string, ReportArchiveEntry[]>();
    const monthEntries = months.get(month) ?? [];
    monthEntries.push(entry);
    months.set(month, monthEntries);
    years.set(year, months);
  }

  return [...years.entries()].map(([year, months], yearIndex) => ({
    text: `${year} 年`,
    collapsed: yearIndex > 0,
    items: [...months.entries()].map(([month, entries], monthIndex) => ({
      text: `${Number(month)} 月`,
      collapsed: yearIndex > 0 || monthIndex > 0,
      items: entries.map((entry) => ({
        text: entry.date,
        link: entry.url
      }))
    }))
  }));
}

const sidebar: DefaultTheme.SidebarMulti = Object.fromEntries(
  reportData.modules.map((module) => {
    const entries = reportData.entries.filter((entry) => entry.moduleId === module.id);
    return [
      `/${module.id}/`,
      [
        {
          text: module.name,
          items: [
            { text: "栏目概览", link: `/${module.id}/` },
            { text: "最新一期", link: module.latestUrl }
          ]
        },
        ...archiveGroups(entries)
      ]
    ];
  })
);

export default defineConfig({
  lang: "zh-CN",
  title: "DailyReport",
  titleTemplate: ":title · DailyReport",
  description: "每天整理金融科技、Web3 与英文跟读内容，积累长期可复用的认知。",
  base: "/DailyReport/",
  cleanUrls: true,
  lastUpdated: true,
  appearance: true,
  rewrites: {
    "reports/:module/:path*": ":module/:path*"
  },
  srcExclude: [
    "README.md",
    "PROJECT_PLAN.md",
    "site_docs/**/*.md",
    "shared/**/*.md",
    "reports/DEDUPLICATION.md",
    "reports/*/README.md",
    "reports/*/PROMPT.md",
    "reports/*/TOPIC_POOL.md",
    "reports/*/template.md",
    "reports/*/archive/README.md"
  ],
  sitemap: {
    hostname: "https://bat9527.github.io/DailyReport/"
  },
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/DailyReport/favicon.svg" }],
    ["meta", { name: "theme-color", content: "#f5f5f7", media: "(prefers-color-scheme: light)" }],
    ["meta", { name: "theme-color", content: "#000000", media: "(prefers-color-scheme: dark)" }]
  ],
  themeConfig: {
    logo: "/favicon.svg",
    siteTitle: "DailyReport",
    nav: [
      { text: "首页", link: "/" },
      { text: "金融科技", link: "/fintech-expansion/latest" },
      { text: "Web3", link: "/web3-market/latest" },
      { text: "英文跟读", link: "/english-shadowing/latest" },
      { text: "归档", link: "/archive" }
    ],
    sidebar,
    outline: {
      level: [2, 3],
      label: "本页目录"
    },
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索",
                buttonAriaLabel: "搜索日报"
              },
              modal: {
                displayDetails: "显示详情",
                resetButtonTitle: "清除搜索",
                backButtonTitle: "关闭搜索",
                noResultsText: "没有找到相关内容",
                footer: {
                  selectText: "选择",
                  selectKeyAriaLabel: "回车",
                  navigateText: "切换",
                  navigateUpKeyAriaLabel: "上箭头",
                  navigateDownKeyAriaLabel: "下箭头",
                  closeText: "关闭",
                  closeKeyAriaLabel: "Esc"
                }
              }
            }
          }
        },
        miniSearch: {
          options: {
            tokenize: tokenizeSearchText,
            processTerm: normalizeSearchTerm
          },
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 }
          }
        },
        async _render(src, env, md) {
          const html = await (typeof md.renderAsync === "function"
            ? md.renderAsync(src, env)
            : md.render(src, env));
          if (env.frontmatter?.search === false || /\/latest\.md$/.test(env.relativePath)) {
            return "";
          }
          return html;
        }
      }
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/bat9527/DailyReport" }
    ],
    editLink: {
      pattern: "https://github.com/bat9527/DailyReport/edit/main/:path",
      text: "在 GitHub 上编辑此页"
    },
    lastUpdated: {
      text: "最后更新于"
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇"
    },
    darkModeSwitchLabel: "外观",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    sidebarMenuLabel: "栏目导航",
    returnToTopLabel: "返回顶部",
    footer: {
      message: "来源可追溯 · 事实与判断分离 · 没有价值时不凑数",
      copyright: "DailyReport"
    }
  }
});
