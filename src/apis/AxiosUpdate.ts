import axios from 'axios';
import { UpdateProjectInfoType, UpdateProjectLinkType } from './ApiTypes';

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
