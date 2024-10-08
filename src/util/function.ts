import { GetAxiosResultType } from '@apis/ApiTypes';
import { SearchNormalFilterType, SelectedProjectType } from '@common/CommonType';

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

/**
 * 단순 필터 처리를 위한 함수(유지보수, 프로젝트, 종료 제외 검색)
 * @param dataObject 
 * @param normalFilter 
 */
export const setOptionObject = (dataObject:GetAxiosResultType[], normalFilter:SearchNormalFilterType)=>{
  let tempArray: GetAxiosResultType[] = [];
  const {showProjectTypeP ,showProjectTypeM} = normalFilter;

  if(showProjectTypeP && showProjectTypeM){
    tempArray =  dataObject;
  }
  else if (showProjectTypeP&&!showProjectTypeM){
    tempArray = dataObject.filter((item)=>{
      return item.flag ==='P'
    })
  }
  else if(!showProjectTypeP&&showProjectTypeM){
    tempArray = dataObject.filter((item)=>{
      return item.flag ==='M'
    })
  }
  else{
    tempArray = dataObject.filter((item)=>{
      return item.flag !=='M'&& item.flag !=='P'
    })
  }

  return tempArray;
}