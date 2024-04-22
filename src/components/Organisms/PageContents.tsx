import { Paper } from '@mui/material';
import { useState } from 'react';
import { GetAxiosResultType } from '../../Apis/ApiTypes';
import SerchProjectInput from './SerchProjectInput';
import SerchResult from './SerchResult';

export default function PageContents() {
  const [projectList, setProjectList] = useState<GetAxiosResultType[]>([]);
  return (
    <Paper sx={{ p: 3 }}>
      <SerchProjectInput setProjectList={setProjectList} />
      <SerchResult />
    </Paper>
  );
}
