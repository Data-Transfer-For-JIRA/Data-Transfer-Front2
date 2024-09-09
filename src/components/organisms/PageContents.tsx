import { useState } from "react";
import { Paper } from "@mui/material";

import { GetAxiosResultType } from "@apis/ApiTypes";
import ProjectViewTable from '@atoms/ProjectViewTable';
import { useNavigate } from 'react-router-dom';
import SearchComponents from "@organisms/SearchComponents";

type PageContentsType = {
  fixFlag?: boolean
}
export default function PageContents({fixFlag}: PageContentsType) {
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
    <Paper sx={{ p: 1 }}>
      <SearchComponents handleSearchResult={handleSearchResult} projectList={projectList}/>
      <ProjectViewTable tableData ={projectList} handleMovePage={(jiraCode,projectFlag)=>handleMovePage(jiraCode, projectFlag)}/>
    </Paper>
  ); 
}
