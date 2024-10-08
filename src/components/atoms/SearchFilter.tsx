import { SearchFilterInputType } from "@common/CommonType";
import { Box, Button, Divider, FormControl, FormLabel, styled, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import UnControlledTextField from "./UnControlledTextField";
import UnControlledMultiSelectedBox from "./UnControlledMultiSelectedBox";
import { PRODUCT } from "@common/FormValue";
import UnControlledCheckBox from "./UnControlledCheckBox";

const StyledFormControl = styled(FormControl)({
  display:"flex", 
  flexDirection: 'row', 
  alignItems:'center'
})

type SearchFilterType={
  onClose: ()=>void;
}

export default function SearchFilter({onClose}:SearchFilterType){
  const {control, handleSubmit} = useForm<SearchFilterInputType>();
  const handleSearchFormSubmit:SubmitHandler<SearchFilterInputType> = (data)=>{
    console.log(data);
    alert('아직 제공하지 않는 서비스입니다.');
  }
  return (
    <Box sx={{width:'60%', margin :'5px auto', pl:'3px'}}>
      <form autoComplete="off" onSubmit={handleSubmit(handleSearchFormSubmit)}>
      <Typography variant="h5">조건 검색 필터</Typography>
      <Box>
        <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={1}>
          <StyledFormControl>
            <FormLabel sx={{width:'20%'}}>프로젝트 코드</FormLabel>
            <UnControlledTextField 
              control={control}
              name="projectCode"
              textFieldProps={{
                label:"프로젝트 코드 입력",
                size:"small",
                style:{width:'80%'  },
                sx: {'& .MuiInputBase-input':{fontSize:'12px'}}
              }}
            />
          </StyledFormControl>

          <StyledFormControl>
            <FormLabel sx={{width:'20%'}}>프로젝트 이름</FormLabel>
            <UnControlledTextField 
              control={control}
              name="projectName"
              textFieldProps={{
                label:"프로젝트 이름 입력",
                size:"small",
                style:{width:'80%'  },
                sx: {'& .MuiInputBase-input':{fontSize:'12px'}}
              }}
            />
          </StyledFormControl>

          <StyledFormControl>
            <FormLabel sx={{width:'20%'}}>고객사 이름</FormLabel>
            <UnControlledTextField 
              control={control}
              name="client"
              textFieldProps={{
                label:"고객사 이름 입력",
                size:"small",
                style:{width:'80%'  },
                sx: {'& .MuiInputBase-input':{fontSize:'12px'}}
              }}
            />
          </StyledFormControl>

          <StyledFormControl>
            <FormLabel sx={{width:'20%'}}>계약사 이름</FormLabel>
            <UnControlledTextField 
              control={control}
              name="contractor"
              textFieldProps={{
                label:"계약사 이름 입력",
                size:"small",
                style:{width:'80%'  },
                sx: {'& .MuiInputBase-input':{fontSize:'12px'}}
              }}
            />
          </StyledFormControl>

          <StyledFormControl>
            <FormLabel sx={{width:'20%'}}>프로젝트 담당자</FormLabel>
            <UnControlledTextField 
              control={control}
              name="assignee"
              textFieldProps={{
                label:"담당 엔지니어 이름 입력",
                size:"small",
                style:{width:'80%'  },
                sx: {'& .MuiInputBase-input':{fontSize:'12px'}}
              }}
            />
          </StyledFormControl>

          <StyledFormControl>
            <FormLabel sx={{width:'20%'}}>계약 담당자</FormLabel>
            <UnControlledTextField 
              control={control}
              name="salesManager"
              textFieldProps={{
                label:"영업 담당자 이름 입력",
                size:"small",
                style:{width:'80%'  },
                sx: {'& .MuiInputBase-input':{fontSize:'12px'}}
              }}
            />
          </StyledFormControl>
        </Box>
      </Box>

      <Divider sx={{mt:'5px', mb:'5px'}}/>

      <Typography variant="h5">제품유형 필터</Typography>
      <Box>
        <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={1}>
        <StyledFormControl>
            <FormLabel sx={{width:'25%'}}>제품 형태</FormLabel>
            <UnControlledMultiSelectedBox
              control={control}
              name="productInfo"
              item={PRODUCT}
              selectBoxProps={{
                label: "제품정보",
                id: "productInfo-select",
                style: { width: '100%' },
                size: "small",
                defaultValue: [],
                multiple: true,
                inputProps: {
                  style: {
                    width: '100%',
                  }
                },
                sx: {'& .MuiInputBase-input':{fontSize:'12px'}}
              }}
            />
          </StyledFormControl>
        </Box>
      </Box>

      <Divider sx={{mt:'5px', mb:'5px'}}/>

      <Typography variant="h5">엔지니어 미배정, 프로젝트 코드 없음 검색</Typography>  
      <Box>
        <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={1}>
          <StyledFormControl>
            <FormLabel sx={{width:'20%'}}>담당자 미배정 프로젝트 찾기</FormLabel>
            <UnControlledCheckBox 
              control={control} 
              name="notAssignee"
              defaultValue={false}
              // label = '인력배정 보드 추가 생성'
            />
          </StyledFormControl>

          <StyledFormControl>
            <FormLabel sx={{width:'20%'}}>프로젝트 코드 미발급 찾기</FormLabel>
            <UnControlledCheckBox 
              control={control} 
              name="notProjectCode"
              defaultValue={false}
              // label = '인력배정 보드 추가 생성'
            />
          </StyledFormControl>
        </Box>
      </Box>

      <Divider sx={{mt:'5px', mb:'5px'}}/>

      <Box sx={{display : 'flex', gap: '12px', justifyContent:'flex-end'}}>
        <Button type="submit" variant="contained">적용</Button>
        <Button type="button" variant="contained" onClick={onClose}>닫기</Button>
      </Box>
      </form>
    </Box>
  );
}