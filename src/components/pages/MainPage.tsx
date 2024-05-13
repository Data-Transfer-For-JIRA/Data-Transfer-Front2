import PageContents from "@components/organisms/PageContents";
import MainPageTemplate from "@components/templates/MainPageTemplate";
//TODO :  이부분에서 로그인에 대한 인증을 걸어두면 될듯.
export default function MainPage() {
  return (
    <MainPageTemplate>
      <PageContents />
    </MainPageTemplate>
  );
}
