import { useState } from "react";
import { Paper } from "@mui/material";

import { GetAxiosResultType } from "@Api/ApiTypes";
import { GetAxiosSearchJiraList } from "@Api/AxiosGet";
import SearchInput from "@Components/organisms/SearchInput";
import SearchResult from "@Components/organisms/SearchResult";

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
