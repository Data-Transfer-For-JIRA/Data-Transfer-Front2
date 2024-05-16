import { useEffect, useState } from "react";
import { Paper } from "@mui/material";

import { GetAxiosResultType } from "@apis/ApiTypes";
import { GetAxiosSearchJiraList } from "@apis/AxiosGet";
import ControlledTextInput from '@atoms/ControlledTextInput';
import ProjectViewTable from '@atoms/ProjectViewTable';

export default function PageContents() {
  const [projectList, setProjectList] = useState<GetAxiosResultType[]>([]); //조회된 프로젝트 리스트
  const handleSearchResult = (searchResult: GetAxiosResultType[]) => {
    setProjectList(searchResult);
  };

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
      <ProjectViewTable tableData ={projectList}/>
    </Paper>
  );
}
