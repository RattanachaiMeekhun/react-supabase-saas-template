import type { ChartType, ChartData, ChartOptions } from "chart.js";
import type { Layout } from "react-grid-layout";

export type BaseChartType = {
  key: string;
  title: string;
  description?: string;
  insight?: string;
  recommendation?: string;
  createdBy?: string;
  updatedAt?: string;
};

export type ChartLayoutItem = Layout &
  BaseChartType & {
    chartType: ChartType;
    chartData: ChartData;
    chartOptions?: ChartOptions; // optional, สำหรับ Chart.js config เพิ่มเติม
  };
