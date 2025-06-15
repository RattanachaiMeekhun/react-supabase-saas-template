import { Scatter } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

type ScatterChartProps = {
  data: ChartData<"scatter">;
  options?: ChartOptions<"scatter">;
};

const ScatterChart: React.FC<ScatterChartProps> = ({ data, options }) => (
  <Scatter data={data} options={options} />
);

export default ScatterChart;
