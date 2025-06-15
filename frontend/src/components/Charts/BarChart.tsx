import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";

type BarChartProps = BaseChartType & {
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
};

const BarChart: React.FC<BarChartProps> = (props) => {
  const { data, options, title } = props;
  return (
    <div className="h-full w-full">
      <label className="text-center text-lg font-semibold mb-4 text-black">
        {title}
      </label>
      <Bar
        data={data}
        options={{ responsive: true, maintainAspectRatio: false, ...options }}
        updateMode="resize"
      />
    </div>
  );
};

export default BarChart;
