import { GetAxiosResultType } from '../../Apis/ApiTypes';

/**
 * 검색어 입력 컴포넌트
 * 추후 상세 검색(연동 종류 등)을 고려하여 확장성 있게 개발 필요.
 * setState를 직접넘기지 말고 감싸야한다는데 내용을 찾아보자!
 */
type SerchProjectInputType = { setProjectList: React.Dispatch<React.SetStateAction<GetAxiosResultType[]>> }
export default function SerchProjectInput() {
  return (
    <div>serch serch my profile</div>
  );
}
