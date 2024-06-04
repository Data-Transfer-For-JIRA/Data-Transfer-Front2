import axios from 'axios';
import { DeleteProjectType } from './ApiTypes';

/** 프로젝트 삭제 API
 * @param deleteProjectList 삭제할 프로젝트 리스트
 * @param forceFlag 지라 프로젝트를 쓰래기통 보관할지 그냥 삭제할지 유/무
 * @return DeleteProjectType 지라/ DB 양쪽 삭제 유/무 삭제한 프로젝트 지라코드
 */
export const DeleteAxiosProject = async (deleteProjectList: string[],forceFlag:boolean)=>{
  let deleteType:string;
if(forceFlag===true) {deleteType="ALL";}
  else {deleteType="TRASH"}
  const URL = `${import.meta.env.VITE_API_ADDRESS}/jira/project/delete?deleteProject=${deleteType}`;
  try{
    const apiResult:DeleteProjectType[] = await axios.delete(URL,{
      data : deleteProjectList,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return apiResult;
  }
  catch(err){
    console.log(err)
    return undefined;
  }
}
