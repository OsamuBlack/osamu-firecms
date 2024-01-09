import { FormControlLabel, Switch, SwitchProps } from "@mui/material";

export default function SwitchField({
  name,
  onChange,
  value,
  size,
  label,
  required
}: {
  name: string;
  onChange: (value: boolean) => void;
  value: boolean;
  size?: SwitchProps["size"];
  label?: string;
  required?: boolean;
}) {
  return (
    <FormControlLabel
      control={
        <Switch
          size={size}
          color="primary"
          onChange={(e, value) => onChange(value)}
          checked={!!value}
          name={name}
          required={required}
        ></Switch>
      }
      label={label}
    />
  );
}
