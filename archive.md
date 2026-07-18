---
title: 历史归档
description: 按栏目与日期浏览 DailyReport 的全部历史内容。
sidebar: false
aside: false
pageClass: archive-page
prev: false
next: false
---

<script setup>
import { data as reportData } from './archive.data'
</script>

# 历史归档

按时间回看，让零散信息逐渐形成自己的知识地图。

<ReportArchive :data="reportData" />
