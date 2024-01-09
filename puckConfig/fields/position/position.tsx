import React from "react";

import Box from "@mui/material/Box";
import { FieldLabel } from "@measured/puck";
import PositionProps from "./positionType";
import TextInput from "../textField";
import DropdownField from "../dropdown";

export default function Position({
  name,
  value,
  onChange,
}: {
  name: string;
  value: PositionProps;
  onChange: (value: PositionProps) => void;
}) {
  const {
    xAxis,
    xAxisConstraints,
    yAxis,
    yAxisConstraints,
    positionType,
  }: PositionProps = value;
  return (
    <Box display="flex" flexDirection={"column"} gap={1}>
      {name ? <FieldLabel label={name}></FieldLabel> : ""}
      <DropdownField
        value={positionType}
        name="Position"
        onChange={(v) =>
          onChange({
            ...value,
            positionType: v as "static" | "relative" | "absolute" | "fixed",
          })
        }
        options={[
          { value: "static", label: "Static" },
          { value: "relative", label: "Relative" },
          { value: "absolute", label: "Absolute" },
          { value: "fixed", label: "Fixed" },
        ]}
      />
      <Box
        flexDirection="column"
        flexGrow={"0"}
        alignItems="stretch"
        gap={1}
        display={
          positionType == undefined || positionType === "static"
            ? "none"
            : "flex"
        }
      >
        <div className="flex gap-2">
          <TextInput
            name="X Axis"
            label="X"
            labelPlacement="outside-left"
            value={xAxis}
            onChange={(v) =>
              onChange({
                ...value,
                xAxis: v,
              })
            }
            disabled={positionType === "static"}
          />
          <DropdownField
            name="Constraints"
            value={xAxisConstraints}
            onChange={(v) =>
              onChange({
                ...value,
                xAxisConstraints: v as "left" | "right",
              })
            }
            disabled={positionType === "static"}
            options={[
              { value: "left", label: "Left" },
              { value: "right", label: "Right" },
            ]}
          />
        </div>
        <div className="flex gap-2">
          <TextInput
            name="Y Axis"
            label="Y"
            labelPlacement="outside-left"
            value={yAxis}
            onChange={(v) =>
              onChange({
                ...value,
                yAxis: v,
              })
            }
            disabled={positionType === "static"}
          />
          <DropdownField
            name="Constraints"
            value={yAxisConstraints}
            onChange={(v) =>
              onChange({
                ...value,
                yAxisConstraints: v as "top" | "bottom",
              })
            }
            disabled={positionType === "static"}
            options={[
              { value: "top", label: "Top" },
              { value: "bottom", label: "Bottom" },
            ]}
          />
        </div>
      </Box>
    </Box>
  );
}
