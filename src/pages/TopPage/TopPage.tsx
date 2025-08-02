import GradientButton from "@/components/styled/GradientButton";
import { RouteDefine } from "@/consts/Route";
import { Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export default function TopPage() {
  const navigate = useNavigate();

  const MenuItems = [
    { ...RouteDefine.ScoreRegisterPage },
    { ...RouteDefine.ScoreListPage },
    { ...RouteDefine.GuidePage },
  ] as const;

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h2">
        Polaris Record <small>{import.meta.env.VITE_VERSION}</small>
      </Typography>
      <Stack spacing={3} mt={6}>
        {MenuItems.map((item, i) => (
          <GradientButton key={i} onClick={() => navigate(item.path)}>
            {item.name}
          </GradientButton>
        ))}
      </Stack>
    </Container>
  );
}
