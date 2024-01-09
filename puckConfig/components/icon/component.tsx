import { ComponentConfig, DropZone } from "@measured/puck";
import { createElement } from "react";
import * as MaterialDesign from "react-icons/md";
import IconProps from "./type";
import defaultIconProps from "./defaultProps";
import InteractionRender from "../../fields/intraction/render";

const IconComponent: ComponentConfig<IconProps> = {
  fields: {
    size: {
      type: "text",
    },
    color: {
      type: "text",
    },
    ariaLabel: {
      type: "text",
    },
    icon: {
      type: "text",
    },
    interaction: {
      type: "text",
    },
  },
  defaultProps: defaultIconProps,
  render: ({ size, color, icon, interaction }) => {
    if (interaction && (interaction.onClick || interaction.onHover)) {
      return (
        <InteractionRender
          interaction={interaction}
          popperChildren={<DropZone zone="interaction" />}
        >
          <button
            aria-label={`${icon?.replace("Md", "")} Icon `}
            style={{
              display: "block",
              background: "none",
              border: "none",
              fontSize: size,
              color: color,
              padding: 0,
            }}
          >
            {icon && MaterialDesign[icon as keyof typeof MaterialDesign]
              ? createElement(
                  MaterialDesign[icon as keyof typeof MaterialDesign]
                )
              : createElement(MaterialDesign["MdClose"])}
          </button>
        </InteractionRender>
      );
    }
    return (
      <span style={{ fontSize: size, color: color }}>
        {icon && MaterialDesign[icon as keyof typeof MaterialDesign]
          ? createElement(MaterialDesign[icon as keyof typeof MaterialDesign])
          : createElement(MaterialDesign["MdClose"])}
      </span>
    );
  },
};
export default IconComponent;
