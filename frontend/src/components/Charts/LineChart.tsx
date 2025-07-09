import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import ChartDetailDisplay from "./ChartDetailDisplay";

type LineChartProps = BaseChartType & {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
};

const LineChart: React.FC<LineChartProps> = (props) => {
  const { data, options } = props;

  return (
    <div className="h-full w-full flex flex-col text-center">
      <ChartDetailDisplay {...props} />
      <div className="h-full w-full flex items-center justify-center overflow-hidden">

      <Line
        data={data}
        options={{ responsive: true, maintainAspectRatio: false, ...options  }}
        updateMode="resize"
      />
      </div>
    </div>
  );
};
export default LineChart;
