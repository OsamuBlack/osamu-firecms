type intractionProps = {
  onClick: boolean;
  onClickAction?:
    | {
        type: "signIn" | "signOut";
      }
    | {
        type: "navigateTo" | "openLink";
        value: string;
      }
    | {
        type: "openPopup";
        placement: "top" | "bottom" | "left" | "right";
      };
  onHover: boolean;
  onHoverAction?:
    | {
        type: "tooltip";
        placement: "top" | "bottom" | "left" | "right";
        value: string;
      }
    | {
        type: "openPopup";
        placement: "top" | "bottom" | "left" | "right";
      };
};

export default intractionProps;
