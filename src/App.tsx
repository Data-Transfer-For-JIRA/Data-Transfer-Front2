import { Box, CssBaseline } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import { CustomDarkModeProvider } from "@context/CustomDarkmodeProvider";
import LoginPage from '@pages/LoginPage';
import { LoginProvider, useLoginContext } from '@context/LoginProvider';
import { useEffect } from 'react';

function AppLogin() {
  const navigator = useNavigate();
  const { loginState } = useLoginContext();

  useEffect(()=>{
    if (!loginState) {
      alert('in here');
      navigator("/Login")
    }
  })
  return (
    (loginState ? <Outlet /> : <LoginPage />)
  )
}

function App() {
  return (
    <CustomDarkModeProvider>
      <Box>
        <CssBaseline />
        <LoginProvider>
          <AppLogin />
      </LoginProvider>
      </Box>
    </CustomDarkModeProvider>
  );
}

export default App;
