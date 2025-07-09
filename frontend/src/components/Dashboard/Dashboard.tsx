import React, { useRef } from "react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import type { ChartLayoutItem } from "../Charts/TChartType";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/redux";
import { Typography, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { setTitle } from "../../redux/slices/dashboardSlice";
import ChartItemCard from "./ChartItemCard";
import { exportDashboardToPDF } from "../../utils/pdfExport";

const ResponsiveGridLayout = WidthProvider(Responsive);

type DashboardProps = {
  ChartItem: ChartLayoutItem[];
};

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { ChartItem } = props;
  const { title } = useSelector((state: RootState) => state.dashboard);
  const dispatch = useDispatch();
  const dashboardRef = useRef<HTMLDivElement>(null);

  if (!ChartItem || ChartItem.length === 0) {
    return <div className="text-center text-gray-500">No charts available</div>;
  }

  const handleExportPDF = async () => {
    try {
      if (dashboardRef.current) {
        await exportDashboardToPDF('dashboard-container', {
          filename: `${title.replace(/\s+/g, '-').toLowerCase()}-dashboard.pdf`,
          quality: 4,
          orientation: 'portrait'
        });
      }
    } catch (error) {
      console.error('Failed to export PDF:', error);
      // You can add notification here
    }
  };

  const layouts: Layouts = {
    lg: ChartItem.map((item, i) => ({
      i: item.key,
      x: (i % 3) * 8,  // 3 columns, each 8 units wide
      y: Math.floor(i / 3) * 10,
      w: 8,
      h: 10,
    })),
    md: ChartItem.map((item, i) => ({
      i: item.key,
      x: (i % 2) * 10,  // 2 columns, each 10 units wide
      y: Math.floor(i / 2) * 10,
      w: 10,
      h: 10,
    })),
    sm: ChartItem.map((item, i) => ({
      i: item.key,
      x: (i % 2) * 6,   // 2 columns, each 6 units wide
      y: Math.floor(i / 2) * 8,
      w: 6,
      h: 8,
    })),
    xs: ChartItem.map((item, i) => ({
      i: item.key,
      x: 0,              // Single column
      y: i * 8,
      w: 8,
      h: 8,
    })),
    xxs: ChartItem.map((item, i) => ({
      i: item.key,
      x: 0,              // Single column
      y: i * 6,
      w: 6,
      h: 6,
    })),
  };

  return (
    <div className="mx-6 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <Typography.Title
          className="text-center text-sm mt-2 !text-white flex-1"
          editable={{
            onChange: (value) => {
              dispatch(setTitle(value || "Dashboard"));
            },
          }}
        >
          {title}
        </Typography.Title>
        
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleExportPDF}
          className="ml-4"
        >
          Export PDF
        </Button>
      </div>
      
      <div id="dashboard-container" ref={dashboardRef} className="relative">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `radial-gradient(circle, #94a3b8 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
          <ResponsiveGridLayout
            className="layout  border-2 rounded-lg"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 24, md: 20, sm: 12, xs: 8, xxs: 6 }}
            rowHeight={20}
            resizeHandles={["se", "sw", "ne", "nw"]}
            draggableHandle=".drag-handle"
            isDraggable
            style={{border:"1px solid #392e4e", borderRadius: '0.5rem' }}
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
