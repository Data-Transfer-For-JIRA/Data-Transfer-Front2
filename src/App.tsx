import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PageHeader from './components/Organisms/PageHeader';
import PageNavigator from './components/Organisms/PageNavigator';

function App() {
  //Set Navigator
  const [naviOpen, setNaviOpen] = useState(false);
  const handleDrawerOpen = () => { setNaviOpen(true); };
  const handleDrawerClose = () => { setNaviOpen(false); };
  return (
    <Box>
      <CssBaseline />
      <Box component="header">
        <PageHeader handleDrawerOpen={handleDrawerOpen} naviOpen={naviOpen} />
      </Box>
      <PageNavigator naviOpen={naviOpen} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ height: 'calc(100vh - 64px)' }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default App
