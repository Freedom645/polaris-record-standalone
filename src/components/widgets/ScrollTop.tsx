import { Box, useScrollTrigger, Zoom } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop: React.FC<
  React.PropsWithChildren<{
    window?: () => Window;
  }>
> = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const { pathname } = useLocation();

  useEffect(() => {
    document.defaultView?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 2,
          right: 2,
        }}
      >
        {children}
      </Box>
    </Zoom>
  );
};

export default ScrollTop;
