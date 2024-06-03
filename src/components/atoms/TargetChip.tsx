import { SelectedProjectType } from '@common/CommonType';
import { Box, Button  } from '@mui/material';
import SecondaryTextList from '@atoms/SecondaryTextList';

type TargetChipType = {
  itemList : SelectedProjectType[]
  handleTargetDelete : (deleteCode : string)=>void
  requestApiFunction : () => void
}
export default function TargetChip({itemList,handleTargetDelete, requestApiFunction}:TargetChipType ){
  return (
    <Box sx={{height :'85%', width:'100%', display : 'flex 1'}}>
      <Box sx={{ width:'100%', height :'100%'}} style={{ overflowY:'scroll'}}>
        <SecondaryTextList itemList={itemList} handleTargetDelete={handleTargetDelete}/>
      </Box>
      <Button
        variant="contained"
        type='button'
        color='primary'
        onClick={requestApiFunction}
        sx={{float : 'right'}}
      >요청
      </Button >
    </Box>
  )
}
