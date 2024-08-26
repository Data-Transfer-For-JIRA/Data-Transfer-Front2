import axios from "axios";

import { GetAxiosResultType, ProjectTotalInfoType } from "@apis/ApiTypes";
import { sortObjectDate } from "@util/function";
import { defaultProjectTotalInfo } from "@common/DefaultValue";

/**
 * 프로젝트 리스트 가져오는 Axios Get 방식
 * Default 파라미터를 설정하여서, 파라미터가 없이 넘어오는경우 모든 리스트를 가져온다.
 * @param searchKeyWord :검색 키워드 (JiraCode, 프로젝트 이름 다중 지원 가능  by 김찬호 선생)
 * @returns (type)GetAxiosResultType의 배열형으로 테이블에 보여질 데이터. 호출실패시 빈배열 반환
 */
export const GetAxiosSearchJiraList = async (
  searchKeyWord: string = " "
): Promise<GetAxiosResultType[]> => {
  const URL = `${import.meta.env.VITE_API_ADDRESS}/jira/project/search?searchKeyword=${searchKeyWord}`;
  const defaultValue: GetAxiosResultType[] = [];
  try {
    const { data } = await axios(URL);
    const sortData = sortObjectDate(data);
    return sortData;
  } catch (Error) {
    console.log(Error);
    return defaultValue;
  }
};

const test:ProjectTotalInfoType = {
  "essential": {
    "projectFlag": "P",
    "projectName": "EP - 국립국제교육원-한국어능력시험(TOPIK) IBT 시스템(4단계) 웹DRM 추가"
  },
  "common": {
    "projectCode": "P24C11101",
    "assignee": "김찬호",
    "subAssignee":"",
    "salesManager": "원경민",
    "contractor": "조달청",
    "client": "국립국제교육원",
    "barcodeType": "기본",
    "description": "<p>1.고객사 : 국립국제교육원</p>\n\n<p>2. 계약 업체 : 조달청</p>\n\n<p>3. 프로젝트 명 : 국립국제교육원 한국어능력시험(TOPIK) IBT 시스템(4단계) 웹DRM 추가</p>\n\n<p>4. 프로젝트 코드 : P24C11101</p>\n\n<p>5. 지원 일정 : 7월중 진행예정</p>\n\n<p>6. 담당자 : 엔에스데블 김명희 본부장 - 010-3204-6859</p>\n\n<p>7. 지원 범위 :</p>\n\n<p>    가. 지원 형태 : WS NoAX / 일반웹브라우저 연동 기준으로 알고 있으며 업체통해 문의드린 상태 입니다.</p>\n\n<p>    나. 연동 형태 : exe</p>\n\n<p>    다. 사용자 지원 환경 : Windows OS 기준 / 멀티브라우저 기준</p>\n\n<p>    라. 서버 수량 : 운영 웹서버 2식 / 도메인 2개 (신규)</p>\n\n<p>8. 장소 : 국립국제교육원 본원 (정자동)</p>\n\n<p>9. 영업 담당 : 원경민</p>\n\n<p>10. 기타 : </p>\n\n<ul>\n\t<li>엔지니어 배정 후 안내 주시면 협의 후 다시 일정 및 연동대상 안내 드리겠습니다.</li>\n\t<li>기존 '2021_국립국제교육원 한국어능력시험 말하기평가 (2단계) IBT 시스템 구축' 건의 추가 사업 입니다.</li>\n</ul>",
    "productInfo1": [
      "WebDRM NoaX"
    ],
    "productInfo2": [],
    "productInfo3": [],
    "productInfo4": [],
    "productInfo5": [],
    "multiOsSupport": "",
    "printerSupportRange": "",
    "etc": "",
    "allocationFlag":false,
  },
  "selected": {
    "projectAssignmentDate": "2024-06-25",
    "projectProgressStep": "4. 프로젝트 안정화 기간",
    "contractStatus": "",
    "maintenanceStartDate": "",
    "maintenanceEndDate": "",
    "inspectionMethod": "",
    "inspectionMethodEtc": "",
    "inspectionCycle": "",
  }
}

export const GetAxiosProjectBasicInfo = async (jiraKey:string, projectType:string)=>{
  const projectFlag = projectType=== "유지보수"? "M":"P";
  const URL = `${import.meta.env.VITE_API_ADDRESS}/api/platform/project?projectFlag=${projectFlag}&jiraKey=${jiraKey}`;
  const errorResult:ProjectTotalInfoType =defaultProjectTotalInfo;
  try{
    const {data} = await axios(URL);
    return data;
  }catch(Error){
    console.log(Error);
    return errorResult;
  }

}