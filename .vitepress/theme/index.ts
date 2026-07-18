import DefaultTheme from "vitepress/theme";
import { useData, type Theme } from "vitepress";
import { defineComponent, h } from "vue";
import { normalizeSearchTerm, tokenizeSearchText } from "../search";
import HomeOverview from "./components/HomeOverview.vue";
import ModuleLanding from "./components/ModuleLanding.vue";
import ReportArchive from "./components/ReportArchive.vue";
import "./custom.css";

const DailyLayout = defineComponent({
  name: "DailyLayout",
  setup() {
    const { theme } = useData();
    const search = theme.value.search;

    // Functions are used while building the index but are not serialized into
    // VitePress site data. Restore them before the local search component loads.
    if (search?.provider === "local") {
      const miniSearch = search.options?.miniSearch;
      if (miniSearch) {
        miniSearch.options = {
          ...miniSearch.options,
          tokenize: tokenizeSearchText,
          processTerm: normalizeSearchTerm
        };
      }
    }

    return () => h(DefaultTheme.Layout);
  }
});

export default {
  extends: DefaultTheme,
  Layout: DailyLayout,
  enhanceApp({ app }) {
    app.component("HomeOverview", HomeOverview);
    app.component("ModuleLanding", ModuleLanding);
    app.component("ReportArchive", ReportArchive);
  }
} satisfies Theme;
