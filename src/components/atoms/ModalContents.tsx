import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Button, Checkbox, CircularProgress, DialogContent, FormControlLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

import { PostCreateProject } from '@apis/AxiosPost';
import { AxiosPutProjectLink } from '@apis/AxiosUpdate';
import { DeleteProjectType, PostProjectCreateResultType, ProjectTotalInfoType, UpdateProjectInfoType, UpdateProjectLinkType } from '@apis/ApiTypes';
import { ModalType, SelectedProjectType } from '@common/CommonType';

import { ModalTittle } from '@common/CommonValue';

import ModalBase from '@organisms/ModalBase'; 
import ProjectInfoGrid from '@organisms/ProjectInfoGrid';
import { DeleteAxiosProject } from '@apis/AxiosDelete';
import { grey, red } from '@mui/material/colors';

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
          {modalType==='API_FAIL'&&<ModalFailApiCall modalData={modalData} onClose={onClose}/>}
          {/* {프로젝트 생성} */}
          {modalType==='CREATE_CHECK'&&(<CheckCreateProjectInfo modalData={modalData} setModalData={setModalData} onClose={onClose} setModalType={setModalType}/>)}
          {modalType==='CREATE_SUCCESS'&&(<CreateSuccess stringData={modalData}/>)}
          {/* {프로젝트 연결} */}
          {modalType==='LINK_CHECK'&&<LinkProjectInfo  modalData={modalData} setModalData={setModalData} setModalType={setModalType} onClose={onClose}/>}
          {modalType==='LINK_SUCCESS'&&<LinkProjectResult modalData={modalData} setModalType={setModalType}/>}
          {/* {프로젝트 삭제} */}
          {modalType==='DELETE_CHECK'&&<DeleteProjectCheckInfo modalData={modalData} setModalData={setModalData} setModalType={setModalType} onClose={onClose}/>}
          {modalType==='DELETE_SUCCESS'&&<DeleteProjectResult modalData={modalData} setModalType={setModalType}/>}
          {/* {프로젝트 수정} */}
          {modalType==='UPDATE_CHECK'&&<div>프로젝트 수정 체크</div>}
          {modalType==='UPDATE_SUCCESS'&&<div>프로젝트 수정 실패</div>}
        </DialogContent>
    </ModalBase>
  )
}

type DeleteProjectResultType = {
  modalData : string;
  setModalType : React.Dispatch<React.SetStateAction<ModalType>>
}
function DeleteProjectResult({modalData,setModalType}:DeleteProjectResultType){
  const deleteResult:DeleteProjectType[] = JSON.parse(modalData);
  console.log(deleteResult);
  console.log(typeof(deleteResult));
  const navigate = useNavigate();
  const handleConfirmLink = () => {
    setModalType('NONE');
    navigate("/");
  }
  return(
    <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">지라 코드</TableCell>
                  <TableCell align="left">지라 삭제 결과</TableCell>
                  <TableCell align="left">DB 삭제 결과</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deleteResult.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{item.jiraProjectCode}</TableCell>
                    <TableCell align="left">{item.result1}</TableCell>
                    <TableCell align="left">{item.result2}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant='contained' sx={{ margin: 3 }} onClick={handleConfirmLink} >확인</Button>
        </DialogContent >
  )
}

type DeleteProjectCheckInfoType = {
  modalData : string;
  setModalData:React.Dispatch<React.SetStateAction<string>>
  onClose : () => void; 
  setModalType : React.Dispatch<React.SetStateAction<ModalType>>
}

