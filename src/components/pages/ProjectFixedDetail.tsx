import { ProjectTotalInfoType } from '@apis/ApiTypes';
import { GetAxiosProjectBasicInfo } from '@apis/AxiosGet';
import ModalContents from '@atoms/ModalContents';
import { ModalType } from '@common/CommonType';
import { defaultProjectTotalInfo } from '@common/DefaultValue';
import { Button } from '@mui/material';
import ProjectInfoGrid from '@organisms/ProjectInfoGrid';
import MainPageTemplate from '@templates/MainPageTemplate';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';


export default function ProjectFixedDetail() {
  const { jiraProjectCode, projectFlag } = useParams();
  const { control, handleSubmit, reset } = useForm<ProjectTotalInfoType>({defaultValues:defaultProjectTotalInfo});

  const handleUpdateInfo= ()=>{

  }

  //Modal 셋팅
  const modalRoot = document.getElementById('modal-root');
  const [modalData, setModalData] = useState<string>('NONE');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType,setModalType] =useState<ModalType>('NONE');
  const handleModalClose = () => {setModalOpen(false)};
  const handleModalOpen = () => { setModalOpen(true) };

  useEffect(() => {
    const callApi = async () => {
      handleModalOpen();
      setModalType('API_LOADING');
      if (jiraProjectCode && projectFlag) {
        const result:ProjectTotalInfoType = await GetAxiosProjectBasicInfo(jiraProjectCode, projectFlag);
        reset(result); // 폼을 API에서 받은 데이터로 초기화
        handleModalClose();
        setModalType('NONE');
      }
      else{
        alert("레전드상황발생");
      }
    };

    callApi();
  }, [jiraProjectCode, projectFlag, reset]);

  return (
    <MainPageTemplate>
      <form autoComplete="off" onSubmit={handleSubmit(handleUpdateInfo)}>
      {projectFlag !== undefined && (
        <ProjectInfoGrid projectFlag={projectFlag==="프로젝트"?'P':"M"} control={control} readOnlyMode={false} recallFlag={false}/>
      )}
      <Button type='submit' variant="contained" sx={{float:'right', marginRight:'1rem'}}>프로젝트 수정</Button>
      </form>
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
  );
}
