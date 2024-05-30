import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Grid, Typography } from '@mui/material';

import { GetAxiosResultType } from '@apis/ApiTypes';
import { GetAxiosSearchJiraList } from '@apis/AxiosGet';
import ControlledTextInput from '@atoms/ControlledTextInput';
import MainPageTemplate from '@templates/MainPageTemplate';
import SelectedData from '@atoms/SelectedData';
import { ModalType, SelectedProjectType } from '@common/CommonType';
import { AxiosPutProjectLink } from '@apis/AxiosUpdate';
import TargetChip from '@atoms/TargetChip';
import { setSelectProjectList } from '@util/function';
import SearchAndSetInput from '@atoms/SearchAndSetInput';
import ModalContents from '@atoms/ModalContents';
import ReactDOM from 'react-dom';

/** 프로젝트 연결 컴포넌트
 * Grid왼쪽은 연결대상 프로젝트 검색해서 선택하는 컴포넌트
 * Grid 오른쪽 
 * 상단검색은 MainProjectCode 검색(생성에서 넘어오면 자동 선택)
 * 하단은 선택된 녀석들 표시
 */
export default function ProjectLinkPage(){
  const location = useLocation();

  //MainJiraKey검색State
  const [mainJiraKey, setMainJiraKey] = useState("");
  const handleJiraMainKey = (searchKeyword : string)=>{setMainJiraKey(searchKeyword);}

  //SubJiraKey검색 State
  const [subJiraKey, setSubJiraKey] = useState<string[]>([]);               //선택된 프로젝트 Code 리스트
  const [itemList,setItemList] = useState<SelectedProjectType[]>([]);       //선택된 프로젝트 정보 리스트
  const [projectList, setProjectList] = useState<GetAxiosResultType[]>([]); //검색 조회된 프로젝트 리스트
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
  
  //Modal 셋팅
  const modalRoot = document.getElementById('modal-root');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType,setModalType] =useState<ModalType>('NONE');
  const [modalData, setModalData] = useState<string>('NONE');
  const handleModalClose = () => {setModalOpen(false)};
  const handleModalOpen = () => { setModalOpen(true) };

  //API요청 버튼 onClick함수
  const handleRequestApiFunction = ()=>{
    if(subJiraKey.length<1){
      alert("연결할 하위 프로젝트가 선택되지 않았습니다.");
      return;
    }
    if(mainJiraKey===""){
      alert("연결할 메인 프로젝트가 선택되지 않았습니다.");
      return;
    }
    const tempData = {
      mainJiraKey : mainJiraKey,
      subJiraKeyList : subJiraKey
    }
    const modalData = JSON.stringify(tempData);
    setModalData(modalData);
    setModalType('LINK_CHECK');
    handleModalOpen();
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
          <TargetChip itemList={itemList} handleTargetDelete={handleTargetDelete} requestApiFunction={handleRequestApiFunction}/>
        </Grid>
      </Grid>
      {modalOpen && modalRoot && ReactDOM.createPortal(
        <ModalContents 
          open={modalOpen} 
          onClose={handleModalClose}
          modalData = {modalData}
          setModalData={setModalData}
          modalType = {modalType}
          setModalType={setModalType}
        />, 
        modalRoot
      )}
    </MainPageTemplate>
  )
}
