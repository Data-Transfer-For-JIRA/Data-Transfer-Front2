import { ProjectTotalInfoType } from '@apis/ApiTypes';
import { convertJiraDataToQuill } from '@util/function';
import { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
import 'quill/dist/quill.snow.css';

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
];

const modules = {
  toolbar: {
    container: [
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ align: [] }],
      // ["image", "video"],
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

type ReactQuillEditorType = {
  jiraProjectFlag: string;
  control: Control<ProjectTotalInfoType>;
  disabled: boolean;
}

export default function UnControlledReactQuill({ jiraProjectFlag, control, disabled }: ReactQuillEditorType) {
  const [defaultValue, setDefaultValue] = useState<string>("");

  useEffect(() => {
    let tempDefaultValue: string;
    if (jiraProjectFlag === 'P') {
      tempDefaultValue = "<ol><li data-list='bullet'><span class='ql-ui' contenteditable='false'></span>언오더리스트탭없음</li><li data-list='bullet'><span class='ql-ui' contenteditable='false'></span>탭없음</li><li data-list='bullet' class='ql-indent-1'><span class='ql-ui' contenteditable='false'></span>탭1추가</li><li data-list='bullet' class='ql-indent-2'><span class='ql-ui' contenteditable='false'></span>탭2추가</li><li data-list='bullet' class='ql-indent-1'><span class='ql-ui' contenteditable='false'></span>탭1추가</li></ol><p><br></p><ol><li data-list='ordered'><span class='ql-ui' contenteditable='false'></span>오더리스트탭없음</li><li data-list='ordered' class='ql-indent-1'><span class='ql-ui' contenteditable='false'></span>탭1추가</li><li data-list='ordered' class='ql-indent-2'><span class='ql-ui' contenteditable='false'></span>탭2추가</li><li data-list='ordered' class='ql-indent-1'><span class='ql-ui' contenteditable='false'></span>탭1추가</li><li data-list='ordered'><span class='ql-ui' contenteditable='false'></span>탭없음</li></ol>";
    } else {
      tempDefaultValue = "";
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
