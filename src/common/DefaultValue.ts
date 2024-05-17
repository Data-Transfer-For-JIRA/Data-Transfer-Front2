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
