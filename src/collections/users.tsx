import { buildCollection, buildProperty, EntityReference } from "firecms";

export type User = {
  identifier: string;
  email: string;
  isAdmin: boolean;
  isEditor: boolean;
};

export const usersCollection = buildCollection<User>({
  name: "Users",
  singularName: "User",
  path: "users",
  icon: "Person",
  group: "Administration",
  permissions: ({ authController, user }) => {
    const isAdmin = authController.extra?.role == "admin";
    return { read: isAdmin, edit: isAdmin, create: isAdmin, delete: isAdmin };
  },
  properties: {
    identifier: {
      name: "Firebase Identifier",
      dataType: "string",
    },
    email: {
      name: "Email",
      dataType: "string",
      clearable: true,
    },
    isAdmin: {
      name: "isAdmin",
      dataType: "boolean",
    },
    isEditor: {
      name: "isEditor",
      dataType: "boolean",
    },
  },
});