function DeleteProjectCheckInfo ({modalData, onClose,setModalData, setModalType}:DeleteProjectCheckInfoType){
  const [deleteForce, setDeleteForce] = useState<boolean>(false);
  const handleChecked = () => {
    if (!deleteForce) {
      // alert("휴지통 보관없이 삭제할 경우 지라에서 복구 할 수 없습니다.");
      alert("아직 지원하지 않는 기능입니다.");
    }
    setDeleteForce((prev) => !prev);
  };
  const deleteProjectInfo:SelectedProjectType[] = JSON.parse(modalData);
  const deleteList:string[]=[];
  deleteProjectInfo.forEach((item)=>{
    deleteList.push(item.jiraProjectKey);
  })
  const handleConfirmDelete = async ()=>{
    setModalType("API_LOADING");
    const result:DeleteProjectType[]|undefined  = await DeleteAxiosProject(deleteList, deleteForce);
    if(result!==undefined){
      const temp = JSON.stringify(result);
      setModalData(temp);
      setModalType("DELETE_SUCCESS");
    }
    else{
      setModalData("프로젝트 삭제 API호출에 실패하였습니다.");
      setModalType("API_FAIL");
    }
  }
  return (
    <DialogContent>
      <FormControlLabel 
        label="휴지통 보관없이 삭제하기."
        control={
          <Checkbox 
            onChange={handleChecked}/>
        }
        />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">지라메인 코드</TableCell>
              <TableCell align="left">프로젝트 이름</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deleteProjectInfo.map((item, index)=>(
              <TableRow key={`deleteProList${index}`}>
                <TableCell align="left">{item.jiraProjectKey}</TableCell>
                <TableCell align="left">{item.jiraProjectName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant='contained' sx={{ margin: 3 }} onClick={handleConfirmDelete} >삭제 진행</Button>
      <Button variant='contained' color='error' onClick={onClose} sx={{ margin: "5px" }}>취소</Button>
  </DialogContent >
  )
}

type LinkProjectResultType = {
  modalData:string;
  setModalType : React.Dispatch<React.SetStateAction<ModalType>>
}
function LinkProjectResult({modalData, setModalType}:LinkProjectResultType){
  const navigate = useNavigate();
  const putSuccessResult:UpdateProjectLinkType[] = JSON.parse(modalData);
  const handleConfirmLink = () => {
    setModalType('NONE');
    navigate("/");
  }
  return(
    <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">결과</TableCell>
                  <TableCell align="left">로그</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {putSuccessResult.map((_item, index) => (
                  <TableRow key={index}>
                    <TableCell align="left" sx={{ width: '100px' }}>{putSuccessResult[index].result === true ? "성공" : "실패"}</TableCell>
                    <TableCell align="left">{putSuccessResult[index].resultMessage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant='contained' sx={{ margin: 3 }} onClick={handleConfirmLink} >확인</Button>
        </DialogContent >
  )
}

type LinkProjectInfoType = {
  modalData:string,
  setModalType : React.Dispatch<React.SetStateAction<ModalType>>
  onClose : () => void;
  setModalData:React.Dispatch<React.SetStateAction<string>>
}
/** 프로젝트 연결 페이지 API이전 정보 확인용 모달 컴포넌트 */
function LinkProjectInfo({modalData, setModalType,onClose, setModalData}:LinkProjectInfoType){
  const putLinkData:UpdateProjectInfoType = JSON.parse(modalData);
  const handleConfirmLink = async()=>{
    setModalType('API_LOADING');
    const apiResult  = await AxiosPutProjectLink(putLinkData);
    if(apiResult!==undefined){
      const stringData = JSON.stringify(apiResult);
      setModalData(stringData);
      setModalType('LINK_SUCCESS');
    }
    else{
      setModalData("프로젝트 연결 API호출에 실패하였습니다.");
      setModalType("API_FAIL");
    }
  }
  return(
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">지라 메인 코드</TableCell>
              <TableCell align="left">지라 서브 코드</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left">{putLinkData.mainJiraKey}</TableCell>
              <TableCell align="left">{putLinkData.subJiraKeyList.join(' , ')}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant='contained' sx={{ margin: 3 }} onClick={handleConfirmLink} >링크 진행</Button>
      <Button variant='contained' color='error' onClick={onClose} sx={{ margin: "5px" }}>취소</Button>
  </Box >
  )
}

type CheckCreateProjectInfoType ={
  modalData : string;
  onClose : () => void; 
  setModalType : React.Dispatch<React.SetStateAction<ModalType>>
  setModalData : React.Dispatch<React.SetStateAction<string>>
}
/**프로젝트 생성정보 컨펌용 모달 컴포넌트*/
function CheckCreateProjectInfo({modalData,onClose, setModalType, setModalData}:CheckCreateProjectInfoType){
  const formData:ProjectTotalInfoType = JSON.parse(modalData);
  const {control, getValues } = useForm<ProjectTotalInfoType>({defaultValues: formData });
  const projectFlag = getValues("essential.projectFlag");

  const handleApiRequest=async ()=>{
    setModalType('API_LOADING');
    const apiResult:PostProjectCreateResultType = await PostCreateProject(formData);
    if(apiResult!==undefined){
      const stringData = JSON.stringify(apiResult);
      setModalData(stringData);
      setModalType('CREATE_SUCCESS');
    }
    else{
      setModalData("프로젝트 생성 API호출에 실패하였습니다.");
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


type ModalFailApiCallType = {
  modalData : string;
  onClose : () => void;
}
function ModalFailApiCall({modalData,onClose}:ModalFailApiCallType){
  return(
    <Box>
    <Box sx={{ borderBottom: `2px solid ${grey[200]}`, width: '100%', mb: 1, mt: 2 }} />
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, mt: -5 }}>
      <Box sx={{ bgcolor: red[50], borderRadius: '50%', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
        <ErrorIcon sx={{ color: red[600], fontSize: 50 }} />
      </Box>
      <Typography id="modal-modal-title" variant="h4" component="h2" color={grey[900]} fontWeight="fontWeightBold">
        요청하신 작업에 실패했습니다.
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2, color: grey[600], textAlign: 'center' }} fontWeight="fontWeightMedium">
        {modalData}
      </Typography>
    </Box>
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
      <Button variant="outlined" size="medium" onClick={onClose} sx={{ width: '150px' }}>
        <Typography variant="h6" fontWeight="fontWeightMedium">닫기</Typography>
      </Button>
    </Box>
  </Box>
  );
}
