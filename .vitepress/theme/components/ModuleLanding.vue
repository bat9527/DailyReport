<script setup lang="ts">
import { computed } from "vue";
import { withBase } from "vitepress";
import type { ReportData } from "../../report-data";

const props = defineProps<{
  moduleId: string;
  data: ReportData;
}>();

const module = computed(() => props.data.modules.find((item) => item.id === props.moduleId));
const entries = computed(() => props.data.entries.filter((entry) => entry.moduleId === props.moduleId));
</script>

<template>
  <div v-if="module" class="module-landing">
    <a class="latest-callout" :class="`accent-${module.accent}`" :href="withBase(module.latestUrl)">
      <span class="latest-icon">{{ module.symbol }}</span>
      <span class="latest-copy">
        <small>LATEST · {{ module.latestDate }}</small>
        <strong>阅读最新一期</strong>
        <span>{{ module.readingTime }} · 每天北京时间 06:00 更新</span>
      </span>
      <span class="latest-arrow" aria-hidden="true">→</span>
    </a>

    <div class="module-stats" aria-label="栏目状态">
      <div><strong>{{ module.entryCount }}</strong><span>已归档期数</span></div>
      <div><strong>06:00</strong><span>北京时间更新</span></div>
      <div><strong>每日</strong><span>更新频率</span></div>
    </div>

    <section class="module-history" aria-labelledby="module-history-title">
      <div class="module-history-heading">
        <h2 id="module-history-title">最近归档</h2>
        <a :href="withBase('/archive')">完整归档</a>
      </div>
      <div class="module-history-list">
        <a
          v-for="entry in entries.slice(0, 10)"
          :key="entry.date"
          :href="withBase(entry.url)"
        >
          <time :datetime="entry.date">{{ entry.date }}</time>
          <span>{{ entry.primaryTopic || entry.title }}</span>
          <b aria-hidden="true">›</b>
        </a>
      </div>
    </section>
  </div>
</template>
