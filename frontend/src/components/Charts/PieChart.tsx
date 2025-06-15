import { Pie } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";

type PieChartProps = BaseChartType & {
  data: ChartData<"pie">;
  options?: ChartOptions<"pie">;
};

const PieChart: React.FC<PieChartProps> = (props) => {
  const { data, options, title } = props;

  return (
    <div className="h-full w-full">
      <label className="text-center text-lg font-semibold mb-4 text-black">
        {title}
      </label>
      <Pie
        data={data}
        options={{ responsive: true, maintainAspectRatio: false, ...options }}
      />
    </div>
  );
};

export default PieChart;
