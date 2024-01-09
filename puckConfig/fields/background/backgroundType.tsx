type BackgroundProps =
  | {
      type: "color";
      value: string;
    }
  | {
      type: "image";
      value: {
        url: string;
        isValid: boolean;
        sizes: string;
        lazyLoad: boolean;
        opacity: number;
      };
    };

export default BackgroundProps;
