import { PolarArea } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

type PolarAreaChartProps = {
  data: ChartData<"polarArea">;
  options?: ChartOptions<"polarArea">;
};

const PolarAreaChart: React.FC<PolarAreaChartProps> = ({ data, options }) => (
  <PolarArea data={data} options={options} />
);

export default PolarAreaChart;
