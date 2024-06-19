import { GetAxiosResultType } from '@apis/ApiTypes';
import { defaultProjectList } from '@common/DefaultValue';
import { Box, Button, styled } from '@mui/material';
import { useState } from 'react';
import SelectedDataGrid from './SelectedDataGrid';
import { useDarkModeContext } from '@context/CustomDarkmodeProvider';

type MuiDataMoreViewTableType = {
  gridData: GetAxiosResultType[]
  setSubJiraKey: React.Dispatch<React.SetStateAction<string[]>>
}

const CustomScrollbarBox = styled(Box)(({ }) => ({
  '&::-webkit-scrollbar': {
    width: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#2f3542',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'grey',
  },
}));

export default function SelectedData({ gridData, setSubJiraKey }: MuiDataMoreViewTableType) {
  const [girdSelected, setGirdSelected] = useState<GetAxiosResultType>(defaultProjectList);
  const theme = useDarkModeContext();
  const handleOnClickSetSubKey = () => {
    if (girdSelected.key !== "") {
      const jiraCode = girdSelected.key;
      setSubJiraKey((prev) => {
        if (!prev.includes(jiraCode)) {
          return [...prev, jiraCode];
        } else {
          return prev;
        }
      });
      setGirdSelected(defaultProjectList);
    }
  }

  return (
    <Box>
      {theme.themeState!=='lightTheme'?(
          <CustomScrollbarBox sx={{ width: "95%", marginTop: '25px', minHeight: '550px', maxHeight: '80vh', overflow: 'auto' }}>
          <SelectedDataGrid setSubJiraKey={setGirdSelected} gridData={gridData} />
        </CustomScrollbarBox>
      ):(
        <Box sx={{ width: "95%", marginTop: '25px', minHeight: '550px', maxHeight: '80vh', overflow: 'auto' }}>
          <SelectedDataGrid setSubJiraKey={setGirdSelected} gridData={gridData} />
        </Box>
      )}
    
      <Button 
        variant="contained"
        color='primary'
        sx={{ marginTop: '10px', marginLeft: "90%" }}
        onClick={handleOnClickSetSubKey}
      >
        선택
      </Button>
    </Box>
  )
}
