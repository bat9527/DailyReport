# DailyReport

一个可持续扩展的个人日报平台。

> **在线阅读：** [打开 DailyReport 网站](https://bat9527.github.io/DailyReport/)

这里不是单一的综合日报。每个兴趣方向都是一个独立模块，拥有自己的内容定位、生成规则、信息源、调度时间和历史归档。新增兴趣时，只需增加新的日报模块，不影响已有模块。

## 当前日报

| 分类 | 日报 | 状态 | 生成时间 | 最新一期 |
|---|---|---|---|---|
| 金融科技 | 金融科技出海 | 已启用 | 每日 06:00（北京时间） | [查看最新一期](reports/fintech-expansion/latest.md) |
| 语言学习 | 英文影子跟读 | 已启用 | 每日 06:00（北京时间） | [查看最新一期](reports/english-shadowing/latest.md) |
| Web3 | Web3 行情与生态 | 已启用 | 每日 06:00（北京时间） | [查看最新一期](reports/web3-market/latest.md) |

## 项目结构

- PROJECT_PLAN.md：整体规划、扩展方式和演进路线
- reports/registry.yml：日报模块注册表
- reports/fintech-expansion/：金融科技出海日报
- reports/english-shadowing/：英文影子跟读
- reports/web3-market/：Web3 行情与生态日报
- reports/*/history-index.json：由归档自动生成的跨日去重索引
- reports/DEDUPLICATION.md：去重元数据和日常生成流程
- shared/REPORT_STANDARD.md：所有日报共同遵守的最低标准
- .vitepress/：站点配置、导航生成、主题和页面组件
- index.md / archive.md：首页与全站历史归档

每个日报模块至少包含：

- README.md：定位、覆盖范围和阅读方式
- config.yml：时间、篇幅、权重等配置
- PROMPT.md：完整生成规则
- sources.yml：种子信息源
- template.md：Markdown 输出模板
- latest.md：最新一期
- archive/YYYY/MM/YYYY-MM-DD.md：历史归档
- history-index.json：主题、实体、事件、来源与内容指纹索引

## 设计原则

1. 模块隔离：一个日报的调整不影响其他日报。
2. 兴趣驱动：有真实兴趣时再新增分类，不提前堆空目录。
3. 学习优先：解释背景、机制和案例，不只搬运新闻。
4. 来源可追溯：核心事实必须附原始链接，并区分事实与判断。
5. 允许无更新：没有重要变化时不凑数。
6. 分层阅读：对话推送适合快速阅读，GitHub 归档保留完整内容。

调度由 ChatGPT 自动化任务负责，仓库保存日报规则和长期归档。

每期日报写入后运行 `npm run index:write` 更新去重索引；`npm run index:check` 会检查索引是否同步、`latest.md` 是否等于最新归档，以及内容指纹、事件键、原句和冷却期主题是否重复。该机制完全基于 Git 文件，不需要数据库。

## 网站发布

网站使用 VitePress 构建，并通过 GitHub Pages 发布。桌面端采用文档站布局：栏目与日期在左侧导航，正文居中，页内目录位于右侧；同时保留系统字体、克制留白、深色模式和移动端适配。

导航、栏目归档和首页最新日期都从 `reports/registry.yml` 与各模块的 `history-index.json` 自动生成。每次日报写入 `main` 分支后，GitHub Actions 会自动更新在线网站，Markdown 始终是唯一内容源。

本地开发：

```bash
npm install
npm run dev
```

发布前检查：

```bash
npm run build
npm run preview
```
