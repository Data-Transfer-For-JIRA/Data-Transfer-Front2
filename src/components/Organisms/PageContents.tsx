import { Paper } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { GetAxiosResultType } from "../../Apis/ApiTypes";
import { GetAxiosSearchJiraList } from "../../Apis/AxiosGet";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

export default function PageContents() {
  const [projectList, setProjectList] = useState<GetAxiosResultType[]>([]);
  const handleSearchResult = (searchResult: GetAxiosResultType[]) => {
    setProjectList(projectList);
  };
  return (
    <Paper sx={{ p: 3 }}>
      <SearchInput
        handleSearchResult={handleSearchResult}
        requestSearchApi={GetAxiosSearchJiraList}
      />
      <SearchResult />
    </Paper>
  );
}
