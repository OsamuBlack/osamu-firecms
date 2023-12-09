import { buildCollection, buildProperty, EntityReference } from "firecms";

export type User = {
  identifier: string;
  role: string;
};

export const usersCollection = buildCollection<User>({
  name: "Users",
  singularName: "User",
  path: "users",
  icon: "Person",
  group: "Administration",
  
  permissions: ({ authController, user }) => ({
    read: true,
    edit: true,
    create: false,
    delete: false,
  }),
  properties: {
    identifier: {
      name: "Identifier",
      validation: { required: true },
      dataType: "string",
    },
    role: {
      name: "Role",
      validation: { required: true },
      dataType: "string",
      enumValues: {
        admin: "Admin",
        user: "User",
      }
    },
  },
});
