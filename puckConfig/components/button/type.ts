import intractionProps from "../../fields/intraction/type";
import * as MdIcons from "react-icons/md"


type ButtonProps = {
  size: "small" | "medium" | "large";
  variant: "text" | "outlined" | "contained";
  color: "inherit" | "primary" | "secondary" | "success" | "error";
  text: string;
  href?: string;
  startingIcon?: keyof typeof MdIcons;
  endingIcon?: keyof typeof MdIcons;
  interaction: intractionProps
};

export default ButtonProps;