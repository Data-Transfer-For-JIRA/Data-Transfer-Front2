import { useEffect, useState } from "react";
import { Paper } from "@mui/material";

import { GetAxiosResultType } from "@apis/ApiTypes";
import { GetAxiosSearchJiraList } from "@apis/AxiosGet";
import ControlledTextInput from '@atoms/ControlledTextInput';
import ProjectViewTable from '@atoms/ProjectViewTable';
import { useNavigate } from 'react-router-dom';

type PageContentsType = {
  fixFlag?: boolean
}
export default function PageContents({fixFlag}: PageContentsType) {
  const [projectList, setProjectList] = useState<GetAxiosResultType[]>([]); //조회된 프로젝트 리스트
  const handleSearchResult = (searchResult: GetAxiosResultType[]) => {
    setProjectList(searchResult);
  };
  const navigator = useNavigate();  

  const handleMovePage = (jiraCode :string)=>{
    if(fixFlag)navigator(`/projectFix/${jiraCode}`)
    else navigator(`projectDetail/${jiraCode}`)
    
  }

  useEffect(()=>{
    console.log(projectList);
    const requestDefaultApi = async ()=>{
      const result = await GetAxiosSearchJiraList(undefined);
      handleSearchResult(result);
    }
    if(projectList.length===0) {
      requestDefaultApi();
    }
  },[projectList])

  return (
    <Paper sx={{ p: 2 }}>
      <ControlledTextInput handleSearchResult={handleSearchResult} requestSearchApi={GetAxiosSearchJiraList}/>
      <ProjectViewTable tableData ={projectList} handleMovePage={(jiraCode)=>handleMovePage(jiraCode)}/>
    </Paper>
  );
}
