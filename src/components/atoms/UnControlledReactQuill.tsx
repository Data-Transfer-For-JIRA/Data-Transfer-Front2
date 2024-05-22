import { ProjectTotalInfoType } from '@apis/ApiTypes';
import {useEffect, useMemo,} from 'react';
import { Control, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'color',
  'background',
  'size',
  'h1',
];
type ReactQuillEditorType = {
  jiraProjectFlag: string;
  control: Control<ProjectTotalInfoType>;
  disabled:boolean;
}
export default function UnControlledReactQuill({ jiraProjectFlag, control, disabled }: ReactQuillEditorType) {
  let defaultValue: string;
  if (jiraProjectFlag === 'P') {
    defaultValue = "<p>1.고객사 :</p><p>2. 계약 업체 :</p><p>3. 프로젝트 명 : </p><p>4. 프로젝트 코드 :</p><p>5. 지원 일정 :</p><p>6. 담당자 :</p><p>7. 지원 범위 :</p><p>&nbsp;&nbsp;&nbsp;&nbsp;가. 지원 형태 :</p><p>&nbsp;&nbsp;&nbsp;&nbsp;나. 연동 형태 :</p><p>&nbsp;&nbsp;&nbsp;&nbsp;다. 사용자 지원 환경 :</p><p>&nbsp;&nbsp;&nbsp;&nbsp;라. 서버 수량 :<p>8. 장소 :</p><p>9. 영업 담당 :</p><p>10. 기타 :</p>"
  } else {
    defaultValue = "<p>1.고객사 :</p><p>2.계약업체 :</p><p>3.유지보수명 :</p><p>4.유지보수 코드 :</p><p>5.제품명 :</p><p>6,유지보수 요율 :</p><p>7.유지보수 금액 :</p><p>8.계약기간 :</p><p>9.점검일정 :</p><p>10. 점검 컨택:</p><p>11. 점검 장소:</p><p>12. 비고:</p>"
  }
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          // [{ align: [] }],
          // ['bold', 'italic', 'underline', 'strike'],
          // [{ list: 'ordered' }, { list: 'bullet' }],
          // [
          //   {
          //     color: [],
          //   },
          //   { background: [] },
          // ],
        ],
      },
    };
  }, []);
  useEffect(()=>{
    
  },[jiraProjectFlag])
  return (
    <Controller
      name="common.description"
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <ReactQuill
          {...field}
          theme="snow"
          modules={modules}
          formats={formats}
          value={field.value || defaultValue}
          readOnly={disabled}
        />
      )}
    />
  )
}
