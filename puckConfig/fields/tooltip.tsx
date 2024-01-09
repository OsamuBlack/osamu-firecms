import { forwardRef } from "react";
import Tooltip from "@mui/material/Tooltip";

const TooltipWrappper = forwardRef(function RefComponent(
  {
    children,
    title,
    placement,
  }: {
    children: React.ReactNode;
    title: string;
    placement: "top" | "bottom" | "left" | "right";
  },
  ref: any
) {
  return (
    <Tooltip title={title} placement={placement}>
      <span ref={ref}>{children}</span>
    </Tooltip>
  );
});

export default TooltipWrappper;