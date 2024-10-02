import { Box, Typography } from "@mui/material"

type JiraHistoryHeaderType={
  assign : string;
  tittle : string;
  issueKey : string;
}

export default function JiraHistoryHeader({assign, tittle, issueKey}:JiraHistoryHeaderType){
  return (
    <Box sx={{padding:'0.5rem'}}>
      <Typography variant="h5">{tittle}</Typography>
      <Box sx={{display:"flex", flexWrap:"wrap"}}>
        <Box>{`[${issueKey}] ${assign}`}</Box>
      </Box>
    </Box>
  )
}