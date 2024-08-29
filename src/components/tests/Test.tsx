import { ProjectTotalInfoType } from "@apis/ApiTypes";
import UnControlledReactQuill from "@atoms/UnControlledReactQuill";
import { defaultProjectTotalInfo } from "@common/DefaultValue";
import { convertJiraDataToQuill, convertQuillToJiraData } from "@util/convertQuilltoApi";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const testTicket = "TED779-8";

export default function ADFEditor(){
  const URL = `${import.meta.env.VITE_API_ADDRESS}/api/platform/issue?jiraIssueKey=${testTicket}`
  const [flag, setFlag ] = useState('P');
  const { control, setValue, getValues  } = useForm<ProjectTotalInfoType>({defaultValues: defaultProjectTotalInfo });
  const fetchData = async () => {
    try {
      const { data } = await axios.get(URL);
      console.log(data);
      const newDom = convertJiraDataToQuill(data.common.description);
      setValue("common.description",newDom);
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
      <UnControlledReactQuill jiraProjectFlag={flag} control={control} disabled={false}/>
      <button onClick={handleBtn}>호출</button>
      <button onClick={handleConvert}>변환</button>
    </div>
    
  );
}


