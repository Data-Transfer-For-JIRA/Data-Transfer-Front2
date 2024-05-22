import { ProjectTotalInfoType } from '@apis/ApiTypes';
import UnControlledCheckBox from '@atoms/UnControlledCheckBox';
import UnControlledMultiSelectedBox from '@atoms/UnControlledMultiSelectedBox';
import UnControlledReactQuill from '@atoms/UnControlledReactQuill';
import UnControlledSelectedBox from '@atoms/UnControlledSelectedBox';
import { MULTIOSSUPPORT, PRINTSUPPORTRANGE, PRODUCT } from '@common/FormValue';
import { Box, FormControl, Typography } from '@mui/material';
import { Control } from 'react-hook-form';

type ProjectAdditionalInfoType ={
  jiraProjectFlag :string;
  control : Control<ProjectTotalInfoType>;
  readOnlyMode : boolean;
};
export default function ProjectAdditionalInfoForm({jiraProjectFlag,control,readOnlyMode}:ProjectAdditionalInfoType){
  return(
    <Box sx={{ width: "100%",padding: '10px', marginTop: '10px'}}>
      <Typography variant="h5" gutterBottom>계약정보 입력</Typography>

      <UnControlledCheckBox 
        control={control} 
        name="common.allocationFlag"
        checkBoxProps={{
          disabled: readOnlyMode,
          defaultChecked : true,
        }}
        label = '인력배정 보드 추가 생성'
        />
      <UnControlledReactQuill jiraProjectFlag={jiraProjectFlag} control={control} disabled={readOnlyMode}/>
      <Typography variant="h5" gutterBottom sx={{marginTop: '20px'}}>추가 데이터 입력</Typography>
      <Box sx={{display:'flex', flexFlow: 'wrap', rowGap: "10px"}}>
        <UnControlledMultiSelectedBox
          control={control}
          name="common.productInfo2"
          item={PRODUCT}
          selectBoxProps={{
            label: "2.제품정보",
            disabled: readOnlyMode,
            id: "productInfo1-select",
            style: { width: '100%' },
            size: "small",
            defaultValue: "",
            multiple: true,
            inputProps: {
              style: {
                width: '100%'
              }
            }
          }} />
        <UnControlledMultiSelectedBox
          control={control}
          name="common.productInfo3"
          item={PRODUCT}
          selectBoxProps={{
            label: "3.제품정보",
            disabled: readOnlyMode,
            id: "productInfo1-select",
            style: { width: '100%' },
            size: "small",
            defaultValue: "",
            multiple: true,
            inputProps: {
              style: {
                width: '100%'
              }
            }
          }} />
        <UnControlledMultiSelectedBox
          control={control}
          name="common.productInfo4"
          item={PRODUCT}
          selectBoxProps={{
            label: "4.제품정보",
            disabled: readOnlyMode,
            id: "productInfo1-select",
            style: { width: '100%' },
            size: "small",
            defaultValue: "",
            multiple: true,
            inputProps: {
              style: {
                width: '100%'
              }
            }
          }} />
        <UnControlledMultiSelectedBox
          control={control}
          name="common.productInfo5"
          item={PRODUCT}
          selectBoxProps={{
            label: "5.제품정보",
            disabled: readOnlyMode,
            id: "productInfo1-select",
            style: { width: '100%' },
            size: "small",
            defaultValue: "",
            multiple: true,
            inputProps: {
              style: {
                width: '100%'
              }
            }
          }} />
        {/* 미지원 할거면 미지원 체크도 하게해줘라! */}
        <FormControl sx={{ width: '50%' }}>
          <UnControlledSelectedBox
            control={control}
            name="common.multiOsSupport"
            item={MULTIOSSUPPORT}
            selectBoxProps={{
              label: "멀티OS지원여부",
              disabled: readOnlyMode,
              id: "assignee-select",
              style: { width: '100%' },
              size: "small",
              inputProps: {
                style: {
                  width: '100%'
                }
              }
            }}
          />
        </FormControl>
        <FormControl sx={{ width: '50%' }}>
          <UnControlledSelectedBox
            control={control}
            name="common.printerSupportRange"
            item={PRINTSUPPORTRANGE}
            selectBoxProps={{
              label: "프린터 지원 범위",
              disabled: readOnlyMode,
              id: "assignee-select",
              style: { width: '100%' },
              size: "small",
              inputProps: {
                style: {
                  width: '100%'
                }
              }
            }}
            />
      </FormControl>
    </Box>
  </Box>        
  );
}
