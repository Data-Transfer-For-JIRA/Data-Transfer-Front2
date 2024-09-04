import axios from 'axios';
import { ProjectTotalInfoType, UpdateProjectFixType, UpdateProjectInfoType, UpdateProjectLinkType } from './ApiTypes';
import { parsingHtmlData } from '@util/convertQuilltoApi';

/** 연관 프로젝트 링크 API
 * mainJiraKey 는 단일 스트링
 * subJiraKeyList는 연결할 프로젝트의 List형태. 사용자 input에서 중첩 막혀있음.
 * @returns 연결결과JsonArray
 */
export const AxiosPutProjectLink = async (linkData : UpdateProjectInfoType)
  : Promise<UpdateProjectLinkType[] | undefined> => {
  const URL = `${import.meta.env.VITE_API_ADDRESS}/api/platform/weblink`;
  try {
    const response = await axios.put(URL, null, {
      params: {
        mainJiraKey: linkData.mainJiraKey,
        subJiraKeyList: linkData.subJiraKeyList.join(','),
      }
    })
    return response.data;
  }
  catch (error) {
    console.log(error);
    return undefined;
  }
}

/** 프로젝트 기본정보를 수정하는 api호출
 * @param jiraKey 프로젝트 지라 코드(파람으로 받음.)
 * @param projectTotalInfo 프로젝트 폼 데이터(요청 바디에 작성해야함.)
 * @returns 결과값(성공, 실패, 중복)
 */
export const AxiosPutProjectFix = async(jiraKey:string,projectTotalInfo :ProjectTotalInfoType)
:Promise<UpdateProjectFixType|undefined|string>=>{
  const URL = `${import.meta.env.VITE_API_ADDRESS}/api/platform/update`;
  const parsingData = parsingHtmlData('QuillToApi', projectTotalInfo);
  if(parsingData===undefined){
    alert('데이터 입력에 문제가 발생하였습니다.');
    return undefined;
  }
  try {
    const result = await axios.put(URL,projectTotalInfo,{
      params:{
        jiraKey : jiraKey,
      }
    })

    const checkDuplicate = result.data.projectResult;

    if(checkDuplicate==='UPDATE_DUPLICATE'){
      console.log('UPDATE_DUPLICATE EXCEPTION');
      return 'DUPLICATE';
    }
    return result.data;
  }
  catch(Error){
    console.log(Error);
    return undefined;
  }
}