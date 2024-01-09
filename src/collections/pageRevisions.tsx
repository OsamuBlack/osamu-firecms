import {
  buildCollection,
  buildProperty,
  useDataSource,
  useSideEntityController,
} from "firecms";
import Button from "@mui/material/Button";
import { Box, FormControl, FormLabel, Typography } from "@mui/material";
import PagePreview from "../components/pagePreview.tsx";
import { pageCollection } from "./pages.tsx";

export type Revision = {
  content: object;
  metadata: object;
  dateCreated: Date;
};

export const pageRevisionCollection = buildCollection<Revision>({
  name: "Revisions",
  singularName: "Revision",
  path: "revisions",
  views: [
    {
      path: "preview",
      name: "Preview",
      Builder: PagePreview,
    },
  ],
  permissions: ({ authController, user }) => ({
    read: true,
    edit: true,
    create: false,
    delete: true,
  }),
  properties: {
    content: {
      name: "Content",
      dataType: "map",
      description: "Use the Page Builder to edit this content.",
      keyValue: true,
      Field: (props) => {
        const sideEntityController = useSideEntityController();
        const dataSource = useDataSource();
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
            <Box display={"flex"} overflow={"hidden"} gap={1}>
              <Button
                variant="outlined"
                onClick={() => {
                  dataSource.saveEntity({
                    path: "pages",
                    collection: pageCollection,
                    entityId: props.context.path.split("/")[1],
                    status: "existing",
                    values: {
                      content: props.context.values.content,
                    },
                  });
                }}
              >
                Restore this revision
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  sideEntityController.open({
                    entityId: props.context.entityId,
                    path: `/pages/${
                      props.context.path.split("/")[1]
                    }/revisions`,
                    selectedSubPath: "preview",
                    collection: pageRevisionCollection,
                  })
                }
                sx={{ width: "100%" }}
              >
                Preview
              </Button>
            </Box>
          </Box>
        );
      },
    },

    dateCreated: buildProperty({
      name: "Date Created",
      dataType: "date",
      autoValue: "on_create",
    }),
    metadata: {
      name: "Metadata",
      dataType: "map",
      keyValue: true,
    },
  },
});
