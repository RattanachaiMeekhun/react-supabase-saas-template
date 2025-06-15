import React from "react";
import { Card, Row, Col } from "antd";
import BarChart from "../components/Charts/BarChart";
import LineChart from "../components/Charts/LineChart";
import PieChart from "../components/Charts/PieChart";
import DoughnutChart from "../components/Charts/DoughnutChart";
import RadarChart from "../components/Charts/RadarChart";
import PolarAreaChart from "../components/Charts/PolarAreaChart";
import BubbleChart from "../components/Charts/BubbleChart";
import ScatterChart from "../components/Charts/ScatterChart";

// ตัวอย่างข้อมูล mock สำหรับแต่ละ chart
const barData = {
  labels: ["A", "B", "C"],
  datasets: [{ label: "Bar", data: [12, 19, 3], backgroundColor: "#2563eb" }],
};
const lineData = {
  labels: ["A", "B", "C"],
  datasets: [{ label: "Line", data: [5, 10, 7], borderColor: "#6366f1" }],
};
const pieData = {
  labels: ["A", "B", "C"],
  datasets: [
    {
      label: "Pie",
      data: [10, 20, 30],
      backgroundColor: ["#2563eb", "#6366f1", "#06b6d4"],
    },
  ],
};
const doughnutData = {
  labels: ["A", "B", "C"],
  datasets: [
    {
      label: "Doughnut",
      data: [15, 25, 10],
      backgroundColor: ["#22c55e", "#f59e42", "#ef4444"],
    },
  ],
};
const radarData = {
  labels: ["A", "B", "C"],
  datasets: [
    {
      label: "Radar",
      data: [9, 14, 8],
      backgroundColor: "rgba(99,102,241,0.2)",
      borderColor: "#6366f1",
    },
  ],
};
const polarAreaData = {
  labels: ["A", "B", "C"],
  datasets: [
    {
      label: "Polar",
      data: [11, 16, 6],
      backgroundColor: ["#06b6d4", "#22c55e", "#ef4444"],
    },
  ],
};
const bubbleData = {
  datasets: [
    {
      label: "Bubble",
      data: [
        { x: 10, y: 20, r: 10 },
        { x: 15, y: 10, r: 15 },
      ],
      backgroundColor: "#2563eb",
    },
  ],
};
const scatterData = {
  datasets: [
    {
      label: "Scatter",
      data: [
        { x: 5, y: 7 },
        { x: 10, y: 14 },
      ],
      backgroundColor: "#6366f1",
    },
  ],
};

const Home: React.FC = () => (
  <div className="p-4">
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12} lg={8}>
        <Card title="Bar Chart">
          <BarChart data={barData} />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card title="Line Chart">
          <LineChart data={lineData} />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card title="Pie Chart">
          <PieChart data={pieData} />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card title="Doughnut Chart">
          <DoughnutChart data={doughnutData} />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card title="Radar Chart">
          <RadarChart data={radarData} />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card title="Polar Area Chart">
          <PolarAreaChart data={polarAreaData} />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card title="Bubble Chart">
          <BubbleChart data={bubbleData} />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card title="Scatter Chart">
          <ScatterChart data={scatterData} />
        </Card>
      </Col>
    </Row>
  </div>
);

export default Home;
