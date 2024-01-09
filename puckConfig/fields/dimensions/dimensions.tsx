import React from "react";

import Box from "@mui/material/Box";
import { FieldLabel } from "@measured/puck";
import SwitchField from "../switch";
import DimensionsProps from "./dimensionsType";
import DropdownField from "../dropdown";
import TextInput from "../textField";

export default function Dimensions({
  name,
  value,
  onChange,
}: {
  name: string;
  value: DimensionsProps;
  onChange: (v: DimensionsProps) => void;
}) {
  const {
    widthType,
    width,
    heightType,
    height,
    aspect,
    aspectRatio,
  }: DimensionsProps = value;

  return (
    <FieldLabel label={name}>
      <Box display="flex" flexDirection={"column"} gap={1}>
        <Box display="flex" gap={1}>
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={"0"}
            alignItems="stretch"
            gap={1}
          >
            <TextInput
              name="Width"
              label="W"
              value={width}
              onChange={(v) =>
                onChange({
                  ...value,
                  width: v,
                })
              }
              disabled={
                widthType === "fillContainer" || widthType === "hugContents"
              }
            />
            <DropdownField
              name="Width Type"
              value={widthType}
              options={[
                { value: "fillContainer", label: "Fill container" },
                { value: "fixed", label: "Fixed" },
                { value: "hugContents", label: "Hug contents" },
              ]}
              onChange={(v) =>
                onChange({
                  ...value,
                  widthType: v as "fillContainer" | "fixed" | "hugContents",
                })
              }
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            flexGrow={"0"}
            alignItems="stretch"
            gap={1}
          >
            <TextInput
              name="Height"
              label="H"
              value={height}
              onChange={(v) =>
                onChange({
                  ...value,
                  height: v,
                })
              }
              disabled={
                heightType === "fillContainer" || heightType === "hugContents"
              }
            />
            <DropdownField
              name="Height Type"
              value={heightType}
              options={[
                { value: "fillContainer", label: "Fill container" },
                { value: "fixed", label: "Fixed" },
                { value: "hugContents", label: "Hug contents" },
              ]}
              onChange={(selectedOption) =>
                onChange({
                  ...value,
                  heightType: selectedOption as
                    | "fillContainer"
                    | "fixed"
                    | "hugContents",
                })
              }
            />
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="end"
          justifyContent={"space-between"}
          gap={1}
        >
          <SwitchField
            name="Aspect Ratio"
            value={aspect}
            onChange={(v) =>
              onChange({
                ...value,
                aspect: v,
              })
            }
          />
          {aspect ? (
            <TextInput
              name="Aspect Ratio"
              value={aspectRatio}
              onChange={(v) =>
                onChange({
                  ...value,
                  aspectRatio: v,
                })
              }
            />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </FieldLabel>
  );
}
