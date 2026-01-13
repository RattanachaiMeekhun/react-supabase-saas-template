import { renderChartItem } from "../../helper/dashboardHelper";
import type { ChartLayoutItem } from "../Charts/TChartType";
import "./ChartItem.css";

const ChartItemCard = (item: ChartLayoutItem) => {
  return (
    <>
      <div className="drag-handle" />
      <div className="chart-card-container">{renderChartItem(item)}</div>
    </>
  );
};

export default ChartItemCard;
