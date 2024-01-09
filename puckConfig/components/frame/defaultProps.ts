import DefaultDimensionProps from "../../fields/dimensions/dimensionsDefaultProps";
import DefaultPositionProps from "../../fields/position/positionDefaultProps";
import DefaultBorderProps from "../../fields/border/borderDefaultProps";
import DefaultAutlayoutProps from "../../fields/autoLayout/autoLayoutDefaultProps";
import DefaultBackgroundProps from "../../fields/background/backgroundDefaultProps";

const defaultFrameProps = {
  position: {
    responsive: false,
    props: DefaultPositionProps,
  },
  dimensions: {
    responsive: false,
    props: DefaultDimensionProps,
  },
  clipContent: {
    responsive: false,
    props: false,
  },
  border: {
    responsive: false,
    props: DefaultBorderProps,
  },
  autoLayout: {
    responsive: false,
    props: DefaultAutlayoutProps,
  },
  background: {
    responsive: false,
    props: DefaultBackgroundProps,
  },
};

export default defaultFrameProps;