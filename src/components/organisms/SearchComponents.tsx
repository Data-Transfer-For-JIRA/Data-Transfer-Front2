import { GetAxiosResultType } from "@apis/ApiTypes";
import { GetAxiosSearchJiraList } from "@apis/AxiosGet";
import ControlledCheckBox from "@atoms/ContorlledCheckBox";
import ControlledTextInput from "@atoms/ControlledTextInput";
import SearchFilter from "@atoms/SearchFilter";
import { SearchNormalFilterType } from "@common/CommonType";
import { NormalFilterDefault } from "@common/DefaultValue";
import { Box, Button, Checkbox, Drawer, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";

type InputType = {
  handleSearchResult: (searchResult: GetAxiosResultType[]) => void;
  projectList : GetAxiosResultType[];
};

export default function SearchComponents({ handleSearchResult }: InputType){
  //일반 검색을 위한 checkbox 라벨
  const normalFilterList = ['프로젝트', '유지보수','종료 프로젝트 제외'];
  //특수 필터를 위한 Drawer용 선언
  const [specialFilterDrawer, setSpecialFilterDrawer] = useState(false);
  const handleDrawerOpen = ()=>{setSpecialFilterDrawer(true)};
  const handleDrawerClose = ()=>{setSpecialFilterDrawer(false)};

  //일반 필터를 위한 그룹 체크박스(전체 선택은 없음)
  const [normalFilter, setNormalFilter] = useState<SearchNormalFilterType>(NormalFilterDefault);
  const handleCheckBox = (event:React.ChangeEvent<HTMLInputElement>)=>{
    console.log(event.target.name);
    setNormalFilter({
      ...normalFilter,
      [event.target.name] : event.target.checked
    })
  }

  useEffect(()=>{
    const requestDefaultApi = async ()=>{
      const result = await GetAxiosSearchJiraList(undefined);
      handleSearchResult(result);
    }
      requestDefaultApi();
    },[normalFilter])

  return (
    <Box sx={{p:'5px'}}>
      <Box sx={{textAlign:'center'}}>
        {Object.keys(normalFilter).map((item, index)=>(
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={normalFilter[item as keyof typeof normalFilter]}
                onChange={handleCheckBox}
                name={item}
              />
            }
            label={normalFilterList[index]}
          />
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