import axios from 'axios';
import { ProjectTotalInfoType, UpdateProjectInfoType, UpdateProjectLinkType } from './ApiTypes';
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


export const AxiosPutProjectFix = async(jiraKey:string,projectTotalInfo :ProjectTotalInfoType)=>{
  const URL = `${import.meta.env.VITE_API_ADDRESS}/api/platform/update`;
  const parsingData = parsingHtmlData('QuillToApi', projectTotalInfo);
  if(parsingData===undefined){
    alert('레전드상황발생');
    return undefined;
  }
  console.log(JSON.stringify(parsingData));
  try {
    const result = await axios.put(URL,projectTotalInfo,{
      params:{
        jiraKey : jiraKey,
      }
    })
    console.log(result);
  }
  catch(Error){
    console.log(Error);
    return undefined;
  }
}

export const testPutProjectLink= async (postJson : UpdateProjectInfoType)=>{
  console.log(postJson);
  return [
    {
    errorMessages: ["성공Death"],
    result: true,
    resultMessage: "링크에 성공하였습니다.",
    value: "Test1234"
  },
  {
    errorMessages: ["실패Death"],
    result: false,
    resultMessage: "링크에 실패하였습니다.",
    value: "응실패 ㅋ"
  }
];
}
