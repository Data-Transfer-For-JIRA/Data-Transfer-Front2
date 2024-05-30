import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress, DialogContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import { PostCreateProject, PostTest } from '@apis/AxiosPost';
import { PostProjectCreateResultType, ProjectTotalInfoType } from '@apis/ApiTypes';
import { ModalType } from '@common/CommonType';
import { ModalTittle } from '@common/CommonValue';

import ModalBase from '@organisms/ModalBase'; 
import ProjectInfoGrid from '@organisms/ProjectInfoGrid';
import { useNavigate } from 'react-router-dom';

type ModalContentsType ={
  open : boolean;
  onClose : () => void; 
  modalData : string;
  setModalData:React.Dispatch<React.SetStateAction<string>>
  modalType : ModalType
  setModalType : React.Dispatch<React.SetStateAction<ModalType>>
}

export default function ModalContents({ open, onClose, modalData, setModalData, modalType, setModalType }:ModalContentsType){
  const [modalTittle, setModalTittle] = useState(ModalTittle.NONE);

  useEffect(()=>{
    setModalTittle(ModalTittle[modalType]);
  },[modalType])

  return (
    <ModalBase open={open} onClose={onClose} modalTittle={modalTittle} modalType={modalType}>
        <DialogContent sx={{padding : '3px'}}>
          {/* {모달 공통} */}
          {modalType==='API_LOADING'&&(<ModalLoading/>)}
          {modalType==='API_FAIL'&&<div>API요청실패</div>}
          {/* {프로젝트 생성} */}
          {modalType==='CREATE_CHECK'&&(<CheckCreateProjectInfo modalData={modalData} setModalData={setModalData} onClose={onClose} setModalType={setModalType}/>)}
          {modalType==='CREATE_SUCCESS'&&(<CreateSuccess stringData={modalData}/>)}
          {/* {프로젝트 연결} */}
          {modalType==='LINK_CHECK'&&<div>{modalData}</div>}
          {modalType==='LINK_SUCCESS'&&<div>프로젝트 링크 성공</div>}
          {/* {프로젝트 삭제} */}
          {modalType==='DELETE_CHECK'&&<div>프로젝트 삭제 체크</div>}
          {modalType==='DELETE_SUCCESS'&&<div>프로젝트 삭제 실패</div>}
          {/* {프로젝트 수정} */}
          {modalType==='UPDATE_CHECK'&&<div>프로젝트 수정 체크</div>}
          {modalType==='UPDATE_SUCCESS'&&<div>프로젝트 수정 실패</div>}
        </DialogContent>
    </ModalBase>
  )
}

//프로젝트 생성정보 컨펌용 Modal
type CheckCreateProjectInfoType ={
  modalData : string;
  onClose : () => void; 
  setModalType : React.Dispatch<React.SetStateAction<ModalType>>
  setModalData : React.Dispatch<React.SetStateAction<string>>
}
function CheckCreateProjectInfo({modalData,onClose, setModalType, setModalData}:CheckCreateProjectInfoType){
  const formData:ProjectTotalInfoType = JSON.parse(modalData);
  const {control, getValues } = useForm<ProjectTotalInfoType>({defaultValues: formData });
  const projectFlag = getValues("essential.projectFlag");

  const handleApiRequest=async ()=>{
    setModalType('API_LOADING');
    const apiResult:PostProjectCreateResultType = await PostTest(formData);
    if(apiResult!==undefined){
      const stringData = JSON.stringify(apiResult);
      setModalData(stringData);
      setModalType('CREATE_SUCCESS');
    }
    else{
      setModalType('API_FAIL');
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

type CreateSuccessType ={
  stringData : string
}
function CreateSuccess({stringData}:CreateSuccessType){
  const responseData = JSON.parse(stringData);
  const navigator = useNavigate();
  const jiraProjectURL = `https://markany.atlassian.net/jira/core/projects/${responseData.jiraProjectCode}/board`;

  const handleBtnMoveLinkPage = (jiraProjectCode: string) => {
    navigator('/projectLink', { state: { jiraProjectCode: jiraProjectCode } })
  }
  
  return(
      <Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">지라 프로젝트 코드</TableCell>
                  <TableCell align="left">지라 프로젝트명</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">{responseData.jiraProjectCode}</TableCell>
                  <TableCell align="left">{responseData.jiraProjectName}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{float : 'right'}}>
            <Button target="_blank" variant='contained' sx={{ margin: 3 }} href={`${jiraProjectURL}`} >
              Jira 프로젝트 보드 이동
            </Button>
            <Button variant='contained' sx={{ margin: 3 }} onClick={() => handleBtnMoveLinkPage(responseData.jiraProjectCode)}>프로젝트 연결 페이지로 이동
            </Button>
          </Box>
      </Box >
  )
}

//로딩 모달인데 너무 못생겨서 CSS 처리좀 하고싶음
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
