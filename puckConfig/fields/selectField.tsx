// import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import {
  FormHelperText,
  Select,
  SelectChangeEvent,
  SelectProps,
  TextField,
  TextFieldProps,
  menuItemClasses,
} from "@mui/material";
import { MenuItem } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";

export default function SelectField({
  name,
  label,
  onChange,
  value,
  options,
  multiselect,
  disabled,
  size = "medium",
  required,
  description,
  placeholder,
  variant,
}:
  | {
      name: string;
      label?: string;
      onChange: (value: string | number | boolean) => void;
      value: string | number | boolean;
      multiselect?: false;
      disabled?: boolean;
      size?: SelectProps["size"];
      required?: boolean;
      description?: string;
      options: {
        label: string | number | boolean;
        value: string | number | boolean;
      }[];
      placeholder?: string;
      variant?: TextFieldProps["variant"];
    }
  | {
      name: string;
      label?: string;
      onChange: (value: any) => void;
      value: (string | number | boolean)[];
      multiselect: true;
      disabled?: boolean;
      size?: SelectProps["size"];
      required?: boolean;
      description?: string;
      options: {
        label: string | number | boolean;
        value: string | number | boolean;
      }[];
      placeholder?: string;
      variant?: TextFieldProps["variant"];
    }) {
  if (multiselect) {
    <TextField
      select
      variant={variant}
      label={label}
      name={name}
      required={required}
      helperText={description}
      disabled={disabled}
      value={value}
      onChange={(e) =>
        onChange(
          typeof e.target.value === "string"
            ? e.target.value.split(",")
            : e.target.value
        )
      }
      size={size}
      SelectProps={{
        multiple: true,
      }}
      placeholder={placeholder}
    >
      {options.map((option, index) => (
        <MenuItem
          key={`${option.value}`}
          value={
            typeof option.value == "boolean"
              ? Number(option.value)
              : option.value
          }
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>;
  } else
    return (
      <TextField
        select
        variant={variant}
        label={label}
        name={name}
        required={required}
        helperText={description}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size={size}
        SelectProps={{
          multiple: false,
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={`${option.value}`}
            value={
              typeof option.value == "boolean"
                ? Number(option.value)
                : option.value
            }
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
}
