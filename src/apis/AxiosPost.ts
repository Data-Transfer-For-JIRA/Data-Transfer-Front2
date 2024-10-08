import axios from 'axios';
import { ProjectTotalInfoType, UserLoginInfoType } from '@apis/ApiTypes';

/**
 * 지라 프로젝트 생성 API
 * @param postJson react-hook-form으로 전달받은 데이터
 * @returns 응답결과 {result, jiraProjectCode, jiraProjectName}: 
 */
export const PostCreateProject= async (postJson : ProjectTotalInfoType)=>{
  const URL = `${import.meta.env.VITE_API_ADDRESS}/api/platform/service`;
  try {
    const {data}= await axios({
      url: URL,
      method: 'post',
      data: {
        ...postJson
      }
    })

    if(data.result==="프로젝트 생성 실패"){
      return undefined;
    }
    return data;
  }
  catch (Error) {
    return undefined;
  }
}

/**
 * 임시로그인 함수
 * @param userLoginInfo : id/pw 오브젝트
 * @returns 
 */
export const PostLogin = async ( userLoginInfo: UserLoginInfoType)=>{
  const URL = `${import.meta.env.VITE_API_ADDRESS}/login/temp`;
  try {
    const { data } = await axios({
      url: URL,
      method: 'post',
      data: { ...userLoginInfo }
    })
    return data;
  }
  catch (Error) {
    console.log(Error);
    return undefined;
  }
}

export const PostTest= async (postJson : ProjectTotalInfoType)=>{
  console.log(postJson);
  return {
    result:'성공',
    jiraProjectCode: 'TEST1234',
    jiraProjectName: '테스트'
  };
}
