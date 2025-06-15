import { Bubble } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";

type BubbleChartProps = BaseChartType & {
  data: ChartData<"bubble">;
  options?: ChartOptions<"bubble">;
};

const BubbleChart: React.FC<BubbleChartProps> = (props) => {
  const { data, options, title } = props;

  return (
    <div className="h-full w-full">
      <label className="text-center text-lg font-semibold mb-4 text-black">
        {title}
      </label>
      <Bubble
        data={data}
        options={{ responsive: true, maintainAspectRatio: true, ...options }}
      />
    </div>
  );
};

export default BubbleChart;
