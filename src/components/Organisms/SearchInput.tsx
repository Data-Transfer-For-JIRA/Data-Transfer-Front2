import { Box, FormControl, IconButton, InputBase } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

/**
 * 검색어 입력 컴포넌트
 * 추후 상세 검색(연동 종류 등)을 고려하여 확장성 있게 개발 필요.
 * @handleSearchResult : 검색결과를 저장할 상위 컴포넌트의 State를 변경하는 함수.
 * @axiosFunction : 해당 검색창이 사용할 API
 * prosType : setState를 감싼 핸들러 함수로, 컴포넌트를 범용성 있게 제작하기 위해 사용. + 제네릭타입
 */
type SearchProjectInputType<T> = {
  handleSearchResult: (searchResult: T) => void;
  requestSearchApi: (searchKeyword: string) => Promise<T>;
};

export default function SearchInput<T>({
  handleSearchResult,
  requestSearchApi,
}: SearchProjectInputType<T>) {
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleChangeKeyword = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    console.log(searchKeyword);
    setSearchKeyword(event.target.value);
  };

  const handleSearch = async () => {
    const searchApiResult = await requestSearchApi(searchKeyword);
    if (searchApiResult !== undefined) {
      handleSearchResult(searchApiResult);
    }
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <Box sx={{ border: "2px solid grey" }} height={70}>
      <FormControl>
        <InputBase
          sx={{
            flex: 1,
            width: "95%",
            height: "100%",
            border: "2px solid #ccc",
            borderRadius: "5px",
          }}
          placeholder="연결 프로젝트 선택"
          type={"text"}
          value={searchKeyword}
          onChange={(event) => handleChangeKeyword(event)}
          onKeyDown={(event) => {
            handleKeyDown(event);
          }}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </FormControl>
    </Box>
  );
}
