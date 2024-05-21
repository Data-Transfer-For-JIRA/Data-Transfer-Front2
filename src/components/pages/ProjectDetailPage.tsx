import MainPageTemplate from '@templates/MainPageTemplate';
import { useParams } from 'react-router-dom';

export default function ProjectDetailPage(){
  const {jiraProjectCode} = useParams();
  return (
    <MainPageTemplate>
      <div>{jiraProjectCode}</div>
    </MainPageTemplate>
  )
}
