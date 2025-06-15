import type { ChartType, ChartData } from "chart.js";
import type { Layout } from "react-grid-layout";

export type BaseChartType = {
  key: string;
  title: string;
};

export type ChartLayoutItem = Layout & {
  key: string;
  title: string;
  chartType: ChartType;
  chartData: ChartData;
};
