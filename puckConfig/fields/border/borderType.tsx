type BorderProps = {
  radius:
    | {
        tl: string;
        tr: string;
        bl: string;
        br: string;
      }
    | string;
  thickness: { t: number; b: number; l: number; r: number } | number;
  color: string;
};

export default BorderProps;
