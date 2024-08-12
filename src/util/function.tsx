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


/** React-Quill에 입려된 데이터를 마크다운 형태로 변환하는 함수.
 * ul, ol 태그의 클래스 처리 변경, 색션분리 --- 문자열 처리, tt태그 날짜 처리
 * @param quillData : 마크다운으로 변경할 Quill데이터
 * @return convertedHtml : api파라미터를 전송할 html 데이터.
 */
export const convertQuilltoJiraData= (quillData:string)=>{
  // 변환된 HTML 출력
  const convertedHtml = convertQuillHtmlToCustomFormat(quillData);
  return convertedHtml;
}

//QuillData 중 list를 jira데이터로 변형
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

/**
 * API결과값을 Quill에 적합한 데이터 포맷으로 변경하는 함수
 * @param jiraData api를 통해 jira에서 가져온 html 코드
 * @returns 
 */
export function convertJiraDataToQuill(jiraData:string){
  const parser = new DOMParser();
  const doc = parser.parseFromString(jiraData, 'text/html');
  let result = '';

  //DOM자식요소는 유사 배열이라 배열형태로 변환함.
  //doc.body.children은 body태그 아래의 직계자식만 수집함.
  const elements = Array.from(doc.body.children);
    elements.forEach(element => {
        const tag = element.tagName.toLowerCase();
        if (tag === 'ul' || tag === 'ol') {
            const listType = tag === 'ul' ? 'bullet' : 'ordered';
            result += `<ol>${processListItems(element, listType)}</ol>`;
        } else if (tag === 'p') {
            let innerContent  = element.innerHTML;
            if(innerContent.includes('<tt>')){
              console.log('in')
              innerContent = innerContent.replace(/<tt>/g, "<span style='background-color: rgb(187, 187, 187);' class='ql-size-large'>");
              innerContent = innerContent.replace(/<\/tt>/g, '</span>');
            }
            result += `<p>${innerContent}</p>`;
        }
    });
  return result;
}

//api to Quill html(<ol></ol>, <ul></ul>)
function processListItems(list: Element, currentTag: string, indentLevel: number = 0): string {
  let result = '';
  const items = Array.from(list.children);

  items.forEach(item => {
      if (item.tagName.toLowerCase() === 'li') {
          const innerLists = Array.from(item.children).filter(child => child.tagName.toLowerCase() === 'ul' || child.tagName.toLowerCase() === 'ol');
          const textContent = item.childNodes[0].textContent?.trim() || '';
          const indentClass = indentLevel > 0 ? ` class="ql-indent-${indentLevel}"` : '';
          result += `<li data-list="${currentTag}"${indentClass}><span class="ql-ui" contenteditable="false"></span>${textContent}</li>`;

          innerLists.forEach(innerList => {
              result += processListItems(innerList, innerList.tagName.toLowerCase() === 'ul' ? 'bullet' : 'ordered', indentLevel + 1);
          });
      }
  });

  return result;
}