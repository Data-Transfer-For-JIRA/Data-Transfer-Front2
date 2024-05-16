import PageContents from "@organisms/PageContents";
import MainPageTemplate from "@templates/MainPageTemplate";
//TODO :  이부분에서 로그인에 대한 인증을 걸어두면 될듯.

type MainPageType = {
  fixFlag :boolean;
}
export default function MainPage({fixFlag}:MainPageType) {
  return (
    <MainPageTemplate>
      <PageContents fixFlag={fixFlag}/>
    </MainPageTemplate>
  );
}
