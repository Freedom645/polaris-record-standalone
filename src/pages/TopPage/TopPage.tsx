import GradientButton from "@/components/styled/GradientButton";
import { RouteDefine } from "@/consts/Route";
import { Container, Stack } from "@mui/material";
import { useNavigate } from "react-router";

export default function TopPage() {
  const navigate = useNavigate();

  const MenuItems = [
    { ...RouteDefine.ScoreRegisterPage },
    { ...RouteDefine.ScoreListPage },
    { ...RouteDefine.GuidePage },
  ] as const;

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 1 }}>
      <img
        src={`${import.meta.env.BASE_URL}/images/polaris_record_logo.png`}
        height="300px"
      />
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
