"use client";

import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";

export default function ({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (ref.current) {
      const top = ref.current.getBoundingClientRect().top + 10;
      if (top >= 0 && top <= window.innerHeight) {
        setIsVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    }
  };

  useEffect(() => {
    setIsVisible(false);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        transition: "opacity 0.5s",
        transitionTimingFunction: "ease-in-out",
      }}
      style={{ opacity: isVisible ? 1 : 0 }}
      ref={ref}
    >
      {children}
    </Box>
  );
}
