import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Tab, Tabs } from '@mui/material';

import { ProjectTotalInfoType } from '@apis/ApiTypes';
import { ModalType } from '@common/CommonType';

import MainPageTemplate from '@templates/MainPageTemplate';
import { defaultProjectTotalInfo } from '@common/DefaultValue';
import ProjectInfoGrid from '@organisms/ProjectInfoGrid';
import ModalContents from '@atoms/ModalContents';

/** 프로젝트 생성 컴포넌트 및 수정 컴포넌트
 *  ProjectBaseInfoForm => 기본정보 티켓중 필드에 입력될 값들
 *  ProjectAdditionalInfo=> NoAX용 추가 데이터 및 ReactQuill
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
  //여기 DefaultValue에값을 설정하면 Form에 값들이 들어감
  const { control, handleSubmit, setValue  } = useForm<ProjectTotalInfoType>({
    defaultValues: defaultProjectTotalInfo });

  //모달에 전달할 form 데이터
  const [modalData, setModalData] = useState<string>('NONE');
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
    setValue('essential.projectFlag',projectFlag)
    //quill deafult value set
    const maintainText = '<ol><li>고객사 :</li><li>계약 업체 :</li><li>유지보수 명 :</li><li>유지보수 코드 :</li><li>제품명 :</li><li>유지보수 요율 :</li><li>유지보수 금액 :</li><li>계약 기간 :</li><li>점검 주기 : ( ex 월, 분기, 반기, 격월, 년)</li><li>점검 컨택 :</li><li>점검 장소 :</li><li>비고 :</li></ol>';
    const projectText = '<ol><li>고객사 :</li><li>계약 업체 :</li><li>프로젝트 명 :</li><li>프로젝트 코드 :</li><li>지원 일정 :</li><li>담당자 :</li><li>지원 범위 :</li><li class="ql-indent-1">지원 형태 :</li><li class="ql-indent-1">연동 형태 :</li><li class="ql-indent-1">사용자 지원 환경 :</li><li class="ql-indent-1">서버 수량 :</li><li>장소 :</li><li>영업 담당 :</li><li>기타 :</li></ol>';
    const quillDefaultText = projectFlag==='P'?projectText:maintainText;
    setValue("common.description", quillDefaultText)
  },[projectFlag, setValue])
  return(
    <MainPageTemplate>
      <Box sx={{padding: '10px'}}>
        <Tabs value={tabValue} onChange={handleTabChange} role="navigation">
          <Tab label="프로젝트"/>
          <Tab label="유지보수"/>
        </Tabs>
        <form autoComplete="off" onSubmit={handleSubmit(handlePostForm)}>
          <ProjectInfoGrid projectFlag={projectFlag} control={control} readOnlyMode={false} recallFlag={true}/>
          <Button type='submit' variant="contained" sx={{float:'right', marginRight:'1rem'}}>프로젝트 생성</Button>
        </form>
      </Box>
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



