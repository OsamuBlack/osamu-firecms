import React from "react";

import Box from "@mui/material/Box";
import SwitchField from "../switch";
import BorderProps from "./borderType";
import TextInput from "../textField";

export default function Border({
  value,
  onChange,
}: {
  value: BorderProps;
  onChange: (v: BorderProps) => void;
}) {
  const { radius, thickness, color }: BorderProps = value;

  const setAllBorders = (v: string) => {
    onChange({
      ...value,
      radius: typeof radius == "string" ? v : { tl: v, tr: v, br: v, bl: v },
    });
  };

  const setIndividualBorders = (v: boolean) => {
    onChange({
      ...value,
      radius:
        typeof radius == "string"
          ? { tl: radius, tr: radius, br: radius, bl: radius }
          : radius.tl,
    });
  };

  if (typeof radius != "string") {
    return (
      <Box display="flex" flexDirection={"column"} gap={2}>
        <SwitchField
          name={"Set Collectively"}
          value={typeof radius != "string"}
          onChange={setIndividualBorders}
        />
        <Box display="flex" gap={1}>
          <TextInput
            type="text"
            name="Top Left"
            value={radius.tl}
            onChange={(v) =>
              onChange({
                ...value,
                radius: { ...radius, tl: v },
              })
            }
          />
          <TextInput
            type="text"
            name="Top Right"
            value={radius.tr}
            onChange={(v) =>
              onChange({
                ...value,
                radius: { ...radius, tr: v },
              })
            }
          />
        </Box>
        <Box display={"flex"} gap={1}>
          <TextInput
            type="text"
            name="Bottom Left"
            value={radius.bl}
            onChange={(v) =>
              onChange({
                ...value,
                radius: { ...radius, bl: v },
              })
            }
          />
          <TextInput
            type="text"
            name="Bottom Right"
            value={radius.br}
            onChange={(v) =>
              onChange({
                ...value,
                radius: { ...radius, br: v },
              })
            }
          />
        </Box>
      </Box>
    );
  }
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <SwitchField
        name={"Set Individual"}
        value={typeof radius != "string"}
        onChange={setIndividualBorders}
      />
      <TextInput
        type="text"
        name="Border Radius"
        value={radius}
        onChange={(v) => setAllBorders(v)}
      />
    </Box>
  );
}
