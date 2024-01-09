import { Breakpoint } from "@mui/material";

type ContainerProps = {
  maxWidth: Breakpoint | false;
  fixed: boolean;
  backgroundColor: string;
  backgroundImage: string;
  padding: boolean;
};

export default ContainerProps;