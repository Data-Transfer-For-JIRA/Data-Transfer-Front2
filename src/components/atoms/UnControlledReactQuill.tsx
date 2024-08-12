import { ProjectTotalInfoType } from '@apis/ApiTypes';
import { useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
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
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ['normal'] }],
      // [{ align: [] }],
      // ["image", "video"],
      // ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      // [{color: [],},{ background: [] }],
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
      tempDefaultValue = "<table><tbody>\n<tr>\n<th><b>테이블헤더1</b></th>\n<th><b>테이블헤더2</b></th>\n<th'><b>테이블헤더3</b></th>\n</tr>\n<tr>\n<td>테이블 1,1</td>\n<td>테이블2,1</td>\n<td>테이블3,1</td>\n</tr>\n<tr>\n<td>테이블 2,1</td>\n<td>테이블2,2</td>\n<td>테이블2,3</td>\n</tr>\n</tbody></table>\n</div>";
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
