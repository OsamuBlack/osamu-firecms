import "@measured/puck/puck.css";
import headingAnalyzer from "@measured/puck-plugin-heading-analyzer";
import { Config, Data, Puck } from "@measured/puck";
import { Button, Modal, ThemeProvider } from "@mui/material";
import config from "../../puckConfig/puck.config";
import { edraakTheme } from "./mui-theme";
import { MdClose } from "react-icons/md";

export default function PuckEditor({
  open,
  setOpen,
  data,
  onPublish,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: Data;
  onPublish: (data: Data) => void;
}) {
  return (
    <ThemeProvider theme={edraakTheme}>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={{ background: "#fff" }}>
          <Puck
            renderHeaderActions={(data) => {
              return (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setOpen(false)}
                >
                  <MdClose />
                </Button>
              );
            }}
            overrides={{
              preview: ({ children }) => (
                <div
                  style={{ background: "rgba(255,255,255,0.8", color: "#000" }}
                >
                  {children}
                </div>
              ),
              fields: ({ children }) => (
                <div className="PuckFieldsContainer" style={{ color: "inherit", zoom: "0.75" }}>{children}</div>
              ),
            }}
            config={config}
            data={data as Data}
            onPublish={(data) => onPublish(data)}
            plugins={[headingAnalyzer]}
          />
        </div>
      </Modal>
    </ThemeProvider>
  );
}
