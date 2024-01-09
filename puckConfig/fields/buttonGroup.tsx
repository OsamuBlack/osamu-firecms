// import { Button, ButtonGroup } from "@nextui-org/react";
import IconButton from "@mui/material/IconButton";
import Button, { ButtonProps } from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function ToggleButtonGroup({
  onChange,
  value,
  buttons,
  disabled,
  name,
  size,
}: {
  onChange: (value: string) => void;
  value: string;
  name: string;
  buttons:
    | {
        type: "text";
        label: string;
        value: string;
      }[]
    | {
        type: "icon";
        icon: React.ReactNode;
        value: string;
      }[];
  disabled?: boolean;
  size?: ButtonProps["size"];
}) {
  return (
    <ButtonGroup disabled={disabled}>
      {buttons.map((button) =>
        button.type == "text" ? (
          <Button
            key={button.value}
            size={size}
            onClick={() => onChange(button.value)}
            color={button.value == value && !disabled ? "primary" : "inherit"}
            variant={"contained"}
            aria-label={name}
            disableElevation
            sx={{
              shadow: 0,
            }}
          >
            {button.label}
          </Button>
        ) : (
          <IconButton
            key={button.value}
            size={size}
            onClick={() => onChange(button.value)}
            color={button.value == value && !disabled ? "primary" : "inherit"}
            aria-label={`${name} ${button.value}`}
            disabled={disabled}
          >
            {button.icon}
          </IconButton>
        )
      )}
    </ButtonGroup>
  );
}
