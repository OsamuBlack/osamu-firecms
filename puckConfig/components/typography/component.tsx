import { ComponentConfig } from "@measured/puck";
import Typography from "@mui/material/Typography";
import TypographyProps from "./type";

const TypographyComponent: ComponentConfig<TypographyProps> = {
  fields: {
    value: {
      type: "text",
    },
    align: {
      type: "text",
    },
    element: {
      type: "text",
    },
    fontSize: {
      type: "text",
    },
    fontWeight: {
      type: "text",
    },
    fontFamily: {
      type: "text",
    },
    color: {
      type: "text",
    },
  },
  defaultProps: {
    element: "body1",
    value: "",
    align: {
      responsive: false,
      props: "left",
    },
    fontWeight: {
      responsive: false,
      props: "400",
    },
    fontFamily: "var(--font-raleway), sans-serif",
    color: {
      responsive: false,
      props: "#000",
    },
    fontSize: {
      responsive: false,
      props: "auto",
    },
  },
  render: ({
    element,
    value,
    fontSize,
    fontWeight,
    fontFamily,
    color,
    align,
  }) => {
    return (
      <Typography
        variant={element}
        sx={{
          textAlign:
            align.responsive == true
              ? {
                  xs: align.props.mobile,
                  md: align.props.tablet,
                  lg: align.props.desktop,
                }
              : align.props,
          color:
            color.responsive == true
              ? {
                  xs: color.props.mobile,
                  md: color.props.tablet,
                  lg: color.props.desktop,
                }
              : color.props,
          fontSize:
            fontSize.responsive == true
              ? {
                  xs: fontSize.props.mobile,
                  md: fontSize.props.tablet,
                  lg: fontSize.props.desktop,
                }
              : fontSize.props,
          fontWeight:
            fontWeight.responsive == true
              ? {
                  xs: fontWeight.props.mobile,
                  md: fontWeight.props.tablet,
                  lg: fontWeight.props.desktop,
                }
              : fontWeight.props,
          fontFamily: fontFamily,
        }}
      >
        {value || "Lorem ipsum dolor, sit amet consectetur adipisicing elit. "}
      </Typography>
    );
  },
};

export default TypographyComponent;