"use client";

import PopperWrapper from "../popper";
import TooltipWrappper from "../tooltip";
import intractionProps from "./type";

function HoverWrapper({
  children,
  interaction,
  popperChildren,
}: {
  children: React.ReactNode;
  interaction: intractionProps;
  popperChildren?: React.ReactNode;
}): JSX.Element {
  if (interaction?.onHover) {
    if (interaction.onHoverAction?.type == "tooltip") {
      return (
        <TooltipWrappper
          title={interaction.onHoverAction?.value}
          placement={interaction.onHoverAction?.placement}
        >
          {children}
        </TooltipWrappper>
      );
    } else if (interaction.onHoverAction?.type == "openPopup") {
      return (
        <PopperWrapper
          type={"hover"}
          placement={interaction.onHoverAction?.placement}
          popperChildren={popperChildren}
        >
          {children}
        </PopperWrapper>
      );
    }
  }
  return <>{children}</>;
}
export default function InteractionRender({
  children,
  interaction,
  popperChildren,
}: {
  children: React.ReactNode;
  popperChildren?: React.ReactNode;
  interaction: intractionProps;
}) {
  if (interaction) {
    if (interaction.onClick) {
      if (interaction.onClickAction?.type == "navigateTo") {
        return (
          <a href={interaction.onClickAction?.value}>
            <HoverWrapper
              interaction={interaction}
              popperChildren={popperChildren}
            >
              {children}
            </HoverWrapper>
          </a>
        );
      } else if (interaction.onClickAction?.type == "openLink") {
        return (
          <a href={interaction.onClickAction?.value} target="_blank">
            <HoverWrapper
              interaction={interaction}
              popperChildren={popperChildren}
            >
              {children}
            </HoverWrapper>
          </a>
        );
      } else if (interaction.onClickAction?.type == "openPopup") {
        return (
          <PopperWrapper
            type={"click"}
            placement={interaction.onClickAction?.placement}
            popperChildren={popperChildren}
          >
            {children}
          </PopperWrapper>
        );
      } else if (interaction.onClickAction?.type == "signIn") {
        return (
          <HoverWrapper
            interaction={interaction}
            popperChildren={popperChildren}
          >
            <span onClick={() => {}}>{children}</span>
          </HoverWrapper>
        );
      } else if (interaction.onClickAction?.type == "signOut") {
        return (
          <HoverWrapper
            interaction={interaction}
            popperChildren={popperChildren}
          >
            <span onClick={() => {}}>{children}</span>
          </HoverWrapper>
        );
      }
    } else
      return (
        <HoverWrapper interaction={interaction} popperChildren={popperChildren}>
          {children}
        </HoverWrapper>
      );
  }
  return <>{children}</>;
}
