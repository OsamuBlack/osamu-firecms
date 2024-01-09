type PositionProps = {
  positionType: "relative" | "absolute" | "static" | "fixed";
  xAxis: string;
  xAxisConstraints: "left" | "right";
  yAxis: string;
  yAxisConstraints: "top" | "bottom";
};

export default PositionProps;
