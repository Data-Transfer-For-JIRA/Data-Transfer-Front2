import { Box } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { useState } from 'react';
import PageContents from '../Organisms/PageContents';
import PageHeader from '../Organisms/PageHeader';
import PageNavigator from '../Organisms/PageNavigator';

export default function MainPageTemplate() {
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
        <PageContents />
      </Box>
    </Box>
  );
}
