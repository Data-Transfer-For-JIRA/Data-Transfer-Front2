type ProjectBaseInfoFormType = {
  jiraProjectCode :string|undefined
}
export default function ProjectBaseInfoForm({jiraProjectCode}:ProjectBaseInfoFormType){
  return (
    <div>{jiraProjectCode}</div>
  )
}
