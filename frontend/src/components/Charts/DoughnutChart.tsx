import { Doughnut } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

type DoughnutChartProps = {
  data: ChartData<"doughnut">;
  options?: ChartOptions<"doughnut">;
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, options }) => (
  <Doughnut data={data} options={options} />
);

export default DoughnutChart;
