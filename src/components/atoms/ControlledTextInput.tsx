import { Box, IconButton, Input } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

/**
 * 검색어 입력 컴포넌트
 * @handleSearchResult : 검색결과를 저장할 배열형태의 State
 * @requestSearchApi : 검색에 사용될 Axios 함수
 */

type InputType<T> = {
  handleSearchResult : (searchResult : T) => void;
  requestSearchApi : (searchKeyWord:string)=>Promise<T|undefined>;
}
export default function ControlledTextInput<T> ({handleSearchResult,requestSearchApi }:InputType<T>) {
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");
  const handleSearchKeyWord = (event :React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> )=>{
    setSearchKeyWord(event.target.value);
  }
  const callSearchApi = async()=>{
    const result = await requestSearchApi(searchKeyWord);
    if(result !==undefined) {
      handleSearchResult(result); 
    }
  }
  const handleKeyDown = (event :React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement> )=>{
    if(event.key==='Enter'){
      callSearchApi();
    }
  }
  const handleBtnOnClick = ()=>{
    callSearchApi();
  }
  return (
    <Box sx={{display : 'flex'}}>
      <Input 
        placeholder="프로젝트 검색" 
        sx={{width:'100%'}}
        onChange ={handleSearchKeyWord}
        onKeyDown = {handleKeyDown}
      />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleBtnOnClick}>
          <SearchIcon />
        </IconButton>     
      </Box>
  )
}
