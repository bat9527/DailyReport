<script setup lang="ts">
import { computed, ref } from "vue";
import { withBase } from "vitepress";
import type { ReportData } from "../../report-data";

const props = defineProps<{ data: ReportData }>();
const selected = ref("all");

const filteredEntries = computed(() => selected.value === "all"
  ? props.data.entries
  : props.data.entries.filter((entry) => entry.moduleId === selected.value));

const years = computed(() => {
  const grouped = new Map<string, typeof props.data.entries>();
  for (const entry of filteredEntries.value) {
    const year = entry.date.slice(0, 4);
    const list = grouped.get(year) ?? [];
    list.push(entry);
    grouped.set(year, list);
  }
  return [...grouped.entries()].map(([year, entries]) => ({ year, entries }));
});
</script>

<template>
  <div class="report-archive">
    <div class="archive-filters" aria-label="筛选归档">
      <button :class="{ active: selected === 'all' }" type="button" @click="selected = 'all'">
        全部
      </button>
      <button
        v-for="module in data.modules"
        :key="module.id"
        :class="{ active: selected === module.id }"
        type="button"
        @click="selected = module.id"
      >
        {{ module.shortName }}
      </button>
    </div>

    <section v-for="group in years" :key="group.year" class="archive-year">
      <h2>{{ group.year }}<span>年</span></h2>
      <div class="archive-list">
        <a
          v-for="entry in group.entries"
          :key="`${entry.moduleId}-${entry.date}`"
          :href="withBase(entry.url)"
          class="archive-entry"
        >
          <span class="archive-date">
            <strong>{{ entry.date.slice(8, 10) }}</strong>
            <small>{{ Number(entry.date.slice(5, 7)) }} 月</small>
          </span>
          <span class="entry-symbol" :class="`accent-${entry.accent}`">{{ entry.symbol }}</span>
          <span class="archive-copy">
            <small>{{ entry.moduleName }} · {{ entry.readingTime }}</small>
            <strong>{{ entry.title }}</strong>
            <span>{{ entry.primaryTopic || entry.summary }}</span>
          </span>
          <span class="entry-arrow" aria-hidden="true">›</span>
        </a>
      </div>
    </section>
  </div>
</template>
