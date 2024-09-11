import { useState } from "react";
import { Box, Paper, styled } from "@mui/material";

import { GetAxiosResultType } from "@apis/ApiTypes";
import ProjectViewTable from '@atoms/ProjectViewTable';
import { useNavigate } from 'react-router-dom';
import SearchComponents from "@organisms/SearchComponents";
import { useDarkModeContext } from "@context/CustomDarkmodeProvider";
import ProjectViewTableStatic from "@atoms/ProjectViewTableStatic";

const CustomScrollbarBox = styled(Box)(({}) => ({
  flex:1, 
  overflow:'auto',
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

type PageContentsType = {
  fixFlag?: boolean
}
export default function PageContents({fixFlag}: PageContentsType) {
  const theme = useDarkModeContext();
  const [projectList, setProjectList] = useState<GetAxiosResultType[]>([]); //조회된 프로젝트 리스트
  const handleSearchResult = (searchResult: GetAxiosResultType[]) => {
    setProjectList(searchResult);
  };
  const navigator = useNavigate();  

  const handleMovePage = (jiraCode :string, projectFlag:string)=>{
    if(fixFlag)navigator(`/projectFix/${jiraCode}/${projectFlag}`)
    else {
      navigator(`projectDetail/${jiraCode}`)
    }
  }

  return (
    <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column', height:'100%' }}>
      <SearchComponents handleSearchResult={handleSearchResult} projectList={projectList}/>
      {theme.themeState==='lightTheme'?(
        <Box sx={{flex:1,overflow:'auto'}}>
          <ProjectViewTableStatic tableData ={projectList} handleMovePage={(jiraCode,projectFlag)=>handleMovePage(jiraCode, projectFlag)}/>
        </Box>
      ):(
      <CustomScrollbarBox>
        <ProjectViewTableStatic tableData ={projectList} handleMovePage={(jiraCode,projectFlag)=>handleMovePage(jiraCode, projectFlag)}/>
      </CustomScrollbarBox>
      )}
    </Paper>
  ); 
}
