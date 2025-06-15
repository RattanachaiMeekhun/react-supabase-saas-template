import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

type LineChartProps = {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
};

const LineChart: React.FC<LineChartProps> = ({ data, options }) => (
  <Line data={data} options={options} />
);

export default LineChart;
