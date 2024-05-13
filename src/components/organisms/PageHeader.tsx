import AppBar from "@mui/material/AppBar";
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import { useDarkModeContext } from "../../Context/CustomDarkmodeProvider";

type props = {
  handleDrawerOpen: () => void;
  naviOpen: boolean;
};

export default function PageHeader({ handleDrawerOpen }: props) {
  const navigator = useNavigate();
  const handleLogin = () => {
    navigator("/Login");
  };
  const theme = useDarkModeContext();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open-drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Edoc Jira Manage page
        </Typography>
        <Box sx={{}}>
          <IconButton
            color="inherit"
            aria-label="toggle-Theme"
            onClick={theme.switchTheme}
          >
            {theme.themeState === "lightTheme" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
          <IconButton color="inherit" aria-label="login" onClick={handleLogin}>
            <VpnKeyIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
