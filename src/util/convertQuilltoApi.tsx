/** 에디터 API QUill과 백엔드 API에서 주는 html데이터를 파싱하는 함수 집합
 * 각 함수는 엔트리 함수가 있고 내부에 분기로 처리해야할 DOM구조에 따라 분기로 함수가 추가되는 형식
 * 현재 처리하는 태그들
 * - <ol>, <ul> : 동일한 결과값이 나오게 DOM요소의 class를 입혀서 처리.
 * - <tt>       : jira 에디터에서 쓰는 날짜 표현 태그로 quill에서는 디자인을 입혀서 처리
 * - 
 * 처리불가한 태그들
 * - <table>    : quill에서 테이블을 지원하지 않음.
 * 
 * 엔트리 포인트 함수들
 * convertQuilltoJiraData() : Quill랜더링된 값을 API에서 요구하는 DOM형태로 변형하는 함수
 * convertJiraDataToQuill() : 백엔드 API의 결과값을 QUill에서 랜더링 가능한 DOM형태로 변형하는 함수
 */




/**Quill에 입려된 데이터를 api에서 필요한 DOM 형태로 변환하는 함수.
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

/**API결과값을 Quill에 적합한 DOM 포맷으로 변경하는 함수.
 * @param jiraData api를 통해 jira에서 가져온 html 코드
 * @returns result Quill에서 표현할 데이터
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
            result += `<ol>${convertListApiToQuill(element, listType)}</ol>`;
        } else if (tag === 'p') {
            let innerContent  = element.innerHTML;
            innerContent = convertDayApiToQuill(innerContent);
            result += `<p>${innerContent}</p>`;
        }else if (/^h[1-6]$/.test(tag)) {
            const innerContent = element.innerHTML;
            result += `<${tag}>${innerContent}</${tag}>`; // tag는 'h1', 'h2' 등의 태그를 포함
        }
    });
  return result;
}

//api to Quill html(<ol></ol>, <ul></ul>)
function convertListApiToQuill(list: Element, currentTag: string, indentLevel: number = 0): string {
  let result = '';
  const items = Array.from(list.children);

  items.forEach(item => {
      if (item.tagName.toLowerCase() === 'li') {
          const innerLists = Array.from(item.children).filter(child => child.tagName.toLowerCase() === 'ul' || child.tagName.toLowerCase() === 'ol');
          const textContent = item.childNodes[0].textContent?.trim() || '';
          const indentClass = indentLevel > 0 ? ` class="ql-indent-${indentLevel}"` : '';
          result += `<li data-list="${currentTag}"${indentClass}><span class="ql-ui" contenteditable="false"></span>${textContent}</li>`;

          innerLists.forEach(innerList => {
              result += convertListApiToQuill(innerList, innerList.tagName.toLowerCase() === 'ul' ? 'bullet' : 'ordered', indentLevel + 1);
          });
      }
  });

  return result;
}

function convertDayApiToQuill(innerContent:string):string{
    if(innerContent.includes('<tt>')){
        console.log('in')
        innerContent = innerContent.replace(/<tt>/g, "<span style='background-color: rgb(187, 187, 187);' class='ql-size-large'>");
        innerContent = innerContent.replace(/<\/tt>/g, '</span>');
      }
    return innerContent;
}