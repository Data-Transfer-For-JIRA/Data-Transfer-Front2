import { ProjectTotalInfoType } from "@apis/ApiTypes";
/** 에디터 API QUill과 백엔드 API에서 주는 html데이터를 파싱하는 함수 집합
 * 각 함수는 엔트리 함수가 있고 내부에 분기로 처리해야할 DOM구조에 따라 분기로 함수가 추가되는 형식
 * 현재 처리하는 태그들
 * - <ol>, <ul> : 동일한 결과값이 나오게 DOM요소의 class를 입혀서 처리.
 * - <tt>       : jira 에디터에서 쓰는 날짜 표현 태그로 quill에서는 디자인을 입혀서 처리
 * - <hr>       : divider blots로 quill에서 처리.  
 * 처리불가한 태그들
 * - <table>    : quill에서 테이블을 지원하지 않음.
 * - <image>    : 업로드 기능 구현 및 blots 처리필요
 * 
 * 엔트리 포인트 함수들
 * convertQuilltoJiraData() : Quill랜더링된 값을 API에서 요구하는 DOM형태로 변형하는 함수
 * convertJiraDataToQuill() : 백엔드 API의 결과값을 QUill에서 랜더링 가능한 DOM형태로 변형하는 함수
 */


/**
 * api호출 이후 또는 api호출 이전 파싱타입에 따른 오브젝트 치환
 * @param parsingType : 파싱타입
 * @param projectTotalInfo : 파싱이전 폼 데이터
 * @returns projectTotalInfo : 갱신된 폼데이터 리턴|오류시 undefined 리턴
 */
type ParsingType = 'QuillToApi' | 'ApiToQuill';
export const parsingHtmlData =(parsingType:ParsingType, projectTotalInfo:ProjectTotalInfoType)=>{
   if(parsingType === 'ApiToQuill'){
    const decrypt = convertJiraDataToQuill(projectTotalInfo.common.description);
    projectTotalInfo.common.description = decrypt;
   } 
   else if(parsingType === 'QuillToApi'){
    const decrypt = convertQuillToJiraData(projectTotalInfo.common.description);
    projectTotalInfo.common.description = decrypt;
   }
   else{
    alert("잘못된 접근입니다.");
    return undefined;
   }
   return projectTotalInfo;
}



/** Quill에 입려된 데이터를 api에서 필요한 DOM 형태로 변환하는 함수.
 *  @param quillData : Api호출에 파라미터로 사용할 변경전 Quill데이터
 *  @return convertedHtml : api파라미터를 전송할 html 데이터.
 */
export const convertQuillToJiraData= (quillData:string)=>{
  const parser = new DOMParser();
  const doc = parser.parseFromString(quillData, 'text/html');
  let convertedHtml:string='';

  const elements = Array.from(doc.body.children);
  elements.forEach(element => {
    const tag = element.tagName.toLowerCase();
    //TODO 1. 리스트 변환
    if(tag === 'ol'){
      convertedHtml += convertListQuillToJira(element);
    }
    //TODO 2. P태그 & 날짜 태그
    else if(tag === 'p'){
      const innerContent  = element.innerHTML;
      convertedHtml += `<p>${convertDayQuillToApi(innerContent)}</p>`
    }
    //TODO 3. 머릿글 변환
    else if(/^h[1-6]$/.test(tag)){
      const innerContent  = element.innerHTML;
      convertedHtml += `<${tag}>${innerContent}</${tag}>`
    }
    //TODO 4. 구분선 태그 변환
    else if(tag ==='hr'){
      convertedHtml += '<hr />'
    }
});
  
  return convertedHtml;
}

