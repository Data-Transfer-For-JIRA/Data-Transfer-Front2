import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ProjectTotalInfoType } from '@apis/ApiTypes';
import { Box, Button, Grid, Tab, Tabs } from '@mui/material';
import MainPageTemplate from '@templates/MainPageTemplate';
import { defaultProjectTotalInfo } from '@common/DefaultValue';
import ProjectBaseInfoForm from '@organisms/ProjectBaseInfoForm';
import ProjectAdditionalInfo from '@organisms/ProjectAdditionalInfo';
import ModalContents from '@atoms/ModalContents';
import { ModalType } from '@common/CommonType';

/** 프로젝트 생성 컴포넌트
 *  ProjectBaseInfoForm => 기본정보 티켓중 필드에 입력될 값들
 *  ProjectAdditionalInfo=> NoAX정보값 또는 추가 제품군 선택 값들
 *  ProjectContractInfo=> reactQuill 에디터 컴포넌트
 */

export default function ProjectCreatePage(){
  //Tab 관련State
  const [tabValue, setTabValue] = useState(0);
  const [projectFlag, setProjectFlag] = useState('P');
  const handleTabChange = ()=>{
    if(tabValue === 0){
      setTabValue(1);
      setProjectFlag('M');
    }
    else{
      setTabValue(0);
      setProjectFlag('P');
    }
  }

  //react-hook-form 셋팅
  const { control, handleSubmit } = useForm<ProjectTotalInfoType>({
    defaultValues: defaultProjectTotalInfo });
  //모달에 전달할 form 데이터
  const [modalData, setModalData] = useState('NONE');
  const handlePostForm:SubmitHandler<ProjectTotalInfoType> =  (data)=>{
    const stringData = JSON.stringify(data);
    setModalData(stringData);
    setModalType('CREATE_CHECK');
    handleModalOpen();
  }

  //Modal 셋팅
  const modalRoot = document.getElementById('modal-root');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType,setModalType] =useState<ModalType>('NONE');
  const handleModalClose = () => {setModalOpen(false)};
  const handleModalOpen = () => { setModalOpen(true) };
  
  useEffect(()=>{
    defaultProjectTotalInfo.essential.projectFlag = projectFlag;
  },[projectFlag])
  return(
    <MainPageTemplate>
      <Box sx={{padding: '10px'}}>
        <Tabs value={tabValue} onChange={handleTabChange} role="navigation">
          <Tab label="프로젝트"/>
          <Tab label="유지보수"/>
        </Tabs>
        <form autoComplete="off" onSubmit={handleSubmit(handlePostForm)}>
          <Grid container sx={{height: '100%', padding:'5px'}} spacing={2}>
            <Grid item xs={5}> 
              <ProjectBaseInfoForm jiraProjectFlag={projectFlag} control={control}/>
            </Grid>

            <Grid item xs={7}>
              <ProjectAdditionalInfo jiraProjectFlag={projectFlag} control={control} />
              <Button type='submit' variant="contained" sx={{float:'right', marginRight:'1rem'}}>프로젝트 생성</Button>
            </Grid>
          </Grid>      
        </form>
      </Box>
      {modalOpen && modalRoot && ReactDOM.createPortal(
        <ModalContents 
          open={modalOpen} 
          onClose={handleModalClose}
          modalData = {modalData}
          modalType = {modalType}
        />, 
        modalRoot
      )}
    </MainPageTemplate>
  )
}



