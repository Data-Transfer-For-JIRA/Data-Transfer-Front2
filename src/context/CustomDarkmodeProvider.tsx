import { createContext, ReactNode, useContext, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // MUI의 ThemeProvider를 import

interface DarkModeContextType {
  themeState: string;
  switchTheme: () => void;
}

const DarkModeContext = createContext<DarkModeContextType>({
  themeState: 'lightTheme',
  switchTheme: () => { },
});

type ThemeProviderType = { children: ReactNode };

export function CustomDarkModeProvider({ children }: ThemeProviderType) {
  const [themeState, setThemeState] = useState(
    window.localStorage.getItem('ma_theme') || 'lightTheme'
  );

  const switchTheme = () => {
    if (themeState === 'lightTheme') {
      console.log(themeState);
      setThemeState('darkTheme');
      window.localStorage.setItem('ma_theme', 'darkTheme');
    } else if (themeState === 'darkTheme') {
      console.log(themeState);
      setThemeState('lightTheme');
      window.localStorage.setItem('ma_theme', 'lightTheme');
    }
  };

  const darkModeProviderValue: DarkModeContextType = { themeState, switchTheme };
  return (
    <DarkModeContext.Provider value={darkModeProviderValue}>
      <ThemeProvider theme={themeState === 'lightTheme' ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
}

// Theme set
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

export const useDarkModeContext = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  return context;
};
