import { convertJiraDataToQuill } from "@util/function";

// // Quill HTML 입력 예제
const testListjiraData = "<ul>\n\t<li>언오더리스트탭없음</li>\n\t<li>탭없음\n\t<ul>\n\t\t<li>탭1추가\n\t\t<ul>\n\t\t\t<li>탭2추가</li>\n\t\t</ul>\n\t\t</li>\n\t\t<li>탭1추가</li>\n\t</ul>\n\t</li>\n</ul>\n\n\n\n\n<ol>\n\t<li>오더리스트탭없음\n\t<ol>\n\t\t<li>탭1추가\n\t\t<ol>\n\t\t\t<li>탭2추가</li>\n\t\t</ol>\n\t\t</li>\n\t\t<li>탭1추가</li>\n\t</ol>\n\t</li>\n\t<li>탭없음</li>\n</ol>";
const testDayJiraData = '<p><tt>2024-08-02</tt> </p>\n\n<p>일반텍스트</p>\n\n<p><tt>2024-08-13</tt> </p>\n\n<p>일반텍스트</p>';

export default function ADFEditor(){
  const testData = convertJiraDataToQuill(testListjiraData);
  console.log(testData);
  return (
    <div>
      hi
    </div>
  );
}