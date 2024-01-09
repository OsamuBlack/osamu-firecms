import { ComponentConfig, DropZone } from "@measured/puck";
import RevealOnScroll from "./revealOnScroll";

export type AnimateProps = {
  type: "revealOnScroll";
  animation: "fadeIn";
};

const AnimateComponent: ComponentConfig<AnimateProps> = {
  fields: {
    type: {
      type: "text",
    },
    animation: {
      type: "text",
    },
  },
  defaultProps: {
    type: "revealOnScroll",
    animation: "fadeIn",
  },
  render: ({ type, animation }) => {
    if (type === "revealOnScroll") {
      return (
        <RevealOnScroll>
          <DropZone zone="animate" />
        </RevealOnScroll>
      );
    } else {
      return (
        <div className="">
          <DropZone zone="animate" />
        </div>
      );
    }
  },
};
export default AnimateComponent;
