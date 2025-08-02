import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const GradientText = styled(Typography)(() => ({
  background:
    "linear-gradient(90deg, #ffb347, #ff6f91, #a18cd1, #5ee7df, #b2f7ef)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 700,
  textAlign: "center",
}));

export default GradientText;
