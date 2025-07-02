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
  const { chartType, chartData } = item;

  switch (chartType) {
    case "bar":
      return <BarChart data={chartData as ChartData<"bar">} {...item} />;
    case "line":
      return <LineChart {...item} data={chartData as ChartData<"line">} />;
    case "pie":
      return <PieChart {...item} data={chartData as ChartData<"pie">} />;
    case "doughnut":
      return (
        <DoughnutChart {...item} data={chartData as ChartData<"doughnut">} />
      );
    case "radar":
      return <RadarChart {...item} data={chartData as ChartData<"radar">} />;
    case "polarArea":
      return (
        <PolarAreaChart {...item} data={chartData as ChartData<"polarArea">} />
      );
    case "scatter":
      return (
        <ScatterChart {...item} data={chartData as ChartData<"scatter">} />
      );
    case "bubble":
      return <BubbleChart {...item} data={chartData as ChartData<"bubble">} />;
    default:
      return <div>Unsupported chart type</div>;
  }
};
