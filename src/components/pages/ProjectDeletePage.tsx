import { GetAxiosResultType } from '@apis/ApiTypes';
import { GetAxiosSearchJiraList } from '@apis/AxiosGet';
import ControlledTextInput from '@atoms/ControlledTextInput';
import ModalContents from '@atoms/ModalContents';
import SelectedData from '@atoms/SelectedData';
import TargetChip from '@atoms/TargetChip';
import { ModalType, SelectedProjectType } from '@common/CommonType';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import MainPageTemplate from '@templates/MainPageTemplate';
import { setSelectProjectList } from '@util/function';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/** 프로젝트 삭제 페이지 ProjectDeletePage
 * Grid 왼쪽은 프로젝트 검색 후 선택
 * Grid 오른쪽은 왼쪽 테이블에서 선택된 삭제 대상 프로젝트 List
 */
export default function DeleteProject(){
  //검색용 State 및 핸들러
  const [searchResult, setSearchResult] = useState<GetAxiosResultType[]>([]); //검색결과
  const handleSearchResult = (searchResult: GetAxiosResultType[]) => {setSearchResult(searchResult)};
  
  const [targetProject, setTargetProject] = useState<string[]>([]);           //삭제 대상List
  const handleTargetProject = (targetList:GetAxiosResultType[])=>{ setSearchResult(targetList);}
  
  //Chip용 State 및 핸들러
  const [itemList,setItemList] = useState<SelectedProjectType[]>([]);         //뷰잉용 대상 List
  const handleTargetDelete = (deleteCode : string)=>{
    setItemList((prev)=>{
      const temp = prev.filter((item)=>{
        return item.jiraProjectKey !== deleteCode
      })
      return temp;
    });
    setTargetProject((prev)=>{
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
  const handleModalOpen = () => { setModalOpen(true) };
  const handleModalClose = () => {
    setModalType('NONE');
    setModalOpen(false);
  };

  //삭제Modal 호출
  const handleRequestApiFunction = ()=>{
    console.log(targetProject.length)
    if(targetProject.length <=0){
      alert('삭제할 프로젝트가 선택되지 않았습니다.');
      return;
    }
    const modalData = JSON.stringify(targetProject);
    setModalData(modalData);
    setModalType('DELETE_CHECK');
    handleModalOpen();
  }

  useEffect(()=>{
    //DataGrid 기본으로 채우는 함수.
    const requestDefaultApi = async ()=>{
      const result = await GetAxiosSearchJiraList(undefined);
      if(result){
        handleTargetProject(result);
      }
    }
    if(searchResult.length <1){requestDefaultApi();}

    //DataGrid에서 데이터 선택시 Chip에 선택된 데이터 쌓는 로직
    setItemList((prev) => {
      const uniqueProjects = new Set(prev.map(item => item.jiraProjectKey));
      const filteredProjects = setSelectProjectList(targetProject, searchResult)
        .filter(item => !uniqueProjects.has(item.jiraProjectKey));
      return [...prev, ...filteredProjects];
  });
  }, [searchResult, targetProject])

  return (
    <MainPageTemplate>
      <Grid container paddingLeft={"10px"} sx={{height : '100%'}} >
        <Grid item xs={9}>
          <ControlledTextInput handleSearchResult={handleSearchResult} requestSearchApi={GetAxiosSearchJiraList}/>
          <SelectedData gridData={searchResult} setSubJiraKey={setTargetProject}/>    
        </Grid>
        <Grid item xs={3}>
          <Box sx={{textAlign:'center', paddingTop:'15px'}}>
            <Typography variant="h5">삭제 대상 리스트</Typography>
            <Divider/>
          </Box>
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

