---
layout: home
title: DailyReport
titleTemplate: false
description: 每天整理金融科技、Web3 与英文跟读内容，积累长期可复用的认知。
hero:
  name: DailyReport
  text: 今天，值得了解什么？
  tagline: 把每天真正重要的信息，整理成可以长期复用的认知。
  actions:
    - theme: brand
      text: 阅读最新日报
      link: /fintech-expansion/latest
    - theme: alt
      text: 浏览历史归档
      link: /archive
features:
  - icon: 🌍
    title: 金融科技出海
    details: 非洲市场、中国企业出海与全球行业标杆。
    link: /fintech-expansion/latest
    linkText: 阅读最新一期
  - icon: ◈
    title: Web3 行情与生态
    details: BTC、ETH 行情，著名项目进展与行业观点。
    link: /web3-market/latest
    linkText: 阅读最新一期
  - icon: Aa
    title: 英文影子跟读
    details: 从演讲、书籍和电影中完成每日英语训练。
    link: /english-shadowing/latest
    linkText: 开始今天的练习
---

<script setup>
import { data as reportData } from './archive.data'
</script>

<HomeOverview :data="reportData" />
