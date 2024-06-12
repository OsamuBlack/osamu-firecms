import {
  DataSource,
  EntityCollection,
  buildCollection,
  buildProperty,
} from "firecms";
import { FormCollectionProps, forms } from "./forms";

export const formResponsesCollections = async (props: {
  dataSource: DataSource;
}): Promise<EntityCollection[]> => {
  const collections =
    await props.dataSource.fetchCollection<FormCollectionProps>({
      path: "forms",
      collection: forms,
    });

  let ResponsesCollections = [];

  collections.forEach((collection) => {
    const properties = {};
    collection.values.fields.forEach((field) => {
      switch (field.type) {
        case "group":
          break;
        case "text":
          properties[field.value.label.toLowerCase().replace(" ", "-")] =
            buildProperty({
              name: field.value.label,
              dataType: "string",
              validation: { required: field.value.required },
            });
          break;
        case "number":
          properties[field.value.label.toLowerCase().replace(" ", "-")] =
            buildProperty({
              name: field.value.label,
              dataType: "number",
              validation: {
                required: field.value.required,
                min: field.value.min,
                max: field.value.max,
                integer: field.value.integer,
              },
            });
          break;
        case "email":
          properties[field.value.label.toLowerCase().replace(" ", "-")] =
            buildProperty({
              name: field.value.label,
              dataType: "string",
              validation: { required: field.value.required },
              email: true,
            });
          break;
        case "file":
        case "url":
          properties[field.value.label.toLowerCase().replace(" ", "-")] =
            buildProperty({
              name: field.value.label,
              dataType: "string",
              validation: { required: field.value.required },
              url: true,
            });
          break;
        case "textarea":
          properties[field.value.label.toLowerCase().replace(" ", "-")] =
            buildProperty({
              name: field.value.label,
              dataType: "string",
              validation: { required: field.value.required },
              multiline: true,
            });
          break;
        case "select":
        case "radio":
          properties[field.value.label.toLowerCase().replace(" ", "-")] =
            buildProperty({
              name: field.value.label,
              dataType: "string",
              validation: { required: field.value.required },
              enumValues: field.value.options.reduce((acc, option) => {
                acc[option.value] = option.label;
                return acc;
              }, {}),
            });
          break;
        case "checkbox":
          properties[field.value.label.toLowerCase().replace(" ", "-")] =
            buildProperty({
              name: field.value.label,
              dataType: "string",
              of: {
                dataType: "string",
                enumValues: field.value.options.reduce((acc, option) => {
                  acc[option.value] = option.label;
                  return acc;
                }, {}),
              },
              validation: { required: field.value.required },
            });
          break;
        case "date":
          properties[field.value.label.toLowerCase().replace(" ", "-")] =
            buildProperty({
              name: field.value.label,
              dataType: "date",
              validation: {
                required: field.value.required,
                from: field.value.from,
                to: field.value.to,
              },
            });
          break;
      }
    });

    ResponsesCollections.push(
      buildCollection({
        name: collection.values.name,
        path: `forms/${collection.id}/responses`,
        singularName: "",
        icon: "Input",
        group: "Forms",
        properties: properties,
      })
    );
  });

  return ResponsesCollections;
};
