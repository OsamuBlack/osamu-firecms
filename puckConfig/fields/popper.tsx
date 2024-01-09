"use client";

import { useState } from "react";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";

export default function PopperWrapper({
  children,
  popperChildren,
  type,
  placement,
}: {
  children: React.ReactNode;
  popperChildren: React.ReactNode;
  type: "click" | "hover";
  placement: "top" | "bottom" | "left" | "right";
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handlePopper = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "popper" : undefined;

  if (type == "hover") {
    return (
      <div
        aria-describedby={id}
        onMouseEnter={handlePopper}
        onMouseLeave={handlePopper}
        style={{ cursor: "pointer" }}
      >
        {children}
        <Popper
          sx={{
            p: 1,
          }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement={placement}
        >
          <Paper sx={{ p: 1 }}>{popperChildren}</Paper>
        </Popper>
      </div>
    );
  }
  return (
    <div>
      <div
        aria-describedby={id}
        onClick={type == "click" ? handlePopper: undefined}
        style={{ cursor: "pointer" }}
      >
        {children}
      </div>
      <Popper
        sx={{
          p: 1,
        }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
      >
        <Paper sx={{ p: 1 }}>{popperChildren}</Paper>
      </Popper>
    </div>
  );
}
