import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PageHeader from './components/Templates/PageHeader';
import PageNavigator from './components/Templates/PageNavigator';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


function App() {
  //Set Theme(Dark, light)
  const localStorageTheme = window.localStorage.getItem('ma_theme') || 'lightTheme';
  const [theme, setTheme] = useState(localStorageTheme);
  const toggleTheme = () => {
    if (theme === 'lightTheme') {
      setTheme('darkTheme');
      window.localStorage.setItem('ma_theme', 'darkTheme');
    }
    else {
      setTheme('lightTheme');
      window.localStorage.setItem('ma_theme', 'lightTheme');
    }
  }

  //Set Navigator
  const [naviOpen, setNaviOpen] = useState(false);
  const handleDrawerOpen = () => { setNaviOpen(true); };
  const handleDrawerClose = () => { setNaviOpen(false); };

  return (
    <ThemeProvider theme={theme === 'lightTheme' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Box component="header">
        <PageHeader handleDarkMode={toggleTheme} handleDrawerOpen={handleDrawerOpen} naviOpen={naviOpen} theme={theme} />
      </Box>
      <Box>
        <PageNavigator naviOpen={naviOpen} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
