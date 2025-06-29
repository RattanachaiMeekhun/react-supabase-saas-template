import { Scatter } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import ChartDetailDisplay from "./ChartDetailDisplay";

type ScatterChartProps = BaseChartType & {
  data: ChartData<"scatter">;
  options?: ChartOptions<"scatter">;
};

const ScatterChart: React.FC<ScatterChartProps> = (props) => {
  const { data, options } = props;

  return (
    <div className="h-full w-full flex flex-col text-center">
      <ChartDetailDisplay {...props} />
      <div className="h-full w-full flex items-center justify-center overflow-hidden p-4">
        <Scatter
          data={data}
          options={{ responsive: true, maintainAspectRatio: false, ...options }}
        />
      </div>
    </div>
  );
};
export default ScatterChart;
