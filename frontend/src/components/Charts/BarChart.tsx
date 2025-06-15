import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

type BarChartProps = {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
};

const BarChart: React.FC<BarChartProps> = ({ data, options }) => (
  <Bar data={data} options={options} />
);

export default BarChart;
