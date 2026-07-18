# DailyReport

一个可持续扩展的个人日报平台。

> **在线阅读：** [打开 DailyReport 网站](https://bat9527.github.io/DailyReport/)

这里不是单一的综合日报。每个兴趣方向都是一个独立模块，拥有自己的内容定位、生成规则、信息源、调度时间和历史归档。新增兴趣时，只需增加新的日报模块，不影响已有模块。

## 当前日报

| 分类 | 日报 | 状态 | 生成时间 | 最新一期 |
|---|---|---|---|---|
| 金融科技 | 金融科技出海 | 已启用 | 每日 08:00（北京时间） | [查看最新一期](reports/fintech-expansion/latest.md) |
| 语言学习 | 英文影子跟读 | 已启用 | 每日 08:00（北京时间） | [查看最新一期](reports/english-shadowing/latest.md) |

## 项目结构

- PROJECT_PLAN.md：整体规划、扩展方式和演进路线
- reports/registry.yml：日报模块注册表
- reports/fintech-expansion/：金融科技出海日报
- reports/english-shadowing/：英文影子跟读
- reports/*/history-index.json：由归档自动生成的跨日去重索引
- reports/DEDUPLICATION.md：去重元数据和日常生成流程
- shared/REPORT_STANDARD.md：所有日报共同遵守的最低标准

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

网站使用 Astro 构建，并通过 GitHub Pages 发布。界面采用接近 iOS/macOS 的系统字体、留白、卡片、毛玻璃与深色模式；每次日报写入 `main` 分支后，GitHub Actions 会自动更新在线网站，Markdown 始终是唯一内容源。
