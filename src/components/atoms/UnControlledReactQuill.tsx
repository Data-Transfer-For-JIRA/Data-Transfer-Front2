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
          ["image", "video"],
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
      //tempDefaultValue = "<ul>\n\t<li>언오더</li>\n\t<li>리스</li>\n\t<li>트</li>\n</ul>\n\n\n<hr />\n\n<ol>\n\t<li>오더</li>\n\t<li>리스\n\t<ol>\n\t\t<li>트</li>\n\t\t<li>트2</li>\n\t\t<li>트3</li>\n\t</ol>\n\t</li>\n</ol>\n\n\n<hr />\n\n<p><tt>2024-06-18</tt> </p>\n\n<hr />\n\n\n\n<div class='table-wrap'>\n<table class='confluenceTable'><tbody>\n<tr>\n<th class='confluenceTh'><b>테이블 헤더1</b></th>\n<th class='confluenceTh'><b>테이블 헤더2</b></th>\n<th class='confluenceTh'><b>테이블 헤더3</b></th>\n</tr>\n<tr>\n<td class='confluenceTd'>테이블 로우1</td>\n<td class='confluenceTd'>테이블 로우1-2</td>\n<td class='confluenceTd'>테이블 로우 1-3</td>\n</tr>\n<tr>\n<td class='confluenceTd'>테이블 로우 2</td>\n<td class='confluenceTd'>테이블 로우 2-1</td>\n<td class='confluenceTd'>테이블 로우 2-2</td>\n</tr>\n</tbody></table>\n</div>\n\n\n<hr />\n\n\n\n<p><span class=\"image-wrap\" style=\"\"><img src=\"/rest/api/3/attachment/content/19227\" alt=\"K-011.png\" height=\"1440\" width=\"2560\" style=\"border: 0px solid black\" /></span></p>";
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
