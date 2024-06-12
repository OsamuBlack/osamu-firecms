import { buildCollection } from "firecms";

export type Page = {
  root: {
    props: {
      title: string;
      description: string;
      canonical: string;
      icon: {
        light: string;
        dark: string;
      };
      robot: {
        index: boolean;
        follow: boolean;
      };
    };
  };
  content: object;
  zones: object;
};

export const pageCollection = buildCollection<Page>({
  name: "Pages",
  singularName: "Page",
  path: "pages",
  icon: "Article",
  group: "CMS",
  customId: true,
  permissions: {
    read: true,
    create: true,
    edit: true,
    delete: true,
  },
  properties: {
    root: {
      dataType: "map",
      spreadChildren: true,
      name: "",
      properties: {
        props: {
          name: "Props",
          dataType: "map",
          spreadChildren: true,
          properties: {
            title: {
              name: "Title",
              dataType: "string",
              defaultValue: "New Page",
            },
            description: {
              name: "Description",
              dataType: "string",
              defaultValue: "New Page Description",
            },
            canonical: {
              name: "Canonical URL",
              dataType: "string",
              defaultValue: "",
            },
            icon: {
              name: "Tab Icons",
              dataType: "map",
              spreadChildren: true,
              properties: {
                light: {
                  name: "Tab Icon Light",
                  dataType: "string",
                  defaultValue: "",
                },
                dark: {
                  name: "Tab Icon Dark",
                  dataType: "string",
                  defaultValue: "",
                },
              },
            },
            robot: {
              name: "Bot Settings",
              dataType: "map",
              spreadChildren: true,
              properties: {
                index: {
                  name: "Bot Index",
                  dataType: "boolean",
                  defaultValue: true,
                },
                follow: {
                  name: "Bot Follow",
                  dataType: "boolean",
                  defaultValue: true,
                },
              },
            },
          },
        },
      },
    },
    content: {
      dataType: "map",
      keyValue: true,
      hideFromCollection: true,
    },
    zones: {
      dataType: "map",
      keyValue: true,
      hideFromCollection: true,
    },
  },
});
