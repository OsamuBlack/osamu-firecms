import AutoLayoutProps from "../../fields/autoLayout/autoLayoutType";
import BackgroundProps from "../../fields/background/backgroundType";
import BorderProps from "../../fields/border/borderType";
import DimensionsProps from "../../fields/dimensions/dimensionsType";
import PositionProps from "../../fields/position/positionType";

type FrameBaseProps = {
  position: PositionProps;
  dimensions: DimensionsProps;
  clipContent: boolean;
  autoLayout: AutoLayoutProps;
  border: BorderProps;
  background: BackgroundProps;
};

type FrameProps = {
  [key in keyof FrameBaseProps]?:
    | {
        responsive: true;
        props: {
          mobile: FrameBaseProps[key];
          tablet: FrameBaseProps[key];
          desktop: FrameBaseProps[key];
        };
      }
    | {
        responsive: false;
        props: FrameBaseProps[key];
      };
};

export default FrameProps;
