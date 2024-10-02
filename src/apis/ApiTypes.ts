/** 검색후 응답으로 받을 데이터의 타입
 *  프로젝트 조회, 프로젝트 링크, 프로젝트 수정, 프로젝트 삭제.
 */
export type GetAxiosResultType = {
  key: string;
  id: string;
  jiraProjectName: string;
  migratedDate: string;
  projectCode: string;
  wssProjectName: string;
  flag: string;
  projectAssignees: string;
  updateDate: string;
  updateIssueFlag: boolean;
};

/** 프로젝트 기본정보 티켓들 타입
 * 프로젝트 생성 및 수정 API 파라미터로 사용
 * essential  : 백엔드에서 필수로 요구하는 타입
 * common     : 유지보수, 프로젝트에 공통적으로 사용하는 타입
 * selected   : 유지보수, 프로젝트에서 각각 필요로 하는 타입
 *              =>별도의 구분은 없고 react-hook-form의 control을 통해 필요한 값만 넘김.
 */
export type ProjectTotalInfoType ={
  essential: {
    projectFlag: string;
    projectName: string;
  },
  common: {
    projectCode: string;
    assignee: string;
    subAssignee: string;
    salesManager: string;
    contractor: string;
    client: string;
    productInfo1: string[];
    productInfo2: string[];
    productInfo3: string[];
    productInfo4: string[];
    productInfo5: string[];
    barcodeType: string;
    multiOsSupport: string;
    printerSupportRange: string;
    etc: string;
    description: string;
    allocationFlag: boolean;
  },
  selected: {
    //프로젝트
    projectAssignmentDate: string;
    projectProgressStep: string;
    //유지보수
    contractStatus: string;
    maintenanceStartDate: string;
    maintenanceEndDate: string;
    inspectionMethod: string;
    inspectionMethodEtc: string;
    inspectionCycle: string;
  }
}

//지라 프로젝트 생성 결과 타입
export type PostProjectCreateResultType = {
  result: string;
  jiraProjectCode: string;
  jiraProjectName: string;
}

//프로젝트 링크 API 파라미터 타입
export type UpdateProjectInfoType = {
  mainJiraKey : string,
  subJiraKeyList : string[]
}

//지라 프로젝트 링크 결과 타입
export type UpdateProjectLinkType = {
  errorMessages: string[],
  result: boolean,
  resultMessage: string,
  value: string
}

//지라 프로젝트 삭제 결과 타입
export type DeleteProjectType = {
  result1 : string;   //지라에서의 삭제 유/무
  result2 : string;   //DB에서의 삭제 유/무
  jiraProjectCode : string;
}

//플렛폼 Login 타입
export type UserLoginInfoType = {
  id : string,
  pwd : string,
}

//프로젝트 기본정보 수정 결과 타입
export type UpdateProjectFixType={
  jiraProjectKey:string;
  jiraIssueKey : string;
  projectResult: string;
  issueResult:string;
}

//API호출중 티켓에 관련된 타입
export type TicketContents = {
  createDate:string;
  jiraProjectKey:string;
  담당자:string;
  댓글들:[
    {
      댓글_내용:string;
      댓글_아이디:string;
      생성일:Date;
      업데이트일:Date;
      작성자:string;
      지라이슈_키:string;
    }
  ],
  상세내용:string;
  업데이트일:Date;
  이슈_출처:boolean; //WSS 이관데이터면 false(편집기능 제어), 지라출처면 true
  지라_이슈_제목:string;
  지라_이슈_키:string;
}
//특정 프로젝트 모든 티켓 조회 결과 타입
export type GetTicketListType = {
  content :[
    TicketContents
  ],
  empty:boolean;
  first:boolean;
  last:boolean;
  number:number;
  numberOfElements:number;
  pageable:{
    offset:number;
    pageNumber:number;
    pageSize:number;
    paged:boolean;
    sort:{
      empty:boolean;
      sorted:boolean;
      unsorted:boolean;
    },
    unpaged:boolean;
  },
  size:number;
  sort:{
    empty:boolean;
    sorted:boolean;
    unsorted:boolean;
  },
  totalElements:number;
  totalPages:number;
}
