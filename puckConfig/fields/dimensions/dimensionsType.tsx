type DimensionsProps = {
  widthType: "fillContainer" | "fixed" | "hugContents";
  width: string;
  height: string;
  heightType: "fillContainer" | "fixed" | "hugContents";
  aspect: boolean;
  aspectRatio: string;
};

export default DimensionsProps;
