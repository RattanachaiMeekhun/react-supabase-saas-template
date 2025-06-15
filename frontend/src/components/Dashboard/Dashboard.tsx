import React from "react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import BarChart from "../Charts/BarChart";
import type { ChartLayoutItem } from "../Charts/TChartType";
import type { ChartData } from "chart.js";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";
import DoughnutChart from "../Charts/DoughnutChart";
import RadarChart from "../Charts/RadarChart";
import PolarAreaChart from "../Charts/PolarAreaChart";
import ScatterChart from "../Charts/ScatterChart";
import BubbleChart from "../Charts/BubbleChart";

const ResponsiveGridLayout = WidthProvider(Responsive);

type DashboardProps = {
  ChartItem: ChartLayoutItem[];
};

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { ChartItem } = props;

  const layouts: Layouts = {
    lg: ChartItem.map((item, i) => ({
      i: item.key,
      x: (i % 2) * 6,
      y: Math.floor(i / 2) * 8,
      w: 6,
      h: 8,
    })),
    md: ChartItem.map((item, i) => ({
      i: item.key,
      x: (i % 2) * 6,
      y: Math.floor(i / 2) * 8,
      w: 6,
      h: 8,
    })),
    sm: ChartItem.map((item, i) => ({
      i: item.key,
      x: 0,
      y: i * 8,
      w: 12,
      h: 8,
    })),
    xs: ChartItem.map((item, i) => ({
      i: item.key,
      x: 0,
      y: i * 8,
      w: 12,
      h: 8,
    })),
    xxs: ChartItem.map((item, i) => ({
      i: item.key,
      x: 0,
      y: i * 8,
      w: 12,
      h: 8,
    })),
  };

  const renderChartItem = (item: ChartLayoutItem) => {
    const { key, title, chartType, chartData } = item;
    switch (chartType) {
      case "bar":
        return (
          <BarChart
            key={key}
            title={title}
            data={chartData as ChartData<"bar">}
          />
        );
      case "line":
        return (
          <LineChart
            key={key}
            title={title}
            data={chartData as ChartData<"line">}
          />
        );
      case "pie":
        return (
          <PieChart
            key={key}
            title={title}
            data={chartData as ChartData<"pie">}
          />
        );
      case "doughnut":
        return (
          <DoughnutChart
            key={key}
            title={title}
            data={chartData as ChartData<"doughnut">}
          />
        );
      case "radar":
        return (
          <RadarChart
            key={key}
            title={title}
            data={chartData as ChartData<"radar">}
          />
        );
      case "polarArea":
        return (
          <PolarAreaChart
            key={key}
            title={title}
            data={chartData as ChartData<"polarArea">}
          />
        );
      case "scatter":
        return (
          <ScatterChart
            key={key}
            title={title}
            data={chartData as ChartData<"scatter">}
          />
        );
      case "bubble":
        return (
          <BubbleChart
            key={key}
            title={title}
            data={chartData as ChartData<"bubble">}
          />
        );
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className="p-4">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
        rowHeight={30}
        resizeHandles={["se", "sw", "ne", "nw"]}
        draggableHandle=".drag-handle"
        isDraggable
      >
        {ChartItem.map((item) => {
          return (
            <div
              key={item.key}
              className="border px-1 pt-1 pb-7 bg-white shadow rounded-lg relative"
            >
              <div className="drag-handle cursor-move w-5 h-5 rounded-full absolute top-2 right-2 z-10" />
              {renderChartItem(item)}
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
