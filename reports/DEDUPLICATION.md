# 日报去重机制

DailyReport 不需要外部数据库。历史 Markdown 是内容源，每个模块的 `history-index.json` 是由归档确定性生成的轻量索引。

## 每期元数据

每个 `archive/YYYY/MM/YYYY-MM-DD.md` 和对应的 `latest.md` 顶部都必须包含 YAML frontmatter：

```yaml
---
dedup:
  primary_topic: "本期唯一的核心主题"
  topic_tags:
    - 主题标签
  entities:
    - 人物、公司或机构
  works:
    - 演讲、书籍或电影名称
  content_keys:
    - stable-event-or-topic-key-YYYY-MM-DD
  source_type: speech
  quote: "本期使用的极短原句"
---
```

其中 `works`、`source_type` 和 `quote` 按模块需要选填；其余字段必填。

`content_keys` 用来标识具体事件或选题，使用小写英文、数字和连字符。金融科技日报中的持续事件必须为每次真实新增进展创建新键，并在键中包含事件日期。英文跟读使用“人物/作品/主题”组合键。Web3 日报为每日市场状态、项目进展和人物观点分别创建事件键；固定出现的 BTC、ETH 指标不等于内容重复。

## 重复主题的例外

默认不允许在模块冷却期内重复 `primary_topic`。如果持续事件确实出现重要新变化，可以增加：

```yaml
  allow_repeat: true
  repeat_reason: "说明本期相较上次新增了什么，以及为什么值得再次讨论"
```

这只允许主题再次出现，不允许复用旧的 `content_key`、原句或整篇内容。

## 标准流程

1. 生成前读取模块的 `history-index.json` 和配置指定窗口内的原文归档。
2. 比较候选主题、实体、作品、事件键、原句和规范化来源 URL。
3. 写入当日归档，并将完全相同的内容写入 `latest.md`。
4. 运行 `npm run index:write` 更新索引。
5. 运行 `npm run index:check`；只有校验通过才算归档成功。

## 自动校验

索引脚本会阻止以下问题进入网站构建：

- 归档缺少必需的 `dedup` 元数据；
- `latest.md` 与最新归档不一致；
- `history-index.json` 漏更新或被手工错误修改；
- 不同日期的内容指纹完全相同；
- `content_key` 或英文原句重复；
- 冷却期内重复主题；
- 英文跟读在冷却期内重复人物或作品。

主题标签、主体或来源 URL 在窗口内重复时会产生警告而不是直接失败，因为持续事件可能需要引用同一家公司或官方资料。模块可在 `config.yml` 中声明每日固定指标对应的 `recurring_topic_tags`、`recurring_entities` 和 `recurring_source_hosts`，避免无意义警告；项目和观点内容仍须确认只包含新增信息。
