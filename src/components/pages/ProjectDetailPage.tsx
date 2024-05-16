import { useParams } from 'react-router-dom';

export default function ProjectDetailPage(){
  const {jiraProjectCode} = useParams();
  return (
    <div>{jiraProjectCode}</div>
  )
}
