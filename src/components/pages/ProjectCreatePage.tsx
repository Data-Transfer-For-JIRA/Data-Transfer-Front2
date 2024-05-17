import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ProjectTotalInfoType } from '@apis/ApiTypes';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import MainPageTemplate from '@templates/MainPageTemplate';
import { defaultProjectTotalInfo } from '@common/DefaultValue';
import ProjectBaseInfoForm from '@organisms/ProjectBaseInfoForm';

/** 프로젝트 생성 컴포넌트
 *  ProjectBaseInfoForm => 기본정보 티켓중 필드에 입력될 값들
 *  ProjectAdditionalInfo=> NoAX정보값 또는 추가 제품군 선택 값들
 *  ProjectContractInfo=> reactQuill 에디터 컴포넌트
 */

export default function ProjectCreatePage(){
  //Tab 관련State
  const [tabValue, setTabValue] = useState(0);
  const [projectFlag, setProjectFlag] = useState('P');
  const handleTabChange = ()=>{
    if(tabValue === 0){
      setTabValue(1);
      setProjectFlag('M');
    }
    else{
      setTabValue(0);
      setProjectFlag('P');
    }
  }

  //react-hook-form 셋팅
  const { control, handlHookSubmit } = useForm<ProjectTotalInfoType>({
    defaultValues: { ...defaultProjectTotalInfo, essential: { ...defaultProjectTotalInfo.essential, projectFlag: projectFlag } }
  });

  useEffect(()=>{},[projectFlag])
  return(
    <MainPageTemplate>
      <Box sx={{padding: '10px'}}>
        <Tabs value={tabValue} onChange={handleTabChange} role="navigation">
          <Tab label="프로젝트"/>
          <Tab label="유지보수"/>
        </Tabs>
        <Grid container sx={{height: '100%', padding:'5px'}} spacing={2}>
          <Grid item xs={5}> 
            <ProjectBaseInfoForm jiraProjectFlag={projectFlag} control={control}/>
          </Grid>

          <Grid item xs={7}>
            <p>g2</p>
          </Grid>
        </Grid>      
      </Box>
    </MainPageTemplate>
  )
}



