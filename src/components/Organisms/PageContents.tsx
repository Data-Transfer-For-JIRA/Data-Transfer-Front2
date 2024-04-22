import { Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function PageContents() {
  return (
    <Paper sx={{ p: 3 }}>
      <Outlet />
    </Paper>
  );
}
