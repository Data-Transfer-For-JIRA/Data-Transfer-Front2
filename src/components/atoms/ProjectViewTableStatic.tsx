import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { GetAxiosResultType } from '@apis/ApiTypes';

type ProjectViewTableType = {
  tableData: GetAxiosResultType[],
  handleMovePage ?: (jiraCode:string, projectFlag:string)=>void
};

type RowType = {
  jiraProjectCode: string,
  projectCode:string,
  jiraProjectName: string,
  projectAssignees: string,
  projectType: string,
  jiraUrl: string,
};

type ColumnsType = {
  label: string,
  id: keyof RowType,
  width: string,
};

const columns: ColumnsType[] = [
  { label: '지라코드', id: 'jiraProjectCode', width: '5%' },
  { label: '프로젝트코드', id: 'projectCode', width: '7%' },
  { label: '유형', id: 'projectType', width: '5%' },
  { label: '프로젝트이름', id: 'jiraProjectName', width: '30%' },
  { label: '담당자', id: 'projectAssignees', width: '7%' },
  { label: '지라URL', id: 'jiraUrl', width: '10%' },
];

function createRowData(
  jiraProjectCode: string,
  projectCode:string,
  jiraProjectName: string,
  projectAssignees: string,
  flag: string
): RowType {
  const jiraUrl = `https://markany.atlassian.net/jira/core/projects/${jiraProjectCode}/board`;
  const projectType = flag === "P" ? "프로젝트" : "유지보수";
  return { jiraProjectCode,projectCode, jiraProjectName, projectAssignees, projectType, jiraUrl };
}
//handleMovePag 상세사용시 추가
export default function ProjectViewTableStatic({ tableData, handleMovePage }: ProjectViewTableType) {
  const rows: RowType[] = [];
  tableData.forEach((item) => {
    rows.push(createRowData(item.key,item.projectCode, item.jiraProjectName, item.projectAssignees, item.flag));
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(50);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
    if (event) {
      setPage(newPage);
    }
  };

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ width: column.width }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => {
                  const value = row[column.id];
                  if(column.id=== 'jiraUrl'){
                    return(
                      <TableCell key={column.id}> 
                        <a href={value} target="_blank">{value}</a>
                      </TableCell>
                    )
                  }
                  else if(column.id=== 'jiraProjectCode' ||column.id=== 'projectCode'||column.id=== 'projectType'){
                    return(
                      <TableCell key={column.id} sx={{ cursor: 'pointer' }}  onClick={()=>handleMovePage&&handleMovePage(row.jiraProjectCode, row.projectType)}>
                      {value}
                    </TableCell>
                    )
                  }
                  else{
                    return (
                      <TableCell key={column.id}>
                        {value}
                      </TableCell>
                    );  
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </TableContainer>
    </Paper>
  );
}
