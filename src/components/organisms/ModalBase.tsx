import { Box, Modal } from '@mui/material';
type ModalBaseType = {
  open : boolean;
  onClose : () => void; 
  children: React.ReactNode;
}
export default function ModalBase({ open, onClose, children }:ModalBaseType){
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
      {children}
      </Box>
    </Modal>
  );
}
