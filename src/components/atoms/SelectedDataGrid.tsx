import { DataGrid, GridCellParams, GridColDef, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import { useState } from 'react';
import { GetAxiosResultType } from '@apis/ApiTypes';  // Import your API types here

const columns: GridColDef[] = [
  { field: 'key', headerName: '지라코드', width: 100, sortable: false },
  { field: 'projectCode', headerName: '프로젝트 코드', width: 150, sortable: false },
  { field: 'flag', headerName: '유형', width: 50, sortable: false },
  { field: 'jiraProjectName', headerName: '프로젝트이름', sortable: false, flex: 1 },
  { field: 'projectAssignees', headerName: '담당자', width: 150, sortable: false },
];

type MuiSelectedTableType = {
  setSubJiraKey: React.Dispatch<React.SetStateAction<GetAxiosResultType>>;
  gridData: GetAxiosResultType[];
};

export default function SelectedDataGrid({ setSubJiraKey, gridData }: MuiSelectedTableType) {
  const [selectedRow, setSelectedRow] = useState<GridRowId[]>([]);

  const handleRowSelection = (selection: GridRowSelectionModel) => {
    if (selection.length > 0) {
      const latestSelection = selection[selection.length - 1]; // 가장 최근에 선택된 행
      setSelectedRow([latestSelection]); // 단일 선택을 유지
    } else {
      setSelectedRow([]);
    }
  };

  const handleOnClickRow = (params: GridCellParams) => {
    setSubJiraKey(params.row as GetAxiosResultType);
  };

  return (
    <DataGrid
      rows={gridData}
      columns={columns}
      autoHeight
      localeText={{
        noRowsLabel: '검색 결과가 없습니다.',
      }}
      rowSelectionModel={selectedRow}
      checkboxSelection
      onRowSelectionModelChange={handleRowSelection}
      onCellClick={handleOnClickRow}
      getRowId={(row) => row.id}
      sx={{
        "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
          display: "none",
        },
        ".MuiDataGrid-overlayWrapper": {
          minHeight: '400px',
        },
        ".MuiDataGrid-root .MuiDataGrid-colCellWrapper": {
          position: "sticky",
          top: 0,
          zIndex: 1,
        },
        ".MuiDataGrid-root .MuiDataGrid-footer": {
          position: "sticky",
          bottom: 0,
          zIndex: 1,
        },
      }}
    />
  );
}
