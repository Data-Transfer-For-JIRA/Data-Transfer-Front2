import axios from "axios";

import { GetAxiosResultType, GetTicketListType } from "@apis/ApiTypes";
import { setOptionObject, sortObjectDate } from "@util/function";
import { parsingHtmlData } from "@util/convertQuilltoApi";
import { SearchNormalFilterType } from "@common/CommonType";

/**
 * 프로젝트 리스트 가져오는 Axios Get 방식
 * Default 파라미터를 설정하여서, 파라미터가 없이 넘어오는경우 모든 리스트를 가져온다.
 * @param searchKeyWord :검색 키워드 (JiraCode, 프로젝트 이름 다중 지원 가능  by 김찬호 선생)
 * @returns (type)GetAxiosResultType의 배열형으로 테이블에 보여질 데이터. 호출실패시 빈배열 반환
 */
export const GetAxiosSearchJiraList = async (
  searchKeyWord: string = " ",
  normalFilter:SearchNormalFilterType
): Promise<GetAxiosResultType[]> => {
  const URL = `${import.meta.env.VITE_API_ADDRESS}/jira/project/search?searchKeyword=${searchKeyWord}`;
  const defaultValue: GetAxiosResultType[] = [];
  
  try {
    const { data } = await axios(URL);
    const filterObject = setOptionObject(data,normalFilter);
    const sortData = sortObjectDate(filterObject);
    return sortData;
  } catch (Error) {
    console.log(Error);
    return defaultValue;
  }
};

/**
 * 프로젝트 수정 중 상세 페이지에 데이터를 호출 하는 Api
 * 데이터를 컴포넌트에 리턴하기 이전에 계약정보 데이터를 Quill에디터에 맞는 형태로 한번 파싱함
 * @param jiraKey : 조회에 필요한 지라 키값
 * @param projectType : 조회에 필요한 지라 프로젝트 타입(프로젝트, 유지보수)
 * @returns returnData : 컴포넌트에서 폼에 채워질 데이터 리턴 | 파싱 또는 api호출에 실패시 undefined가 나옴
 */
export const GetAxiosProjectBasicInfo = async (jiraKey:string, projectType:string)=>{
  console.log(projectType)
  const URL = `${import.meta.env.VITE_API_ADDRESS}/api/platform/project?projectFlag=${projectType}&jiraKey=${jiraKey}`;
  try{
    const result = await axios(URL);
    let returnData = result.data;
    returnData = parsingHtmlData('ApiToQuill',returnData);
    if(returnData===undefined){
      return undefined;
    }
    return returnData;
  }catch(Error){
    console.log(Error);
    return undefined;
  }

}

/**
 * 프로젝트 티켓리스트 가져오는 API 티켓내용까지 배열로 가져옴
 * 기본정보를 제외한 티켓리스트를 가져온다.(wss이관 데이터 표기 티켓도 가져옴, 기본정보 티켓은 가져오지않음)
 * @param jiraCode : 조회 대상 프로젝트.
 * @param pageNumber : 페이징 처리시 데이터 0부터 시작.
 * @param size : 한 페이지당 가져올 데이터.
 * @returns 조회한 데이터
 */
export const GetAxiosTicketList= async(jiraCode:string, pageNumber:number, size:number):Promise<GetTicketListType|undefined>=>{
  const URL =`${import.meta.env.VITE_API_ADDRESS}/api/platform/project/all-tickets?jiraProjectKey=${jiraCode}&page=${pageNumber}&size=${size}`;
  try{
    const {data} = await axios(URL);
    return data;
  }
  catch(error){
    console.log(error);
  }
  return undefined;
}