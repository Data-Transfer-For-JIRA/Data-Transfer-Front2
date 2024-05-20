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
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle id="alert-dialog-title">
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
