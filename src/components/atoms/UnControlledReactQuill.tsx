import "@util/QuillDividerBlot";
import { ProjectTotalInfoType } from '@apis/ApiTypes';
import {  useMemo, useRef } from 'react';
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
  name: "common.description";
  control: Control<ProjectTotalInfoType>;
  disabled: boolean;
  defaultValue?:string;
}

export default function UnControlledReactQuill({ name, control, disabled,defaultValue }: ReactQuillEditorType) {
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

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <ReactQuill
          {...field}
          ref={quillRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={ field.value} // field.value가 null/undefined인 경우 defaultValue 사용
          readOnly={disabled}
          onChange={(content) => {
            field.onChange(content); // react-hook-form의 필드 값 업데이트
          }}
        />
      )}
    />
  )
}