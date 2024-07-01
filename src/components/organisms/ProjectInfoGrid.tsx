import { Grid } from '@mui/material';
import ProjectBaseInfoForm from './ProjectBaseInfoForm';
import ProjectAdditionalInfoForm from './ProjectAdditionalInfoForm';
import { Control } from 'react-hook-form';
import { ProjectTotalInfoType } from '@apis/ApiTypes';

type ProjectInfoGridType = {
  projectFlag : string;
  control : Control<ProjectTotalInfoType>;
  readOnlyMode : boolean;
  handleCheckProject : ()=>void;
}
export default function ProjectInfoGrid({projectFlag, control ,readOnlyMode,handleCheckProject}:ProjectInfoGridType){
  return (
    <Grid container sx={{height: '100%', padding:'5px'}} spacing={2}>
      <Grid item xs={5}> 
        <ProjectBaseInfoForm jiraProjectFlag={projectFlag} control={control} readOnlyMode={readOnlyMode} handleCheckProject={handleCheckProject}/>
      </Grid>

      <Grid item xs={7}>
        <ProjectAdditionalInfoForm jiraProjectFlag={projectFlag} control={control} readOnlyMode={readOnlyMode}/>
      </Grid>
    </Grid>
  )
}
