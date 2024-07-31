import { GetAxiosResultType } from '@apis/ApiTypes';
import { SelectedProjectType } from '@common/CommonType';

/** 선택된 프로젝트 코드와 Chip에 보여질 데이터 매칭 함수
 *  검색결과에 따라 비교대상이 달라져서 문제가좀 있음;
 */
export const setSelectProjectList = (targetProject:string[], searchResult:GetAxiosResultType[]):SelectedProjectType[]=>{
  const tempArray:SelectedProjectType[] = [];
  searchResult.map((item)=>{
    if(targetProject.includes(item.key)){
      tempArray.push({
        jiraProjectKey : item.key,
        jiraProjectName : item.jiraProjectName
      });
    }
  })
  return tempArray;
}

/**
 * 오브젝트 마이그레이션 데이터 기준 오름차순 정렬 함수
 * @param axiosResult API호출결과 오브젝트
 * @returns sorted_list 정렬결과
 */
export const sortObjectDate = (axiosResult:GetAxiosResultType[]):GetAxiosResultType[]=>{
  const sorted_list = axiosResult.sort(function(a, b) {
		return new Date(a.migratedDate).getTime() - new Date(b.migratedDate).getTime();
	}).reverse();
  return sorted_list;
}

/** React-Quill에 입려된 데이터를 마크다운 형태로 변환하는 함수.
 * ul, ol 태그의 클래스 처리 변경, 색션분리 --- 문자열 처리, tt태그 날짜 처리
 * @param quillData : 마크다운으로 변경할 Quill데이터
 * @return markdownData : api파라미터를 전송할 마크다운 데이터.
 */
// export const converQuilltoMarkDown= (quillData:string)=>{
//   let markDownData;
//   return markDownData;
// }
