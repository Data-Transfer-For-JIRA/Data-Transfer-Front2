import { GetAxiosResultType } from '@apis/ApiTypes';
import { SelectedProjectType } from '@common/CommonType';

/** 선택된 프로젝트 코드와 Chip에 보여질 데이터 매칭 함수
 *  검색결과에 따라 비교대상이 달라져서 문제가좀 있음;
 */
export const setSelectProjectList = (targetProject:string[], searchResult:GetAxiosResultType[]):SelectedProjectType[]=>{
  const tempArray:SelectedProjectType[] = [];
  searchResult.map((item)=>{
    if(targetProject.includes(item.key)){
      tempArray.push({
        jiraProjectKey : item.key,
        jiraProjectName : item.jiraProjectName
      });
    }
  })
  return tempArray;
}

/**
 * 오브젝트 마이그레이션 데이터 기준 오름차순 정렬 함수
 * @param axiosResult API호출결과 오브젝트
 * @returns sorted_list 정렬결과
 */
export const sortObjectDate = (axiosResult:GetAxiosResultType[]):GetAxiosResultType[]=>{
  const sorted_list = axiosResult.sort(function(a, b) {
		return new Date(a.migratedDate).getTime() - new Date(b.migratedDate).getTime();
	}).reverse();
  return sorted_list;
}


// Quill HTML 입력 예제
const testQuillData = `
<ol>
    <li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>언 오더 리스트 탭 없음</li>
    <li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>탭없음</li>
    <li data-list="bullet" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>탭1추가</li>
    <li data-list="bullet" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>탭2추가</li>
    <li data-list="bullet" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>탭1추가</li>
    <li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>탭없음</li>
</ol>
<p><br></p>
<ol>
    <li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>오더 리스트 탭 없음</li>
    <li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>탭 1 추가</li>
    <li data-list="ordered" class="ql-indent-2"><span class="ql-ui" contenteditable="false"></span>탭 2추가</li>
    <li data-list="ordered" class="ql-indent-1"><span class="ql-ui" contenteditable="false"></span>탭 1추가</li>
    <li data-list="ordered"><span class="ql-ui" contenteditable="false"></span>탭없음</li>
</ol>
`;
/** React-Quill에 입려된 데이터를 마크다운 형태로 변환하는 함수.
 * ul, ol 태그의 클래스 처리 변경, 색션분리 --- 문자열 처리, tt태그 날짜 처리
 * @param quillData : 마크다운으로 변경할 Quill데이터
 * @return convertedHtml : api파라미터를 전송할 html 데이터.
 */
export const converQuilltoMarkDown= (quillData:string = testQuillData)=>{
  // 변환된 HTML 출력
  const convertedHtml = convertQuillHtmlToCustomFormat(quillData);
  console.log(convertedHtml);
  return convertedHtml;
}

//ou ul처리 태그
function convertQuillHtmlToCustomFormat(quillHtml: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(quillHtml, 'text/html');

    function processListItems(items: Element[], indentLevel: number = 0): string[] {
        const result: string[] = [];
        const currentTag: string = items[0].getAttribute('data-list') === 'bullet' ? 'ul' : 'ol';
        result.push(`\n${'\t'.repeat(indentLevel)}<${currentTag}>`);

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const itemIndent = item.getAttribute('class') || '';
            const indentMatch = itemIndent.match(/ql-indent-(\d+)/);
            const indent = indentMatch ? parseInt(indentMatch[1], 10) : 0;

            if (indent === indentLevel) {
                result.push(`\n${'\t'.repeat(indentLevel + 1)}<li>${item.textContent?.trim()}`);
            } else if (indent > indentLevel) {
                const sublist = processListItems(items.slice(i), indent);
                result.push(sublist.join(''));
                while (i < items.length && items[i].getAttribute('class')?.includes(`ql-indent-${indent}`)) {
                    i++;
                }
                i--;
            } else {
                result.push(`</li>\n${'\t'.repeat(indentLevel)}</${currentTag}>`);
                return result;
            }
        }

        result.push(`</li>\n${'\t'.repeat(indentLevel)}</${currentTag}>`);
        return result;
    }

    const result: string[] = [];
    const lists = doc.querySelectorAll('ol, ul');

    lists.forEach((list) => {
        const listItems = Array.from(list.querySelectorAll('li'));
        result.push(...processListItems(listItems));
    });

    return result.join('');
}
