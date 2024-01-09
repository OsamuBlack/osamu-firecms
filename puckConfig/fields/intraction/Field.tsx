import { FieldLabel } from "@measured/puck";
import Box from "@mui/material/Box";
import intractionProps from "./type";
import SwitchField from "../switch";
import SelectField from "../selectField";
import TextInput from "../textField";
import ToggleButtonGroup from "../buttonGroup";

export default function Intraction({
  name,
  value,
  onChange,
}: {
  name: string;
  value: intractionProps;
  onChange: (v: intractionProps) => void;
}) {
  const { onClick, onHover }: intractionProps = value || {
    onClick: false,
    onHover: false,
  };

  function handleOnClickTypeChange(v: string) {
    if (v == "openPopup") {
      onChange({
        ...value,
        onClickAction: {
          type: v,
          placement: "top",
        },
      });
    } else if (v == "navigateTo" || v == "openLink") {
      onChange({
        ...value,
        onClickAction: {
          type: v,
          value: "",
        },
      });
    } else if (v == "signIn" || v == "signOut")
      onChange({
        ...value,
        onClickAction: {
          type: v,
        },
      });
  }
  return (
    <FieldLabel label={name}>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Box display={"flex"} gap={1}>
          <SwitchField
            name={"On Click"}
            value={onClick}
            onChange={(v) => onChange({ ...value, onClick: v })}
          />
        </Box>
        {onClick ? (
          <SelectField
            name={"Action"}
            value={value.onClickAction?.type || ""}
            options={[
              { value: "openPopup", label: "Open Modal" },
              { value: "navigateTo", label: "Navigate To" },
              { value: "openLink", label: "Open Link" },
              { value: "signIn", label: "Sign In" },
              { value: "signOut", label: "Sign Out" },
            ]}
            onChange={(v) => handleOnClickTypeChange(`${v}`)}
          />
        ) : (
          ""
        )}
        {onClick &&
        (value.onClickAction?.type == "navigateTo" ||
          value.onClickAction?.type == "openLink") ? (
          <TextInput
            name={"Value"}
            value={value.onClickAction?.value}
            onChange={(v) =>
              onChange({
                ...value,
                onClickAction:
                  value.onClickAction?.type != "openPopup"
                    ? {
                        type: value.onClickAction?.type || "navigateTo",
                        value: v,
                      }
                    : {
                        type: value.onClickAction?.type,
                        placement: value.onClickAction?.placement || "top",
                      },
              })
            }
          />
        ) : (
          ""
        )}
        <Box display={"flex"} gap={1}>
          <SwitchField
            name={"On Hover"}
            value={onHover}
            onChange={(v) => onChange({ ...value, onHover: v })}
          />
        </Box>
        {onHover ? (
          <SelectField
            name={"Action"}
            value={value.onHoverAction?.type || ""}
            options={[
              { value: "openPopup", label: "Open Modal" },
              { value: "tooltip", label: "Show Tooltip" },
            ]}
            onChange={(v) =>
              onChange({
                ...value,
                onHoverAction:
                  v === "openPopup"
                    ? {
                        type: v,
                        placement: value.onHoverAction?.placement || "top",
                      }
                    : {
                        type: "tooltip",
                        value: "",
                        placement: value.onHoverAction?.placement || "top",
                      },
              })
            }
          />
        ) : (
          ""
        )}
        {onHover && value.onHoverAction?.type == "tooltip" ? (
          <TextInput
            name={"Value"}
            value={value.onHoverAction?.value}
            onChange={(v) =>
              onChange({
                ...value,
                onHoverAction: {
                  type: value.onHoverAction?.type || "tooltip",
                  value: v,
                  placement: value.onHoverAction?.placement || "top",
                },
              })
            }
          />
        ) : (
          ""
        )}
        {onClick && value.onClickAction?.type == "openPopup" ? (
          // <ToggleButtonGroup
          //   value={value.onClickAction?.placement || "top"}
          //   exclusive
          //   size="small"
          //   onChange={(e, v) =>
          //     onChange({
          //       ...value,
          //       onClickAction:
          //         (value.onClickAction?.type == "openPopup" && {
          //           type: value.onClickAction?.type,
          //           placement: v,
          //         }) ||
          //         undefined,
          //     })
          //   }
          // >
          //   <ToggleButton value="top">Top</ToggleButton>
          //   <ToggleButton value="right">Right</ToggleButton>
          //   <ToggleButton value="bottom">Bottom</ToggleButton>
          //   <ToggleButton value="left">Left</ToggleButton>
          // </ToggleButtonGroup>
          <ToggleButtonGroup
            name="Placement"
            value={value.onClickAction?.placement || "top"}
            onChange={(v) =>
              onChange({
                ...value,
                onClickAction:
                  (value.onClickAction?.type == "openPopup" && {
                    type: value.onClickAction?.type,
                    placement: v as "top" | "right" | "bottom" | "left",
                  }) ||
                  undefined,
              })
            }
            buttons={[
              {
                type: "text",
                label: "Top",
                value: "top",
              },
              {
                type: "text",
                label: "Right",
                value: "right",
              },
              {
                type: "text",
                label: "Bottom",
                value: "bottom",
              },
              {
                type: "text",
                label: "Left",
                value: "left",
              },
            ]}
          />
        ) : (
          ""
        )}
        {onHover ? (
          <ToggleButtonGroup
            name="Placement"
            value={value.onHoverAction?.placement || "top"}
            onChange={(v) =>
              onChange({
                ...value,
                onHoverAction: value.onHoverAction
                  ? value.onHoverAction.type == "tooltip"
                    ? {
                        type: value.onHoverAction?.type,
                        value: value.onHoverAction?.value,
                        placement: v as "top" | "right" | "bottom" | "left",
                      }
                    : {
                        type: value.onHoverAction?.type,
                        placement: v as "top" | "right" | "bottom" | "left",
                      }
                  : undefined,
              })
            }
            buttons={[
              {
                type: "text",
                label: "Top",
                value: "top",
              },
              {
                type: "text",
                label: "Right",
                value: "right",
              },
              {
                type: "text",
                label: "Bottom",
                value: "bottom",
              },
              {
                type: "text",
                label: "Left",
                value: "left",
              },
            ]}
          />
        ) : (
          // <ToggleButtonGroup
          //   value={value.onHoverAction?.placement || "top"}
          //   exclusive
          //   size="small"
          //   onChange={(e, v) =>
          //     onChange({
          //       ...value,
          //       onHoverAction: value.onHoverAction
          //         ? value.onHoverAction.type == "tooltip"
          //           ? {
          //               type: value.onHoverAction?.type,
          //               value: value.onHoverAction?.value,
          //               placement: v,
          //             }
          //           : {
          //               type: value.onHoverAction?.type,
          //               placement: v,
          //             }
          //         : undefined,
          //     })
          //   }
          // >
          //   <ToggleButton value="top">Top</ToggleButton>
          //   <ToggleButton value="right">Right</ToggleButton>
          //   <ToggleButton value="bottom">Bottom</ToggleButton>
          //   <ToggleButton value="left">Left</ToggleButton>
          // </ToggleButtonGroup>
          ""
        )}
      </Box>
    </FieldLabel>
  );
}
