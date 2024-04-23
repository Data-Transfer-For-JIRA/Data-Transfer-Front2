import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { GetAxiosResultType } from '../../Apis/ApiTypes';
import SerchInput from './SerchInput';
import SerchResult from './SerchResult';

export default function PageContents() {
  const [projectList, setProjectList] = useState<GetAxiosResultType[]>([]);
  const handleSearchResult = (searchResult: GetAxiosResultType[]) => {
    setProjectList(projectList);
  }
  return (
    <Paper sx={{ p: 3 }}>
      <SerchInput handleSearchResult={handleSearchResult} />
      <SerchResult />
    </Paper>
  );
}
