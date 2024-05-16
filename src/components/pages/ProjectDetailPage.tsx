import ProjectBaseInfo from '@organisms/ProjectBaseInfoForm';
import MainPageTemplate from '@templates/MainPageTemplate';
import { useParams } from 'react-router-dom';

export default function ProjectDetailPage(){
  const {jiraProjectCode} = useParams();
  
  return (
    <MainPageTemplate>
      <ProjectBaseInfo jiraProjectCode={jiraProjectCode}/>
    </MainPageTemplate>
  )
}
