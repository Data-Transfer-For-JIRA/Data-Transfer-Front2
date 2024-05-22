import ProjectBaseInfo from '@organisms/ProjectBaseInfoForm';
import MainPageTemplate from '@templates/MainPageTemplate';
import { useParams } from 'react-router-dom';

export default function ProjectFixedDetail(){
  const {jiraProjectCode} = useParams();
  
  return (
    <MainPageTemplate>
      <p>프로젝트 수정할때 쓸 디테일 페이지</p>
      <div>{jiraProjectCode}</div>
    </MainPageTemplate>
  )
}
