import { SelectedProjectType } from '@common/CommonType';
import { Box, Button } from '@mui/material';
import SecondaryTextList from '@atoms/SecondaryTextList';

type RequestApiFunctionType<T>= 
|((mainJiraKey: string, subJiraKeyList: string[]) => Promise<T>)
| ((deleteCodeList: string[]) => Promise<T>);

type TargetChipType<T> = {
  itemList : SelectedProjectType[]
  handleTargetDelete : (deleteCode : string)=>void
  requestApiFunction : RequestApiFunctionType<T>
}
export default function TargetChip<T>({itemList,handleTargetDelete, requestApiFunction}:TargetChipType<T> ){
  return (
    <Box sx={{height :'85%', width:'100%', display : 'flex 1'}}>
      <Box sx={{ width:'100%', height :'100%'}} style={{ overflowY:'scroll'}}>
        <SecondaryTextList itemList={itemList} handleTargetDelete={handleTargetDelete}/>
      </Box>
      <Button
        variant="contained"
        color='primary'
        onClick={()=>requestApiFunction}
        sx={{float : 'right'}}
      >요청
      </Button >
    </Box>
  )
}
