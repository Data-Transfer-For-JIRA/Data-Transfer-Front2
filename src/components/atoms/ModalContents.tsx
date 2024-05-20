import { ModalType } from '@common/CommonType';
import ModalBase from '@organisms/ModalBase'; 

import { Container, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type ModalContentsType ={
  open : boolean;
  onClose : () => void; 
  modalData : string;
  modalType : ModalType
}

export default function ModalContents({ open, onClose, modalData, modalType }:ModalContentsType){
  return (
    <ModalBase open={open} onClose={onClose}>
      <Container>
      <DialogTitle id="alert-dialog-title">
        테스트
          <IconButton
          aria-label="modal-close"
          onClick={onClose}
          sx={{float : 'right'}}    
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
        <div>{modalType}</div>
        <div>{modalData}</div>
        </DialogContent>
      </Container>
    </ModalBase>
  )
}
