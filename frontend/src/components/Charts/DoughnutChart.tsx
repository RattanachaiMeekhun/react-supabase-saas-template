import { Doughnut } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";

type DoughnutChartProps = BaseChartType & {
  data: ChartData<"doughnut">;
  options?: ChartOptions<"doughnut">;
};

const DoughnutChart: React.FC<DoughnutChartProps> = (props) => {
  const { data, options, title } = props;

  return (
    <div className="h-full w-full">
      <label className="text-center text-lg font-semibold mb-4 text-black">
        {title}
      </label>
      <Doughnut
        data={data}
        options={{ responsive: true, maintainAspectRatio: false, ...options }}
      />
    </div>
  );
};

export default DoughnutChart;
