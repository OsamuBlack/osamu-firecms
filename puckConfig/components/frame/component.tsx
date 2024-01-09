import React from "react";
import { ComponentConfig, DropZone } from "@measured/puck";

import Box from "@mui/material/Box";
import FrameProps from "./type";
import defaultFrameProps from "./defaultProps";

const ClientFrameComponent: ComponentConfig<FrameProps> = {
  fields: {
    position: {
      type: "text",
    },
    dimensions: {
      type: "text",
    },
    clipContent: {
      type: "text",
    },
    border: {
      type: "text",
    },
    autoLayout: {
      type: "text",
    },
    background: {
      type: "text",
    },
  },
  defaultProps: defaultFrameProps as FrameProps,
  render: ({
    position,
    dimensions,
    clipContent,
    border,
    autoLayout,
    background,
  }) => {
    return (
      <Box
        position={
          position?.responsive == true
            ? {
                xs: position?.props.mobile.positionType,
                md: position?.props.tablet.positionType,
                lg: position?.props.desktop.positionType,
              }
            : position?.props.positionType
        }
        top={
          position?.responsive == true
            ? {
                xs:
                  position?.props.mobile.yAxisConstraints == "top"
                    ? position?.props.mobile.yAxis
                    : "auto",
                md:
                  position?.props.tablet.yAxisConstraints == "top"
                    ? position?.props.tablet.yAxis
                    : "auto",
                lg:
                  position?.props.desktop.yAxisConstraints == "top"
                    ? position?.props.desktop.yAxis
                    : "auto",
              }
            : position?.props.yAxisConstraints == "top"
            ? position?.props.yAxis
            : "auto"
        }
        bottom={
          position?.responsive == true
            ? {
                xs:
                  position?.props.mobile.yAxisConstraints == "bottom"
                    ? position?.props.mobile.yAxis
                    : "auto",
                md:
                  position?.props.tablet.yAxisConstraints == "bottom"
                    ? position?.props.tablet.yAxis
                    : "auto",
                lg:
                  position?.props.desktop.yAxisConstraints == "bottom"
                    ? position?.props.desktop.yAxis
                    : "auto",
              }
            : position?.props.yAxisConstraints == "bottom"
            ? position?.props.yAxis
            : "auto"
        }
        left={
          position?.responsive == true
            ? {
                xs:
                  position?.props.mobile.xAxisConstraints == "left"
                    ? position?.props.mobile.xAxis
                    : "auto",
                md:
                  position?.props.tablet.xAxisConstraints == "left"
                    ? position?.props.tablet.xAxis
                    : "auto",
                lg:
                  position?.props.desktop.xAxisConstraints == "left"
                    ? position?.props.desktop.xAxis
                    : "auto",
              }
            : position?.props.xAxisConstraints == "left"
            ? position?.props.xAxis
            : "auto"
        }
        right={
          position?.responsive == true
            ? {
                xs:
                  position?.props.mobile.xAxisConstraints == "right"
                    ? position?.props.mobile.xAxis
                    : "auto",
                md:
                  position?.props.tablet.xAxisConstraints == "right"
                    ? position?.props.tablet.xAxis
                    : "auto",
                lg:
                  position?.props.desktop.xAxisConstraints == "right"
                    ? position?.props.desktop.xAxis
                    : "auto",
              }
            : position?.props.xAxisConstraints == "right"
            ? position?.props.xAxis
            : "auto"
        }
        width={
          dimensions?.responsive == true
            ? {
                xs:
                  dimensions?.props.mobile.widthType == "fillContainer"
                    ? "100%"
                    : dimensions?.props.mobile.widthType == "fixed"
                    ? dimensions?.props.mobile.width
                    : "auto",
                md:
                  dimensions?.props.tablet.widthType == "fillContainer"
                    ? "100%"
                    : dimensions?.props.tablet.widthType == "fixed"
                    ? dimensions?.props.tablet.width
                    : "auto",
                lg:
                  dimensions?.props.desktop.widthType == "fillContainer"
                    ? "100%"
                    : dimensions?.props.desktop.widthType == "fixed"
                    ? dimensions?.props.desktop.width
                    : "auto",
              }
            : dimensions?.props.widthType == "fillContainer"
            ? "100%"
            : dimensions?.props.widthType == "fixed"
            ? dimensions?.props.width
            : "auto"
        }
        height={
          dimensions?.responsive == true
            ? {
                xs:
                  dimensions?.props.mobile.heightType == "fillContainer"
                    ? "100%"
                    : dimensions?.props.mobile.heightType == "fixed"
                    ? dimensions?.props.mobile.height
                    : "auto",
                md:
                  dimensions?.props.tablet.heightType == "fillContainer"
                    ? "100%"
                    : dimensions?.props.tablet.heightType == "fixed"
                    ? dimensions?.props.tablet.height
                    : "auto",
                lg:
                  dimensions?.props.desktop.heightType == "fillContainer"
                    ? "100%"
                    : dimensions?.props.desktop.heightType == "fixed"
                    ? dimensions?.props.desktop.height
                    : "auto",
              }
            : dimensions?.props.heightType == "fillContainer"
            ? "100%"
            : dimensions?.props.heightType == "fixed"
            ? dimensions?.props.height
            : "auto"
        }
        overflow={
          clipContent?.responsive == true
            ? {
                xs: clipContent?.props.mobile ? "hidden" : "visible",
                md: clipContent?.props.tablet ? "hidden" : "visible",
                lg: clipContent?.props.desktop ? "hidden" : "visible",
              }
            : clipContent?.props
            ? "hidden"
            : "visible"
        }
        borderRadius={
          border?.responsive == true
            ? {
                xs:
                  typeof border?.props.mobile.radius == "string"
                    ? border?.props.mobile.radius
                    : border?.props.mobile.radius.tl +
                      " " +
                      border?.props.mobile.radius.tr +
                      " " +
                      border?.props.mobile.radius.br +
                      " " +
                      border?.props.mobile.radius.bl,
                md:
                  typeof border?.props.tablet.radius == "string"
                    ? border?.props.tablet.radius
                    : border?.props.tablet.radius.tl +
                      " " +
                      border?.props.tablet.radius.tr +
                      " " +
                      border?.props.tablet.radius.br +
                      " " +
                      border?.props.tablet.radius.bl,
                lg:
                  typeof border?.props.desktop.radius == "string"
                    ? border?.props.desktop.radius
                    : border?.props.desktop.radius.tl +
                      " " +
                      border?.props.desktop.radius.tr +
                      " " +
                      border?.props.desktop.radius.br +
                      " " +
                      border?.props.desktop.radius.bl,
              }
            : typeof border?.props.radius == "string"
            ? border?.props.radius
            : border?.props.radius.tl +
              " " +
              border?.props.radius.tr +
              " " +
              border?.props.radius.br +
              " " +
              border?.props.radius.bl
        }
        borderColor={
          border?.responsive == true
            ? {
                xs: border?.props.mobile.color,
                md: border?.props.tablet.color,
                lg: border?.props.desktop.color,
              }
            : border?.props.color
        }
        border={
          border?.responsive == true
            ? {
                xs:
                  typeof border.props.mobile.thickness == "number"
                    ? border?.props.mobile.thickness
                    : border?.props.mobile.thickness.t +
                      ` ` +
                      border?.props.mobile.thickness.b +
                      ` ` +
                      border?.props.mobile.thickness.l +
                      ` ` +
                      border?.props.mobile.thickness.r,
                md:
                  typeof border.props.tablet.thickness == "number"
                    ? border?.props.tablet.thickness
                    : border?.props.tablet.thickness.t +
                      ` ` +
                      border?.props.tablet.thickness.b +
                      ` ` +
                      border?.props.tablet.thickness.l +
                      ` ` +
                      border?.props.tablet.thickness.r,
                lg:
                  typeof border.props.desktop.thickness == "number"
                    ? border?.props.desktop.thickness
                    : border?.props.desktop.thickness.t +
                      ` ` +
                      border?.props.desktop.thickness.b +
                      ` ` +
                      border?.props.desktop.thickness.l +
                      ` ` +
                      border?.props.desktop.thickness.r,
              }
            : typeof border?.props.thickness == "number"
            ? border?.props.thickness
            : border?.props.thickness.t +
              ` ` +
              border?.props.thickness.b +
              ` ` +
              border?.props.thickness.l +
              ` ` +
              border?.props.thickness.r
        }
        bgcolor={
          background?.responsive == true
            ? {
                xs:
                  background?.props.mobile.type === "color"
                    ? background?.props.mobile.value
                    : "",
                md:
                  background?.props.tablet.type === "color"
                    ? background?.props.tablet.value
                    : "",
                lg:
                  background?.props.desktop.type === "color"
                    ? background?.props.desktop.value
                    : "",
              }
            : background?.props.type === "color"
            ? background?.props.value
            : ""
        }
        display={
          autoLayout?.responsive == true
            ? {
                xs: autoLayout?.props.mobile ? "flex" : "block",
                md: autoLayout?.props.tablet ? "flex" : "block",
                lg: autoLayout?.props.desktop ? "flex" : "block",
              }
            : autoLayout?.props.enabled
            ? "flex"
            : "block"
        }
        flexDirection={
          autoLayout?.responsive == true
            ? {
                xs: autoLayout?.props.mobile.enabled
                  ? autoLayout?.props.mobile.direction
                  : "initial",
                md: autoLayout?.props.tablet.enabled
                  ? autoLayout?.props.tablet.direction
                  : "initial",
                lg: autoLayout?.props.desktop.enabled
                  ? autoLayout?.props.desktop.direction
                  : "initial",
              }
            : autoLayout?.props.enabled
            ? autoLayout?.props.direction
            : "initial"
        }
        justifyContent={
          autoLayout?.responsive == true
            ? {
                xs: autoLayout?.props.mobile.enabled
                  ? autoLayout?.props.mobile.justifyContent
                  : "initial",
                md: autoLayout?.props.tablet.enabled
                  ? autoLayout?.props.tablet.justifyContent
                  : "initial",
                lg: autoLayout?.props.desktop.enabled
                  ? autoLayout?.props.desktop.justifyContent
                  : "initial",
              }
            : autoLayout?.props.enabled
            ? autoLayout?.props.justifyContent
            : "initial"
        }
        alignItems={
          autoLayout?.responsive == true
            ? {
                xs: autoLayout?.props.mobile.enabled
                  ? autoLayout?.props.mobile.alignItems
                  : "initial",
                md: autoLayout?.props.tablet.enabled
                  ? autoLayout?.props.tablet.alignItems
                  : "initial",
                lg: autoLayout?.props.desktop.enabled
                  ? autoLayout?.props.desktop.alignItems
                  : "initial",
              }
            : autoLayout?.props.enabled
            ? autoLayout?.props.alignItems
            : "initial"
        }
        padding={
          autoLayout?.responsive == true
            ? {
                xs: autoLayout?.props.mobile.enabled
                  ? typeof autoLayout?.props.mobile.padding == "string"
                    ? autoLayout?.props.mobile.padding
                    : autoLayout?.props.mobile.padding.t +
                      " " +
                      autoLayout?.props.mobile.padding.r +
                      " " +
                      autoLayout?.props.mobile.padding.b +
                      " " +
                      autoLayout?.props.mobile.padding.l
                  : "0px",
                md: autoLayout?.props.tablet.enabled
                  ? typeof autoLayout?.props.tablet.padding == "string"
                    ? autoLayout?.props.tablet.padding
                    : autoLayout?.props.tablet.padding.t +
                      " " +
                      autoLayout?.props.tablet.padding.r +
                      " " +
                      autoLayout?.props.tablet.padding.b +
                      " " +
                      autoLayout?.props.tablet.padding.l
                  : "0px",
                lg: autoLayout?.props.desktop.enabled
                  ? typeof autoLayout?.props.desktop.padding == "string"
                    ? autoLayout?.props.desktop.padding
                    : autoLayout?.props.desktop.padding.t +
                      " " +
                      autoLayout?.props.desktop.padding.r +
                      " " +
                      autoLayout?.props.desktop.padding.b +
                      " " +
                      autoLayout?.props.desktop.padding.l
                  : "0px",
              }
            : autoLayout?.props.enabled
            ? typeof autoLayout?.props.padding == "string"
              ? autoLayout?.props.padding
              : autoLayout?.props.padding.t +
                " " +
                autoLayout?.props.padding.r +
                " " +
                autoLayout?.props.padding.b +
                " " +
                autoLayout?.props.padding.l
            : undefined
        }
        rowGap={
          autoLayout?.responsive == true
            ? {
                xs: autoLayout?.props.mobile.enabled
                  ? autoLayout?.props.mobile.gap.y
                  : 0,
                md: autoLayout?.props.tablet.enabled
                  ? autoLayout?.props.tablet.gap.y
                  : 0,
                lg: autoLayout?.props.desktop.enabled
                  ? autoLayout?.props.desktop.gap.y
                  : 0,
              }
            : autoLayout?.props.enabled
            ? autoLayout?.props.gap.y
            : 0
        }
        columnGap={
          autoLayout?.responsive == true
            ? {
                xs: autoLayout?.props.mobile.enabled
                  ? autoLayout?.props.mobile.gap.x
                  : 0,
                md: autoLayout?.props.tablet.enabled
                  ? autoLayout?.props.tablet.gap.x
                  : 0,
                lg: autoLayout?.props.desktop.enabled
                  ? autoLayout?.props.desktop.gap.x
                  : 0,
              }
            : autoLayout?.props.enabled
            ? autoLayout?.props.gap.x
            : 0
        }
        sx={{
          aspectRatio:
            dimensions?.responsive == true
              ? {
                  xs: dimensions?.props.mobile.aspect
                    ? `${dimensions?.props.mobile.aspectRatio}`
                    : undefined,
                  md: dimensions?.props.tablet.aspect
                    ? `${dimensions?.props.tablet.aspectRatio}`
                    : undefined,
                  lg: dimensions?.props.desktop.aspect
                    ? `${dimensions?.props.desktop.aspectRatio}`
                    : undefined,
                }
              : dimensions?.props.aspect
              ? dimensions?.props.aspect
                ? `${dimensions?.props.aspectRatio}`
                : undefined
              : undefined,
        }}
      >
        {background?.responsive == true ? (
          <>
            {background?.props.mobile.type == "image" ? (
              <Box
                sx={{
                  display: {
                    xs: "block",
                    md: "none",
                  },
                }}
              >
                <img
                  src={
                    background?.props.mobile.value.isValid
                      ? background?.props.mobile.value.url
                      : ""
                  }
                  alt={""}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: background?.props.mobile.value.opacity || "1",
                  }}
                  sizes={background?.props.mobile.value.sizes}
                />
              </Box>
            ) : (
              ""
            )}
            {background?.props.tablet.type == "image" ? (
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                    lg: "none",
                  },
                }}
              >
                <img
                  src={
                    background?.props.tablet.value.isValid
                      ? background?.props.tablet.value.url
                      : ""
                  }
                  alt={""}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: background?.props.tablet.value.opacity || "1",
                  }}
                  sizes={background?.props.tablet.value.sizes}
                />
              </Box>
            ) : (
              ""
            )}
            {background?.props.desktop.type == "image" ? (
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "none",
                    lg: "block",
                  },
                }}
              >
                <img
                  src={
                    background?.props.desktop.value.isValid
                      ? background?.props.desktop.value.url
                      : ""
                  }
                  alt={""}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: background?.props.desktop.value.opacity || "1",
                  }}
                  sizes={background?.props.desktop.value.sizes}
                />
              </Box>
            ) : (
              ""
            )}
          </>
        ) : background?.props.type == "image" ? (
          <img
            src={
              background?.props.value.isValid ? background?.props.value.url : ""
            }
            alt={""}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: background?.props.value.opacity || "1",
            }}
            sizes={background?.props.value.sizes}
          />
        ) : (
          ""
        )}
        <DropZone zone="Frame" />
      </Box>
    );
  },
};

export default ClientFrameComponent;
