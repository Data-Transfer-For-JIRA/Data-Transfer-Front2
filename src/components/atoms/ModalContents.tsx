import { ModalType } from '@common/CommonType';
import ModalBase from '@organisms/ModalBase'; 

import { DialogContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalTittle } from '@common/CommonValue';

type ModalContentsType ={
  open : boolean;
  onClose : () => void; 
  modalData : string;
  modalType : ModalType
}

export default function ModalContents({ open, onClose, modalData, modalType }:ModalContentsType){
  const [modalTittle, setModalTittle] = useState(ModalTittle.NONE);
  useEffect(()=>{
    setModalTittle(ModalTittle[modalType]);
  },[])

  return (
    <ModalBase open={open} onClose={onClose} modalTittle={modalTittle}>
        <DialogContent>
          {modalType==='CREATE_CHECK'&&(<CheckCreateProjectInfo modalData={modalData}/>)}
          {modalType==='CREATE_SUCCESS'&&(<div>hi2</div>)}
        </DialogContent>
    </ModalBase>
  )
}

//프로젝트 생성정보 Modal
function CheckCreateProjectInfo({modalData}:{modalData:string}){
  return(
    <div>      
      {modalData}
    </div> 
  )
}
