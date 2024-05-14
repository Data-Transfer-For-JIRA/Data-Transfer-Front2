import { useState } from "react";
import { Paper } from "@mui/material";

import { GetAxiosResultType } from "@apis/ApiTypes";
import { GetAxiosSearchJiraList } from "@apis/AxiosGet";
import SearchInput from "@organisms/SearchInput";
import SearchResult from "@organisms/SearchResult";

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
