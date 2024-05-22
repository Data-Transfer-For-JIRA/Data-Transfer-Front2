import { Box, Dialog, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
type ModalBaseType = {
  open : boolean;
  onClose : () => void; 
  children: React.ReactNode;
  modalTittle: string;
}
export default function ModalBase({ open, onClose, children,modalTittle }:ModalBaseType){
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth // 다이얼로그를 가득 채우도록 설정
      sx={{ '& .MuiDialog-paper': { width: '70rem', maxWidth: 'none' } }}
    >
      <DialogTitle id="alert-dialog-title" sx={{padding : '5px', textAlign:'center'}}>
      <Typography variant="h5" gutterBottom>{modalTittle}
          <IconButton
          aria-label="modal-close"
          onClick={onClose}
          sx={{float : 'right'}}    
          >
            <CloseIcon />
          </IconButton>
          </Typography>
        </DialogTitle>
      <Box>
      {children}
      </Box>
    </Dialog>
  );
}
