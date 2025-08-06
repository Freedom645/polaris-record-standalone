import "@/App.css";
import GuidePage from "@/pages/GuidePage/GuidePage";
import ScoreListPage from "@/pages/ScoreListPage/ScoreListPage";
import ScoreRegisterPage from "@/pages/ScoreRegisterPage/ScoreRegisterPage";
import TopPage from "@/pages/TopPage/TopPage";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ApplicationLogo } from "./components/parts/ApplicationLogo";
import { RouteDefine } from "./consts/Route";

function App() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerWidth = 240;

  const MenuItems = [
    {
      ...RouteDefine.TopPage,
      element: <TopPage />,
      icon: <HomeIcon sx={{ color: "#00ABFF" }} />,
    },
    {
      ...RouteDefine.ScoreRegisterPage,
      element: <ScoreRegisterPage />,
      icon: <AddCircleIcon sx={{ color: "#00ABFF" }} />,
    },
    {
      ...RouteDefine.ScoreListPage,
      element: <ScoreListPage />,
      icon: <ListAltIcon sx={{ color: "#00ABFF" }} />,
    },
    {
      ...RouteDefine.GuidePage,
      element: <GuidePage />,
      icon: <HelpOutlineIcon sx={{ color: "#00ABFF" }} />,
    },
  ] as const;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            onClick={() => navigate(RouteDefine.TopPage.path)}
            sx={{
              cursor: "pointer",
            }}
          >
            <ApplicationLogo version={import.meta.env.VITE_VERSION} />
          </Typography>
        </Toolbar>
      </AppBar>

      <nav>
        <Container
          maxWidth={false}
          sx={{
            width: "100dvw",
            padding: { xs: 0 },
          }}
        >
          <Toolbar id="back-to-top-anchor" />
          <Routes>
            {MenuItems.map((item) => (
              <Route path={item.path} element={item.element} />
            ))}
            <Route path="*" element={<TopPage />} />
          </Routes>
        </Container>
      </nav>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ width: drawerWidth }}
      >
        <Box
          sx={{ width: 250, p: 2 }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
        >
          <List>
            {MenuItems.map((item) => (
              <ListItemButton
                key={item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    color: "#00ABFF",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default App;
