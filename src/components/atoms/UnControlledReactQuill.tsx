import "@util/QuillDividerBlot";
import { ProjectTotalInfoType } from '@apis/ApiTypes';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import 'quill/dist/quill.snow.css';
import '@css/QuillStyle.css';


const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'indent',
  'link',
  'align',
  'color',
  'background',
  'size',
  'divider',
  'image',
];

type ReactQuillEditorType = {
  jiraProjectFlag: string;
  control: Control<ProjectTotalInfoType>;
  disabled: boolean;
}

export default function UnControlledReactQuill({ jiraProjectFlag, control, disabled }: ReactQuillEditorType) {
  const [defaultValue, setDefaultValue] = useState<string>("");
  const quillRef = useRef<ReactQuill | null>(null);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ['normal'] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ 'divider': true }],
        // ['image']
      ],
      handlers: {
        divider: function () {
          const quillEditor = quillRef.current?.getEditor();
          const range = quillEditor?.getSelection();
          if (quillEditor && range) {
            quillEditor.insertEmbed(range.index, 'divider', true);
          }
        }
      }
    }
  }), []); 

  // const modules = {
  //   toolbar: {
  //         container: [
  //           [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  //           [{ size: ['normal'] }],
  //           [{ list: 'ordered' }, { list: 'bullet' }],
  //           [{ 'divider': true }],
  //           // ['image']
  //         ],
  //         handlers: {
  //           divider: function () {
  //             const quillEditor = quillRef.current?.getEditor();
  //             const range = quillEditor?.getSelection();
  //             if (quillEditor && range) {
  //               quillEditor.insertEmbed(range.index, 'divider', true);
  //             }
  //           }
  //         }
  //       }
  // }

  useEffect(() => {
    let tempDefaultValue: string;
    if (jiraProjectFlag === 'P') {
      tempDefaultValue = '<ol><li>고객사 :</li><li>계약 업체 :</li><li>프로젝트 명 :</li><li>프로젝트 코드 :</li><li>지원 일정 :</li><li>담당자 :</li><li>지원 범위 :</li><li class="ql-indent-1">지원 형태 :</li><li class="ql-indent-1">연동 형태 :</li><li class="ql-indent-1">사용자 지원 환경 :</li><li class="ql-indent-1">서버 수량 :</li><li>장소 :</li><li>영업 담당 :</li><li>기타 :</li></ol>';
    } else {
      tempDefaultValue = '<ol><li>고객사 :</li><li>계약 업체 :</li><li>유지보수 명 :</li><li>유지보수 코드 :</li><li>제품명 :</li><li>유지보수 요율 :</li><li>유지보수 금액 :</li><li>계약 기간 :</li><li>점검 일정 :</li><li>점검 컨택 :</li><li>점검 장소 :</li><li>비고 :</li></ol>';
    }
    setDefaultValue(tempDefaultValue);
  }, [jiraProjectFlag]);

  return (
    <Controller
      name="common.description"
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <ReactQuill
          {...field}
          ref={quillRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={field.value || defaultValue} // field.value가 null/undefined인 경우 defaultValue 사용
          readOnly={disabled}
          onChange={(content) => {
            field.onChange(content); // react-hook-form의 필드 값 업데이트
          }}
        />
      )}
    />
  )
}