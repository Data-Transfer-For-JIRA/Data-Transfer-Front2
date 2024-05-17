import UnControlledMultiSelectedBox from '@atoms/UnControlledMultiSelectedBox';
import UnControlledSelectedBox from '@atoms/UnControlledSelectedBox';
import UnControlledTextField from '@atoms/UnControlledTextField';
import { Box, FormControl, Paper } from '@mui/material';

type TestType = {
  defaultValue :object;
}

export default function Test(){
  return (
    <Paper>
    <Box sx={{ width: '100%', display: 'flex', flexFlow: 'wrap', rowGap: "15px" }}>
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
            size: "small",
            style: { width: '100%' },
            inputProps: {
              style: {
                width: '100%', margin: 0
              }
            }
          }} />
      </FormControl>

      <Box style={{ width: '50%' }}>
        <UnControlledSelectedBox
          control={control}
          name="common.assignee"
          item={USER.Engineer}
          selectBoxProps={{
            label: "담당자",
            style: { width: '100%' },
            size: "small",
            inputProps: {
              style: {
                width: '100%',
              }
            }
          }}
        />
      </Box>
      <Box style={{ width: '50%' }}>
        <UnControlledSelectedBox
          control={control}
          name="common.salesManager"
          item={projectFlag === 'P' ? USER.Sales_P : USER.Sales_M}
          rules={{ required: "영업대표는 필수 입력 값입니다." }}
          selectBoxProps={{
            label: "영업대표",
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
      </Box>
      <FormControl style={{ width: '50%' }}>
        <UnControlledTextField
          control={control}
          name="common.contractor"
          textFieldProps={{
            label: "계약사",
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
            size: "small",
            style: { width: '100%' },
            inputProps: {
              style: {
                width: '100%', margin: 0
              }
            }
          }} />
      </FormControl>

      <UnControlledMultiSelectedBox
        control={control}
        name="common.productInfo1"
        item={PRODUCT}
        selectBoxProps={{
          label: "1.제품정보",
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
      <Box sx={{ width: '50%' }}>
        <UnControlledSelectedBox
          control={control}
          name="common.barcodeType"
          item={VARCODETYPE}
          selectBoxProps={{
            label: "바코드 타입",
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
      </Box>
      <Box sx={{ width: '50%' }}>
        <UnControlledSelectedBox
          control={control}
          name="common.subAssignee"
          item={USER.Engineer}
          selectBoxProps={{
            label: "부 담당자",
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
      </Box>
    </Box>
    </Paper>
  )
}
