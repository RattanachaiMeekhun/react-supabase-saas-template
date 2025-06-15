import type { ChartLayoutItem } from "../components/Charts/TChartType";
import Dashboard from "../components/Dashboard/Dashboard";

const Home = () => {
  const chartItems: ChartLayoutItem[] = [
    {
      key: "bar",
      title: "Bar Chart",
      chartType: "bar",
      chartData: {
        labels: ["A", "B", "C"],
        datasets: [
          { label: "Bar", data: [12, 19, 3], backgroundColor: "#2563eb" },
        ],
      },
      i: "bar",
      x: 0,
      y: 0,
      w: 2,
      h: 2,
    },
    {
      key: "line",
      title: "Line Chart",
      chartType: "line",
      chartData: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            label: "Line",
            data: [5, 10, 7],
            borderColor: "#6366f1",
            fill: false,
          },
        ],
      },
      i: "line",
      x: 2,
      y: 0,
      w: 2,
      h: 2,
    },
    {
      key: "pie",
      title: "Pie Chart",
      chartType: "pie",
      chartData: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            label: "Pie",
            data: [10, 20, 30],
            backgroundColor: ["#2563eb", "#6366f1", "#06b6d4"],
          },
        ],
      },
      i: "pie",
      x: 4,
      y: 0,
      w: 2,
      h: 2,
    },
    {
      key: "doughnut",
      title: "Doughnut Chart",
      chartType: "doughnut",
      chartData: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            label: "Doughnut",
            data: [15, 25, 10],
            backgroundColor: ["#22c55e", "#f59e42", "#ef4444"],
          },
        ],
      },
      i: "doughnut",
      x: 6,
      y: 0,
      w: 2,
      h: 2,
    },
    {
      key: "radar",
      title: "Radar Chart",
      chartType: "radar",
      chartData: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            label: "Radar",
            data: [9, 14, 8],
            backgroundColor: "rgba(99,102,241,0.2)",
            borderColor: "#6366f1",
          },
        ],
      },
      i: "radar",
      x: 0,
      y: 2,
      w: 2,
      h: 2,
    },
    {
      key: "polarArea",
      title: "Polar Area Chart",
      chartType: "polarArea",
      chartData: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            label: "Polar",
            data: [11, 16, 6],
            backgroundColor: ["#06b6d4", "#22c55e", "#ef4444"],
          },
        ],
      },
      i: "polarArea",
      x: 2,
      y: 2,
      w: 2,
      h: 2,
    },
    {
      key: "bubble",
      title: "Bubble Chart",
      chartType: "bubble",
      chartData: {
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
      },
      i: "bubble",
      x: 4,
      y: 2,
      w: 2,
      h: 2,
    },
    {
      key: "scatter",
      title: "Scatter Chart",
      chartType: "scatter",
      chartData: {
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
      },
      i: "scatter",
      x: 6,
      y: 2,
      w: 2,
      h: 2,
    },
  ];

  return (
    <div className="p-4">
      <Dashboard ChartItem={chartItems} />
    </div>
  );
};

export default Home;
