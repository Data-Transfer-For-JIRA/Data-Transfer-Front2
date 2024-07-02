import { ProjectTotalInfoType } from '@apis/ApiTypes';
import { useEffect, useMemo, useState } from 'react';
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
  disabled: boolean;
}

export default function UnControlledReactQuill({ jiraProjectFlag, control, disabled }: ReactQuillEditorType) {
  const [defaultValue, setDefaultValue] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [
            {
              color: [],
            },
            { background: [] },
          ],
        ],
      },
    };
  }, []);

  useEffect(() => {
    let tempDefaultValue: string;
    if (jiraProjectFlag === 'P') {
      tempDefaultValue = "<ol><li>고객사 :</li><li>계약 업체 : </li><li>프로젝트 명 : </li><li>프로젝트 코드 : </li><li>지원 일정 : </li><li>담당자 : </li><li>지원 범위 : </li><ol><li>지원 형태 : </li><li>연동 형태 : </li><li>사용자 지원 환경 : </li><li>서버 수량 : </li></ol><li>장소 : </li><li>영업 담당 : </li><li>기타 : </li></ol>";
    } else {
      tempDefaultValue = "<ol><li>고객사 :</li><li>계약 업체 : </li><li>유지보수 명 : </li><li>유지보수 코드 : </li><li>제품명 : </li><li>유지보수 요율 : </li><li>유지보수 금액 : </li><li>계약 기간 : </li><li>점검 일정 : </li><li>점검 컨택 : </li><li>점검 장소 : </li><li>비고 : </li></ol>";
    }
    setDefaultValue(tempDefaultValue);
    setValue(tempDefaultValue); // value 상태를 업데이트
  }, [jiraProjectFlag]);

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
          value={value} // 여기서 상태 value를 사용
          readOnly={disabled}
          onChange={(content) => {
            field.onChange(content); // react-hook-form의 필드 값 업데이트
            setValue(content); // 로컬 state 업데이트
          }}
        />
      )}
    />
  )
}
