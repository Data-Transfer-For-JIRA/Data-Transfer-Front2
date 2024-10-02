import { Control } from 'react-hook-form';
import { Box, FormControl, Typography } from '@mui/material'

import { ProjectTotalInfoType } from '@apis/ApiTypes';
import UnControlledMultiSelectedBox from '@atoms/UnControlledMultiSelectedBox';
import UnControlledSelectedBox from '@atoms/UnControlledSelectedBox';
import UnControlledTextField from '@atoms/UnControlledTextField';

import { PRODUCT, USER, VARCODETYPE, contractStatus, inspectionCycle, inspectionMethod, projectProgressStep } from '@common/FormValue';
import UnControlledDatePicker from '@atoms/UnControlledDatePicker';

type ProjectBaseInfoFormType = {
  jiraProjectFlag :string;
  control : Control<ProjectTotalInfoType>;
  readOnlyMode : boolean;
  recallFlag:boolean;
}
export default function ProjectBaseInfoForm({jiraProjectFlag, control, readOnlyMode, recallFlag}:ProjectBaseInfoFormType){
  return (
    <Box sx={{  width: '100%', display: 'flex', flexFlow: 'wrap', rowGap: "10px", marginTop: '15px' }}>
      <Typography variant="h5" sx={{width: '100%'}}>{recallFlag===true ? `프로젝트 정보 입력`: `프로젝트 기본 정보`}</Typography>
        <FormControl style={{ width: '20%' }}>
          <UnControlledTextField
            control={control}
            name="essential.projectFlag"
            textFieldProps={{
              label: "프로젝트 유형",
              disabled: true,
              size: "small",
              style: { width: '100%' },
              inputProps: {
                style: {
                  width: '100%', margin: 0
                }
              }
            }} />
        </FormControl>

         
      <FormControl style={{ width: '80%' }}>
        <UnControlledTextField
          control={control}
          name="common.projectCode"
          textFieldProps={{
            label: "프로젝트 코드",
            disabled: readOnlyMode,
            size: "small",
            style: { width: '100%' },
            inputProps: {
              style: {
                width: '100%', margin: 0
              }
            }
          }} />
      </FormControl>

      <FormControl style={{ width: '100%' }}>
        <UnControlledTextField
          control={control}
          name="essential.projectName"
          rules={{ required: "프로젝트 이름은 필수 입력 값입니다." }}
          textFieldProps={{
            label: "프로젝트 이름",
            disabled: readOnlyMode,
            size: "small",
            style: { width: '100%' },
            inputProps: {
              style: {
                width: '100%', margin: 0
              }
            }
          }} />
      </FormControl>

      <FormControl style={{ width: '50%' }}>
        <UnControlledSelectedBox
            control={control}
            name="common.assignee"
            item={USER.Engineer}
            selectBoxProps={{
              label: "담당자",
              disabled: readOnlyMode,
              style: { width: '100%' },
              size: "small",
              inputProps: {
                style: {
                  width: '100%',
                }
              }
            }}
          />
      </FormControl>

      <FormControl style={{ width: '50%' }}>
        <UnControlledSelectedBox
            control={control}
            name="common.salesManager"
            item={jiraProjectFlag === 'P' ? USER.Sales_P : USER.Sales_M}
            rules={{ required: "영업대표는 필수 입력 값입니다." }}
            selectBoxProps={{
              label: "영업대표",
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

      <FormControl style={{ width: '50%' }}>
        <UnControlledTextField
          control={control}
          name="common.contractor"
          textFieldProps={{
            label: "계약사",
            disabled: readOnlyMode,
            size: "small",
            style: { width: '100%' },
            inputProps: {
              style: {
                width: '100%', margin: 0
              }
            }
          }} />
      </FormControl>

      <FormControl style={{ width: '50%' }}>
        <UnControlledTextField
          control={control}
          name="common.client"
          textFieldProps={{
            label: "고객사",
            disabled: readOnlyMode,
            size: "small",
            style: { width: '100%' },
            inputProps: {
              style: {
                width: '100%', margin: 0
              }
            }
          }} />
      </FormControl>

      <FormControl style={{ width: '100%' }}>
        <UnControlledMultiSelectedBox
          control={control}
          name="common.productInfo1"
          item={PRODUCT}
          selectBoxProps={{
            label: "1.제품정보",
            disabled: readOnlyMode,
            id: "productInfo1-select",
            style: { width: '100%' },
            size: "small",
            multiple: true,

            inputProps: {
              style: {
                width: '100%'
              }
            }
          }} />
      </FormControl>    

      <FormControl style={{ width: '50%' }}>
        <UnControlledSelectedBox
            control={control}
            name="common.barcodeType"
            item={VARCODETYPE}
            selectBoxProps={{
              label: "바코드 타입",
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

      <FormControl style={{ width: '50%' }}>
        <UnControlledSelectedBox
            control={control}
            name="common.subAssignee"
            item={USER.Engineer}
            selectBoxProps={{
              label: "부 담당자",
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

      {jiraProjectFlag=='P'?<BaseInfoProject control={control} readOnlyMode ={readOnlyMode}/>:
      <BaseInfoMaintenance control={control} readOnlyMode ={readOnlyMode}/>}
      
    </Box>
  )
}

//프로젝트일때 common에 해당하는 value를 위한 Form 추가
type ProjectMaintainFormType = {
  control: Control<ProjectTotalInfoType>; 
  readOnlyMode:boolean;
}
function BaseInfoProject({ control,readOnlyMode }: ProjectMaintainFormType){
  // const parseStringToDate = (dateString: string | null): Dayjs | null => {
  //   return dateString ? dayjs(dateString) : null;
  // };
  return (
    <Box sx={{ width: '100%', display: 'flex', flexFlow: 'wrap', rowGap: "10px"}}>
      <FormControl style={{ width: '100%' }}>
        <UnControlledDatePicker
          control={control}
          name="selected.projectAssignmentDate"
          datePickerProps={{
            label: "프로젝트 배정일",
            disabled: readOnlyMode,
            format: 'YYYY-MM-DD',
            sx: { width: '100%' }
          }} />
      </FormControl>

      <FormControl style={{ width: '100%' }}>
        <UnControlledSelectedBox
          control={control}
          name="selected.projectProgressStep"
          item={projectProgressStep}
          selectBoxProps={{
            label: "프로젝트 진행 단계",
            disabled: readOnlyMode,
            style: { width: '100%' },
            size: "small",
            inputProps: {
              style: {
                width: '100%',
              }
            }
          }}
        />
      </FormControl>
    </Box>
  )
}

//유지보수인경우 common에 추가될 value를 위한 Form 추가
function BaseInfoMaintenance({ control,readOnlyMode }: ProjectMaintainFormType){
  return (
    <Box sx={{ width: '100%', display: 'flex', flexFlow: 'wrap', rowGap: "10px"}}>
      <FormControl style={{ width: '100%' }}>
        <UnControlledSelectedBox
          control={control}
          name="selected.contractStatus"
          item={contractStatus}
          selectBoxProps={{
            label: "계약여부",
            disabled: readOnlyMode,
            style: { width: '100%' },
            size: "small",
            inputProps: {
              style: {
                width: '100%',
              }
            }
          }}
        />
      </FormControl>
      <FormControl style={{ width: '100%' }}>
        <UnControlledDatePicker
          control={control}
          name="selected.maintenanceStartDate"
          rules={{}}
          datePickerProps={{
            label: "유지보수 시작일",
            disabled: readOnlyMode,
            format: 'YYYY-MM-DD',
            sx: { width: '100%' }
          }} />
      </FormControl>

      <FormControl style={{ width: '100%' }}>
        <UnControlledDatePicker
          control={control}
          name="selected.maintenanceEndDate"
          datePickerProps={{
            label: "유지보수 종료일",
            disabled: readOnlyMode,
            format: 'YYYY-MM-DD',
            sx: { width: '100%' }
          }} />
      </FormControl>

      <FormControl style={{ width: '100%' }}>
        <UnControlledSelectedBox
          control={control}
          name="selected.inspectionCycle"
          item={inspectionCycle}
          selectBoxProps={{
            label: "점검 주기",
            disabled: readOnlyMode,
            style: { width: '100%' },
            size: "small",
            inputProps: {
              style: {
                width: '100%',
              }
            }
          }}
        />
      </FormControl>

      <FormControl style={{ width: '100%' }}>
        <UnControlledSelectedBox
          control={control}
          name="selected.inspectionMethod"
          item={inspectionMethod}
          selectBoxProps={{
            label: "점검 방법",
            disabled: readOnlyMode,
            style: { width: '100%' },
            size: "small",
            inputProps: {
              style: {
                width: '100%',
              }
            }
          }}
        />
      </FormControl>

      <FormControl style={{ width: '100%' }}>
        <UnControlledTextField
          control={control}
          name="selected.inspectionMethodEtc"
          textFieldProps={{
            label: "점검 방법(기타)",
            disabled: readOnlyMode,
            size: "small",
            multiline: true,
            style: { width: '100%' },
            inputProps: {
              style: {
                width: '100%', margin: 0
              }
            }
          }} />
      </FormControl>
    </Box>
  )
}

