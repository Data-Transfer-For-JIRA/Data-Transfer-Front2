import axios from "axios";

import { GetAxiosResultType } from "@apis/ApiTypes";

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
    return data;
  } catch (Error) {
    console.log(Error);
    return defaultValue;
  }
};