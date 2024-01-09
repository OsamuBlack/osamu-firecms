import { ComponentConfig } from "@measured/puck";
import FormProps from "./type";
import FormBuilder from "./formBuilder";

const FormComponent: ComponentConfig<FormProps> = {
  fields: {
    collection: {
      type: "text",
      label: "Collection",
    },
    background: {
      type: "text",
      label: "Background",
    },
    theme: {
      type: "text",
      label: "Theme",
    },
  },
  render: ({ collection, background, theme }) => {
    if (!collection) {
      return <div></div>;
    }
    return (
      <FormBuilder
        collection={collection}
        background={background}
        theme={theme}
      />
    );
  },
};

export default FormComponent;
