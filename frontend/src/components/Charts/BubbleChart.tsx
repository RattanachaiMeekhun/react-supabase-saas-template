import { Bubble } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import ChartDetailDisplay from "./ChartDetailDisplay";

type BubbleChartProps = BaseChartType & {
  data: ChartData<"bubble">;
  options?: ChartOptions<"bubble">;
};

const BubbleChart: React.FC<BubbleChartProps> = (props) => {
  const { data, options } = props;

  return (
    <div className="h-full w-full flex flex-col text-center items-center justify-center">
      <ChartDetailDisplay {...props} />
      <div className="h-full w-full flex items-center justify-center overflow-hidden">
        <Bubble
          data={data}
          options={{ responsive: true, maintainAspectRatio: false, ...options }}
        />
      </div>
    </div>
  );
};

export default BubbleChart;
