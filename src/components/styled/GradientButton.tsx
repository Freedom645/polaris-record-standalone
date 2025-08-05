import { Button } from "@mui/material";
import { styled } from "@mui/system";

const GradientButton = styled(Button)(() => ({
  background: "linear-gradient(145deg, #fff, #ddd)",
  color: "#00DBA6",
  fontWeight: "bold",
  borderRadius: "50px",
  padding: "1rem 2rem",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  fontSize: "1rem",
  border: "2px solid #00DBA6",
  transition: "0.3s",
  "&:hover": {
    background: "#FEFFE9",
  },
}));
export default GradientButton;
