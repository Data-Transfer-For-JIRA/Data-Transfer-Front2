//모달 유형
export type ModalType = 
'NONE'|                               //모달 초기상태
'API_LOADING'|'API_FAIL'|             //API 호출 로딩, 실패
'CREATE_CHECK'|'CREATE_SUCCESS'|      //프로젝트 생성 체크, 성공
'LINK_CHECK'|'LINK_SUCCESS'|          //프로젝트 링크 체크, 성공,
'DELETE_CHECK'|'DELETE_SUCCESS'|      //프로젝트 삭제 체크,성공,
'UPDATE_CHECK'|'UPDATE_SUCCESS';     //프로젝트 수정 체크, 성공   

//DataGird 선택시 쌓일 Chip의 데이터
export type SelectedProjectType = {
  jiraProjectKey:string;
  jiraProjectName:string;
}
