import axios from "axios";

import { GetAxiosResultType } from "@apis/ApiTypes";
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
  const projectFlag = projectType=== "유지보수"? "M":"P";
  const URL = `${import.meta.env.VITE_API_ADDRESS}/api/platform/project?projectFlag=${projectFlag}&jiraKey=${jiraKey}`;
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