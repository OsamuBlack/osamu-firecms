import { type Config } from "@measured/puck";
import TypographyProps from "./components/typography/type";
import ButtonProps from "./components/button/type";
import IconProps from "./components/icon/type";
import ContainerProps from "./components/container/type";
import FrameProps from "./components/frame/type";
import { AnimateProps } from "./components/animate/component";

import TypographyComponent from "./components/typography/component";
import ButtonComponent from "./components/button/component";
import IconComponent from "./components/icon/component";
import ContainerComponent from "./components/container/component";
import FrameComponent from "./components/frame/component";
import AnimateComponent from "./components/animate/component";
import FormProps from "./components/form/type";
import Form from "./components/form/component";

export type Props = {
  Typography: TypographyProps;
  Button: ButtonProps;
  Icon: IconProps;
  Container: ContainerProps;
  Frame: FrameProps;
  Animate: AnimateProps;
  Form: FormProps
};

const config: Config<Props> = {
  categories: {
    base: {
      components: ["Typography", "Frame"],
    },
    components: {
      components: ["Container"],
    },
    utilities: {
      components: ["Icon", "Button"],
    },
  },
  components: {
    Typography: TypographyComponent,
    Button: ButtonComponent,
    Icon: IconComponent,
    Container: ContainerComponent,
    Frame: FrameComponent,
    Animate: AnimateComponent,
    Form: Form
  },
  root: {
    fields: {
      title: { type: "text", label: "Title" },
      status: {
        label: "Status",
        type: "radio",
        options: [
          { label: "Draft", value: "draft" },
          { label: "Published", value: "published" },
          { label: "Private", value: "private" },
        ],
      },
    },
  },
};

export default config;
