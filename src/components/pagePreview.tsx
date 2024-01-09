import { EntityCustomViewParams } from "firecms";
import config from "../../puckConfig/puck.config.tsx";
import { edraakTheme } from "../lib/mui-theme.ts";
import { Config, Data, Render } from "@measured/puck";
import { ThemeProvider } from "@mui/material";
import { Page } from "../collections/pages.tsx";
import { Revision } from "../collections/pageRevisions.tsx";

export default function PagePreview<T extends Page | Revision>(
  props: EntityCustomViewParams<T>
) {
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
      <div style={{ zoom: 0.75 }}>
        <Render config={config as Config} data={data} />
      </div>
    </ThemeProvider>
  );
}
