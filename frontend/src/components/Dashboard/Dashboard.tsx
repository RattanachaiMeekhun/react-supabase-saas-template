import React from "react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import type { ChartLayoutItem } from "../Charts/TChartType";
import { renderChartItem } from "../../helper/dashboardHelper";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/redux";
import { Input } from "antd";
import { setTitle } from "../../redux/slices/dashboardSlice";

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
    <div className="mx-6">
      <div className="text-2xl font-bold h-10 text-center">{title}</div>
      <Input
        className="!text-2xl font-bold h-10 !text-[#ffffff]"
        value={title}
        variant="borderless"
        onChange={(e) => {
          dispatch(setTitle(e.target.value));
        }}
      />
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
