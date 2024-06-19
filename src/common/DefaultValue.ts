import { GetAxiosResultType, ProjectTotalInfoType } from '@apis/ApiTypes';
import { JSONDocNode, JSONNode } from '@atlaskit/editor-json-transformer/dist/types/types';

export const defaultProjectTotalInfo: ProjectTotalInfoType = {
  essential: {
    projectFlag: "",
    projectName: "",
  },
  common: {
    projectCode: "",
    assignee: "",
    subAssignee: "",
    salesManager: "",
    contractor: "",
    client: "",
    productInfo1: [],
    productInfo2: [],
    productInfo3: [],
    productInfo4: [],
    productInfo5: [],
    barcodeType: "",
    multiOsSupport: "",
    printerSupportRange: "",
    etc: "",
    description: "",
    allocationFlag: true
  },
  selected: {
    //프로젝트
    projectAssignmentDate: "",
    projectProgressStep: "",
    //유지보수
    contractStatus: "",
    maintenanceStartDate: "",
    maintenanceEndDate: "",
    inspectionMethod: "",
    inspectionMethodEtc: "",
    inspectionCycle: ""
  }
}
export const defaultProjectList : GetAxiosResultType ={
  key: "",
  id: "",
  jiraProjectName: "",
  migratedDate: "",
  projectCode: "",
  wssProjectName: "",
  flag: "",
  projectAssignees: "",
  updateDate: "",
  updateIssueFlag: false,
}

export const TestDefaultValue: ProjectTotalInfoType = {
  essential: {
    projectFlag: "P",
    projectName: "김태헌님의 프로젝트 테스트",
  },
  common: {
    projectCode: "TEST-1234",
    assignee: "김태헌",
    subAssignee: "김태헌",
    salesManager: "이태영",
    contractor: "김태헌 왕국",
    client: "김태헌",
    productInfo1: ["MaDM Zero","VoiceCode for MaDM"],
    productInfo2: [],
    productInfo3: [],
    productInfo4: [],
    productInfo5: [],
    barcodeType: "3단",
    multiOsSupport: "",
    printerSupportRange: "",
    etc: "",
    description: "<p>1.고객사 : 김태헌 컴퍼니</p><p>2. 계약 업체 : 김태헌회사</p><p>3. 프로젝트 명 : TEST1234</p><p>4. 프로젝트 코드 : TEST1234</p><p>5. 지원 일정 : 내일ㅋ</p><p>6. 담당자 : 김태헌</p><p>7. 지원 범위 : 전부다</p><p>&nbsp;&nbsp;&nbsp;&nbsp;가. 지원 형태 : 이쁘고</p><p>&nbsp;&nbsp;&nbsp;&nbsp;나. 연동 형태 : 아름다운</p><p>&nbsp;&nbsp;&nbsp;&nbsp;다. 사용자 지원 환경 : 윈도우</p><p>&nbsp;&nbsp;&nbsp;&nbsp;라. 서버 수량 : 100개</p><p>8. 장소 : 강서구</p><p>9. 영업 담당 : 김태헌</p><p>10. 기타 : 음오아예</p>",
    allocationFlag: true
  },
  selected: {
    //프로젝트
    projectAssignmentDate: "2024-05-08",
    projectProgressStep: "1. 프로젝트 시작",
    //유지보수
    contractStatus: "계약",
    maintenanceStartDate: "2024-05-07",
    maintenanceEndDate: "2024-05-10",
    inspectionMethod: "방문 점검",
    inspectionMethodEtc: "분기점검한다",
    inspectionCycle: "분기"
  }
}




export const adfData = {
  "version": 1,
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "date",
          "attrs": {
            "timestamp": "1707868800000"
          }
        },
        {
          "type": "text",
          "text": " "
        }
      ]
    },
    {
      "type": "bulletList",
      "content": [
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "이메일, 팩스(RD PDF)에서 가로 문서 바코드 길이 적용된 것 확인함."
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "2월 22일 반영한다고 유선 대기 요청함. (이인혁 주임님)"
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "통합출력시스템(RD PDF) 쪽은 가로 문서 바코드 길이 적용 안하는지 여쭤봤고 확인해본다고 함. (탁민우 대리님)"
                }
              ]
            },
            {
              "type": "bulletList",
              "content": [
                {
                  "type": "listItem",
                  "content": [
                    {
                      "type": "paragraph",
                      "content": [
                        {
                          "type": "text",
                          "text": "테스트"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "listItem",
                  "content": [
                    {
                      "type": "paragraph",
                      "content": [
                        {
                          "type": "text",
                          "text": "테스트2"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
