import BackgroundProps from "../../fields/background/backgroundType";

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

type FormProps = {
  collection:
    | {
        id: string;
        name: string;
        singularName: string;
        path: string;
        icon: string;
        fields: dynamicField[];
      }
    | undefined;
  background: BackgroundProps;
  theme: "light" | "dark";
};

export default FormProps;
