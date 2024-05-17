/** 검색에 사용되는 타입
 * 
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

export type { GetAxiosResultType };
