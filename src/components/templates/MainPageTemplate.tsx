import { useState } from 'react'
import { Box } from '@mui/material'

import PageHeader from '@organisms/PageHeader'
import PageNavigator from '@organisms/PageNavigator'

type propsType = { children: React.ReactNode }
export default function MainPageTemplate({ children }: propsType) {
  const [neviOpen, setNaveOpen] = useState(false);
  const handleDrawerOpen = () => { setNaveOpen(true); };
  const handleDrawerClose = () => { setNaveOpen(false); };

  return (
    <Box>
      <PageHeader handleDrawerOpen={handleDrawerOpen} naviOpen={neviOpen} />
      <PageNavigator naveOpen={neviOpen} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ height: 'calc(100vh - 64px)' }}>
        {children}
      </Box>
    </Box>
  )
}

