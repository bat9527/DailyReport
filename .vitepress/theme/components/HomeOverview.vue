<script setup lang="ts">
import { computed } from "vue";
import { withBase } from "vitepress";
import type { ReportData } from "../../report-data";

const props = defineProps<{ data: ReportData }>();

const recentEntries = computed(() => props.data.entries.slice(0, 6));

function displayDate(date: string): string {
  const [, month, day] = date.split("-");
  return `${Number(month)} 月 ${Number(day)} 日`;
}
</script>

<template>
  <section class="daily-overview" aria-labelledby="overview-title">
    <div class="overview-heading">
      <div>
        <span class="section-label">TODAY</span>
        <h2 id="overview-title">今日阅读</h2>
      </div>
      <div class="update-state">
        <span aria-hidden="true"></span>
        已更新至 {{ data.latestDate }}
      </div>
    </div>

    <div class="module-grid">
      <a
        v-for="module in data.modules"
        :key="module.id"
        class="module-card"
        :class="`accent-${module.accent}`"
        :href="withBase(module.latestUrl)"
      >
        <div class="module-card-top">
          <span class="module-symbol">{{ module.symbol }}</span>
          <span>{{ module.eyebrow }}</span>
        </div>
        <h3>{{ module.name }}</h3>
        <p>{{ module.description }}</p>
        <div class="module-card-meta">
          <span>{{ displayDate(module.latestDate) }}</span>
          <span>{{ module.readingTime }}</span>
        </div>
      </a>
    </div>

    <div class="recent-panel">
      <div class="recent-panel-heading">
        <div>
          <span class="section-label">RECENT</span>
          <h2>最近更新</h2>
        </div>
        <a :href="withBase('/archive')">查看全部 <span aria-hidden="true">→</span></a>
      </div>

      <div class="recent-entries">
        <a
          v-for="entry in recentEntries"
          :key="`${entry.moduleId}-${entry.date}`"
          :href="withBase(entry.url)"
          class="recent-entry"
        >
          <span class="entry-symbol" :class="`accent-${entry.accent}`">{{ entry.symbol }}</span>
          <span class="entry-copy">
            <small>{{ entry.moduleShortName }} · {{ entry.date }}</small>
            <strong>{{ entry.title }}</strong>
          </span>
          <span class="entry-arrow" aria-hidden="true">›</span>
        </a>
      </div>
    </div>
  </section>
</template>
