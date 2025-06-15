import { Scatter } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";

type ScatterChartProps = BaseChartType & {
  data: ChartData<"scatter">;
  options?: ChartOptions<"scatter">;
};

const ScatterChart: React.FC<ScatterChartProps> = (props) => {
  const { data, options, title } = props;

  return (
    <div className="h-full w-full">
      <label className="text-center text-lg font-semibold mb-4 text-black">
        {title}
      </label>
      <Scatter
        data={data}
        options={{ responsive: true, maintainAspectRatio: false, ...options }}
      />
    </div>
  );
};
export default ScatterChart;
