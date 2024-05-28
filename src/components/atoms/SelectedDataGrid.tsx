import { GetAxiosResultType } from '@apis/ApiTypes';
import { DataGrid, GridCellParams, GridColDef, GridRowId, GridRowSelectionModel, GridTreeNode } from '@mui/x-data-grid';
import { useState } from 'react';


const columns: GridColDef[] = [
  { field: 'key', headerName: '지라코드', width: 100, sortable: false, },
  { field: 'projectCode', headerName: '프로젝트 코드', width: 150, sortable: false, },
  { field: 'flag', headerName: '유형', width: 50, sortable: false, },
  { field: 'jiraProjectName', headerName: '프로젝트이름', sortable: false, flex: 1 },
  { field: 'projectAssignees', headerName: '담당자', width: 150, sortable: false, },
]

type MuiSelectedTableType = {
  setSubJiraKey: React.Dispatch<React.SetStateAction<GetAxiosResultType>>
  gridData: GetAxiosResultType[]
}
export default function SelectedDataGrid({ setSubJiraKey, gridData }: MuiSelectedTableType) {
  const [rowSelected, setRowSelected] = useState<GridRowId[]>([]);
  const handleSelectedRow = (selection: GridRowSelectionModel) => {
    if (selection.length > 0) {
      const selectionSet = new Set(rowSelected);
      const result = selection.filter((s) => !selectionSet.has(s));
      setRowSelected(result);
    } else {
      setRowSelected(selection);
    }
  }
  const handleOnClickRow = (GridCellParams: GridCellParams<any, unknown, unknown, GridTreeNode>) => {
    setSubJiraKey(GridCellParams.row);
  }

  return (
  <DataGrid
    rows={gridData}
    columns={columns}
    autoHeight
    localeText={{
      noRowsLabel: '검색 결과가 없습니다.'
    }}
    rowSelectionModel={rowSelected}
    checkboxSelection
    hideFooterSelectedRowCount
    onRowSelectionModelChange={(selection) => handleSelectedRow(selection)}
    onCellClick={(GridCellParams) => { handleOnClickRow(GridCellParams) }}
    getRowId={(obj) => obj.id}
    sx={{
      "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
        display: "none"
      },
      ".MuiDataGrid-overlayWrapper": {
        minHeight: '400px'
      },
      ".MuiDataGrid-root .MuiDataGrid-colCellWrapper": {
        position: "sticky",
        top: 0,
        zIndex: 1
      },
      ".MuiDataGrid-root .MuiDataGrid-footer": {
        position: "sticky",
        bottom: 0,
        zIndex: 1
      }
    }}
  />
  )
}
