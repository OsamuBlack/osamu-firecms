import {
  AuthController,
  buildCollection,
  buildProperty,
  DataSource,
  EntityCollection,
  User,
} from "firecms";

import { pageCollection } from "./pages";
import { usersCollection } from "./users";
import { settingsCollection } from "./settings";
import {
  DynamicCollectionBuilder,
  dynamicCollectionBuilder,
  dynamicField,
} from "./dynamicCollectionBuilder";
import { Dispatch, SetStateAction } from "react";

const fieldNamesToTypeMap: {
  text: "string";
  number: "number";
  select: "string";
  switch: "boolean";
  fileUpload: "string";
  date: "date";
  group: "map";
  repeat: "array";
} = {
  text: "string",
  number: "number",
  select: "string",
  switch: "boolean",
  fileUpload: "string",
  date: "date",
  group: "map",
  repeat: "array",
};

const DynamicFieldBuilder = (fields: dynamicField[], userId: string) => {
  let properties = {};
  fields.forEach((field) => {
    switch (field.type) {
      case "text":
        properties[field.name] = buildProperty({
          name: field.name,
          dataType: "string",
          description: field.description,
          validation: { required: field.required },
          multiline: field.fieldOptions?.multiline,
          email: field.fieldOptions?.email,
          url: field.fieldOptions?.url,
          markdown: field.fieldOptions?.markdown,
        });
        break;
      case "number":
        properties[field.name] = buildProperty({
          name: field.name,
          dataType: "number",
          description: field.description,
          validation: { required: field.required },
          min: field.fieldOptions?.min,
          max: field.fieldOptions?.max,
          lessThan: field.fieldOptions?.lessThan,
          moreThan: field.fieldOptions?.moreThan,
          positive: field.fieldOptions?.positive,
          negative: field.fieldOptions?.negative,
          integer: field.fieldOptions?.integer,
        });
        break;
      case "select":
        if (field.fieldOptions.multiple) {
          properties[field.name] = buildProperty({
            name: field.name,
            dataType: "array",
            description: field.description,
            of: {
              dataType: "string",
              enumValues: field.fieldOptions.options,
            },
          });
        } else {
          properties[field.name] = buildProperty({
            name: field.name,
            dataType: "string",
            description: field.description,
            validation: { required: field.required },
            enumValues: field.fieldOptions.options,
          });
        }
        break;
      case "fileUpload":
        properties[field.name] = (props) =>
          buildProperty({
            name: field.name,
            dataType: "string",
            description: field.description,
            storage: {
              storagePath: field.fieldOptions?.storagePath.replace(
                "{userId}",
                userId
              ),
              acceptedFiles: field.fieldOptions?.accecptedTypes,
              fileName: field.fieldOptions?.fileName,
              metadata: field.fieldOptions?.metadata,
              maxSize: field.fieldOptions?.maxSize * 1024 * 1024,
            },
            validation: { required: field.required },
          });
        break;
      case "switch":
        properties[field.name] = buildProperty({
          name: field.name,
          dataType: "boolean",
          description: field.description,
          validation: { required: field.required },
        });
        break;
      case "date":
        properties[field.name] = buildProperty({
          name: field.name,
          dataType: "date",
          description: field.description,
          validation: { required: field.required },
        });
        if (field.fieldOptions?.type) {
          properties[field.name].mode = field.fieldOptions?.type;
        }
        if (field.fieldOptions?.autoValue) {
          properties[field.name].autoValue = field.fieldOptions?.autoValue;
        }
        break;
      case "group":
        properties[field.name] = buildProperty({
          name: field.name,
          dataType: "map",
          description: field.description,
          properties: DynamicFieldBuilder(field.fieldOptions, userId),
          validation: { required: field.required },
        });
        break;
      case "repeat":
        properties[field.name] = buildProperty({
          name: field.name,
          dataType: "array",
          description: field.description,
          of: {
            dataType: fieldNamesToTypeMap[field.fieldOptions?.type],
            name: field.fieldOptions?.name,
            properties: DynamicFieldBuilder([field.fieldOptions], userId),
          },
          validation: { required: field.required },
        });
        break;
      default:
        break;
    }
  });
  return properties;
};

const DynamicCollections = async (
  props: {
    user: User;
    authController: AuthController;
    dataSource: DataSource;
  },
  setLoading: Dispatch<SetStateAction<boolean>>
): Promise<EntityCollection[]> => {
  const collections =
    await props.dataSource.fetchCollection<dynamicCollectionBuilder>({
      path: "dynamicCollections",
      collection: DynamicCollectionBuilder,
    });

  const dynamicCollections = collections.map((collection) => {
    const properties = DynamicFieldBuilder(
      collection.values.fields,
      props.authController.user.uid
    );
    return buildCollection({
      name: collection.values.name,
      path: `dynamicCollections/${collection.values.path}/documents`,
      group: "Dynamic Collections",
      singularName: collection.values.singluarName,
      icon: collection.values.icon,
      permissions: {
        read:
          (props.authController.extra?.role == "admin" &&
            collection.values.permissions.admin.read) ||
          (props.authController.extra?.role == "editor" &&
            collection.values.permissions.editor.read),
        edit:
          (props.authController.extra?.role == "admin" &&
            collection.values.permissions.admin.edit) ||
          (props.authController.extra?.role == "editor" &&
            collection.values.permissions.editor.edit),
        create:
          (props.authController.extra?.role == "admin" &&
            collection.values.permissions.admin.create) ||
          (props.authController.extra?.role == "editor" &&
            collection.values.permissions.editor.create),
        delete:
          (props.authController.extra?.role == "admin" &&
            collection.values.permissions.admin.delete) ||
          (props.authController.extra?.role == "editor" &&
            collection.values.permissions.editor.delete),
      },
      properties: properties,
    });
  });

  setLoading(false);
  if (props.authController.extra?.role == "editor")
    return [
      pageCollection,
      ...dynamicCollections.filter(
        (collection, index) => collections[index].values.permissions.editor.read
      ),
    ];

  return [
    pageCollection,
    usersCollection,
    settingsCollection,
    DynamicCollectionBuilder,
    ...dynamicCollections,
  ];
};

export default DynamicCollections;
