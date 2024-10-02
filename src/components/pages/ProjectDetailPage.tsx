import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Grid } from '@mui/material';

import { ProjectTotalInfoType } from '@apis/ApiTypes';
import { GetAxiosProjectBasicInfo } from '@apis/AxiosGet';

import ModalContents from '@atoms/ModalContents';
import JiraTicketsBlock from '@organisms/JiraTicketsBlock';
import ProjectBaseInfoForm from '@organisms/ProjectBaseInfoForm';
import MainPageTemplate from '@templates/MainPageTemplate';

import { ModalType } from '@common/CommonType';
import { defaultProjectTotalInfo } from '@common/DefaultValue';

export default function ProjectDetailPage(){
  const navigator = useNavigate();
  //선택되서 넘어온 jiraCode
  const {jiraProjectCode, projectFlag} = useParams();

   //Modal 셋팅
   const modalRoot = document.getElementById('modal-root');
   const [modalData, setModalData] = useState<string>('NONE');
   const [modalOpen, setModalOpen] = useState(false);
   const [modalType,setModalType] =useState<ModalType>('NONE');
   const handleModalClose = () => {setModalOpen(false)};
   const handleModalOpen = () => { setModalOpen(true) };

  //기본정보 가져오기
  const { control, reset } = useForm<ProjectTotalInfoType>({defaultValues:defaultProjectTotalInfo});
  
  useEffect(()=>{
    const callProjectInfo = async ()=>{
      handleModalOpen();
      setModalType('API_LOADING');
      if (jiraProjectCode && projectFlag) {
        const result = await GetAxiosProjectBasicInfo(jiraProjectCode, projectFlag);
        if(result===undefined){
          alert("기본정보를 불러오지 못했습니다.");
          navigator('/');
        }
        reset(result); // 폼을 API에서 받은 데이터로 초기화
        handleModalClose();
        setModalType('NONE');
      }
      else{
        alert("잘못된 접근입니다.");
        navigator("/");
      }
    }

    callProjectInfo();
  },[])
  return (
    <MainPageTemplate>    
      <Grid container direction={'row'} sx={{padding:'5px'}}>
        <Grid item xs={5} sx={{padding:'10px'}}>
        <ProjectBaseInfoForm jiraProjectFlag={projectFlag} control={control} readOnlyMode={true} recallFlag={false}/>
        </Grid>
        <Grid item xs={7} sx={{padding:'10px'}}>
          <JiraTicketsBlock jiraProjectCode={jiraProjectCode}/>
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
