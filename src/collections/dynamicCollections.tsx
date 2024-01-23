import {
  AuthController,
  buildCollection,
  buildProperty,
  DataSource,
  EntityCollection,
  EntityReference,
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
import { Timestamp } from "firebase/firestore";

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
              storagePath:
                field.fieldOptions?.storagePath?.replace("{userId}", userId) ||
                `uploads/${userId}`,
              acceptedFiles: field.fieldOptions?.accecptedTypes,
              fileName:
                field.fieldOptions?.fileName ||
                `{entityId}-${field.name}.{file.ext}`,
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

  let dynamicCollections = [];

  collections.forEach((collection) => {
    const properties = DynamicFieldBuilder(
      collection.values.fields,
      props.authController.user.uid
    );
    dynamicCollections.push(
      buildCollection({
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
        callbacks: {
          // onPreSave(entitySaveProps) {
          //   const content = props.authController.extra.content;
          //   if (
          //     collection.values.singleSubmission &&
          //     entitySaveProps.status == "new" &&
          //     content[collection.values.path] &&
          //     JSON.stringify(content[collection.values.path]).includes(
          //       '"action":"create"'
          //     )
          //   ) {
          //     throw new Error(
          //       "You can only submit once. Please ask admin to delete your previous submission to create a new one."
          //     );
          //   }
          //   return entitySaveProps;
          // },
          onSaveSuccess(entity) {
            if (
              entity.previousValues == null &&
              collection.values.approvalsTable.enabled
            ) {
              entity.context.dataSource.saveEntity({
                path: `dynamicCollections/${collection.values.path}/approvals`,
                entityId: entity.entityId,
                collection: entity.collection,
                values: {
                  reference: new EntityReference(
                    entity.entityId,
                    entity.collection.path
                  ),
                },
                status: "new",
              });
            }
            entity.context.dataSource.saveEntity({
              path: usersCollection.path,
              entityId: props.authController.user.uid,
              collection: usersCollection,
              values: {
                content: {
                  [collection.values.path]: {
                    [entity.entityId]: {
                      action: entity.previousValues == null ? "create" : "edit",
                      timestamp: new Date(),
                    },
                  },
                },
              },
              status: "existing",
            });
          },
          onDelete(entityDeleteProps) {
            if (collection.values.approvalsTable.enabled) {
              entityDeleteProps.context.dataSource.deleteEntity({
                entity: {
                  id: entityDeleteProps.entity.id,
                  path: `dynamicCollections/${collection.values.path}/approvals`,
                  values: null,
                },
              });
            }
            entityDeleteProps.context.dataSource.saveEntity({
              path: usersCollection.path,
              entityId: props.authController.user.uid,
              collection: usersCollection,
              values: {
                content: {
                  [collection.values.path]: {
                    [entityDeleteProps.entityId]: {
                      action: "delete",
                      timestamp: new Date(),
                    },
                  },
                },
              },
              status: "existing",
            });
          },
        },
      })
    );

    if (collection.values.approvalsTable.enabled) {
      const approvalsProperties = DynamicFieldBuilder(
        collection.values.approvalsTable.fields,
        props.authController.user.uid
      );
      dynamicCollections.push(
        buildCollection({
          name: collection.values.name + " Approvals",
          path: `dynamicCollections/${collection.values.path}/approvals`,
          group: "Dynamic Collections",
          singularName: collection.values.singluarName + " Approval",
          icon: "TaskAlt",
          permissions: {
            read:
              (props.authController.extra?.role == "admin" &&
                collection.values.approvalsTable.permissions.admin.read) ||
              (props.authController.extra?.role == "editor" &&
                collection.values.approvalsTable.permissions.editor.read),
            edit:
              (props.authController.extra?.role == "admin" &&
                collection.values.approvalsTable.permissions.admin.edit) ||
              (props.authController.extra?.role == "editor" &&
                collection.values.approvalsTable.permissions.editor.edit),
            create:
              (props.authController.extra?.role == "admin" &&
                collection.values.approvalsTable.permissions.admin.create) ||
              (props.authController.extra?.role == "editor" &&
                collection.values.approvalsTable.permissions.editor.create),
            delete:
              (props.authController.extra?.role == "admin" &&
                collection.values.approvalsTable.permissions.admin.delete) ||
              (props.authController.extra?.role == "editor" &&
                collection.values.approvalsTable.permissions.editor.delete),
          },
          properties: {
            reference: buildProperty({
              name: "Reference",
              dataType: "reference",
              previewProperties: ["Name.First Name", "Name.Last Name"],
              description: "Reference to the main collection",
              path: `dynamicCollections/${collection.values.path}/documents`,
              validation: { required: true },
            }),
            ...approvalsProperties,
          },
          callbacks: {
            onSaveSuccess(entity) {
              entity.context.dataSource.saveEntity({
                path: usersCollection.path,
                entityId: props.authController.user.uid,
                collection: usersCollection,
                values: {
                  content: {
                    [collection.values.path]: {
                      [entity.entityId]: {
                        action:
                          entity.previousValues == null ? "create" : "edit",
                        timestamp: new Date(),
                      },
                    },
                  },
                },
                status: "existing",
              });
            },
            onDelete(entityDeleteProps) {
              entityDeleteProps.context.dataSource.deleteEntity({
                entity: {
                  id: entityDeleteProps.entity.values.reference.id,
                  path: entityDeleteProps.entity.values.reference.path,
                  values: null,
                },
              });
              entityDeleteProps.context.dataSource.saveEntity({
                path: usersCollection.path,
                entityId: props.authController.user.uid,
                collection: usersCollection,
                values: {
                  content: {
                    [collection.values.path]: {
                      [entityDeleteProps.entityId]: {
                        action: "delete",
                        timestamp: new Date(),
                      },
                    },
                  },
                },
                status: "existing",
              });
            },
          },
        })
      );
    }
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
    settingsCollection,
    DynamicCollectionBuilder,
    usersCollection,
    ...dynamicCollections,
  ];
};

export default DynamicCollections;
