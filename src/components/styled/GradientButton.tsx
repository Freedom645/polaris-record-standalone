import { Button } from "@mui/material";
import { styled } from "@mui/system";

const GradientButton = styled(Button)(() => ({
  background: "linear-gradient(145deg, #fff, #ddd)",
  color: "#ff4ca3",
  fontWeight: "bold",
  borderRadius: "50px",
  padding: "1rem 2rem",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  fontSize: "1rem",
  border: "2px solid #ff4ca3",
  transition: "0.3s",
  "&:hover": {
    background: "#ffe6f0",
  },
}));
export default GradientButton;
