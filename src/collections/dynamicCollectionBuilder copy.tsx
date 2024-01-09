import {
  buildCollection,
  buildProperties,
} from "firecms";

export type dynamicCollectionBuilder = {
  name: string;
  singluarName: string;
  description: string;
  path: string;
  icon: string;
  fields: dynamicField[];
};

export type dynamicField =
  | {
      name: string;
      type: "text";
      description?: string;
      fieldOptions?: {
        multiline?: boolean;
        markdown?: boolean;
        email?: boolean;
        url?: boolean;
      };
      required?: boolean;
    }
  | {
      name: string;
      type: "select";
      description?: string;
      fieldOptions?: {
        multiple?: boolean;
        options?: {
          id: string;
          label: string;
        }[];
      };
      required?: boolean;
    }
  | {
      name: "switch";
      type: "switch";
      description?: string;
      required?: boolean;
    }
  | {
      name: string;
      type: "fileUpload";
      description?: string;
      fieldOptions?: {
        fileName?: string;
        storagePath: string;
        accecptedTypes?: string[];
        maxSize?: number;
        metadata?: {
          [key: string]: string;
        };
      };
      required?: boolean;
    }
  | {
      name: string;
      type: "date";
      description?: string;
      fieldOptions?: {
        type?: "date" | "date_time";
        autoValue?: "on_create" | "on_update";
      };
      required?: boolean;
    }
  | {
      name: string;
      type: "group";
      description?: string;
      fieldOptions?: dynamicField[];
      required?: boolean;
    }
  | {
      name: string;
      type: "repeat";
      description?: string;
      fieldOptions?: dynamicField;
      required?: boolean;
    };


