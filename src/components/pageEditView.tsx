import "@measured/puck/puck.css"
import { EntityCustomViewParams } from "firecms";
import config from "../../puckConfig/puck.config.tsx";
import { edraakTheme } from "../lib/mui-theme.ts";
import { Page } from "../collections/pages.tsx";
import { Data, Puck } from "@measured/puck";
import { Box, ThemeProvider } from "@mui/material";
import headingAnalyzer from "@measured/puck-plugin-heading-analyzer";

export default function PageEditView(props: EntityCustomViewParams<Page>) {
  const data: Data = (props.modifiedValues?.content as Data) ||
    (props.entity.values.content as Data) || {
      content: [],
      root: {
        props: {
          title: "Preview",
        },
      },
      zones: {},
    };

  return (
    <ThemeProvider theme={edraakTheme}>
      <Puck
        overrides={{
          header: (props) => {
            return <Box sx={{
              position: "fixed",
              bottom: "1rem",
              left: "1rem",
              zIndex: 1,
            }}>{props.actions}</Box>;
          },
          preview: ({ children }) => (
            <div
              style={{
                background: "rgba(255,255,255,0.8",
                color: "#000",
                zoom: 0.75,
              }}
            >
              {children}
            </div>
          ),
          fields: ({ children }) => (
            <div className="PuckFieldsContainer" style={{ color: "inherit" }}>
              {children}
            </div>
          ),
        }}
        config={config}
        data={data as Data}
        onPublish={(data) => props.formContext.setFieldValue("content", data)}
        plugins={[headingAnalyzer]}
      />
    </ThemeProvider>
  );
}
