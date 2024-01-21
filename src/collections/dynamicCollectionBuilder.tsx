import { buildCollection, buildProperties } from "firecms";

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
      type: "number";
      description?: string;
      fieldOptions?: {
        max?: number;
        min?: number;
        lessThan?: number;
        moreThan?: number;
        positive?: boolean;
        negative?: boolean;
        integer?: boolean;
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

type Permissions = {
  read: boolean;
  edit: boolean;
  create: boolean;
  delete: boolean;
};

export type dynamicCollectionBuilder = {
  name: string;
  singluarName: string;
  description?: string;
  path: string;
  icon: string;
  fields: dynamicField[];
  permissions: {
    admin: Permissions;
    editor: Permissions;
    user: Permissions;
    anonymous: Permissions;
  };
  frontendSubmissions?: {
    loggedInOnly: boolean;
    singleSubmission: boolean;
  };
};

function propertyOptionBuilder(
  type:
    | "text"
    | "number"
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
    case "number":
      return {
        name: "Number Field Options",
        dataType: "map",
        expanded: false,
        properties: {
          max: {
            dataType: "number",
            name: "Max",
          },
          min: {
            dataType: "number",
            name: "Min",
          },
          lessThan: {
            dataType: "number",
            name: "Less Than",
          },
          moreThan: {
            dataType: "number",
            name: "More Than",
          },
          positive: {
            dataType: "boolean",
            name: "Positive",
          },
          negative: {
            dataType: "boolean",
            name: "Negative",
          },
          integer: {
            dataType: "boolean",
            name: "Integer",
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
                id: {
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
      return {
        name: "File Upload Field Options",
        dataType: "map",
        expanded: false,
        properties: {
          fileName: {
            dataType: "string",
            defaultValue: "{entityId}/{file.ext}",
            description:
              "Do not change the default value unless unless you are confident that the file name will be unique.",
          },
          storagePath: {
            dataType: "string",
            name: "Storage Path",
            validation: { required: true },
            defaultValue: "uploads/{userId}",
            description:
              "Do not change the default value unless you know what permissions are available to each user.",
          },
          accecptedTypes: {
            dataType: "array",
            name: "Accepted Types",
            description:
              "All MIME types can be used with build-in support for image/*, video/*, audio/*. Leave empty to accept all types.",
            of: {
              dataType: "string",
              name: "Type",
            },
          },
          maxSize: {
            dataType: "number",
            name: "Max Size",
            description: "In Mbs",
          },
          metadata: {
            dataType: "map",
            keyValue: true,
            name: "Metadata",
          },
        },
      };
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
            return dynamicPropertyBuilder({
              propertyValue: props.propertyValue,
              depth: depth + 1,
            });
          },
        };
      break;
    case "repeat":
      if (depth < 12)
        return dynamicPropertyBuilder({
          propertyValue: value,
          depth: depth + 1,
          isRepeat: true,
        });

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
  previewAsTag: boolean;
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
                number: "Number",
                select: "Select",
                fileUpload: "File Upload",
                switch: "Switch",
                date: "Date",
                group: "Group",
              }
            : {
                text: "Text",
                number: "Number",
                select: "Select",
                fileUpload: "File Upload",
                switch: "Switch",
                date: "Date",
                group: "Group",
                repeat: "Repeat",
              }
          : {
              text: "Text",
              number: "Number",
              select: "Select",
              fileUpload: "File Upload",
              switch: "Switch",
              date: "Date",
            },
      previewAsTag: true,
    },
    description: {
      dataType: "string",
      name: "Description",
      previewAsTag: false,
    },
    required: {
      dataType: "boolean",
      name: "Required",
    },
  });
  if (propertyValue?.type) {
    properties.fieldOptions = (props) =>
      propertyOptionBuilder(propertyValue?.type, props.propertyValue, depth);
  }

  return {
    dataType: "map",
    name: propertyValue?.name || "New Field",
    properties: properties,
    expanded: false,
    previewAsTag: false,
  };
};

const PermissionProperties = (defaultValue: boolean) =>
  buildProperties<Permissions>({
    read: {
      name: "Read",
      dataType: "boolean",
      defaultValue: defaultValue,
    },
    edit: {
      name: "Edit",
      dataType: "boolean",
      defaultValue: defaultValue,
    },
    create: {
      name: "Create",
      dataType: "boolean",
      defaultValue: defaultValue,
    },
    delete: {
      name: "Delete",
      dataType: "boolean",
      defaultValue: defaultValue,
    },
  });

export const DynamicCollectionBuilder =
  buildCollection<dynamicCollectionBuilder>({
    name: "Dynamic Collections",
    singularName: "Dynamic Collection",
    path: "dynamicCollections",
    group: "Administration",
    icon: "Storage",
    permissions: ({ authController, user }) => {
      const isAdmin = authController.extra?.role == "admin";
      return { read: isAdmin, edit: isAdmin, create: isAdmin, delete: isAdmin };
    },
    callbacks: {
      onSaveSuccess: ({ context }) => {
        context.navigation.refreshNavigation();
      },
      onDelete: ({ context }) => {
        context.navigation.refreshNavigation();
      },
      onIdUpdate(idUpdateProps) {
        return idUpdateProps.values.path || idUpdateProps.entityId;
      },
    },
    properties: {
      name: (props) => {
        return {
          name: "Name",
          dataType: "string",
          description: "Name of the collection",
          validation: { required: true },
        };
      },
      singluarName: {
        name: "Singular Name",
        dataType: "string",
        description: "Singular Name of the collection.",
        validation: { required: true },
      },
      description: {
        name: "Description",
        dataType: "string",
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
      permissions: {
        name: "Permissions",
        expanded: false,
        dataType: "map",
        properties: {
          admin: {
            name: "Admin",
            dataType: "map",
            properties: PermissionProperties(true),
            defaultValue: {
              read: true,
              edit: true,
              create: true,
              delete: true,
            },
          },
          editor: {
            name: "Editor",
            dataType: "map",
            properties: PermissionProperties(true),
            defaultValue: {
              read: true,
              edit: true,
              create: true,
              delete: true,
            },
          },
          user: {
            name: "User",
            dataType: "map",
            properties: PermissionProperties(false),
            defaultValue: {
              read: true,
              edit: false,
              create: false,
              delete: false,
            },
          },
          anonymous: {
            name: "Anonymous",
            dataType: "map",
            properties: PermissionProperties(false),
            defaultValue: {
              read: true,
              edit: false,
              create: false,
              delete: false,
            },
          },
        },
      },
    },
  });
