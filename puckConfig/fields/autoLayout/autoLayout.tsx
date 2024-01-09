import React from "react";

import Box from "@mui/material/Box";
import ToggleButtonGroup from "../buttonGroup";
import SwitchField from "../switch";
import { FieldLabel } from "@measured/puck";
import AutoLayoutProps from "./autoLayoutType";
import TextInput from "../textField";

import {
  MdAlignHorizontalCenter,
  MdAlignHorizontalLeft,
  MdAlignHorizontalRight,
  MdAlignVerticalCenter,
  MdAlignVerticalBottom,
  MdAlignVerticalTop,
  MdEast,
  MdSouth,
} from "react-icons/md";

import {
  RxAlignBaseline,
  RxSpaceBetweenHorizontally,
  RxSpaceBetweenVertically,
  RxSpaceEvenlyHorizontally,
  RxSpaceEvenlyVertically,
  RxStretchHorizontally,
  RxStretchVertically,
} from "react-icons/rx";

export default function AutoLayout({
  value,
  onChange,
}: {
  value: AutoLayoutProps;
  onChange: (v: AutoLayoutProps) => void;
}) {
  const {
    enabled,
    direction,
    justifyContent,
    alignItems,
    gap,
    padding,
  }: AutoLayoutProps = value;
  const setEnabled = (v: boolean) => {
    onChange({
      ...value,
      enabled: v,
    });
  };

  const setAllPaddings = (v: string) => {
    onChange({
      ...value,
      padding: typeof padding == "string" ? v : { t: v, r: v, b: v, l: v },
    });
  };

  const setTopPadding = (v: string) => {
    if (typeof value.padding != "string")
      onChange({
        ...value,
        padding: {
          ...value.padding,
          t: v,
        },
      });
  };
  const setBottomPadding = (v: string) => {
    if (typeof value.padding != "string")
      onChange({
        ...value,
        padding: {
          ...value.padding,
          b: v,
        },
      });
  };
  const setLeftPadding = (v: string) => {
    if (typeof value.padding != "string")
      onChange({
        ...value,
        padding: {
          ...value.padding,
          l: v,
        },
      });
  };
  const setRightPadding = (v: string) => {
    if (typeof value.padding != "string")
      onChange({
        ...value,
        padding: {
          ...value.padding,
          r: v,
        },
      });
  };

  const toggleIndividualPadding = () => {
    onChange({
      ...value,
      padding:
        typeof padding == "string"
          ? {
              t: padding,
              b: padding,
              r: padding,
              l: padding,
            }
          : padding.t,
    });
  };

  if (enabled)
    return (
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"start"}
        gap={1}
      >
        <SwitchField name={"Enabled"} value={enabled} onChange={setEnabled} />
        <FieldLabel label={"Direction"} />
        <ToggleButtonGroup
          name="Direction"
          value={value.direction}
          onChange={(newAlignment) =>
            onChange({
              ...value,
              direction: newAlignment as "row" | "column",
            })
          }
          aria-label="text alignment"
          buttons={[
            {
              type: "icon",
              icon: <MdEast />,
              value: "row",
            },
            {
              type: "icon",
              icon: <MdSouth />,
              value: "column",
            },
          ]}
        />
        {value.direction === "column" ? (
          <ToggleButtonGroup
            name="Justify Content"
            value={value.justifyContent}
            onChange={(newAlignment) =>
              onChange({
                ...value,
                justifyContent: newAlignment as
                  | "flex-start"
                  | "center"
                  | "flex-end"
                  | "space-between"
                  | "space-evenly",
              })
            }
            buttons={[
              {
                type: "icon",
                icon: <MdAlignVerticalTop />,
                value: "flex-start",
              },
              {
                type: "icon",
                icon: <MdAlignVerticalCenter />,
                value: "center",
              },
              {
                type: "icon",
                icon: <MdAlignVerticalBottom />,
                value: "flex-end",
              },
              {
                type: "icon",
                icon: <RxSpaceBetweenVertically />,
                value: "space-between",
              },
              {
                type: "icon",
                icon: <RxSpaceEvenlyVertically />,
                value: "space-evenly",
              },
            ]}
          />
        ) : (
          <ToggleButtonGroup
            name="Justify Content"
            value={value.justifyContent}
            onChange={(newAlignment) =>
              onChange({
                ...value,
                justifyContent: newAlignment as
                  | "flex-start"
                  | "center"
                  | "flex-end"
                  | "space-between"
                  | "space-evenly",
              })
            }
            buttons={[
              {
                type: "icon",
                icon: <MdAlignHorizontalLeft />,
                value: "flex-start",
              },
              {
                type: "icon",
                icon: <MdAlignHorizontalCenter />,
                value: "center",
              },
              {
                type: "icon",
                icon: <MdAlignHorizontalRight />,
                value: "flex-end",
              },
              {
                type: "icon",
                icon: <RxSpaceBetweenHorizontally />,
                value: "space-between",
              },
              {
                type: "icon",
                icon: <RxSpaceEvenlyHorizontally />,
                value: "space-evenly",
              },
            ]}
          />
        )}
        {value.direction === "column" ? (
          // <ToggleButtonGroup
          //   value={value.alignItems}
          //   exclusive
          //   onChange={(event, newAlignment) =>
          //     onChange({
          //       ...value,
          //       alignItems: newAlignment,
          //     })
          //   }
          //   aria-label="Align Content"
          // >
          //   <ToggleButton value="flex-start">
          //     <MdAlignHorizontalLeft />
          //   </ToggleButton>
          //   <ToggleButton value="center">
          //     <MdAlignHorizontalCenter />
          //   </ToggleButton>
          //   <ToggleButton value="flex-end">
          //     <MdAlignHorizontalRight />
          //   </ToggleButton>
          //   <ToggleButton value="stretch">
          //     <RxStretchHorizontally />
          //   </ToggleButton>
          //   <ToggleButton value="baseline">
          //     <RxAlignBaseline />
          //   </ToggleButton>
          // </ToggleButtonGroup>
          <ToggleButtonGroup
            name="Align Content"
            value={value.alignItems}
            onChange={(newAlignment) =>
              onChange({
                ...value,
                alignItems: newAlignment as
                  | "flex-start"
                  | "center"
                  | "flex-end"
                  | "stretch"
                  | "baseline",
              })
            }
            aria-label="text alignment"
            buttons={[
              {
                type: "icon",
                icon: <MdAlignHorizontalLeft />,
                value: "flex-start",
              },
              {
                type: "icon",
                icon: <MdAlignHorizontalCenter />,
                value: "center",
              },
              {
                type: "icon",
                icon: <MdAlignHorizontalRight />,
                value: "flex-end",
              },
              {
                type: "icon",
                icon: <RxStretchHorizontally />,
                value: "stretch",
              },
              {
                type: "icon",
                icon: <RxAlignBaseline />,
                value: "baseline",
              },
            ]}
          />
        ) : (
          // <ToggleButtonGroup
          //   value={value.alignItems}
          //   exclusive
          //   onChange={(event, newAlignment) =>
          //     onChange({
          //       ...value,
          //       alignItems: newAlignment,
          //     })
          //   }
          //   aria-label="Align Content"
          // >
          //   <ToggleButton value="flex-start">
          //     <MdAlignVerticalTop />
          //   </ToggleButton>
          //   <ToggleButton value="center">
          //     <MdAlignVerticalCenter />
          //   </ToggleButton>
          //   <ToggleButton value="flex-end">
          //     <MdAlignVerticalBottom />
          //   </ToggleButton>
          //   <ToggleButton value="stretch">
          //     <RxStretchVertically />
          //   </ToggleButton>
          //   <ToggleButton value="baseline">
          //     <RxAlignBaseline />
          //   </ToggleButton>
          // </ToggleButtonGroup>
          <ToggleButtonGroup
            name="Align Content"
            value={value.alignItems}
            onChange={(newAlignment) =>
              onChange({
                ...value,
                alignItems: newAlignment as
                  | "flex-start"
                  | "center"
                  | "flex-end"
                  | "stretch"
                  | "baseline",
              })
            }
            aria-label="text alignment"
            buttons={[
              {
                type: "icon",
                icon: <MdAlignVerticalTop />,
                value: "flex-start",
              },
              {
                type: "icon",
                icon: <MdAlignVerticalCenter />,
                value: "center",
              },
              {
                type: "icon",
                icon: <MdAlignVerticalBottom />,
                value: "flex-end",
              },
              {
                type: "icon",
                icon: <RxStretchVertically />,
                value: "stretch",
              },
              {
                type: "icon",
                icon: <RxAlignBaseline />,
                value: "baseline",
              },
            ]}
          />
        )}
        <FieldLabel label={"Padding"}>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <SwitchField
              name={"Expanded"}
              value={typeof padding != "string"}
              onChange={toggleIndividualPadding}
            />
            {typeof value.padding == "string" ? (
              <TextInput
                type="text"
                name="Padding"
                labelPlacement="outside-left"
                value={value.padding}
                onChange={(v) => setAllPaddings(v)}
              />
            ) : (
              <>
                <Box display="flex" gap={1}>
                  <TextInput
                    type="text"
                    name="Top"
                    labelPlacement="outside-left"
                    value={value.padding.t}
                    onChange={(v) => setTopPadding(v)}
                  />
                  <TextInput
                    type="text"
                    name="Bottom"
                    labelPlacement="outside-left"
                    value={value.padding.b}
                    onChange={(v) => setBottomPadding(v)}
                  />
                </Box>
                <Box display={"flex"} gap={1}>
                  <TextInput
                    type="text"
                    name="Left"
                    labelPlacement="outside-left"
                    value={value.padding.l}
                    onChange={(v) => setLeftPadding(v)}
                  />
                  <TextInput
                    type="text"
                    name="Right"
                    labelPlacement="outside-left"
                    value={value.padding.r}
                    onChange={(v) => setRightPadding(v)}
                  />
                </Box>
              </>
            )}
          </Box>
        </FieldLabel>
        <FieldLabel label={"Gap"}>
          <Box display={"flex"} gap={1}>
            <TextInput
              type="text"
              name="X"
              labelPlacement="outside-left"
              value={`${value.gap.x}`}
              onChange={(v) =>
                onChange({
                  ...value,
                  gap: {
                    y: value.gap.y,
                    x: Number(v),
                  },
                })
              }
            />
            <TextInput
              type="text"
              name="Y"
              labelPlacement="outside-left"
              value={`${value.gap.y}`}
              onChange={(v) =>
                onChange({
                  ...value,
                  gap: {
                    x: value.gap.x,
                    y: Number(v),
                  },
                })
              }
            />
          </Box>
        </FieldLabel>
      </Box>
    );

  return <SwitchField name={"Enabled"} value={enabled} onChange={setEnabled} />;
}
