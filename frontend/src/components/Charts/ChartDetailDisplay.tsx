import React from "react";
import type { BaseChartType } from "./TChartType";
import "./Charts.css";

type ChartDetailDisplayProps = Pick<
  BaseChartType,
  "title" | "description" | "insight" | "recommendation"
>;

const ChartDetailDisplay: React.FC<ChartDetailDisplayProps> = ({
  title,
  description,
  insight,
  recommendation,
}) => {
  return (
    <div className="chart-detail-container">
      {title && <div className="chart-title">{title}</div>}
      {insight && <div className="chart-insight">{insight}</div>}
      {description && <div className="chart-description">{description}</div>}
      {recommendation && (
        <div className="chart-recommendation">{recommendation}</div>
      )}
    </div>
  );
};

export default ChartDetailDisplay;
