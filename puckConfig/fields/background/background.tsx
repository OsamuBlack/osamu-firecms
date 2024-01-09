import React from "react";

import Box from "@mui/material/Box";
import ColorPicker from "../colorPicker";
import SliderField from "../slider";
import SwitchField from "../switch";
import TextInput from "../textField";
import ToggleButtonGroup from "../buttonGroup";

export default function Background({
  value,
  onChange,
}: {
  value:
    | {
        type: "color";
        value: string;
        lazyLoad: boolean;
      }
    | {
        type: "image";
        value: {
          url: string;
          isValid: boolean | "error";
          sizes: string;
          lazyLoad: boolean;
          opacity: number;
        };
      };
  onChange: (
    value:
      | {
          type: "color";
          value: string;
        }
      | {
          type: "image";
          value: {
            url: string;
            isValid: boolean | "error";
            sizes: string;
            lazyLoad: boolean;
            opacity: number;
          };
        }
  ) => void;
}) {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <ToggleButtonGroup
        name="Type"
        value={value.type}
        onChange={(newAlignment) => {
          if (newAlignment == "color") {
            onChange({
              type: newAlignment,
              value: "rgba(0,0,0,0)",
            });
          } else {
            onChange({
              type: newAlignment as "image",
              value: {
                url: "",
                isValid: false,
                lazyLoad: true,
                sizes: "100vw",
                opacity: 1,
              },
            });
          }
        }}
        size="small"
        aria-label="text alignment"
        buttons={[
          {
            type: "text",
            label: "Color",
            value: "color",
          },
          {
            type: "text",
            label: "Image",
            value: "image",
          },
        ]}
      />
      {value.type === "color" ? (
        <ColorPicker
          value={value.value}
          onChange={(v: string) => onChange({ ...value, value: v })}
          name={"Color"}
        />
      ) : (
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <TextInput
            type="text"
            name="URL"
            value={value.value.url}
            onChange={(v) =>
              onChange({
                ...value,
                value: {
                  ...value.value,
                  url: v,
                },
              })
            }
            color={value.value.isValid === "error" ? "error" : "primary"}
          />
          <TextInput
            type="text"
            name="Sizes"
            value={value.value.sizes}
            onChange={(v) =>
              onChange({
                ...value,
                value: {
                  ...value.value,
                  sizes: v,
                },
              })
            }
          />
          <SwitchField
            label="Lazy Load"
            name={"lazyLoad"}
            value={value.value.lazyLoad}
            onChange={(v) =>
              onChange({
                ...value,
                value: {
                  ...value.value,
                  lazyLoad: v,
                },
              })
            }
          />
          <SliderField
            name="opacity"
            minValue={0}
            maxValue={1}
            step={0.1}
            label="Opacity"
            value={value.value.opacity}
            onChange={(v) => {
              onChange({
                ...value,
                value: {
                  ...value.value,
                  opacity: v,
                },
              });
            }}
          />
        </Box>
      )}
    </Box>
  );
}
