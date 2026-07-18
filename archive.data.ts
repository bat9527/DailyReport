import { defineLoader } from "vitepress";
import { loadReportData, type ReportData } from "./.vitepress/report-data";

declare const data: ReportData;
export { data };

export default defineLoader({
  watch: ["reports/registry.yml", "reports/*/history-index.json"],
  load(): ReportData {
    return loadReportData();
  }
});
