//모달 유형
export type ModalType = 
'NONE'|                                           //모달 초기상태
'API_LOADING'|'API_FAIL'|                         //API 호출 로딩, 실패
'CREATE_CHECK'|'CREATE_SUCCESS'|'CREATE_FAIL'|    //프로젝트 생성 체크, 성공, 실패
'LINK_CHECK'|'LINK_SUCCESS'|'LINK_FAIL'|          //프로젝트 링크 체크, 성공, 실패
'DELETE_CHECK'|'DELETE_SUCCESS'|'DELETE_FAIL';    //프로젝트 삭제 체크,성공, 실패

//DataGird 선택시 쌓일 Chip의 데이터
export type SelectedProjectType = {
  jiraProjectKey:string;
  jiraProjectName:string;
}
