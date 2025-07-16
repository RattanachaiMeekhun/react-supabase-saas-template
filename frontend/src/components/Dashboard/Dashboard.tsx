import React, { useRef, useState } from "react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import type { ChartLayoutItem } from "../Charts/TChartType";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/redux";
import { Typography, Button, Space, Badge } from "antd";
import { 
  DownloadOutlined, 
  DashboardOutlined,
  EyeOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { setTitle } from "../../redux/slices/dashboardSlice";
import ChartItemCard from "./ChartItemCard";
import { exportDashboardToPDF } from "../../utils/pdfExport";
import { EmptyState } from "../ETC/States";

const ResponsiveGridLayout = WidthProvider(Responsive);
const { Title, Text } = Typography;

type DashboardProps = {
  ChartItem: ChartLayoutItem[];
};

const Dashboard: React.FC<DashboardProps> = (props) => {
  const { ChartItem } = props;
  const { title } = useSelector((state: RootState) => state.dashboard);
  const dispatch = useDispatch();
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [isA4Mode, setIsA4Mode] = useState(false);

  if (!ChartItem || ChartItem.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-lg">
                  <DashboardOutlined className="text-white text-sm" />
                </div>
                <Title level={2} className="!mb-0 !text-text-primary">
                  {title}
                </Title>
              </div>
              <Text className="text-text-secondary">
                Welcome to your analytics dashboard. Get started by adding your first chart.
              </Text>
            </div>
          </div>
        </div>
        
        <EmptyState
          title="No Charts Available"
          description="Start building your dashboard by adding charts and widgets to visualize your data."
          action={{
            text: "Add Chart",
            icon: <PlusOutlined />,
            onClick: () => {
              // Handle add chart logic here
              console.log("Add chart clicked");
            }
          }}
        />
      </div>
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
    <div className="animate-fade-in">
      {/* Modern Dashboard Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center shadow-lg">
                <DashboardOutlined className="text-white text-sm" />
              </div>
              <Title
                level={2}
                className="!mb-0 !text-text-primary"
                editable={{
                  onChange: (value) => {
                    dispatch(setTitle(value || "Dashboard"));
                  },
                }}
              >
                {title}
              </Title>
              <Badge 
                count={ChartItem.length} 
                className="bg-primary-100 text-primary-300"
                style={{ backgroundColor: '#312e81', color: '#c4b5fd' }}
              />
            </div>
            <Text className="text-text-secondary">
              Welcome to your analytics dashboard. Monitor your key metrics in real-time.
            </Text>
          </div>
          
          <Space size="middle">
            <Button
              type={isA4Mode ? "primary" : "default"}
              icon={<EyeOutlined />}
              onClick={toggleA4Mode}
              className={`shadow-lg hover:shadow-xl transition-all duration-200 border-border-primary ${
                isA4Mode 
                  ? 'bg-primary-500 border-primary-500' 
                  : 'bg-dark-secondary text-text-secondary hover:bg-dark-hover hover:text-primary-400 border-border-primary'
              }`}
            >
              {isA4Mode ? "Exit Preview" : "Print Preview"}
            </Button>
            
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleExportPDF}
              className="shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary-500 to-primary-600 border-0 hover:from-primary-600 hover:to-primary-700"
            >
              Export PDF
            </Button>
          </Space>
        </div>
      </div>

      {/* Dashboard Container */}
      <div 
        id="dashboard-container" 
        ref={dashboardRef} 
        className={`transition-all duration-500 ${
          isA4Mode 
            ? 'bg-white shadow-2xl rounded-2xl p-8 mx-auto border border-gray-200' 
            : 'relative'
        }`}
        style={isA4Mode ? {
          width: '794px',
          minHeight: '1123px',
          aspectRatio: '210/297'
        } : {}}
      >
        {/* Modern Dark Dot Grid Background - Only in normal mode */}
        {!isA4Mode && (
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle, #64748b 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
        )}
        
        {/* Grid Layout */}
        <ResponsiveGridLayout
          className={`layout rounded-xl transition-all duration-300 ${
            isA4Mode 
              ? 'border border-gray-200' 
              : 'border border-border-primary shadow-2xl bg-dark-secondary/30 backdrop-blur-sm'
          }`}
          layouts={isA4Mode ? a4Layouts : layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={isA4Mode ? { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 } : { lg: 24, md: 20, sm: 12, xs: 8, xxs: 6 }}
          rowHeight={isA4Mode ? 40 : 20}
          resizeHandles={["se", "sw", "ne", "nw"]}
          draggableHandle=".drag-handle"
          isDraggable={!isA4Mode}
          isResizable={!isA4Mode}
        >
          {ChartItem.map((item) => {
            return (
              <div
                key={item.key}
                className={`transition-all duration-300 rounded-xl relative overflow-hidden ${
                  isA4Mode 
                    ? 'bg-white border border-gray-200 shadow-sm' 
                    : 'bg-dark-secondary border border-border-primary shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:bg-dark-secondary/80 backdrop-blur-sm'
                }`}
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
