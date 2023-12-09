import { buildCollection } from "firecms";

export type Settings = {
  data: object;
  description: string;
};

export const settingsCollection = buildCollection<Settings>({
  name: "Settings",
  singularName: "Settings",
  path: "settings",
  icon: "Settings",
  group: "Administration",
  customId: true,
  permissions: ({ authController, user }) => ({
    read: true,
    edit: true,
    create: true,
    // delete: true,
  }),
  properties: {
    data: {
      name: "data",
      dataType: "map",
      keyValue: true,
    },
    description: {
      name: "Description",
      dataType: "string",
    },
  },
});