function propertyOptionBuilder(
  type:
    | "text"
    | "select"
    | "fileUpload"
    | "switch"
    | "date"
    | "group"
    | "repeat",
  value: any,
  depth: number
): {
  name: string;
  dataType: "map" | "array";
  expanded: boolean;
  properties?: any;
  of?: any;
} {
  switch (type) {
    case "text":
      return {
        name: "Text Field Options",
        dataType: "map",
        expanded: false,
        properties: {
          multiline: {
            dataType: "boolean",
            name: "Multiline",
          },
          markdown: {
            dataType: "boolean",
            name: "Markdown",
          },
          email: {
            dataType: "boolean",
            name: "Email",
          },
          url: {
            dataType: "boolean",
            name: "URL",
          },
        },
      };
      break;
    case "select":
      return {
        name: "Select Field Options",
        dataType: "map",
        expanded: false,
        properties: {
          multiple: {
            dataType: "boolean",
            name: "Multiple",
          },
          options: {
            dataType: "array",
            name: "Options",
            validation: { required: true },
            of: {
              dataType: "map",
              spreadChildren: true,
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
          },
        },
      };
      break;
    case "fileUpload":
      {
        return {
          name: "File Upload Field Options",
          dataType: "map",
          expanded: false,
          properties: {
            fileName: {
              dataType: "string",
              name: "Custom File Name",
            },
            storagePath: {
              dataType: "string",
              name: "Storage Path",
              validation: { required: true },
            },
            accecptedTypes: {
              dataType: "array",
              name: "Accepted Types",
              of: {
                dataType: "string",
                name: "Type",
              },
            },
            maxSize: {
              dataType: "number",
              name: "Max Size",
            },
            metadata: {
              dataType: "map",
              keyValue: true,
              name: "Metadata",
            },
          },
        };
      }
      break;
    case "switch":
      return {
        name: "Switch Field Options",
        dataType: "map",
        expanded: false,
        properties: {},
      };
      break;
    case "date":
      return {
        name: "Date Field Options",
        dataType: "map",
        expanded: false,
        properties: {
          type: {
            dataType: "string",
            name: "Type",
            clearable: true,
            enumValues: {
              date: "Date",
              date_time: "Date Time",
            },
          },
          autoValue: {
            dataType: "string",
            name: "Auto Value",
            clearable: true,
            enumValues: {
              on_create: "On Create",
              on_update: "On Update",
            },
          },
        },
      };
      break;
    case "group":
      if (depth < 12)
        return {
          name: `Group Fields`,
          dataType: "array",
          expanded: false,
          of: (props) => {
            console.log("Group", props.propertyValue);

            return dynamicPropertyBuilder({
              propertyValue: props.propertyValue,
              depth: depth + 1,
            });
          },
        };
      break;
    case "repeat":
      console.log("Repeat", value);
      // if (depth < 12)
      //   return dynamicPropertyBuilder({
      //     propertyValue: value,
      //     depth: depth + 1,
      //     isRepeat: true,
      //   });

      break;
    default:
      break;
  }
}

const dynamicPropertyBuilder = ({
  propertyValue,
  isRepeat = false,
  depth = 0,
}: {
  propertyValue;
  isRepeat?: boolean;
  depth?: number;
}): {
  dataType: "map";
  name: string;
  properties: any;
  expanded: boolean;
} => {
  const properties = buildProperties<any>({
    name: {
      dataType: "string",
      name: "Name",
      validation: { required: true },
      previewAsTag: true,
    },
    type: {
      dataType: "string",
      name: "Type",
      validation: { required: true },
      enumValues:
        depth < 12
          ? isRepeat
            ? {
                text: "Text",
                select: "Select",
                fileUpload: "File Upload",
                switch: "Switch",
                date: "Date",
                group: "Group",
              }
            : {
                text: "Text",
                select: "Select",
                fileUpload: "File Upload",
                switch: "Switch",
                date: "Date",
                group: "Group",
                repeat: "Repeat",
              }
          : {
              text: "Text",
              select: "Select",
              fileUpload: "File Upload",
              switch: "Switch",
              date: "Date",
            },
    },
    description: {
      dataType: "string",
      name: "Description",
    },
    required: {
      dataType: "boolean",
      name: "Required",
    },
  });
  if (propertyValue?.type) {
    properties.fieldOptions = (props) =>
      propertyOptionBuilder(propertyValue?.type, propertyValue, depth);
  }

  return {
    dataType: "map",
    name: propertyValue?.name || "New Field",
    properties: properties,
    expanded: false,
  };
};

export const DynamicCollectionBuilder =
  buildCollection<dynamicCollectionBuilder>({
    name: "Dynamic Collections",
    singularName: "Dynamic Collection",
    path: "dynamicCollections",
    group: "Administration",
    icon: "Storage",
    permissions: ({ authController, user }) => ({
      read: true,
      edit: true,
      create: true,
      delete: true,
    }),
    callbacks: {
      onSaveSuccess: ({ context }) => {
        context.navigation.refreshNavigation();
      },
      onDelete: ({ context }) => {
        context.navigation.refreshNavigation();
      },
    },
    properties: {
      name: {
        name: "Name",
        dataType: "string",
        description: "Name of the collection",
        validation: { required: true },
      },
      singluarName: {
        name: "Singular Name",
        dataType: "string",
        validation: { required: true },
      },
      description: {
        name: "Singular Name",
        dataType: "string",
        validation: { required: true },
      },
      path: {
        name: "path",
        dataType: "string",
        validation: { required: true },
      },
      icon: {
        name: "Icon",
        dataType: "string",
        description: "Material Icon Name",
      },
      fields: {
        name: "Fields",
        dataType: "array",
        validation: { required: true },
        of: ({ propertyValue }) => {
          return dynamicPropertyBuilder({ propertyValue });
        },
      },
      // blocks: {
      //   name: "Blocks",
      //   dataType: "array",
      //   validation: { required: true },
      //   oneOf: () => ({
      //     typeField: "type",
      //     valueField: "value",

      //     properties: {
      //       text: () => ({
      //         dataType: "map",
      //         expanded: false,
      //         name: "Text Field",
      //         properties: buildProperties<any>({
      //           multiline: {
      //             dataType: "boolean",
      //             name: "Multiline",
      //           },
      //           markdown: {
      //             dataType: "boolean",
      //             name: "Markdown",
      //           },
      //           email: {
      //             dataType: "boolean",
      //             name: "Email",
      //           },
      //           url: {
      //             dataType: "boolean",
      //             name: "URL",
      //           },
      //         }),
      //       }),
      //       select: {
      //         dataType: "map",
      //         expanded: false,
      //         properties: {
      //           multiple: {
      //             dataType: "boolean",
      //             name: "Multiple",
      //           },
      //           options: {
      //             dataType: "array",
      //             name: "Options",
      //             validation: { required: true },
      //             of: {
      //               dataType: "map",
      //               spreadChildren: true,
      //               properties: {
      //                 label: {
      //                   dataType: "string",
      //                   name: "Label",
      //                 },
      //                 value: {
      //                   dataType: "string",
      //                   name: "Value",
      //                 },
      //               },
      //             },
      //           },
      //         },
      //       },
      //     },
      //   }),
      // },
    },
  });
