import { GetAxiosResultType } from '@apis/ApiTypes';
import { defaultProjectList } from '@common/DefaultValue';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import SelectedDataGrid from './SelectedDataGrid';


type MuiDataMoreViewTableType = {
  gridData: GetAxiosResultType[]
  setSubJiraKey: React.Dispatch<React.SetStateAction<string[]>>
}
export default function SelectedData({ gridData, setSubJiraKey }: MuiDataMoreViewTableType) {
  const [girdSelected, setGirdSelected] = useState<GetAxiosResultType>(defaultProjectList);

  const handleOnClickSetSubKey = () => {
    if (girdSelected.key !== "") {
      const jiraCode = girdSelected.key;
      setSubJiraKey((prev) => {
        if (!prev.includes(jiraCode)) return [...prev, jiraCode]
        else { return prev }
      });
      setGirdSelected(defaultProjectList);
    }
  }
  return (
    <Box>
      <Box sx={{ width: "95%", marginTop: '25px', minHeight: '550px', maxHeight: '80vh', overflow: 'auto'}}>
        <SelectedDataGrid setSubJiraKey={setGirdSelected} gridData={gridData} />
      </Box>
      <Button variant="contained"
        color='primary'
        sx={{ marginTop: '10px', marginLeft: "90%" }}
        onClick={handleOnClickSetSubKey}>선택</Button>
    </Box>
  )
}
