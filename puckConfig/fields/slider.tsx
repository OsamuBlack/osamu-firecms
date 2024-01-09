import { Slider, Typography } from "@mui/material";

export default function SliderField({
  name,
  onChange,
  value,
  minValue,
  maxValue,
  step,
  label,
}: {
  name: string;
  onChange: (value: number) => void;
  value: number;
  minValue: number;
  maxValue: number;
  step?: number;
  label?: string;
}) {
  return (
    <>
      {label ? <Typography>{label}</Typography> : ""}
      <Slider
        value={value}
        name={name}
        step={step || 1}
        min={minValue}
        valueLabelDisplay="auto"
        max={maxValue}
        marks={true}
        onChange={(e, value) => onChange(value as number)}
      />
    </>
  );
}
