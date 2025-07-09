import type { ChartData } from "chart.js";
import BarChart from "../components/Charts/BarChart";
import BubbleChart from "../components/Charts/BubbleChart";
import DoughnutChart from "../components/Charts/DoughnutChart";
import LineChart from "../components/Charts/LineChart";
import PieChart from "../components/Charts/PieChart";
import PolarAreaChart from "../components/Charts/PolarAreaChart";
import RadarChart from "../components/Charts/RadarChart";
import ScatterChart from "../components/Charts/ScatterChart";
import type { ChartLayoutItem } from "../components/Charts/TChartType";

export const renderChartItem = (item: ChartLayoutItem) => {
  const { chartType, chartData, key, ...restProps } = item;

  switch (chartType) {
    case "bar":
      return <BarChart key={key} data={chartData as ChartData<"bar">} {...restProps} />;
    case "line":
      return <LineChart key={key} data={chartData as ChartData<"line">} {...restProps} />;
    case "pie":
      return <PieChart key={key} data={chartData as ChartData<"pie">} {...restProps} />;
    case "doughnut":
      return (
        <DoughnutChart key={key} data={chartData as ChartData<"doughnut">} {...restProps} />
      );
    case "radar":
      return <RadarChart key={key} data={chartData as ChartData<"radar">} {...restProps} />;
    case "polarArea":
      return (
        <PolarAreaChart key={key} data={chartData as ChartData<"polarArea">} {...restProps} />
      );
    case "scatter":
      return (
        <ScatterChart key={key} data={chartData as ChartData<"scatter">} {...restProps} />
      );
    case "bubble":
      return <BubbleChart key={key} data={chartData as ChartData<"bubble">} {...restProps} />;
    default:
      return <div key={key}>Unsupported chart type</div>;
  }
};
