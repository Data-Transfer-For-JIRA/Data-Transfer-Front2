import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PageHeader from './components/Templates/PageHeader';
import PageNavigator from './components/Templates/PageNavigator';

function App() {
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

  const [theme, setTheme] = useState('lightTheme');

  const togleTheme = () => {
    if (theme === 'lightTheme') setTheme('darkTheme')
    else setTheme('lightTheme');
  }

  return (
    <ThemeProvider theme={theme === 'lightTheme' ? lightTheme : darkTheme}>
      <CssBaseline />
      <PageHeader handleDarkMode={togleTheme} />
      <PageNavigator />
      <Outlet />
    </ThemeProvider>
  )
}

export default App
