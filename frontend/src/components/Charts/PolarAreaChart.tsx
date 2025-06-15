import { PolarArea } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import type { BaseChartType } from "./TChartType";

type PolarAreaChartProps = BaseChartType & {
  data: ChartData<"polarArea">;
  options?: ChartOptions<"polarArea">;
};

const PolarAreaChart: React.FC<PolarAreaChartProps> = (props) => {
  const { data, options, title } = props;

  return (
    <div className="h-full w-full">
      <label className="text-center text-lg font-semibold mb-4 text-black">
        {title}
      </label>
      <PolarArea
        data={data}
        options={{ responsive: true, maintainAspectRatio: false, ...options }}
      />
    </div>
  );
};
export default PolarAreaChart;
