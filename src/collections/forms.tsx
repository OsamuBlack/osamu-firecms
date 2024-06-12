import {
  buildCollection,
  buildPropertiesOrBuilder,
  buildProperty,
} from "firecms";
import { recordCollection } from "./recordsCollection";

type CommonFieldProps = {
  label: string;
  description?: string;
  required?: boolean;
  align?: "left" | "center" | "right";
};

type optionsCommonFields = {
  options: {
    label: string;
    value: string;
  }[];
} & CommonFieldProps;

type imageOptionsCommonFields = {
  options: {
    label: string;
    value: string;
    image: string;
  }[];
} & CommonFieldProps;

const commonFieldProps = {
  label: buildProperty({
    name: "Label",
    dataType: "string",
    validation: { required: true },
  }),
  description: buildProperty({
    name: "Description",
    dataType: "string",
    multiline: true,
  }),
  required: buildProperty({
    name: "Required",
    dataType: "boolean",
  }),
  align: buildProperty({
    name: "Align",
    dataType: "string",
    enumValues: {
      left: "Left",
      center: "Center",
      right: "Right",
    },
    defaultValue: "left",
  }),
};

const optionsCommonFields = {
  ...commonFieldProps,
  options: buildProperty({
    dataType: "array",
    name: "Options",
    of: {
      dataType: "map",
      properties: {
        label: {
          dataType: "string",
          name: "Label",
        },
        value: {
          dataType: "string",
          name: "Value",
        },
      },
    },
  }),
};

const imageOptionsCommonFields = {
  ...commonFieldProps,
  options: buildProperty({
    dataType: "array",
    name: "Options",
    of: {
      dataType: "map",
      properties: {
        label: {
          dataType: "string",
          name: "Label",
        },
        value: {
          dataType: "string",
          name: "Value",
        },
        image: {
          dataType: "string",
          name: "Image",
        },
      },
    },
  }),
};

type fieldProps =
  | {
      type: "text" | "email" | "url" | "textarea" | "file";
      value: CommonFieldProps;
    }
  | {
      type: "number";
      value: {
        max: number;
        min: number;
        integer: boolean;
      } & CommonFieldProps;
    }
  | {
      type: "select" | "radio" | "checkbox";
      value: optionsCommonFields;
    }
  | {
      type: "imageRadio" | "imageCheckbox";
      value: imageOptionsCommonFields;
    }
  | {
      type: "date";
      value: {
        from: Date;
        to: Date;
      } & CommonFieldProps;
    }
  | {
      type: "group";
      value: { fields: fieldProps[] } | string;
    };

export type FormCollectionProps = {
  name: string;
  fields: fieldProps[];
};

const fieldProperties = (isNested: boolean) =>
  buildProperty<fieldProps[]>({
    dataType: "array",
    name: "Fields",
    oneOf: {
      typeField: "type",
      valueField: "value",
      properties: {
        text: {
          name: "Text",
          dataType: "map",
          properties: commonFieldProps,
        },
        email: {
          name: "Email",
          dataType: "map",
          properties: commonFieldProps,
        },
        url: {
          name: "URL",
          dataType: "map",
          properties: commonFieldProps,
        },
        textarea: {
          name: "Textarea",
          dataType: "map",
          properties: commonFieldProps,
        },
        file: {
          name: "File",
          dataType: "map",
          properties: commonFieldProps,
        },
        number: {
          name: "Number",
          dataType: "map",
          properties: {
            ...commonFieldProps,
            max: {
              dataType: "number",
              name: "Max",
            },
            min: {
              dataType: "number",
              name: "Min",
            },
            integer: {
              dataType: "boolean",
              description: "Whole number without decimal points.",
              name: "Integer",
            },
          },
        },
        select: {
          name: "Dropdown",
          dataType: "map",
          properties: optionsCommonFields,
        },
        radio: {
          name: "Sinlge Choice",
          dataType: "map",
          properties: optionsCommonFields,
        },
        checkbox: {
          name: "Multiple Choice",
          dataType: "map",
          properties: optionsCommonFields,
        },
        imageRadio: {
          name: "Single Image Choice",
          dataType: "map",
          properties: {
            ...imageOptionsCommonFields,
          },
        },
        imageCheckbox: {
          name: "Multiple Image Choice",
          dataType: "map",
          properties: {
            ...imageOptionsCommonFields,
          },
        },
        date: {
          name: "Date",
          dataType: "map",
          properties: {
            ...commonFieldProps,
            from: buildProperty({
              name: "From",
              dataType: "date",
            }),
            to: buildProperty({
              name: "To",
              dataType: "date",
            }),
          },
        },
        group: isNested
          ? {
              dataType: "string",
              name: "Group",
              readOnly: true,
              defaultValue: "Nested Grouping is not allowed",
            }
          : {
              dataType: "map",
              name: "Group",
              spreadChildren: true,
              properties: {
                fields: fieldProperties(true),
              },
            },
      },
    },
  });

export const forms = buildCollection<FormCollectionProps>({
  name: "Forms",
  path: "forms",
  singularName: "Form",
  icon: "DynamicForm",
  properties: {
    name: buildProperty({
      name: "Name",
      dataType: "string",
      validation: { required: true, unique: true },
    }),
    fields: fieldProperties(false),
  },
  callbacks: {
    onIdUpdate(idUpdateProps) {
      const id = idUpdateProps.values.name?.toLowerCase().replace(/ /g, "-");
      return id || "new-form";
    },
    onSaveSuccess(entitySaveProps) {
      entitySaveProps.context.dataSource.saveEntity({
        path: recordCollection.path,
        entityId: "forms",
        collection: recordCollection,
        values: {
          [entitySaveProps.entityId]: entitySaveProps.values.name,
        },
        status: "existing",
      });
    },
  },
});
