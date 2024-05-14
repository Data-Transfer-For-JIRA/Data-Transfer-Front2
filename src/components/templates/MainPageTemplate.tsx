import { useState } from 'react'
import { Box } from '@mui/material'

import PageHeader from '@components/organisms/PageHeader'
import PageNavigator from '@components/organisms/PageNavigator'

type propsType = { children: React.ReactNode }
export default function MainPageTemplate({ children }: propsType) {
  const [naviOpen, setNaviOpen] = useState(false);
  const handleDrawerOpen = () => { setNaviOpen(true); };
  const handleDrawerClose = () => { setNaviOpen(false); };

  return (
    <Box>
      <PageHeader handleDrawerOpen={handleDrawerOpen} naviOpen={naviOpen} />
      <PageNavigator naviOpen={naviOpen} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ height: 'calc(100vh - 64px)' }}>
        {children}
      </Box>
    </Box>
  )
}

