import React from "react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import type { ChartLayoutItem } from "../Charts/TChartType";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/redux";
import { Typography } from "antd";
import { setTitle } from "../../redux/slices/dashboardSlice";
import ChartItemCard from "./ChartItemCard";

const ResponsiveGridLayout = WidthProvider(Responsive);

type DashboardProps = {
  ChartItem: ChartLayoutItem[];
};

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { ChartItem } = props;
  const { title } = useSelector((state: RootState) => state.dashboard);
  const dispatch = useDispatch();
  if (!ChartItem || ChartItem.length === 0) {
    return <div className="text-center text-gray-500">No charts available</div>;
  }

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

  return (
    <div className="mx-6 min-h-screen">
      <Typography.Title
        className="text-center text-sm mt-2 !text-white"
        editable={{
          onChange: (value) => {
            dispatch(setTitle(value || "Dashboard"));
          },
        }}
      >
        {title}
      </Typography.Title>
  <div className="relative">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
         <ResponsiveGridLayout
        className="layout border-[#392e4e] border-2 rounded-lg"
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
              className="border bg-white shadow rounded-lg relative"
            >
              {ChartItemCard(item)}
            </div>
          );
        })}
      </ResponsiveGridLayout>
</div>
    </div>
  );
};

export default Dashboard;
