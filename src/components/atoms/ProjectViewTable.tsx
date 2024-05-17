import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { GetAxiosResultType } from '@apis/ApiTypes';

type ProjectViewTableType = {
  tableData: GetAxiosResultType[],
  handleMovePage : (jiraCode:string)=>void
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
  { label: '프로젝트이름', id: 'jiraProjectName', width: '40%' },
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

export default function ProjectViewTable({ tableData, handleMovePage }: ProjectViewTableType) {
  const rows: RowType[] = [];
  tableData.forEach((item) => {
    rows.push(createRowData(item.key,item.projectCode, item.jiraProjectName, item.projectAssignees, item.flag));
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      const displayHeight = window.innerHeight;
      const rowHeight = 50; // 각 행의 높이 (예상 값, 필요 시 조정)
      const tableHeaderHeight = 50; // 테이블 헤더의 높이 (예상 값, 필요 시 조정)
      const paginationHeight = 56; // 페이지네이션 컴포넌트의 높이 (예상 값, 필요 시 조정)
      const appHeaderHeight = 64;
      const contesAreaPadding= 16;
      const searchArea = 50 ;
      const availableHeight = displayHeight - tableHeaderHeight - paginationHeight-appHeaderHeight-searchArea-contesAreaPadding;
      const rowsPerPage = Math.max(1, Math.floor(availableHeight / rowHeight));
      setRowsPerPage(rowsPerPage);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
                  else{
                    return (
                      <TableCell key={column.id} onClick={()=>handleMovePage(row.jiraProjectCode)}>
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
