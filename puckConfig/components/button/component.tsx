import { ComponentConfig, DropZone } from "@measured/puck";
import Button from "@mui/material/Button";
import { createElement } from "react";
import * as MaterialDesign from "react-icons/md";

import ButtonProps from "./type";
import defaultButtonProps from "./defaultProps";
import InteractionRender from "../../fields/intraction/render";

const ButtonComponent: ComponentConfig<ButtonProps> = {
  fields: {
    size: {
      type: "radio",
      label: "Size",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    variant: {
      type: "radio",
      label: "Variant",
      options: [
        { label: "Text", value: "text" },
        { label: "Outlined", value: "outlined" },
        { label: "Contained", value: "contained" },
      ],
    },
    color: {
      type: "select",
      label: "Color",
      options: [
        { label: "Inherit", value: "inherit" },
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Success", value: "success" },
        { label: "Error", value: "error" },
      ],
    },
    text: {
      type: "text",
      label: "Text",
    },
    href: {
      type: "text",
      label: "Link",
    },
    startingIcon: {
      type: "text",
      label: "Starting Icon (MdIcon)",
    },
    endingIcon: {
      type: "text",
      label: "Ending Icon (MdIcon)",
    },
    interaction: {
      type: "text",
      label: "Interaction",
    },
  },
  defaultProps: defaultButtonProps as ButtonProps,
  render: ({
    size,
    variant,
    color,
    text,
    href,
    startingIcon,
    endingIcon,
    interaction,
  }) => {
    return (
      <InteractionRender
        interaction={interaction}
        popperChildren={<DropZone zone="Interaction" />}
      >
        <Button
          size={size}
          variant={variant}
          color={color}
          href={href}
          startIcon={
            startingIcon && MaterialDesign[startingIcon]
              ? createElement(MaterialDesign[startingIcon])
              : null
          }
          endIcon={
            endingIcon && MaterialDesign[endingIcon]
              ? createElement(MaterialDesign[endingIcon])
              : null
          }
        >
          {text}
        </Button>
      </InteractionRender>
    );
  },
};

export default ButtonComponent;
