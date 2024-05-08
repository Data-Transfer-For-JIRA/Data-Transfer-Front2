import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

import { CustomDarkModeProvider } from "./Context/CustomDarkmodeProvider";

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