function convertListQuillToJira(listElement: Element): string {
  let result = '';
  const items = Array.from(listElement.children);
  const stack: { type: string; indent: number }[] = [];
  let currentIndent = 0;
  let currentType = '';

  items.forEach((item, index) => {
    if (item.tagName.toLowerCase() === 'li') {
      const dataList = item.getAttribute('data-list');
      const indentClass = item.className.match(/ql-indent-(\d+)/);
      const indentLevel = indentClass ? parseInt(indentClass[1], 10) : 0;
      const listType = dataList === 'bullet' ? 'ul' : 'ol';
      const content = item.textContent?.trim() || '';

      // 초기 태그 설정
      if (!currentType) {
        result += `<${listType}>`;
        currentType = listType;
      }

      // 들여쓰기 레벨이 증가한 경우
      while (currentIndent < indentLevel) {
        result += `\n${'\t'.repeat(currentIndent + 1)}<${listType}>`;
        stack.push({ type: listType, indent: currentIndent + 1 });
        currentIndent++;
      }

      // 들여쓰기 레벨이 감소한 경우
      while (currentIndent > indentLevel) {
        const lastItem = stack.pop();
        if (lastItem) {
          result += `\n${'\t'.repeat(lastItem.indent)}</${lastItem.type}>`;
        }
        currentIndent--;
      }

      // 리스트 유형이 변경된 경우
      if (currentType !== listType) {
        // 이전 리스트 유형을 닫음
        result += `</${currentType}>\n<${listType}>`;
        currentType = listType;
      }

      // 리스트 항목 추가
      result += `\n${'\t'.repeat(currentIndent + 1)}<li>${content}`;

      // 다음 항목이 중첩된 리스트가 아니라면 닫는 태그 추가
      const nextItem = items[index + 1];
      const nextIndentClass = nextItem?.className.match(/ql-indent-(\d+)/);
      const nextIndentLevel = nextIndentClass ? parseInt(nextIndentClass[1], 10) : 0;

      if (nextIndentLevel <= indentLevel) {
        result += `</li>`;
      }
    }
  });

  // 모든 리스트가 닫히지 않은 경우, 닫기 처리
  while (stack.length > 0) {
    const lastItem = stack.pop();
    if (lastItem) {
      result += `\n${'\t'.repeat(lastItem.indent)}</${lastItem.type}>`;
    }
  }

  // 최종 닫기 태그
  if (currentType) {
    result += `</${currentType}>`;
  }

  return result;
}

//api to Quill html(<tt>)
function convertDayQuillToApi(innerContent:string):string{
  if(innerContent.includes('<span class="ql-size-large" style="background-color: rgb(187, 187, 187);">')){
    innerContent = innerContent.replace(/<span class=['"]ql-size-large['"] style=['"]background-color: rgb\(187, 187, 187\);['"]>/g,"<tt>");
    innerContent = innerContent.replace(/<\/span>/g, "</tt>");
  }
  return innerContent;
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
        //리스트 변환
        if (tag === 'ul' || tag === 'ol') {
            const listType = tag === 'ul' ? 'bullet' : 'ordered';
            result += `<ol>${convertListApiToQuill(element, listType)}</ol>`;
        }
        //P태그와 <TT>태그 변환
        else if (tag === 'p') {
            let innerContent  = element.innerHTML;
            innerContent = convertDayApiToQuill(innerContent);
            result += `<p>${innerContent}</p>`;
        }
        //머릿글 변환
        else if (/^h[1-6]$/.test(tag)) {
            const innerContent = element.innerHTML;
            result += `<${tag}>${innerContent}</${tag}>`; // tag는 'h1', 'h2' 등의 태그를 포함
        }
        //구분선 변환
        else if(tag === 'hr'){
            const innerContent = element.innerHTML;
            result +=`<${tag}>${innerContent}</${tag}>`;
            }
        //TODO : 이미지 처리 필요
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
//api to Quill html(<tt>)
function convertDayApiToQuill(innerContent:string):string{
    if(innerContent.includes('<tt>')){
        innerContent = innerContent.replace(/<tt>/g, "<span style='background-color: rgb(187, 187, 187);' class='ql-size-large'>");
        innerContent = innerContent.replace(/<\/tt>/g, '</span>');
      }
    return innerContent;
}