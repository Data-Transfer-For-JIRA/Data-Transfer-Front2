import { GetAxiosResultType } from "@apis/ApiTypes";
import { GetAxiosSearchJiraList } from "@apis/AxiosGet";
import ControlledCheckBox from "@atoms/ContorlledCheckBox";
import ControlledTextInput from "@atoms/ControlledTextInput";
import SearchFilter from "@atoms/SearchFilter";
import { Box, Button, Drawer } from "@mui/material";
import { useEffect, useState } from "react";

type InputType = {
  handleSearchResult: (searchResult: GetAxiosResultType[]) => void;
  projectList : GetAxiosResultType[];
};

export default function SearchComponents({ handleSearchResult, projectList }: InputType){
  //일반 검색을 위한 checkbox 라벨
  const normalFilterList = ['프로젝트', '유지보수','종료 프로젝트 제외'];
  //특수 필터를 위한 Drawer용 선언
  const [specialFilterDrawer, setSpecialFilterDrawer] = useState(false);
  const handleDrawerOpen = ()=>{setSpecialFilterDrawer(true)};
  const handleDrawerClose = ()=>{setSpecialFilterDrawer(false)};


  useEffect(()=>{
    const requestDefaultApi = async ()=>{
      const result = await GetAxiosSearchJiraList(undefined);
      handleSearchResult(result);
    }
    if(projectList.length===0) {
      requestDefaultApi();
    }
  },[projectList])

  return (
    <Box sx={{p:'5px'}}>
      <Box sx={{textAlign:'center'}}>
        {normalFilterList.map((item, index)=>(
          <ControlledCheckBox key={`${index}${item}`} label={item} />
        ))}
        <Button type="button" variant="contained" onClick={handleDrawerOpen}>상세 검색</Button>
      </Box>
    <ControlledTextInput handleSearchResult={handleSearchResult} requestSearchApi={GetAxiosSearchJiraList}/>
      <Drawer anchor="top" open={specialFilterDrawer} onClose={handleDrawerClose}>
        <SearchFilter onClose={handleDrawerClose}/>
      </Drawer>
    </Box>
  );
}