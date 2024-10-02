import { GetTicketListType, TicketContents } from "@apis/ApiTypes"
import { GetAxiosTicketList } from "@apis/AxiosGet"
import JiraHistoryHeader from "@atoms/jiraHistory/JiraHistoryHeader"
import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import ReactQuill from "react-quill-new"

type JiraTicketsBlockType = {
  jiraProjectCode ?: string;
}

export default function JiraTicketsBlock({jiraProjectCode}:JiraTicketsBlockType ){
  //티켓조회하기
  const page =0;
  const size = 10;
  const [projectTickets, setProjectTickets] = useState<TicketContents[]>([]);

  useEffect(()=>{
    const callApi = async ()=>{
      if(jiraProjectCode!==undefined){
        const result:GetTicketListType|undefined = await GetAxiosTicketList(jiraProjectCode, page, size);
        if (result === undefined){
          alert('티켓 조회에 실패하였습니다.')
        }else{
          console.log(result)
          setProjectTickets(result.content);
        }
      }
    }
    callApi();
  },[])
  
  return (
    <Box sx={{rowGap: "10px", marginTop: '15px' }}>
    <Typography variant="h5" sx={{width: '100%'}}>{'히스토리'}</Typography>
      {projectTickets.map((item)=>(
      <div>
        <JiraHistoryHeader assign={item.담당자} tittle={item.지라_이슈_제목} issueKey={item.지라_이슈_키}/>
        <ReactQuill
          key={item.지라_이슈_키}
          value={item.상세내용}
          readOnly={true}  // 편집 불가능한 뷰 모드
          theme="snow"  // 스타일 테마 적용 (선택 사항)
          modules={{ toolbar: false }}  // 툴바 제거
        />
      </div>
      ))}
    </Box>
  )
}