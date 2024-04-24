import { CustomDarkModeProvider } from "./Context/CustomDarkmodeProvider";
import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <CustomDarkModeProvider>
      <Box>
        <CssBaseline />
        <Outlet />
      </Box>
    </CustomDarkModeProvider>
  );
}

export default App;
