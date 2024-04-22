import { Outlet } from 'react-router-dom';
import { CustomDarkModeProvider } from './Context/CustomDarkmodeProvider';

function App() {
  return (
    <CustomDarkModeProvider>
      <Outlet />
    </CustomDarkModeProvider>
  )
}

export default App
