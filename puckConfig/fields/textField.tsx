import TextField, { TextFieldProps } from "@mui/material/TextField";

export default function TextInput({
  name,
  label,
  value,
  onChange,
  disabled,
  type = "text",
  labelPlacement = "inside",
  multiline,
  color,
  description,
  required,
  fullwidth,
  variant,
  placeholder,
}: {
  name: string;
  label?: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  disabled?: boolean;
  type?: TextFieldProps["type"];
  labelPlacement?: "inside" | "outside" | "outside-left";
  color?: TextFieldProps["color"];
  description?: string;
  required?: boolean;
  fullwidth?: boolean;
  variant?: TextFieldProps["variant"];
  placeholder?: string;
}) {
  return (
    <TextField
      placeholder={placeholder}
      type={type}
      label={label}
      name={name}
      value={value}
      disabled={disabled}
      color={color}
      helperText={description}
      multiline={multiline}
      required={required}
      fullWidth={fullwidth}
      variant={variant}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
