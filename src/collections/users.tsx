import { Timestamp } from "firebase/firestore";
import { buildCollection } from "firecms";

export type User = {
  identifier: string;
  email: string;
  isAdmin: boolean;
  isEditor: boolean;
  content: {
    [colletionPath: string]: {
      [documentId: string]: {
        action: "read" | "edit" | "create" | "delete";
        timestamp: Date;
      };
    };
  };
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
    content: {
      name: "Content",
      dataType: "map",
      keyValue: true,
      // properties: {
      //   collection: {
      //     name: "Collection",
      //     dataType: "map",
      //     properties: {
      //       document: {
      //         name: "Document",
      //         dataType: "map",
      //         properties: {
      //           action: {
      //             name: "Action",
      //             dataType: "string",
      //             enumValues: {
      //               read: "Read",
      //               edit: "Edit",
      //               create: "Create",
      //               delete: "Delete",
      //             },
      //           },
      //           timestamp: {
      //             name: "Timestamp",
      //             dataType: "date",
      //           },
      //         },
      //       }
      //     }
      //   }
      // }
    },
  },
});
