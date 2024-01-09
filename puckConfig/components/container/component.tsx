import Container from "@mui/material/Container";
import { ComponentConfig, DropZone } from "@measured/puck";
import ContainerProps from "./type";

const ContainerComponent: ComponentConfig<ContainerProps> = {
  fields: {
    maxWidth: {
      type: "text",
    },
    fixed: {
      type: "text",
    },
    padding: {
      type: "text",
    },
    backgroundColor: {
      type: "text",
    },
    backgroundImage: {
      type: "text",
    },
  },
  defaultProps: {
    maxWidth: "lg",
    fixed: false,
    backgroundColor: "rgba(0,0,0,0)",
    backgroundImage: "",
    padding: true,
  },
  render: ({
    maxWidth,
    padding,
    fixed,
    backgroundColor,
    backgroundImage,
    puck: { renderDropZone },
  }) => {
    return (
      <Container
        maxWidth={maxWidth}
        disableGutters={!padding}
        sx={{ backgroundColor: backgroundColor, position: "relative" }}
        fixed={fixed}
      >
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt={"Container Background Image"}
            style={{
              position: "absolute",
              inset: 0,
              objectFit: "cover",
            }}
            sizes={
              maxWidth
                ? {
                    xs: "300px",
                    sm: "600px",
                    md: "900px",
                    lg: "1024px",
                    xl: "1200px",
                    xxl: "1586px",
                  }[maxWidth]
                : "100vw"
            }
          />
        )}
        <DropZone zone="Container" />
      </Container>
    );
  },
};
export default ContainerComponent;
