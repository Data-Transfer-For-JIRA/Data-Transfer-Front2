import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      hi
    </ThemeProvider>
  )
}

export default App
