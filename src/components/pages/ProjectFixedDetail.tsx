import { ProjectTotalInfoType } from '@apis/ApiTypes';
import { GetAxiosProjectBasicInfo } from '@apis/AxiosGet';
import { defaultProjectTotalInfo } from '@common/DefaultValue';
import ProjectInfoGrid from '@organisms/ProjectInfoGrid';
import MainPageTemplate from '@templates/MainPageTemplate';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';


export default function ProjectFixedDetail() {
  const { jiraProjectCode, projectFlag } = useParams();
  const { control, handleSubmit, reset } = useForm<ProjectTotalInfoType>({defaultValues:defaultProjectTotalInfo});

  useEffect(() => {
    const callApi = async () => {
      if (jiraProjectCode && projectFlag) {
        const result:ProjectTotalInfoType = await GetAxiosProjectBasicInfo(jiraProjectCode, projectFlag);
        console.log(result);
        reset(result); // 폼을 API에서 받은 데이터로 초기화
      }
    };

    callApi();
  }, [jiraProjectCode, projectFlag, reset]);

  return (
    <MainPageTemplate>
      {control !== undefined ? (
        <ProjectInfoGrid projectFlag={projectFlag} control={control} readOnlyMode={false} />
      ) : (
        <div>Error</div>
      )}
    </MainPageTemplate>
  );
}
