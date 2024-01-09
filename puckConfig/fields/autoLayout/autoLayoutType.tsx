
type AutoLayoutProps = {
  enabled: boolean;
  direction: "row" | "column";
  justifyContent:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  gap: {
    x: number;
    y: number;
  };
  padding:
    | {
        t: string;
        r: string;
        b: string;
        l: string;
      }
    | string;
};

export default AutoLayoutProps;
