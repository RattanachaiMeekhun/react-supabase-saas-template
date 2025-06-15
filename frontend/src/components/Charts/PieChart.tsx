import { Pie } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

type PieChartProps = {
  data: ChartData<"pie">;
  options?: ChartOptions<"pie">;
};

const PieChart: React.FC<PieChartProps> = ({ data, options }) => (
  <Pie data={data} options={options} />
);

export default PieChart;
