import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectedProjectType } from '@common/CommonType';
import { useEffect } from 'react';


/**
 * 선택된 아이탬들을 보여주는 List
 * 각 개별 리스트는 삭제가 가능해야해서 아이콘이 있음.
 * 메인 Text랑 서브 Text가 표현될예정.
 * @itemList : 보여질 텍스트를 가지고있는 리스트
 * @handleTargetDelete : itemList 갱신할 함수
 */

type  SecondaryTestListType = {
  itemList ?: SelectedProjectType[];
  handleTargetDelete : (deleteCode:string)=>void;
}
export default function SecondaryTextList({itemList=[], handleTargetDelete}:SecondaryTestListType){
  useEffect(()=>{
  },[itemList])
  return(
    <List dense={true}>
        {itemList.map((item,index)=>(
          <ListItem
          key={`${item}${index}`}
          secondaryAction={
            <IconButton 
            edge="end" 
            aria-label="delete" 
            onClick={()=>handleTargetDelete(item.jiraProjectKey)}>
              <DeleteIcon/>
            </IconButton>
          }>
            <ListItemText
              primary = {item.jiraProjectKey}
              secondary={item.jiraProjectName}
            />
          </ListItem>
        ))}
    </List>
  );
}
