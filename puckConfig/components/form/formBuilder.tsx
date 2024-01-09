"use client";

import {
  Button,
  ButtonGroup,
  FormHelperText,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { dynamicField } from "./type";
import BackgroundProps from "../../fields/background/backgroundType";
import ThemeMode from "./themeMode";
import SwitchField from "../../fields/switch";
// import CloudUpload from "@mui/icons-material/CloudUpload";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import { Dispatch, SetStateAction, useState } from "react";
import { Timestamp } from "firebase/firestore";

type fieldValues = {
  [key: string]: any;
};

function RenderField({
  field,
  isLast,
  isNested = false,
  setCurrentIndex,
  fieldValues,
  setFieldValues,
  onSubmit,
}: {
  field: dynamicField;
  isLast?: boolean;
  isNested?: boolean;
  setCurrentIndex?: Dispatch<SetStateAction<number>>;
  fieldValues: fieldValues;
  setFieldValues: Dispatch<SetStateAction<fieldValues>>;
  onSubmit?: () => void;
}) {
  let fieldJsx = <div className=""></div>;
  switch (field.type) {
    case "text":
      fieldJsx = (
        <div>
          <TextField
            required={field.required}
            name={field.name}
            label={isNested ? field.name : ""}
            placeholder={"Type your answer here..."}
            helperText={
              field.fieldOptions?.multiline || field.fieldOptions?.markdown ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <span>{field.description}</span>
                  <span>
                    <span style={{ fontWeight: "bold" }}>
                      Shift &uArr; + Enter ↵
                    </span>{" "}
                    for a new line.
                  </span>
                </div>
              ) : (
                field.description
              )
            }
            multiline={
              field.fieldOptions?.multiline || field.fieldOptions?.markdown
            }
            variant={"standard"}
            fullWidth
            type={
              field.fieldOptions?.email
                ? "email"
                : field.fieldOptions?.url
                ? "url"
                : "text"
            }
            value={fieldValues[field.name] || ""}
            onChange={(e) =>
              setFieldValues({
                ...fieldValues,
                [field.name]: e.target.value,
              })
            }
          />
        </div>
      );
      break;
    case "select":
      if (field.fieldOptions?.multiple)
        fieldJsx = (
          <TextField
            variant={"standard"}
            label={isNested ? field.name : ""}
            required={field.required}
            placeholder={"Select an option"}
            name={field.name}
            fullWidth
            helperText={field.description}
            value={[]}
            onChange={(e) =>
              setFieldValues({
                ...fieldValues,
                [field.name]: e.target.value,
              })
            }
            select
            SelectProps={{
              multiple: true,
            }}
          >
            {field.fieldOptions?.options?.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      else
        fieldJsx = (
          <TextField
            variant={"standard"}
            label={isNested ? field.name : ""}
            placeholder={"Select an option"}
            required={field.required}
            name={field.name}
            helperText={field.description}
            value={fieldValues[field.name] || ""}
            fullWidth
            onChange={(e) =>
              setFieldValues({
                ...fieldValues,
                [field.name]: e.target.value,
              })
            }
            select
            SelectProps={{
              multiple: false,
            }}
          >
            {field.fieldOptions?.options?.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      break;
    case "date":
      if (
        field.fieldOptions?.autoValue != undefined &&
        !fieldValues[field.name]
      )
        setFieldValues({
          ...fieldValues,
          [field.name]: Timestamp.fromDate(new Date()),
        });
      fieldJsx = (
        <TextField
          variant={"standard"}
          label={isNested ? field.name : ""}
          disabled={field.fieldOptions?.autoValue != undefined}
          name={field.name}
          placeholder={
            field.fieldOptions?.type == "date_time"
              ? "Select Date & Time"
              : "Select Date"
          }
          helperText={field.description}
          type={
            field.fieldOptions?.type == "date_time" ? "datetime-local" : "date"
          }
          value={
            field.fieldOptions?.type == "date_time"
              ? fieldValues[field.name]?.toDate().toISOString().split(".")[0]
              : fieldValues[field.name]?.toDate().toISOString().split("T")[0]
          }
          fullWidth
          onChange={(e) =>
            setFieldValues({
              ...fieldValues,
              [field.name]: Timestamp.fromDate(new Date(e.target.value)),
            })
          }
        />
      );
      break;
    case "fileUpload":
      fieldJsx = (
        <TextField
          variant={"standard"}
          label={isNested ? field.name : ""}
          name={field.name}
          helperText={field.description}
          type="file"
          value={fieldValues[field.name] || ""}
          fullWidth
          onChange={(e) =>
            setFieldValues({
              ...fieldValues,
              [field.name]: e.target.value,
            })
          }
        />
      );
      break;
    case "switch":
      fieldJsx = (
        <SwitchField
          name={field.name}
          label={field.required ? "Click to toggle or next to skip" : "Agree"}
          value={fieldValues[field.name] || false}
          required={field.required}
          onChange={(v) =>
            setFieldValues({
              ...fieldValues,
              [field.name]: v,
            })
          }
        />
      );
      break;
    case "group":
      const fieldName = field.name;
      fieldJsx = (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap -mr-2">
            {field.fieldOptions &&
              field.fieldOptions.map((field, index) => (
                <div key={field.name + index} className="w-full md:w-1/2 pr-2">
                  <RenderField
                    field={field}
                    isNested={true}
                    fieldValues={fieldValues[fieldName] || {}}
                    setFieldValues={(value) =>
                      setFieldValues({
                        ...fieldValues,
                        [fieldName]: value,
                      })
                    }
                  />
                </div>
              ))}
          </div>
          <FormHelperText>{field.description}</FormHelperText>
        </div>
      );
      break;
    case "repeat":
      const [groups, setGroups] = useState(1);
      fieldJsx = !isNested ? (
        <div className="flex flex-col gap-2">
          {[...Array(groups)].map((i, index) =>
            field.fieldOptions ? (
              <div key={field.name + index}>
                <RenderField
                  key={field.name + index}
                  field={field.fieldOptions}
                  isNested={true}
                  fieldValues={
                    fieldValues[field.name]
                      ? fieldValues[field.name][index] || {}
                      : {}
                  }
                  setFieldValues={(value) => {
                    let updatedArray = fieldValues[field.name]
                      ? [...fieldValues[field.name]]
                      : [];
                    updatedArray[index] = value;
                    setFieldValues({
                      ...fieldValues,
                      [field.name]: updatedArray,
                    });
                  }}
                />
                {index ? (
                  <div className="">
                    <Button
                      variant={"contained"}
                      onClick={() => {
                        setFieldValues({
                          ...fieldValues,
                          [field.name]: fieldValues[field.name].filter(
                            (_: any, i: number) => i != index
                          ),
                        });
                        setGroups(groups - 1);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )
          )}
          <div className="">
            <Button variant={"contained"} onClick={() => setGroups(groups + 1)}>
              Add
            </Button>
          </div>
          <FormHelperText>{field.description}</FormHelperText>
        </div>
      ) : (
        <div className=""></div>
      );
      break;
    default:
      break;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {isNested ? (
        ""
      ) : (
        <Typography variant={"h6"} color={"inherit"} component={"span"}>
          {field.name}
        </Typography>
      )}
      {fieldJsx}
      {!isNested ? (
        <div style={{}}>
          <Button
            style={{
              margin: "8px 0",
            }}
            size="small"
            variant={"contained"}
            onClick={() =>
              isLast
                ? onSubmit && onSubmit()
                : setCurrentIndex != undefined &&
                  setCurrentIndex((currentIndex) => currentIndex + 1)
            }
          >
            {isLast ? "Submit" : "Next"}
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default function FormBuilder({
  collection,
  background,
  theme,
}: {
  collection: {
    id: string;
    name: string;
    singularName: string;
    path: string;
    icon: string;
    fields: dynamicField[];
  };
  background: BackgroundProps;
  theme: "light" | "dark";
}) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [fieldValues, setFieldValues] = useState<fieldValues>({});

  function SubmitHandle() {}

  return (
    <div
      style={{
        paddingTop: "8px",
        backgroundColor: theme === "dark" ? "var(--dark-background)" : "",
      }}
    >
      <ThemeMode theme={theme}>
        <div
          style={{
            position: "relative",
            aspectRatio: "16/9",
            overflow: "hidden",
            borderRadius: "12px",
          }}
        >
          {background.type === "image" ? (
            <img
              src={background.value.url}
              alt={collection.singularName + " background image"}
              sizes={background.value.sizes}
              style={{
                position: "absolute",
                inset: 0,
                opacity: background.value.opacity,
              }}
            />
          ) : (
            ""
          )}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "all 0.3s",
              transform:
                currentIndex === -1
                  ? undefined
                  : currentIndex > -1
                  ? "translateY(-101%)"
                  : "translateY(101%)",
            }}
          >
            <div
              style={{
                padding: "32px",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "stretch",
                width: "100%",
              }}
            >
              <Typography
                variant={"h4"}
                component={"h1"}
                fontFamily={"var(--font-playfair)"}
                style={{ margin: "16px 0" }}
              >
                {collection.singularName || "Good to have you here"}
              </Typography>
              <div style={{}}>
                <Button
                  size="small"
                  variant={"contained"}
                  onClick={() => setCurrentIndex(currentIndex + 1)}
                >
                  Let's Start
                </Button>
              </div>
            </div>
          </div>

          {collection.fields.map((field, index) => (
            <div
              key={field.name}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "all 0.7s",
                transform:
                  currentIndex === index
                    ? undefined
                    : currentIndex > index
                    ? "translateY(-101%)"
                    : "translateY(101%)",
              }}
            >
              <div
                style={{
                  padding: "32px",
                  borderRadius: "12px",
                  overflowY: "auto",
                  width: "100%",
                }}
              >
                <RenderField
                  field={field}
                  fieldValues={fieldValues}
                  setFieldValues={setFieldValues}
                  isLast={index === collection.fields.length - 1}
                  setCurrentIndex={setCurrentIndex}
                  onSubmit={SubmitHandle}
                />
              </div>
            </div>
          ))}
          {currentIndex === -1 ? (
            ""
          ) : (
            <ButtonGroup
              style={{ position: "absolute", bottom: "16px", right: "16px" }}
            >
              <IconButton
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((index) => index - 1)}
              >
                <ArrowUpward />
              </IconButton>
              <IconButton
                disabled={currentIndex === collection.fields.length - 1}
                onClick={() => setCurrentIndex((index) => index + 1)}
              >
                <ArrowDownward />
              </IconButton>
            </ButtonGroup>
          )}
        </div>
      </ThemeMode>
    </div>
  );
}
