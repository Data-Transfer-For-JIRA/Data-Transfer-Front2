import { Box, Button, Divider, FormControl, FormLabel, TextField, Typography } from "@mui/material";

type SearchFilterType={
  onClose: ()=>void;
}

export default function SearchFilter({onClose}:SearchFilterType){
  
  return (
    <Box sx={{width:'60%', margin :'5px auto', pl:'3px'}}>
      <Typography variant="h5">조건 검색 필터</Typography>
      <Box>
        <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={1}>
          <FormControl sx={{display:"flex", flexDirection: 'row'}}>
            <FormLabel sx={{width:'20%'}}>프로젝트 코드</FormLabel>
            <TextField variant="outlined" size="small" sx={{ width:'80%', '& .MuiInputBase-input':{fontSize:'10px'}}}/>
          </FormControl>

          <FormControl sx={{display:"flex", flexDirection: 'row'}}>
            <FormLabel sx={{width:'20%'}}>프로젝트 이름</FormLabel>
            <TextField variant="outlined" size="small" sx={{ width:'80%', '& .MuiInputBase-input':{fontSize:'10px'}}}/>
          </FormControl>

          <FormControl sx={{display:"flex", flexDirection: 'row'}}>
            <FormLabel sx={{width:'20%'}}>고객사 이름</FormLabel>
            <TextField variant="outlined" size="small" sx={{ width:'80%', '& .MuiInputBase-input':{fontSize:'10px'}}}/>
          </FormControl>

          <FormControl sx={{display:"flex", flexDirection: 'row'}}>
            <FormLabel sx={{width:'20%'}}>계약사 이름</FormLabel>
            <TextField variant="outlined" size="small" sx={{ width:'80%', '& .MuiInputBase-input':{fontSize:'10px'}}}/>
          </FormControl>

          <FormControl sx={{display:"flex", flexDirection: 'row'}}>
            <FormLabel sx={{width:'20%'}}>프로젝트 담당자</FormLabel>
            <TextField variant="outlined" size="small" sx={{ width:'80%', '& .MuiInputBase-input':{fontSize:'10px'}}}/>
          </FormControl>

          <FormControl sx={{display:"flex", flexDirection: 'row'}}>
            <FormLabel sx={{width:'20%'}}>계약 담당자</FormLabel>
            <TextField variant="outlined" size="small" sx={{ width:'80%', '& .MuiInputBase-input':{fontSize:'10px'}}}/>
          </FormControl>
        </Box>
      </Box>

      <Divider sx={{mt:'5px', mb:'5px'}}/>

      <Typography variant="h5">제품유형 필터</Typography>
      <Box>
        <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={1}>
          <FormControl sx={{display:"flex", flexDirection: 'row'}}>
            <FormLabel sx={{width:'20%'}}>제품 형태</FormLabel>
            <TextField variant="outlined" size="small" sx={{ width:'80%', '& .MuiInputBase-input':{fontSize:'10px'}}}/>
          </FormControl>

          <FormControl sx={{display:"flex", flexDirection: 'row'}}>
            <FormLabel sx={{width:'20%'}}>연동 형태</FormLabel>
            <TextField variant="outlined" size="small" sx={{ width:'80%', '& .MuiInputBase-input':{fontSize:'10px'}}}/>
          </FormControl>
        </Box>
      </Box>

      <Divider sx={{mt:'5px', mb:'5px'}}/>

      <Typography variant="h5">엔지니어 미배정, 프로젝트 코드 없음 검색</Typography>  
      <Box>
      <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={1}>
          <FormControl sx={{display:"flex", flexDirection: 'row'}}>
            <FormLabel sx={{width:'20%'}}>담당자 없음</FormLabel>
            <TextField variant="outlined" size="small" sx={{ width:'80%', '& .MuiInputBase-input':{fontSize:'10px'}}}/>
          </FormControl>

          <FormControl sx={{display:"flex", flexDirection: 'row'}}>
            <FormLabel sx={{width:'20%'}}>프로젝트 코드 없음</FormLabel>
            <TextField variant="outlined" size="small" sx={{ width:'80%', '& .MuiInputBase-input':{fontSize:'10px'}}}/>
          </FormControl>
        </Box>
      </Box>

      <Divider sx={{mt:'5px', mb:'5px'}}/>

      <Box sx={{display : 'flex', gap: '10px', justifyContent:'flex-end'}}>
        <Button type="button" variant="contained" >적용</Button>
        <Button type="button" variant="contained" onClick={onClose}>닫기</Button>
      </Box>
    </Box>
  );
}