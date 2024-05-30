/** 검색후 응답으로 받을 데이터의 타입
 *  프로젝트 조회, 프로젝트 링크, 프로젝트 수정, 프로젝트 삭제.
 */
type GetAxiosResultType = {
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
type ProjectTotalInfoType ={
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
type PostProjectCreateResultType = {
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

export type { GetAxiosResultType, ProjectTotalInfoType, PostProjectCreateResultType };
