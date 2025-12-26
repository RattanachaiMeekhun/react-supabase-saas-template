import React, { useRef, useState } from "react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import type { ChartLayoutItem } from "../Charts/TChartType";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/redux";
import { Typography, Button, Space } from "antd";
import { DownloadOutlined, FileTextOutlined } from "@ant-design/icons";
import { setTitle } from "../../redux/slices/dashboardSlice";
import ChartItemCard from "./ChartItemCard";
import { exportDashboardToPDF } from "../../utils/pdfExport";

const ResponsiveGridLayout = WidthProvider(Responsive);

type DashboardProps = {
  chartItems: ChartLayoutItem[];
};

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { chartItems: ChartItem } = props;
  const { title } = useSelector((state: RootState) => state.dashboard);
  const dispatch = useDispatch();
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [isA4Mode, setIsA4Mode] = useState(false);

  if (!ChartItem || ChartItem.length === 0) {
    return (
      <div className="text-center text-secondary">No charts available</div>
    );
  }

  const handleExportPDF = async () => {
    try {
      // Switch to A4 mode before export
      setIsA4Mode(true);

      // Wait for re-render
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (dashboardRef.current) {
        await exportDashboardToPDF("dashboard-container", {
          filename: `${title.replace(/\s+/g, "-").toLowerCase()}-dashboard.pdf`,
          quality: 2,
          orientation: "portrait",
        });
      }
    } catch (error) {
      console.error("Failed to export PDF:", error);
    } finally {
      // Switch back to normal mode
      setIsA4Mode(false);
    }
  };

  const toggleA4Mode = () => {
    setIsA4Mode(!isA4Mode);
  };

  // A4 layouts สำหรับ PDF export (A4 = 210 x 297mm ≈ 794 x 1123px)
  const a4Layouts: Layouts = {
    lg: ChartItem.map((item, i) => ({
      i: item.key,
      x: (i % 2) * 6, // 2 columns แนวนอน
      y: Math.floor(i / 2) * 6,
      w: 6,
      h: 6,
    })),
    md: ChartItem.map((item, i) => ({
      i: item.key,
      x: (i % 2) * 6,
      y: Math.floor(i / 2) * 6,
      w: 6,
      h: 6,
    })),
    sm: ChartItem.map((item, i) => ({
      i: item.key,
      x: 0, // Single column สำหรับ A4
      y: i * 5,
      w: 12,
      h: 5,
    })),
    xs: ChartItem.map((item, i) => ({
      i: item.key,
      x: 0,
      y: i * 5,
      w: 12,
      h: 5,
    })),
    xxs: ChartItem.map((item, i) => ({
      i: item.key,
      x: 0,
      y: i * 5,
      w: 12,
      h: 5,
    })),
  };

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
    <div
      id="dashboard-container"
      ref={dashboardRef}
      className={`relative ${
        isA4Mode ? "bg-white shadow-lg rounded-lg p-8" : ""
      }`}
      style={
        isA4Mode
          ? {
              width: "794px",
              margin: "0 auto",
            }
          : {}
      }
    >
      {!isA4Mode && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, #9DB2BF 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
      )}
      <ResponsiveGridLayout
        className={`layout border-2 rounded-lg ${
          isA4Mode ? "border-gray-200" : ""
        }`}
        layouts={isA4Mode ? a4Layouts : layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={
          isA4Mode
            ? { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }
            : { lg: 24, md: 20, sm: 12, xs: 8, xxs: 6 }
        }
        rowHeight={isA4Mode ? 40 : 20}
        resizeHandles={["se", "sw", "ne", "nw"]}
        draggableHandle=".drag-handle"
        isDraggable={!isA4Mode}
        isResizable={!isA4Mode}
        style={
          isA4Mode
            ? {}
            : { border: "1px solid #9DB2BF", borderRadius: "0.5rem" }
        }
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
