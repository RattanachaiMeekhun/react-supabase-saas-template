import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";
import ChartDetailDisplay from "./ChartDetailDisplay";

type BarChartProps = BaseChartType & {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
};

const BarChart: React.FC<BarChartProps> = (props) => {
  const { data, options, recommendation } = props;

  return (
    <div className="h-full w-full flex flex-col text-center">
      <ChartDetailDisplay {...props} />
      <div className="flex-1 min-h-0">
        <Bar
          data={data}
          options={{ responsive: true, maintainAspectRatio: false, ...options }}
          updateMode="resize"
        />
      </div>
      {recommendation && (
        <div className="text-xs text-green-600 mt-2">{recommendation}</div>
      )}
    </div>
  );
};

export default BarChart;
