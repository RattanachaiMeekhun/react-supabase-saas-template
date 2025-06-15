import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";

type LineChartProps = BaseChartType & {
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
};

const LineChart: React.FC<LineChartProps> = (props) => {
  const { data, options, title } = props;

  return (
    <div className="h-full w-full">
      <label className="text-center text-lg font-semibold mb-4 text-black">
        {title}
      </label>
      <Line
        data={data}
        options={{ responsive: true, maintainAspectRatio: false, ...options }}
      />
    </div>
  );
};
export default LineChart;
