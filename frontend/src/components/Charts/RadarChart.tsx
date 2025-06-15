import { Radar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

type RadarChartProps = {
  data: ChartData<"radar">;
  options?: ChartOptions<"radar">;
};

const RadarChart: React.FC<RadarChartProps> = ({ data, options }) => (
  <Radar data={data} options={options} />
);

export default RadarChart;
