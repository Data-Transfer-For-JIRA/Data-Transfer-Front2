import { ProjectTotalInfoType } from '@apis/ApiTypes';

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
    allocationFlag: false
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

export const TestDefaultValue: ProjectTotalInfoType = {
  essential: {
    projectFlag: "P",
    projectName: "김태헌님의 프로젝트 테스트",
  },
  common: {
    projectCode: "TEST-1234",
    assignee: "김태헌",
    subAssignee: "김태헌",
    salesManager: "판매왕 김태헌",
    contractor: "김태헌 왕국",
    client: "김태헌",
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
    allocationFlag: false
  },
  selected: {
    //프로젝트
    projectAssignmentDate: "2024-05-08",
    projectProgressStep: "99.끝",
    //유지보수
    contractStatus: "계-약",
    maintenanceStartDate: "2024-05-07",
    maintenanceEndDate: "2024-05-10",
    inspectionMethod: "",
    inspectionMethodEtc: "",
    inspectionCycle: ""
  }
}
