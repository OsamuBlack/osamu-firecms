import { Variant } from "@mui/material/styles/createTypography";

type TypographyBaseProps = {
  align: "left" | "center" | "right" | "justify";
  fontSize: string;
  fontWeight: string;
  color: string;
};

// Types with responsive support
export type TypographyProps = {
  [key in keyof TypographyBaseProps]:
    | {
        responsive: true;
        props: {
          mobile: TypographyBaseProps[key];
          tablet: TypographyBaseProps[key];
          desktop: TypographyBaseProps[key];
        };
      }
    | {
        responsive: false;
        props: TypographyBaseProps[key];
      };
} & { value: string; element: Variant; fontFamily: string };

export default TypographyProps;