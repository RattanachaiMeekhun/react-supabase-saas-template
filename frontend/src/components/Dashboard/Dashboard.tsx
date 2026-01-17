import React, { useRef } from "react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import type { ChartLayoutItem } from "../Charts/TChartType";
import ChartItemCard from "./ChartItemCard";

const ResponsiveGridLayout = WidthProvider(Responsive);

type DashboardProps = {
  chartItems: ChartLayoutItem[];
};

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { chartItems: ChartItem } = props;
  const dashboardRef = useRef<HTMLDivElement>(null);

  if (!ChartItem || ChartItem.length === 0) {
    return (
      <div className="text-center text-secondary">No charts available</div>
    );
  }

  // Normal responsive layouts
  const layouts: Layouts = {
    lg: ChartItem.map((item, i) => ({
      i: item.key,
      x: (i % 3) * 8, // 3 columns, each 8 units wide
      y: Math.floor(i / 3) * 10,
      w: 8,
      h: 10,
    })),
    md: ChartItem.map((item, i) => ({
      i: item.key,
      x: (i % 2) * 10, // 2 columns, each 10 units wide
      y: Math.floor(i / 2) * 10,
      w: 10,
      h: 10,
    })),
    sm: ChartItem.map((item, i) => ({
      i: item.key,
      x: (i % 2) * 6, // 2 columns, each 6 units wide
      y: Math.floor(i / 2) * 8,
      w: 6,
      h: 8,
    })),
    xs: ChartItem.map((item, i) => ({
      i: item.key,
      x: 0, // Single column
      y: i * 8,
      w: 8,
      h: 8,
    })),
    xxs: ChartItem.map((item, i) => ({
      i: item.key,
      x: 0, // Single column
      y: i * 6,
      w: 6,
      h: 6,
    })),
  };

  return (
    <div id="dashboard-container" ref={dashboardRef} className={`relative `}>
      <ResponsiveGridLayout
        className={`layout border-2 rounded-lg ${"border-gray-200"}`}
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 24, md: 20, sm: 12, xs: 8, xxs: 6 }}
        rowHeight={20}
        resizeHandles={["se", "sw", "ne", "nw"]}
        draggableHandle=".drag-handle"
        style={{ border: "1px solid #9DB2BF", borderRadius: "0.5rem" }}
      >
        {ChartItem.map((item) => {
          return (
            <div
              key={item.key}
              className="border border-border bg-surface shadow rounded-lg relative"
            >
              {ChartItemCard(item)}
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
