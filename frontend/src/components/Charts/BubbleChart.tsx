import { Bubble } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

type BubbleChartProps = {
  data: ChartData<"bubble">;
  options?: ChartOptions<"bubble">;
};

const BubbleChart: React.FC<BubbleChartProps> = ({ data, options }) => (
  <Bubble data={data} options={options} />
);

export default BubbleChart;
