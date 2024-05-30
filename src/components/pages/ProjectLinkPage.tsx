import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Grid, Typography } from '@mui/material';

import { GetAxiosResultType } from '@apis/ApiTypes';
import { GetAxiosSearchJiraList } from '@apis/AxiosGet';
import ControlledTextInput from '@atoms/ControlledTextInput';
import MainPageTemplate from '@templates/MainPageTemplate';
import SelectedData from '@atoms/SelectedData';
import { SelectedProjectType } from '@common/CommonType';
import { AxiosPutProjectLink } from '@apis/AxiosUpdate';
import TargetChip from '@atoms/TargetChip';
import { setSelectProjectList } from '@util/function';
import SearchAndSetInput from '@atoms/SearchAndSetInput';



export default function ProjectLinkPage(){
  const location = useLocation();

  const [subJiraKey, setSubJiraKey] = useState<string[]>([]);
  const [itemList,setItemList] = useState<SelectedProjectType[]>([]);

  //MainJiraKey검색State
  const [mainJiraKey, setMainJiraKey] = useState("");
  const handleJiraMainKey = (searchKeyword : string)=>{setMainJiraKey(searchKeyword);}

  //SubJiraKey검색 State
  const [projectList, setProjectList] = useState<GetAxiosResultType[]>([]); //조회된 프로젝트 리스트
  const handleSearchResult = (searchResult: GetAxiosResultType[]) => {setProjectList(searchResult)};

  const handleTargetDelete = (deleteCode : string)=>{
    setItemList((prev)=>{
      const temp = prev.filter((item)=>{
        return item.jiraProjectKey !== deleteCode
      })
      return temp;
    });
    setSubJiraKey((prev)=>{
      return prev.filter((item)=>{
        return item !== deleteCode
      })
  });
  }
  
  useEffect(() => { 
    //프로젝트 생성 이후 바로 넘어온 지라Code 셋팅
    if (location.state !== null) { setMainJiraKey(location.state.jiraProjectCode) } 
    //페이지 로딩시 디폴트로 테이블 List 가져오기
    const requestDefaultApi = async ()=>{
      const result = await GetAxiosSearchJiraList(undefined);
      handleSearchResult(result);
    }
    if(projectList.length===0) {
      requestDefaultApi();
    }

    //DataGrid에서 데이터 선택시 Chip에 선택된 데이터 쌓는 로직
    setItemList((prev) => {
      const uniqueProjects = new Set(prev.map(item => item.jiraProjectKey));
      const filteredProjects = setSelectProjectList(subJiraKey, projectList)
        .filter(item => !uniqueProjects.has(item.jiraProjectKey));
      return [...prev, ...filteredProjects];
  });
  }, [location.state, projectList, subJiraKey])

  return (
    <MainPageTemplate>
      <Grid container paddingLeft={"10px"} sx={{height : '100%'}}>
        <Grid item xs={9}>
          <Box>
            <ControlledTextInput handleSearchResult={handleSearchResult} requestSearchApi={GetAxiosSearchJiraList}/>
            <SelectedData gridData={projectList} setSubJiraKey={setSubJiraKey}/>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <SearchAndSetInput handleJiraMainKey={handleJiraMainKey}/>
          <Typography variant='h6'>신규 프로젝트 : {mainJiraKey} </Typography> 
          <TargetChip itemList={itemList} handleTargetDelete={handleTargetDelete} requestApiFunction={AxiosPutProjectLink}/>
        </Grid>
      </Grid>
    </MainPageTemplate>
  )
}
