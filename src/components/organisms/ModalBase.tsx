import { Box, Dialog, DialogTitle, IconButton  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ModalType } from '@common/CommonType';
import { useNavigate } from 'react-router-dom';
type ModalBaseType = {
  open : boolean;
  onClose : () => void; 
  children: React.ReactNode;
  modalTittle: string;
  modalType: ModalType;
}
export default function ModalBase({ open, onClose, children,modalTittle, modalType }:ModalBaseType){
  const navigator = useNavigate();
  const onClickRefresh = ()=>{
    navigator('/');
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth // 다이얼로그를 가득 채우도록 설정
      sx={{ '& .MuiDialog-paper': { width: '70rem', maxWidth: 'none' } }}
    >
      <DialogTitle id="alert-dialog-title" sx={{padding : '5px', textAlign:'center', paddingTop:'10px',fontSize : '1.5rem'}}>
        {modalTittle}
          <IconButton
          aria-label="modal-close"
          onClick={modalType==='CREATE_SUCCESS'?onClickRefresh:onClose}
          sx={{float : 'right'}}    
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      <Box>
      {children}
      </Box>
    </Dialog>
  );
}
