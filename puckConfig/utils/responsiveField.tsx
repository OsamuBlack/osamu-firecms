import React from "react";
import { FieldLabel } from "@measured/puck";

import SwitchField from "../fields/switch";
import { MdComputer, MdSmartphone, MdTabletMac } from "react-icons/md";
import { useState } from "react";
import ToggleButtonGroup from "../fields/buttonGroup";
import { ButtonGroup } from "@mui/material";

export default function ResponsiveField({
  title,
  value,
  defaultProps,
  onChange,
  Field,
}: {
  title: string;
  value: {
    responsive: boolean;
    props: any;
  };
  defaultProps: any;
  onChange: (value: { responsive: boolean; props: any }) => void;
  Field: React.FC<{
    name: string;
    value: any;
    onChange: (value: any) => void;
  }>;
}) {
  const [selected, setSelected] = useState("desktop");

  return (
    <div className="flex flex-col justify-start gap-2">
      <div className="flex justify-between items-start">
        <FieldLabel className={"text-neutral-700"} label={title} />
        <ButtonGroup>
          <SwitchField
            size={"small"}
            name={""}
            value={value?.responsive || false}
            onChange={(v: any) =>
              onChange(
                v
                  ? {
                      props: {
                        mobile: value.props,
                        tablet: value.props,
                        desktop: value.props,
                      },
                      responsive: true,
                    }
                  : {
                      props: value.props.desktop,
                      responsive: false,
                    }
              )
            }
          />
          <ToggleButtonGroup
            disabled={!value?.responsive}
            value={selected}
            name="device"
            onChange={(v) => setSelected(v)}
            size="small"
            buttons={[
              {
                type: "icon",
                icon: <MdSmartphone />,
                value: "mobile",
              },
              {
                type: "icon",
                icon: <MdTabletMac />,
                value: "tablet",
              },
              {
                type: "icon",
                icon: <MdComputer />,
                value: "desktop",
              },
            ]}
          />
        </ButtonGroup>
      </div>
      {value?.responsive == true ? (
        selected == "mobile" ? (
          <Field
            name={"Mobile"}
            value={value.props.mobile}
            onChange={(v) =>
              onChange({
                ...value,
                props: {
                  ...value.props,
                  mobile: v,
                },
              })
            }
          />
        ) : selected == "tablet" ? (
          <Field
            name={"Tablet"}
            value={value.props.tablet}
            onChange={(v) =>
              onChange({
                ...value,
                props: {
                  ...value.props,
                  tablet: v,
                },
              })
            }
          />
        ) : (
          <Field
            name={"Desktop"}
            value={value.props.desktop}
            onChange={(v) =>
              onChange({
                ...value,
                props: {
                  ...value.props,
                  desktop: v,
                },
              })
            }
          />
        )
      ) : (
        <Field
          name=""
          value={value?.props || defaultProps}
          onChange={(v) =>
            onChange({ responsive: value?.responsive || false, props: v })
          }
        />
      )}
    </div>
  );
}
