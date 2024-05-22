import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress, DialogContent, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { grey} from '@mui/material/colors';

import { PostCreateProject, PostTest } from '@apis/AxiosPost';
import { PostProjectCreateResultType, ProjectTotalInfoType } from '@apis/ApiTypes';
import { ModalType } from '@common/CommonType';
import { ModalTittle } from '@common/CommonValue';

import ModalBase from '@organisms/ModalBase'; 
import ProjectInfoGrid from '@organisms/ProjectInfoGrid';

type ModalContentsType ={
  open : boolean;
  onClose : () => void; 
  modalData : string;
  modalType : ModalType
  setModalType : React.Dispatch<React.SetStateAction<ModalType>>
}

export default function ModalContents({ open, onClose, modalData, modalType, setModalType }:ModalContentsType){
  const [modalTittle, setModalTittle] = useState(ModalTittle.NONE);

  useEffect(()=>{
    setModalTittle(ModalTittle[modalType]);
  },[modalType])

  return (
    <ModalBase open={open} onClose={onClose} modalTittle={modalTittle}>
        <DialogContent sx={{padding : '3px'}}>
          {modalType==='API_LOADING'&&(<ModalLoading/>)}
          {modalType==='CREATE_CHECK'&&(<CheckCreateProjectInfo modalData={modalData} onClose={onClose} setModalType={setModalType}/>)}
          {modalType==='CREATE_SUCCESS'&&(<div>hi2</div>)}
        </DialogContent>
    </ModalBase>
  )
}

//프로젝트 생성정보 컨펌용 Modal
type CheckCreateProjectInfoType ={
  modalData : string;
  onClose : () => void; 
  setModalType : React.Dispatch<React.SetStateAction<ModalType>>
}
function CheckCreateProjectInfo({modalData,onClose, setModalType}:CheckCreateProjectInfoType){
  const formData:ProjectTotalInfoType = JSON.parse(modalData);
  const {control, getValues } = useForm<ProjectTotalInfoType>({defaultValues: formData });
  const projectFlag = getValues("essential.projectFlag");

  const handleApiRequest=async ()=>{
    setModalType('API_LOADING');
    const apiResult:PostProjectCreateResultType = await PostTest(formData);
    if(apiResult!==undefined){
      setModalType('CREATE_SUCCESS');
    }
    else{
      setModalType('CREATE_FAIL');
    }
  }
  return(
    <Box>
      <Button variant="contained" color='primary' onClick={handleApiRequest} sx={{ margin: "5px" }}>확인완료</Button>
      <Button variant="contained" color='error' onClick={onClose} sx={{ margin: "5px" }}>취소</Button>      
      <ProjectInfoGrid projectFlag={projectFlag} control={control} readOnlyMode={true}/>
    </Box> 
  )
}

function ModalLoading(){
  return(
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
    >
      <CircularProgress size={60}/>
      <Typography variant="h6" align="center" style={{ marginTop: '16px'}}>
        {'잠시만 기다려주세요'}
      </Typography>
    </Box>
  );
}
