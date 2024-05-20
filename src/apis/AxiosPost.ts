import axios from 'axios';
import { ProjectTotalInfoType } from './ApiTypes';

/**
 * 지라 프로젝트 생성 API
 * @param postJson react-hook-form으로 전달받은 데이터
 * @returns 
 */
export const PostCreateProject= async (postJson : ProjectTotalInfoType)=>{
  const URL = `${import.meta.env.VITE_API_ADDRESS}/api/platform/service`;
  try {
    const {data} = await axios({
      url: URL,
      method: 'post',
      data: {
        ...postJson
      }
    })
    return data;
  }
  catch (Error) {
    console.log(Error);
  }
}
