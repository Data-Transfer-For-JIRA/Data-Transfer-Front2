import { GetTicketListType, ProjectTotalInfoType, TicketContents } from "@apis/ApiTypes";
import { GetAxiosTicketList } from "@apis/AxiosGet";
import JiraHistoryHeader from "@atoms/jiraHistory/JiraHistoryHeader";
import UnControlledReactQuill from "@atoms/UnControlledReactQuill";
import { defaultProjectTotalInfo } from "@common/DefaultValue";
import { convertJiraDataToQuill, convertQuillToJiraData } from "@util/convertQuilltoApi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";



//quill테스트용도

export default function ADFEditor(){
  const jiraCode = "ED2695";
  const page =0;
  const size = 10;
  const [apiResult, setApiResult] = useState<TicketContents[]>([]);

  useEffect(()=>{
    const callApi = async ()=>{
      const result:GetTicketListType|undefined = await GetAxiosTicketList(jiraCode, page, size);
      if (result === undefined){
        console.log("nope")
      }else{
        console.log(result)
        setApiResult(result.content);
      }
    }
    callApi();
  },[])
  return (
    <div>
      <NormalQuill data={apiResult}/>
    </div>
  )
}
type NormalQuillType = {
  data : TicketContents[];
}
function NormalQuill({data}:NormalQuillType){
  
  return(
    <>
    {data.map((item, index)=>(
    <div>
      <JiraHistoryHeader assign={item.담당자} tittle={item.지라_이슈_제목} issueKey={item.지라_이슈_키}/>
      <ReactQuill
        key={index}
        value={item.상세내용}
        readOnly={true}  // 편집 불가능한 뷰 모드
        theme="snow"  // 스타일 테마 적용 (선택 사항)
        modules={{ toolbar: false }}  // 툴바 제거
      />
      <ADFEditor2/>
    </div>
  ))}
    </>
  )
}

const testTicket = "TED779-18";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ADFEditor2(){
  const tbData = "<table><tbody>\n<th>테이블헤더1</th>\n<th>테이블헤더2</th>\n<th>테이블헤더3</th>\n<td>테이블 1,1</td>\n<td>테이블2,1</td>\n<td>테이블3,1</td>\n<td>테이블 2,1</td>\n<td>테이블2,2</td>\n<td>테이블2,3</td>\n</tbody></table>\n"

  const URL = `${import.meta.env.VITE_API_ADDRESS}/api/platform/issue?jiraIssueKey=${testTicket}`
  const [flag, setFlag ] = useState('P');
  const { control, setValue, getValues  } = useForm<ProjectTotalInfoType>({defaultValues: defaultProjectTotalInfo });
  const fetchData = async () => {
    try {
      const { data } = await axios.get(URL);
      console.log(data);
      const newDom = convertJiraDataToQuill(data.common.description);
      // setValue("common.description",newDom);
      setValue("common.description",tbData);
      console.log("-------------------------------");
      console.log(newDom);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();

  const handleBtn =()=>{
    alert(testTicket)
    if(flag==='p'){setFlag('M')}
    else{setFlag('P')}
    
    fetchData();
  }

  const handleConvert = ()=>{
    const newDom = getValues("common.description");
    console.log("-------------------------------");
    console.log(newDom);
    const result = convertQuillToJiraData(newDom);
    console.log(result);
  }
  return (
    <div>
      <UnControlledReactQuill defaultValue ={tbData} name={"common.description"} control={control} disabled={false}/>
      <button onClick={handleBtn}>호출</button>
      <button onClick={handleConvert}>변환</button>
    </div> 
  );
}


