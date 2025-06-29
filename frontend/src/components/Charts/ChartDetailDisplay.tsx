import React from "react";
import type { BaseChartType } from "./TChartType";

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
    <div className="mb-2">
      {title && (
        <div className="font-bold text-gray-700 text-base mb-1">{title}</div>
      )}
      {insight && <div className="text-xs text-blue-600 mb-1">{insight}</div>}
      {description && (
        <div className="text-xs text-gray-400 mb-2">{description}</div>
      )}
      {recommendation && (
        <div className="text-xs text-green-600 mt-1">{recommendation}</div>
      )}
    </div>
  );
};

export default ChartDetailDisplay;
