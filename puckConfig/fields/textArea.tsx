import TextField, { TextFieldProps } from "@mui/material/TextField";

export default function TextArea({
  name,
  label,
  value,
  onChange,
  disabled,
  type = "text",
  labelPlacement = "inside",
  color,
  description,
}: {
  name: string;
  label?: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  type?: "text" | "password" | "email" | "number";
  labelPlacement?: "inside" | "outside" | "outside-left";
  color?: TextFieldProps["color"];
  description?: string;
}) {
  return (
    <TextField
      type={type}
      label={label}
      name={name}
      value={value}
      disabled={disabled}
      color={color}
      helperText={description}
      multiline={true}
      minRows={3}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
