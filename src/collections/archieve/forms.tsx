import { PropertiesOrBuilders, buildCollection } from "firecms";

export const formeCollection = (
  formPath: string,
  properties: PropertiesOrBuilders
) =>
  buildCollection({
    path: `forms/${formPath}/responses`,
    name: "Forms",
    icon: "Form",
    singularName: "Forms",
    properties,
  });
