import React from "react";
import { FieldLabel } from "@measured/puck";
import Sketch from "@uiw/react-color-sketch";

export default function ColorPicker({
  name,
  onChange,
  value,
}: {
  name: string;
  onChange: any;
  value: string;
}) {
  return (
    <FieldLabel label={name}>
      <Sketch
        color={value}
        defaultValue={"#000"}
        onChange={(color) => {
          onChange(
            `rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, ${color.rgba.a})`
          );
        }}
        presetColors={["#000", "#fff", "#0b8a8b", "#ededed"]}
      />
    </FieldLabel>
  );
}
