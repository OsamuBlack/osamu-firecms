import { useSideEntityController } from "firecms";

import {
  buildCollection,
  buildEntityCallbacks,
  buildProperty,
  EntityReference,
} from "firecms";
import Button from "@mui/material/Button";

import { generateURI } from "../lib/generateUri.tsx";
import { Box, Typography } from "@mui/material";
import { pageRevisionCollection } from "./pageRevisions.tsx";
import { settingsCollection } from "./settings.tsx";
import PagePreview from "../components/pagePreview.tsx";

export type Page = {
  title: string;
  slug: string;
  status: string;
  tags: string[];
  category: string;
  content: object;
  metadata: object;
  parent: EntityReference;
  dateCreated: Date;
  dateUpdated: Date;
};

export const pageCollection = buildCollection<Page>({
  name: "Pages",
  singularName: "Page",
  path: "pages",
  icon: "Article",
  group: "CMS",
  customId: false,
  views: [
    {
      path: "preview",
      name: "Preview",
      Builder: PagePreview<Page>,
    },
  ],
  permissions: ({ authController, user }) => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),
  subcollections: [pageRevisionCollection],
  properties: {
    title: buildProperty({
      name: "Title",
      validation: { required: true },
      dataType: "string",
    }),
    slug: buildProperty({
      name: "Slug",
      validation: { required: true },
      dataType: "string",
      description: "The slug is used to generate the page URL",
      unique: true,
      uri: true,
    }),
    content: {
      name: "Content",
      dataType: "map",
      description: "Use the Page Builder to edit this content.",
      expanded: true,
      keyValue: true,
      Field: (props) => {
        const uri = generateURI(
          props.context.values.slug,
          props.context.values.parent?.id
        );
        const sideEntityController = useSideEntityController();
        return (
          <Box
            display={"flex"}
            flexDirection={"column"}
            overflow={"hidden"}
            gap={1}
            sx={{
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "6px",
              padding: "1rem",
            }}
          >
            <Box>
              <Typography variant={"body1"}>Content</Typography>
            </Box>

            <Button
              variant="outlined"
              href={`${import.meta.env.VITE_SITEURL}/${uri}/edit`}
              target="_blank"
            >
              Edit in the Page Builder
            </Button>
            <Box display={"flex"} overflow={"hidden"} gap={1}>
              <Button
                variant="outlined"
                onClick={() =>
                  sideEntityController.open({
                    entityId: props.context.entityId,
                    path: `/pages`,
                    selectedSubPath: "preview",
                    collection: props.context.collection,
                  })
                }
                sx={{ width: "100%" }}
              >
                Preview
              </Button>
              <Button
                variant="outlined"
                href={`${import.meta.env.VITE_SITEURL}/${uri}`}
                target="_blank"
                sx={{ width: "100%" }}
              >
                View Page
              </Button>
            </Box>
          </Box>
        );
      },
    },
    parent: (props) =>
      buildProperty({
        name: "Parent",
        dataType: "reference",
        forceFilter: {
          status: ["==", "published"],
        },

        path: "pages",
        previewProperties: ["title", "slug"],
      }),
    status: {
      name: "Status",
      defaultValue: "draft",
      validation: { required: true },
      dataType: "string",
      description: "Should this page be visible in the website",
      enumValues: {
        private: "Private",
        draft: "Draft",
        published: "Published",
      },
    },
    dateCreated: buildProperty({
      name: "Date Created",
      dataType: "date",
      autoValue: "on_create",
    }),
    dateUpdated: buildProperty({
      name: "Date Updated",
      dataType: "date",
      autoValue: "on_update",
    }),
    tags: {
      name: "Tags",
      description: "Example of generic array",
      dataType: "array",
      of: {
        dataType: "string",
      },
    },
    category: {
      name: "Category",
      dataType: "string",
      enumValues: {
        electronics: "Electronics",
        books: "Books",
        furniture: "Furniture",
        clothing: "Clothing",
        food: "Food",
        footwear: "Footwear",
      },
    },
    metadata: {
      name: "Metadata",
      dataType: "map",
      properties: {
        description: {
          name: "Description",
          dataType: "string",
          multiline: true,
        },
        keywords: {
          name: "Keywords",
          dataType: "string",
          array: true,
        },
        canonical: {
          name: "Canonical",
          dataType: "string",
        },
        openGraph: {
          name: "Open Graph",
          dataType: "map",
          properties: {
            title: {
              name: "Title",
              dataType: "string",
            },
            type: {
              name: "Type",
              dataType: "string",
              enumValues: {
                website: "Website",
                article: "Article",
                book: "Book",
                profile: "Profile",
              },
            },
            description: {
              name: "Description",
              dataType: "string",
            },
            image: {
              name: "Image",
              dataType: "string",
              config: {
                storageMeta: {
                  mediaType: "image",
                },
              },
            },
          },
        },

        twitter: {
          name: "Twitter",
          dataType: "map",
          properties: {
            title: {
              name: "Title",
              dataType: "string",
            },
            description: {
              name: "Description",
              dataType: "string",
            },
            image: {
              name: "Image",
              dataType: "string",
              config: {
                storageMeta: {
                  mediaType: "image",
                },
              },
            },
          },
        },
      },
    },
  },
  callbacks: buildEntityCallbacks({
    onSaveSuccess(entitySaveProps) {
      if (
        entitySaveProps.previousValues == undefined ||
        entitySaveProps.previousValues.slug != entitySaveProps.values.slug ||
        entitySaveProps.previousValues.parent != entitySaveProps.values.parent
      ) {
        entitySaveProps.context.dataSource.saveEntity({
          path: "settings",
          collection: settingsCollection,
          entityId: "pageIdSlugMap",
          values: {
            data: {
              [entitySaveProps.entityId]: {
                slug: entitySaveProps.values.slug,
                parent: entitySaveProps.values.parent,
              },
            },
          },
          status: "existing",
        });
      }
      if (
        entitySaveProps.previousValues == undefined ||
        entitySaveProps.previousValues.content != entitySaveProps.values.content
      ) {
        entitySaveProps.context.dataSource.saveEntity({
          path: `pages/${entitySaveProps.entityId}/revisions`,
          collection: pageRevisionCollection,
          values: {
            content: entitySaveProps.values.content,
            dateCreated: new Date(),
          },
          status: "new",
        });
      }
    },
    onDelete(entityDeleteProps) {
      entityDeleteProps.context.dataSource.saveEntity({
        path: "settings",
        collection: settingsCollection,
        entityId: "pageIdSlugMap",
        values: {
          data: {
            [entityDeleteProps.entityId]: undefined,
          },
        },
        status: "existing",
      });
    },
  }),
});
